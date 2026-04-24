import { Code2, FileSearch, LoaderCircle, Palette } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChatGPTMessageBubble } from "./chatgpt-message";
import type { ChatGPTMessage } from "./types";

const sampleMessages: ChatGPTMessage[] = [
  {
    id: "system-1",
    role: "system",
    content: "Today at 10:42",
  },
  {
    id: "1",
    role: "user",
    content:
      "Create a shadcn-compatible component set for a ChatGPT-style UI, including the message view.",
    attachments: [
      {
        id: "a1",
        name: "component-coverage.md",
        kind: "document",
        meta: "18 KB",
        preview: "coverage outline",
      },
      {
        id: "a2",
        name: "composer-reference.png",
        kind: "image",
        meta: "1440 x 900",
        preview: "screenshot",
      },
    ],
  },
  {
    id: "2",
    role: "assistant",
    content: "Built the core surfaces and expanded the messages UI.",
    reasoning:
      "The message view needs reusable primitives for conversation turns, not just one static bubble. I split display concerns into typed content blocks, attachment chips, source chips, code blocks, and tool-call cards.",
    toolCalls: [
      {
        id: "tool-1",
        title: "Inspected local component structure",
        description: "Read the current thread, message, and type files.",
        status: "complete",
        icon: FileSearch,
      },
      {
        id: "tool-2",
        title: "Matched visual density",
        description: "Adjusted spacing to sit near the current ChatGPT message surface.",
        status: "complete",
        icon: Palette,
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Here is the message component layer added to the library. It keeps the ChatGPT shell simple while giving consumers enough structure to render realistic conversation states.",
      },
      {
        type: "heading",
        text: "Covered message states",
      },
      {
        type: "list",
        items: [
          "right-aligned user turns with optional attachments",
          "assistant turns with reasoning, tool activity, blocks, code, and source chips",
          "system separators for date or status changes",
          "loading skeletons for active responses",
          "hover action bars for copy, feedback, regenerate, and more actions",
        ],
      },
      {
        type: "code",
        language: "tsx",
        filename: "message-example.tsx",
        code: `import { ChatGPTThread } from "@/components/chatgpt";

export function MessagesPreview() {
  return <ChatGPTThread isThinking />;
}`,
      },
    ],
    sources: [
      {
        id: "source-1",
        title: "shadcn config",
        meta: "radix",
      },
      {
        id: "source-2",
        title: "ChatGPT visual pass",
        meta: "local",
      },
    ],
  },
  {
    id: "3",
    role: "user",
    content: "Can you also include the detailed assistant response layout?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Yes. The response can combine prose, steps, code, source chips, and tool status cards without consumers needing to parse markdown.",
    status: "edited",
    toolCalls: [
      {
        id: "tool-3",
        title: "Generating component preview",
        description: "Rendering message examples with all optional regions.",
        status: "running",
        icon: Code2,
      },
    ],
    blocks: [
      {
        type: "steps",
        items: [
          {
            title: "Start with a message object",
            description: "Choose a role and provide text, blocks, or both.",
          },
          {
            title: "Attach structured regions",
            description: "Add reasoning, files, sources, and tool calls as separate props.",
          },
          {
            title: "Let the component compose the UI",
            description: "The message surface handles density, alignment, and action affordances.",
          },
        ],
      },
      {
        type: "quote",
        text: "Structured message blocks are easier to theme and test than treating every response as markdown.",
      },
    ],
  },
];

interface ChatGPTThreadProps {
  messages?: ChatGPTMessage[];
  isThinking?: boolean;
  className?: string;
}

export function ChatGPTThread({
  messages = sampleMessages,
  isThinking,
  className,
}: ChatGPTThreadProps) {
  return (
    <ScrollArea className={cn("min-h-0 flex-1", className)}>
      <div className="mx-auto flex w-full max-w-[880px] flex-col py-3 pb-44">
        {messages.map((message) => (
          <ChatGPTMessageBubble key={message.id} message={message} />
        ))}
        {isThinking && <ChatGPTThinkingState />}
      </div>
    </ScrollArea>
  );
}

export function ChatGPTThinkingState() {
  return (
    <div className="flex gap-3 px-4 py-5">
      <div className="flex size-8 items-center justify-center rounded-full border bg-background">
        <LoaderCircle data-icon="inline-start" className="animate-spin" />
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
