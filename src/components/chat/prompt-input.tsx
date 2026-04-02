"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Square } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  onStop: () => void;
  isLoading: boolean;
  isStreaming: boolean;
}

export function PromptInput({
  onSubmit,
  onStop,
  isLoading,
  isStreaming,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim();
    if (trimmed.length === 0 || isLoading || isStreaming) return;

    onSubmit(trimmed);
    setPrompt("");
  }, [prompt, isLoading, isStreaming, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const isBusy = isLoading || isStreaming;

  return (
    <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex items-end gap-2 rounded-2xl border border-border/50 bg-muted/30 p-2 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500/30">
          <TextareaAutosize
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Assistant..."
            disabled={isBusy}
            minRows={1}
            maxRows={6}
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-base leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none disabled:opacity-50"
          />
          {isBusy ? (
            <Button
              onClick={onStop}
              size="icon"
              className="shrink-0 rounded-xl bg-red-500 shadow-md hover:bg-red-600"
              aria-label="Stop generating"
            >
              <Square className="h-4 w-4 fill-current" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={prompt.trim().length === 0}
              size="icon"
              className="shrink-0 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 shadow-md shadow-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-110 disabled:shadow-none disabled:opacity-30"
              aria-label="Send message"
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground/50">
          <span>
            <kbd className="rounded border border-border/30 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">
              Enter
            </kbd>{" "}
            send
          </span>
          <span>
            <kbd className="rounded border border-border/30 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">
              Shift+Enter
            </kbd>{" "}
            new line
          </span>
        </div>
      </div>
    </div>
  );
}
