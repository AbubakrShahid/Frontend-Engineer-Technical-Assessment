"use client";

import { useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearConversation,
  dismissError,
  toggleSidebar,
  createConversation,
} from "@/store/chat-slice";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { ChatMessage } from "@/components/chat/chat-message";
import { PromptInput } from "@/components/chat/prompt-input";
import { LoadingIndicator } from "@/components/chat/loading-indicator";
import { EmptyState } from "@/components/chat/empty-state";
import { Sidebar } from "@/components/chat/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Trash2,
  X,
  AlertCircle,
  PanelLeftClose,
  PanelLeft,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatContainer() {
  const dispatch = useAppDispatch();
  const { conversations, activeConversationId, isLoading, isStreaming, error, sidebarOpen } =
    useAppSelector((state) => state.chat);
  const { sendMessage, stopStreaming } = useStreamChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isStreaming]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "o") {
        e.preventDefault();
        dispatch(toggleSidebar());
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "n") {
        e.preventDefault();
        dispatch(createConversation());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  const handleClearChat = useCallback(() => {
    dispatch(clearConversation());
  }, [dispatch]);

  const handleDismissError = useCallback(() => {
    dispatch(dismissError());
  }, [dispatch]);

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "shrink-0 border-r border-border/50 transition-all duration-300 ease-in-out overflow-hidden",
          sidebarOpen ? "w-72" : "w-0"
        )}
      >
        <div className="h-full w-72">
          <Sidebar />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col min-w-0 bg-gradient-to-b from-background via-background to-muted/10">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleToggleSidebar}
                className="rounded-lg"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeft className="h-4 w-4" />
                )}
              </Button>

              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold tracking-tight">
                    {activeConversation?.title ?? "AI Chat"}
                  </h1>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {isStreaming ? "Responding..." : "GPT-4o Mini"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => dispatch(createConversation())}
                className="rounded-lg"
                aria-label="New chat"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleClearChat}
                  className="rounded-lg text-muted-foreground hover:text-destructive"
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
          <div className="px-4 pt-3">
            <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3 shadow-sm">
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

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1">
          <div className="mx-auto max-w-3xl py-4">
            {messages.length === 0 && !isLoading ? (
              <EmptyState />
            ) : (
              <>
                {messages.map((message, index) => {
                  const isLastAssistant =
                    message.role === "assistant" &&
                    index === messages.length - 1 &&
                    isStreaming;

                  return (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isStreaming={isLastAssistant}
                    />
                  );
                })}
                {isLoading && <LoadingIndicator />}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <PromptInput
          onSubmit={handleSendMessage}
          onStop={stopStreaming}
          isLoading={isLoading}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
}
