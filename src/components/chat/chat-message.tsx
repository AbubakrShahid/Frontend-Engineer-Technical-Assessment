"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";
import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message.content]);

  return (
    <div
      className={cn(
        "group flex w-full gap-3 px-4 py-4 transition-colors",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
          isUser
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
            : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="text-[11px] font-medium text-muted-foreground/60">
            {isUser ? "You" : "Assistant"}
          </span>
          <span className="text-[10px] tabular-nums text-muted-foreground/40">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 shadow-sm",
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
              : "rounded-tl-sm border border-border/40 bg-card text-card-foreground"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          ) : (
            <MarkdownRenderer
              content={message.content}
              className={isStreaming ? "streaming-cursor" : ""}
            />
          )}
        </div>

        {/* Actions */}
        {!isUser && message.content.length > 0 && !isStreaming && (
          <div className="flex items-center gap-1 px-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleCopy}
              className="h-6 w-6 rounded-md"
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
