"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createConversation,
  setActiveConversation,
  deleteConversation,
} from "@/store/chat-slice";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  MessageSquare,
  Trash2,
  Bot,
} from "lucide-react";

function formatRelativeDate(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function Sidebar() {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector((state) => state.chat?.conversations ?? []);
  const activeConversationId = useAppSelector((state) => state.chat?.activeConversationId ?? null);

  const handleNewChat = useCallback(() => {
    dispatch(createConversation());
  }, [dispatch]);

  const handleSelectConversation = useCallback(
    (id: string) => {
      dispatch(setActiveConversation(id));
    },
    [dispatch]
  );

  const handleDeleteConversation = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      dispatch(deleteConversation(id));
    },
    [dispatch]
  );

  return (
    <div className="flex h-full flex-col bg-muted/30 dark:bg-muted/10">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <Bot className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold">Chats</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleNewChat}
          className="rounded-lg"
          aria-label="New chat"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="flex flex-col gap-0.5">
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId;
            const hasMessages = conversation.messages.length > 0;
            const messageCount = conversation.messages.length;

            return (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={cn(
                  "group relative flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                  isActive
                    ? "bg-background shadow-sm ring-1 ring-border/50"
                    : "hover:bg-background/50"
                )}
              >
                <MessageSquare
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    isActive
                      ? "text-emerald-500"
                      : "text-muted-foreground/50"
                  )}
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm",
                      isActive ? "font-medium" : "text-muted-foreground"
                    )}
                  >
                    {conversation.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground/50">
                    <span>{formatRelativeDate(conversation.updatedAt)}</span>
                    {hasMessages && (
                      <>
                        <span>·</span>
                        <span>
                          {messageCount} msg{messageCount !== 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={(e) =>
                    handleDeleteConversation(e, conversation.id)
                  }
                  className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </Button>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="border-t border-border/50 px-4 py-3">
        <p className="text-[10px] text-center text-muted-foreground/40">
          {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
