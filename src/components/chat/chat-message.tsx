"use client";

import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "group flex w-full gap-3 px-4 py-3 transition-colors hover:bg-muted/30",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-border/50",
          isUser
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
            : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <span className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {isUser ? "You" : "Assistant"}
        </span>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
              : "rounded-tl-sm border border-border/50 bg-card text-card-foreground"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <span className="px-1 text-[10px] tabular-nums text-muted-foreground/50">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
