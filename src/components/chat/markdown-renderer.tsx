"use client";

import { useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const language = className?.replace("language-", "") ?? "";

  const handleCopy = useCallback(async () => {
    const text = codeRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group/code relative my-3 overflow-hidden rounded-xl border border-border/50 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-border/30 bg-zinc-100/80 dark:bg-zinc-800/80 px-4 py-1.5">
        <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] text-muted-foreground/60 transition-colors hover:text-foreground hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code ref={codeRef} className={cn("font-mono text-[13px]", className)}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "prose-p:leading-relaxed prose-p:my-1.5",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
        "prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5",
        "prose-strong:font-semibold",
        "prose-a:text-emerald-600 prose-a:underline-offset-2 dark:prose-a:text-emerald-400",
        "prose-blockquote:border-l-emerald-500 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic",
        "prose-table:text-sm prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2",
        "prose-hr:border-border/50",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            return <>{children}</>;
          },
          code({ className: codeClassName, children, ...props }) {
            const isBlock =
              typeof children === "string" && children.includes("\n");

            if (isBlock || codeClassName) {
              return (
                <CodeBlock className={codeClassName}>{children}</CodeBlock>
              );
            }

            return (
              <code
                className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[13px] font-mono text-pink-600 dark:text-pink-400"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
