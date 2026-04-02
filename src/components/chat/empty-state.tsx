"use client";

import { Bot, MessageSquare, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Chat naturally with context-aware AI responses",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Powered by OpenAI GPT for instant answers",
  },
  {
    icon: Shield,
    title: "Persistent History",
    description: "Your conversations are saved across sessions",
  },
];

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-600/10 ring-1 ring-emerald-500/20">
          <Bot className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
          <Zap className="h-3.5 w-3.5 text-white" />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold tracking-tight">
        How can I help you today?
      </h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        Start a conversation by typing a message below. I can help with
        questions, creative writing, analysis, and much more.
      </p>

      <div className="mt-10 grid w-full max-w-lg grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-2.5 rounded-2xl border border-border/50 bg-card/50 p-5 shadow-sm transition-colors hover:bg-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <feature.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-semibold">{feature.title}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {feature.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
