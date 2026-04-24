import * as React from "react";
import {
  ArrowUp,
  BrainCircuit,
  Camera,
  ChevronDown,
  FileText,
  Globe,
  Lightbulb,
  Paperclip,
  Plus,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import type { ChatGPTComposerMode, ChatGPTToolOption } from "./types";

const defaultTools: ChatGPTToolOption[] = [
  {
    id: "search",
    label: "Search the web",
    description: "Find current information.",
    icon: Globe,
  },
  {
    id: "canvas",
    label: "Work with canvas",
    description: "Create a side-by-side draft.",
    icon: FileText,
  },
  {
    id: "vision",
    label: "Analyze images",
    description: "Add photos or screenshots.",
    icon: Camera,
  },
];

const defaultModes: ChatGPTComposerMode[] = [
  {
    id: "auto",
    label: "Auto",
    description: "Let ChatGPT choose the right amount of reasoning.",
    icon: Sparkles,
  },
  {
    id: "thinking",
    label: "Thinking",
    description: "Spend more time working through the answer.",
    icon: BrainCircuit,
  },
  {
    id: "quick",
    label: "Quick answer",
    description: "Prioritize short, direct responses.",
    icon: Lightbulb,
  },
];

interface ChatGPTComposerProps {
  className?: string;
  disabled?: boolean;
  defaultModeId?: string;
  modes?: ChatGPTComposerMode[];
  placeholder?: string;
  showFootnote?: boolean;
  tools?: ChatGPTToolOption[];
  onModeChange?: (mode: ChatGPTComposerMode) => void;
  onSubmit?: (value: string) => void;
}

export function ChatGPTComposer({
  className,
  defaultModeId = "thinking",
  disabled,
  modes = defaultModes,
  placeholder = "Ask anything",
  showFootnote = true,
  tools = defaultTools,
  onModeChange,
  onSubmit,
}: ChatGPTComposerProps) {
  const [value, setValue] = React.useState("");
  const [modeId, setModeId] = React.useState(defaultModeId);
  const canSubmit = value.trim().length > 0 && !disabled;
  const selectedMode = modes.find((mode) => mode.id === modeId) ?? modes[0];

  function handleModeChange(nextModeId: string) {
    const nextMode = modes.find((mode) => mode.id === nextModeId);
    if (!nextMode) return;
    setModeId(nextModeId);
    onModeChange?.(nextMode);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(value.trim());
    setValue("");
  }

  return (
    <form className={cn("w-full", className)} onSubmit={handleSubmit}>
      <InputGroup className="mx-auto min-h-[96px] max-w-[640px] flex-col items-stretch gap-1.5 rounded-[1.65rem] px-3 py-2 shadow-lg focus-within:ring-0">
        <InputGroupTextarea
          aria-label="Message"
          className="min-h-8 px-1 py-1.5 text-[15px] leading-6"
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <div className="flex items-center justify-between gap-2">
          <InputGroupAddon>
            <ComposerToolMenu tools={tools} />
            <ComposerModeMenu
              modeId={selectedMode?.id}
              modes={modes}
              onModeChange={handleModeChange}
            />
          </InputGroupAddon>
          <InputGroupAddon>
            {canSubmit ? (
              <Button size="icon-sm" type="submit" aria-label="Send message">
                <ArrowUp data-icon="inline-start" />
              </Button>
            ) : (
              <Button
                className="bg-chat-voice/55 text-primary/70 hover:bg-chat-voice/70"
                size="icon-sm"
                type="button"
                disabled={disabled}
                aria-disabled
                aria-label="Send message unavailable"
              >
                <ArrowUp data-icon="inline-start" />
              </Button>
            )}
          </InputGroupAddon>
        </div>
      </InputGroup>
      {showFootnote && (
        <p className="mx-auto mt-2 max-w-[640px] px-3 text-center text-[11px] text-muted-foreground">
          ChatGPT can make mistakes. Check important info.
        </p>
      )}
    </form>
  );
}

interface ComposerModeMenuProps {
  modeId?: string;
  modes: ChatGPTComposerMode[];
  onModeChange: (modeId: string) => void;
}

function ComposerModeMenu({
  modeId,
  modes,
  onModeChange,
}: ComposerModeMenuProps) {
  const selectedMode = modes.find((mode) => mode.id === modeId) ?? modes[0];
  const SelectedIcon = selectedMode?.icon ?? BrainCircuit;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 gap-1.5 px-2 text-[13px] font-normal text-chat-mode hover:text-chat-mode [&_svg]:size-[16px]"
          variant="ghost"
          size="sm"
          type="button"
        >
          <SelectedIcon data-icon="inline-start" />
          {selectedMode?.label ?? "Thinking"}
          <ChevronDown data-icon="inline-end" className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[232px] rounded-2xl p-1.5">
        <DropdownMenuLabel className="px-2 py-1 text-[11px] font-medium text-muted-foreground">
          Response mode
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={modeId} onValueChange={onModeChange}>
          {modes.map((mode) => (
            <DropdownMenuRadioItem
              key={mode.id}
              value={mode.id}
              className="items-start rounded-xl py-2 pl-7 pr-2 text-[13px]"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-medium leading-5">{mode.label}</span>
                {mode.description && (
                  <span className="text-[11.5px] leading-4 text-muted-foreground">
                    {mode.description}
                  </span>
                )}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ComposerToolMenu({ tools }: { tools: ChatGPTToolOption[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" type="button" aria-label="Add content">
          <Plus data-icon="inline-start" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Add to prompt</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Paperclip data-icon="inline-start" />
            Upload file
          </DropdownMenuItem>
          {tools.map((tool) => (
            <DropdownMenuItem key={tool.id} className="items-start">
              <tool.icon data-icon="inline-start" className="mt-0.5" />
              <span className="flex flex-col gap-1">
                <span>{tool.label}</span>
                {tool.description && (
                  <span className="text-xs text-muted-foreground">
                    {tool.description}
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SlidersHorizontal data-icon="inline-start" />
          More tools
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
