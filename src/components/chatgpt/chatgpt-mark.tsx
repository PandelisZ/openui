import { cn } from "@/lib/utils";

interface ChatGPTMarkProps {
  className?: string;
  compact?: boolean;
}

export function ChatGPTMark({ className, compact = false }: ChatGPTMarkProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-normal text-foreground",
        className,
      )}
    >
      <OpenAIKnot className={compact ? "size-5" : "size-6"} />
      {!compact && <span>ChatGPT</span>}
    </div>
  );
}

function OpenAIKnot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0 text-current", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.8">
        <path d="M12 4.2c2.1-1.2 4.7.3 4.7 2.7 0 1.1-.6 2.1-1.5 2.7" />
        <path d="M16.9 7.1c2.4 0 3.9 2.6 2.7 4.7-.5 1-1.5 1.5-2.6 1.6" />
        <path d="M19.2 12c1.2 2.1-.3 4.7-2.7 4.7-1.1 0-2.1-.6-2.7-1.5" />
        <path d="M12 19.8c-2.1 1.2-4.7-.3-4.7-2.7 0-1.1.6-2.1 1.5-2.7" />
        <path d="M7.1 16.9c-2.4 0-3.9-2.6-2.7-4.7.5-1 1.5-1.5 2.6-1.6" />
        <path d="M4.8 12C3.6 9.9 5.1 7.3 7.5 7.3c1.1 0 2.1.6 2.7 1.5" />
        <path d="M9.1 8.7 12 7.1l2.9 1.6v3.2L12 13.5l-2.9-1.6z" />
      </g>
    </svg>
  );
}
