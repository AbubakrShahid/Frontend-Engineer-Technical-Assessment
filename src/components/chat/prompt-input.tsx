"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Sparkles } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim();
    if (trimmed.length === 0 || isLoading) return;

    onSubmit(trimmed);
    setPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [prompt, isLoading, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
      const target = e.target;
      target.style.height = "auto";
      target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
    },
    []
  );

  return (
    <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isLoading}
            rows={1}
            className="min-h-[48px] max-h-[200px] resize-none rounded-2xl border-border/50 bg-muted/50 pr-4 pl-4 pt-3 text-sm shadow-sm transition-shadow focus:shadow-md focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || prompt.trim().length === 0}
          size="icon-lg"
          className="shrink-0 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 shadow-md shadow-violet-500/25 transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-110 disabled:shadow-none disabled:from-muted disabled:to-muted"
          aria-label="Send message"
        >
          {isLoading ? (
            <Sparkles className="h-4 w-4 animate-pulse" />
          ) : (
            <SendHorizonal className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground/50">
        Press <kbd className="rounded border border-border/50 bg-muted px-1 py-0.5 text-[10px] font-mono">Enter</kbd> to send, <kbd className="rounded border border-border/50 bg-muted px-1 py-0.5 text-[10px] font-mono">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
