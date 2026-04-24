import {
  AppWindow,
  Archive,
  ChevronDown,
  CircleHelp,
  Code2,
  Images,
  MessageSquarePlus,
  MoreHorizontal,
  PanelLeft,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChatGPTMark } from "./chatgpt-mark";
import type { ChatGPTThreadItem } from "./types";

const defaultThreads: ChatGPTThreadItem[] = [
  { id: "1", title: "Design system notes", section: "Today", active: true },
  { id: "2", title: "React streaming layout", section: "Today" },
  { id: "3", title: "Explain radix focus states", section: "Yesterday" },
  { id: "4", title: "Prompt card ideas", section: "Previous 7 days" },
  { id: "5", title: "Model picker behaviors", section: "Previous 7 days" },
  { id: "6", title: "Composer attachment states", section: "Previous 30 days" },
];

interface ChatGPTSidebarProps {
  threads?: ChatGPTThreadItem[];
  className?: string;
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
}

export function ChatGPTSidebar({
  threads = defaultThreads,
  className,
  onOpenSettings,
  onToggleSidebar,
}: ChatGPTSidebarProps) {
  const sections = Array.from(new Set(threads.map((thread) => thread.section)));

  return (
    <aside
      className={cn(
        "flex h-full w-[260px] shrink-0 flex-col border-r bg-sidebar text-[13px] text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex h-[58px] items-center justify-between gap-2 px-4">
        <ChatGPTMark compact />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          aria-label="Collapse sidebar"
        >
          <PanelLeft data-icon="inline-start" />
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 px-1.5">
        <SidebarAction icon={MessageSquarePlus} label="New chat" active />
        <SidebarAction icon={Search} label="Search chats" />
        <SidebarAction icon={Images} label="Images" />
        <SidebarAction icon={AppWindow} label="Apps" />
        <SidebarAction icon={Code2} label="Codex" />
      </div>
      <Separator className="my-3" />
      <ScrollArea className="min-h-0 flex-1 px-1.5">
        <div className="flex flex-col gap-3 pb-4">
          {sections.map((section) => (
            <div key={section} className="flex flex-col gap-0.5">
              <div className="px-2 text-[11.5px] font-medium text-muted-foreground">
                {section}
              </div>
              {threads
                .filter((thread) => thread.section === section)
                .map((thread) => (
                  <button
                    key={thread.id}
                    className={cn(
                      "group flex h-[34px] items-center justify-between gap-2 rounded-lg px-2 text-left text-[13px] font-normal outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring",
                      thread.active &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                    type="button"
                  >
                    <span className="truncate">{thread.title}</span>
                    <MoreHorizontal
                      data-icon="inline-end"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-1.5 border-t p-2 text-[13px]">
        <SidebarAction icon={Archive} label="Archived chats" />
        <SidebarAction icon={CircleHelp} label="Help" />
        <button
          className="flex items-center gap-2 rounded-xl p-2 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring"
          type="button"
          onClick={onOpenSettings}
        >
          <Avatar className="size-7">
            <AvatarFallback>OA</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium">OpenAI UI</span>
            <span className="block truncate text-[11px] text-muted-foreground">
              Component library
            </span>
          </span>
          <ChevronDown data-icon="inline-end" />
        </button>
      </div>
    </aside>
  );
}

interface SidebarActionProps {
  icon: React.ComponentType<{ "data-icon"?: string; className?: string }>;
  label: string;
  badge?: string;
  active?: boolean;
}

function SidebarAction({ icon: Icon, label, badge, active }: SidebarActionProps) {
  return (
    <button
      className={cn(
        "flex h-[34px] items-center gap-2 rounded-lg px-2 text-[13px] font-normal outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:stroke-[1.85]",
        active && "bg-sidebar-accent text-sidebar-accent-foreground",
      )}
      type="button"
    >
      <Icon data-icon="inline-start" />
      <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      {badge && (
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
          {badge}
        </Badge>
      )}
    </button>
  );
}
