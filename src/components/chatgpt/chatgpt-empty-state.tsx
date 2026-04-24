import { Code2, Image, Lightbulb, Network, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatGPTPromptCard } from "./types";

const defaultPrompts: ChatGPTPromptCard[] = [
  {
    id: "write",
    title: "Draft",
    description: "Turn rough notes into polished writing",
    icon: PenLine,
  },
  {
    id: "code",
    title: "Code",
    description: "Explain, debug, or generate an implementation",
    icon: Code2,
  },
  {
    id: "image",
    title: "Create",
    description: "Explore an image, storyboard, or visual direction",
    icon: Image,
  },
  {
    id: "think",
    title: "Think",
    description: "Compare options and reason through tradeoffs",
    icon: Lightbulb,
  },
];

interface ChatGPTEmptyStateProps {
  className?: string;
  prompts?: ChatGPTPromptCard[];
  greeting?: string;
  showCompanyKnowledge?: boolean;
  showPromptCards?: boolean;
}

export function ChatGPTEmptyState({
  className,
  prompts = defaultPrompts,
  greeting = "Ready when you are.",
  showCompanyKnowledge = true,
  showPromptCards = true,
}: ChatGPTEmptyStateProps) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-4 py-10",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-[27px] font-normal leading-tight tracking-normal sm:text-[28px]">
          {greeting}
        </h1>
      </div>
      {showPromptCards && (
        <div className="grid gap-2 sm:grid-cols-2">
          {prompts.map((prompt) => (
            <Button
              key={prompt.id}
              variant="outline"
              className="h-auto justify-start rounded-2xl px-4 py-3 text-left"
            >
              <prompt.icon data-icon="inline-start" />
              <span className="min-w-0">
                <span className="block font-medium">{prompt.title}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {prompt.description}
                </span>
              </span>
            </Button>
          ))}
        </div>
      )}
      {showCompanyKnowledge && (
        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full">
            <Network data-icon="inline-start" />
            Company knowledge
          </Button>
        </div>
      )}
    </section>
  );
}
