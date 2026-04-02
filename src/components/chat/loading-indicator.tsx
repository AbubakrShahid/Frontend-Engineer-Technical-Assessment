"use client";

import { Bot } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex w-full gap-3 px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm ring-1 ring-border/50">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Assistant
        </span>
        <div className="rounded-2xl rounded-tl-sm border border-border/50 bg-card px-5 py-4 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500/60 animate-bounce [animation-delay:0ms]" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/60 animate-bounce [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/60 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
