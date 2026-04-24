import {
  Check,
  Copy,
  MoreHorizontal,
  RefreshCw,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatGPTMark } from "./chatgpt-mark";
import {
  ChatGPTAttachmentList,
  ChatGPTMessageContent,
  ChatGPTSourceList,
  ChatGPTToolCallList,
} from "./chatgpt-message-parts";
import type { ChatGPTMessage } from "./types";

interface ChatGPTMessageBubbleProps {
  message: ChatGPTMessage;
  className?: string;
}

export function ChatGPTMessageBubble({
  message,
  className,
}: ChatGPTMessageBubbleProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  return (
    <article
      className={cn(
        "group flex w-full gap-3 px-4 py-4",
        isUser && "justify-end",
        isSystem && "justify-center py-2",
        className,
      )}
    >
      {isSystem && (
        <div className="rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground">
          {message.content}
        </div>
      )}
      {!isSystem && (
        <>
          {!isUser && (
            <div className="mt-1">
              <ChatGPTMark compact />
            </div>
          )}
          <div
            className={cn(
              "flex max-w-[720px] flex-col gap-3",
              isUser && "items-end",
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-3 text-[14px] leading-6",
                isUser
                  ? "rounded-3xl bg-chat-soft px-4 py-3"
                  : "rounded-none bg-transparent",
              )}
            >
              {message.toolCalls && message.toolCalls.length > 0 && (
                <ChatGPTToolCallList toolCalls={message.toolCalls} />
              )}
              {message.reasoning && (
                <div className="rounded-lg border bg-card p-3 text-sm text-muted-foreground">
                  <div className="mb-1 flex items-center gap-2 font-medium text-foreground">
                    <Check data-icon="inline-start" />
                    Reasoning
                  </div>
                  <p>{message.reasoning}</p>
                </div>
              )}
              <ChatGPTMessageContent
                content={message.content}
                blocks={message.blocks}
              />
              {message.attachments && message.attachments.length > 0 && (
                <ChatGPTAttachmentList attachments={message.attachments} />
              )}
              {message.sources && message.sources.length > 0 && (
                <ChatGPTSourceList sources={message.sources} />
              )}
            </div>
            {!isUser && <MessageActions status={message.status} />}
          </div>
        </>
      )}
    </article>
  );
}

function MessageActions({ status }: { status?: string }) {
  return (
    <div className="flex items-center gap-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
      <Button variant="ghost" size="icon-sm" aria-label="Copy answer">
        <Copy data-icon="inline-start" />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Good response">
        <ThumbsUp data-icon="inline-start" />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Bad response">
        <ThumbsDown data-icon="inline-start" />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Regenerate response">
        <RefreshCw data-icon="inline-start" />
      </Button>
      {status === "edited" && (
        <Button variant="ghost" size="icon-sm" aria-label="View edit history">
          <RotateCcw data-icon="inline-start" />
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" aria-label="More response actions">
        <MoreHorizontal data-icon="inline-start" />
      </Button>
    </div>
  );
}
