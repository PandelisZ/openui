import { cn } from "@/lib/utils";

interface ChatGPTShellProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  composer?: React.ReactNode;
  sidebarCollapsed?: boolean;
  className?: string;
}

export function ChatGPTShell({
  sidebar,
  header,
  children,
  composer,
  sidebarCollapsed = false,
  className,
}: ChatGPTShellProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", className)}>
      {!sidebarCollapsed && <div className="hidden md:block">{sidebar}</div>}
      <main className="flex min-w-0 flex-1 flex-col">
        {header}
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {composer && (
          <div className="shrink-0 bg-background px-3 pb-4 pt-2">{composer}</div>
        )}
      </main>
    </div>
  );
}
