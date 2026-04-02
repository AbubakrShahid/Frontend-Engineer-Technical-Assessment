"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatMessage, ChatRequest, ChatResponse, ChatErrorResponse } from "@/types/chat";

const STORAGE_KEY = "ai-chat-history";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed: ChatMessage[] = JSON.parse(stored);
    return parsed;
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const history = loadHistory();
    setMessages(history);
  }, []);

  const sendMessage = useCallback(
    async (prompt: string) => {
      setError(null);
      setIsLoading(true);

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);

      try {
        const requestBody: ChatRequest = {
          prompt,
          history: messages,
        };

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData: ChatErrorResponse = await response.json();
          throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const data: ChatResponse = await response.json();

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: Date.now(),
        };

        const finalMessages = [...updatedMessages, assistantMessage];
        setMessages(finalMessages);
        saveHistory(finalMessages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    dismissError,
  };
}
