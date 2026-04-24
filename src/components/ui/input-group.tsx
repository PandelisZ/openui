import * as React from "react";
import { cn } from "@/lib/utils";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full items-end gap-2 rounded-[1.75rem] border border-input bg-background p-2 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring",
      className,
    )}
    {...props}
  />
));
InputGroup.displayName = "InputGroup";

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-11 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
InputGroupTextarea.displayName = "InputGroupTextarea";

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-1", className)}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";

export { InputGroup, InputGroupAddon, InputGroupTextarea };
