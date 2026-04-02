"use client";

import { useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage, addUserMessage, clearChat, dismissError } from "@/store/chat-slice";
import { ChatMessage } from "@/components/chat/chat-message";
import { PromptInput } from "@/components/chat/prompt-input";
import { LoadingIndicator } from "@/components/chat/loading-indicator";
import { EmptyState } from "@/components/chat/empty-state";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bot, Trash2, X, AlertCircle, MessageSquare } from "lucide-react";

export function ChatContainer() {
  const dispatch = useAppDispatch();
  const { messages, isLoading, error } = useAppSelector((state) => state.chat);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(
    (prompt: string) => {
      dispatch(addUserMessage(prompt));
      dispatch(sendMessage(prompt));
    },
    [dispatch]
  );

  const handleClearChat = useCallback(() => {
    dispatch(clearChat());
  }, [dispatch]);

  const handleDismissError = useCallback(() => {
    dispatch(dismissError());
  }, [dispatch]);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
                <Bot className="h-5 w-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">AI Chat Assistant</h1>
              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Powered by OpenAI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <div className="mr-2 flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs tabular-nums text-muted-foreground">
                  {messages.length}
                </span>
              </div>
            )}
            <ThemeToggle />
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearChat}
                className="rounded-full text-muted-foreground hover:text-destructive"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="mx-auto w-full max-w-4xl px-4 pt-3">
          <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="flex-1 text-sm text-destructive">{error}</p>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleDismissError}
              className="shrink-0 text-destructive/60 hover:text-destructive"
              aria-label="Dismiss error"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="mx-auto max-w-3xl py-4">
          {messages.length === 0 && !isLoading ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <PromptInput onSubmit={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
