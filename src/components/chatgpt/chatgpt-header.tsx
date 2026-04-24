import {
  Check,
  ChevronDown,
  CircleDashed,
  Menu,
  MoreHorizontal,
  PanelLeft,
  Settings,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ChatGPTHeaderProps {
  className?: string;
  model?: string;
  title?: string;
  showShare?: boolean;
  showSidebarToggle?: boolean;
  onToggleSidebar?: () => void;
  onOpenSettings?: () => void;
}

export function ChatGPTHeader({
  className,
  model = "ChatGPT",
  title,
  showShare = true,
  showSidebarToggle = false,
  onToggleSidebar,
  onOpenSettings,
}: ChatGPTHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center justify-between gap-2 bg-background px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(!showSidebarToggle && "md:hidden")}
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
        >
          {showSidebarToggle ? (
            <PanelLeft data-icon="inline-start" />
          ) : (
            <Menu data-icon="inline-start" />
          )}
        </Button>
        <ModelMenu model={model} />
        {title && (
          <span className="hidden truncate text-sm text-muted-foreground sm:block">
            {title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {showShare && (
          <Button variant="outline" size="sm">
            <Share data-icon="inline-start" />
            Share
          </Button>
        )}
        {showShare ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Conversation menu">
                <MoreHorizontal data-icon="inline-start" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={onOpenSettings}>
                  <Settings data-icon="inline-start" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Rename chat</DropdownMenuItem>
                <DropdownMenuItem>Archive chat</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon-sm" aria-label="Sync status">
            <CircleDashed data-icon="inline-start" />
          </Button>
        )}
      </div>
    </header>
  );
}

function ModelMenu({ model }: { model: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="max-w-40 px-0 text-lg">
          <span className="truncate font-semibold">{model}</span>
          <ChevronDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px] rounded-2xl p-2">
        <DropdownMenuLabel>Latest</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="items-start text-[14px]">
            <span className="flex min-w-0 flex-col gap-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-medium">Instant</span>
                <Check data-icon="inline-end" />
              </span>
              <span className="text-xs text-muted-foreground">
                For everyday chats.
              </span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="items-start text-[14px]">
            <span className="flex min-w-0 flex-col gap-1">
              <span className="font-medium">Thinking</span>
              <span className="text-xs text-muted-foreground">
                For complex questions.
              </span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="items-start text-[14px]">
            <span className="flex min-w-0 flex-col gap-1">
              <span className="font-medium">Pro</span>
              <span className="text-xs text-muted-foreground">
                Research-grade intelligence.
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configure...</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
