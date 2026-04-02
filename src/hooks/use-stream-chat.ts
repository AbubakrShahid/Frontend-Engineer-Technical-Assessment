"use client";

import { useCallback, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { store } from "@/store";
import {
  addUserMessage,
  startStreaming,
  appendStreamChunk,
  finishStreaming,
  setStreamError,
  updateConversationTitle,
} from "@/store/chat-slice";
import { ChatMessage, StreamChunk } from "@/types/chat";

export function useStreamChat() {
  const dispatch = useAppDispatch();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateTitle = useCallback(
    async (conversationId: string, firstMessage: string) => {
      try {
        const response = await fetch("/api/title", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: firstMessage }),
        });

        if (response.ok) {
          const data: { title: string } = await response.json();
          dispatch(
            updateConversationTitle({ id: conversationId, title: data.title })
          );
        }
      } catch {}
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    async (prompt: string) => {
      const currentState = store.getState().chat;
      if (!currentState) return;

      const activeConversation = currentState.conversations.find(
        (c) => c.id === currentState.activeConversationId
      );
      if (!activeConversation) return;

      const isFirstMessage = activeConversation.messages.length === 0;
      const history: ChatMessage[] = [...activeConversation.messages];

      dispatch(addUserMessage(prompt));

      if (isFirstMessage) {
        generateTitle(activeConversation.id, prompt);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, history }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          dispatch(
            setStreamError(
              errorData.error || `Request failed with status ${response.status}`
            )
          );
          return;
        }

        if (!response.body) {
          dispatch(setStreamError("No response body received."));
          return;
        }

        dispatch(startStreaming());

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              dispatch(finishStreaming());
              return;
            }

            try {
              const parsed: StreamChunk = JSON.parse(data);
              if (parsed.error) {
                dispatch(setStreamError(parsed.error));
                return;
              }
              if (parsed.content) {
                dispatch(appendStreamChunk(parsed.content));
              }
            } catch {}
          }
        }

        dispatch(finishStreaming());
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          dispatch(finishStreaming());
          return;
        }
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        dispatch(setStreamError(errorMessage));
      } finally {
        abortControllerRef.current = null;
      }
    },
    [dispatch, generateTitle]
  );

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return { sendMessage, stopStreaming };
}
