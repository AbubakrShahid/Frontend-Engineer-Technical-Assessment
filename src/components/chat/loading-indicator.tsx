"use client";

import { Bot, Sparkles } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex w-full gap-3 px-4 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="px-1 text-[11px] font-medium text-muted-foreground/60">
          Assistant
        </span>
        <div className="rounded-2xl rounded-tl-sm border border-border/40 bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
            <span className="animate-pulse">Thinking</span>
            <span className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
