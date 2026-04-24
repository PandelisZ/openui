import {
  Check,
  Clock3,
  Copy,
  ExternalLink,
  File,
  Image,
  LoaderCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  ChatGPTAttachment,
  ChatGPTMessageBlock,
  ChatGPTSource,
  ChatGPTToolCall,
} from "./types";

interface ChatGPTMessageContentProps {
  content: string;
  blocks?: ChatGPTMessageBlock[];
}

export function ChatGPTMessageContent({
  content,
  blocks,
}: ChatGPTMessageContentProps) {
  const renderableBlocks =
    blocks && blocks.length > 0 ? blocks : [{ type: "paragraph" as const, text: content }];

  return (
    <div className="flex flex-col gap-4">
      {renderableBlocks.map((block, index) => (
        <MessageBlock key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function MessageBlock({ block }: { block: ChatGPTMessageBlock }) {
  if (block.type === "heading") {
    return <h2 className="text-base font-semibold leading-6">{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul className="flex list-disc flex-col gap-1 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "steps") {
    return (
      <ol className="flex flex-col gap-3">
        {block.items.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
            <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-medium">{item.title}</span>
              <span className="block text-muted-foreground">{item.description}</span>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "code") {
    return <ChatGPTCodeBlock block={block} />;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-l-2 pl-4 text-muted-foreground">
        {block.text}
      </blockquote>
    );
  }

  return <p className="whitespace-pre-wrap">{block.text}</p>;
}

function ChatGPTCodeBlock({
  block,
}: {
  block: Extract<ChatGPTMessageBlock, { type: "code" }>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
      <div className="flex h-10 items-center justify-between gap-2 border-b bg-muted px-3 text-xs text-muted-foreground">
        <span className="min-w-0 truncate">
          {block.filename ?? block.language}
        </span>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Copy data-icon="inline-start" />
          Copy
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-5">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

export function ChatGPTAttachmentList({
  attachments,
}: {
  attachments: ChatGPTAttachment[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((attachment) => (
        <span
          key={attachment.id}
          className="inline-flex max-w-72 items-center gap-2 rounded-2xl border bg-background px-3 py-2 text-xs shadow-sm"
        >
          <AttachmentIcon kind={attachment.kind} />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{attachment.name}</span>
            <span className="block truncate text-muted-foreground">
              {attachment.preview ?? attachment.meta}
            </span>
          </span>
          <Badge variant="muted">{attachment.kind}</Badge>
        </span>
      ))}
    </div>
  );
}

function AttachmentIcon({ kind }: { kind: ChatGPTAttachment["kind"] }) {
  const Icon = kind === "image" ? Image : File;

  return (
    <span className="flex size-8 items-center justify-center rounded-lg bg-muted [&_svg]:size-4">
      <Icon data-icon="inline-start" />
    </span>
  );
}

export function ChatGPTSourceList({ sources }: { sources: ChatGPTSource[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => (
        <Button
          key={source.id}
          variant="outline"
          size="sm"
          className="h-8 max-w-64 justify-start rounded-full px-3"
        >
          <span className="truncate">{source.title}</span>
          {source.meta && (
            <span className="text-muted-foreground">{source.meta}</span>
          )}
          <ExternalLink data-icon="inline-end" />
        </Button>
      ))}
    </div>
  );
}

export function ChatGPTToolCallList({ toolCalls }: { toolCalls: ChatGPTToolCall[] }) {
  return (
    <div className="flex flex-col gap-2">
      {toolCalls.map((toolCall) => (
        <ToolCallCard key={toolCall.id} toolCall={toolCall} />
      ))}
    </div>
  );
}

function ToolCallCard({ toolCall }: { toolCall: ChatGPTToolCall }) {
  const Icon = toolCall.icon ?? Clock3;

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="flex-row items-start gap-3 p-3 pb-2">
        <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-muted [&_svg]:size-4">
          <Icon data-icon="inline-start" />
        </span>
        <span className="min-w-0 flex-1">
          <CardTitle className="text-sm">{toolCall.title}</CardTitle>
          {toolCall.description && (
            <CardDescription>{toolCall.description}</CardDescription>
          )}
        </span>
        <ToolCallStatus status={toolCall.status} />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full bg-primary",
              toolCall.status === "queued" && "w-1/5 opacity-50",
              toolCall.status === "running" && "w-2/3",
              toolCall.status === "complete" && "w-full",
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ToolCallStatus({ status }: { status: ChatGPTToolCall["status"] }) {
  if (status === "running") {
    return (
      <Badge variant="secondary">
        <LoaderCircle data-icon="inline-start" className="animate-spin" />
        Running
      </Badge>
    );
  }

  if (status === "complete") {
    return (
      <Badge variant="secondary">
        <Check data-icon="inline-start" />
        Done
      </Badge>
    );
  }

  return <Badge variant="muted">Queued</Badge>;
}
