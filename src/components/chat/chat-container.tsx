"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { ChatMessage } from "@/components/chat/chat-message";
import { PromptInput } from "@/components/chat/prompt-input";
import { LoadingIndicator } from "@/components/chat/loading-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Trash2, X, AlertCircle } from "lucide-react";

export function ChatContainer() {
  const { messages, isLoading, error, sendMessage, clearChat, dismissError } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">AI Chat Assistant</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Powered by OpenAI
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="gap-1.5 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Chat
          </Button>
        )}
      </header>

      {/* Error Banner */}
      {error && (
        <div className="px-6 pt-3">
          <Alert variant="destructive" className="relative">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="pr-8">{error}</AlertDescription>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={dismissError}
              className="absolute right-2 top-2"
              aria-label="Dismiss error"
            >
              <X className="h-3 w-3" />
            </Button>
          </Alert>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="mx-auto max-w-3xl">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">
                How can I help you today?
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Type a message below to start a conversation with the AI
                assistant. Your chat history will be saved locally.
              </p>
            </div>
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
      <PromptInput onSubmit={sendMessage} isLoading={isLoading} />
    </div>
  );
}
