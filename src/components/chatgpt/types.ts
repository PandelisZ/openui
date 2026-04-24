import type { LucideIcon } from "lucide-react";

export type ChatGPTMessageRole = "assistant" | "user" | "system";

export interface ChatGPTThreadItem {
  id: string;
  title: string;
  section: string;
  active?: boolean;
  meta?: string;
}

export interface ChatGPTAttachment {
  id: string;
  name: string;
  kind: "document" | "image" | "data" | "link";
  meta?: string;
  preview?: string;
}

export type ChatGPTMessageBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "steps";
      items: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      type: "code";
      code: string;
      language: string;
      filename?: string;
    }
  | {
      type: "quote";
      text: string;
    };

export interface ChatGPTSource {
  id: string;
  title: string;
  meta?: string;
}

export interface ChatGPTToolCall {
  id: string;
  title: string;
  description?: string;
  status: "queued" | "running" | "complete";
  icon?: LucideIcon;
}

export interface ChatGPTMessage {
  id: string;
  role: ChatGPTMessageRole;
  content: string;
  author?: string;
  timestamp?: string;
  status?: string;
  reasoning?: string;
  attachments?: ChatGPTAttachment[];
  blocks?: ChatGPTMessageBlock[];
  sources?: ChatGPTSource[];
  toolCalls?: ChatGPTToolCall[];
}

export interface ChatGPTPromptCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ChatGPTToolOption {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}

export interface ChatGPTComposerMode {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}
