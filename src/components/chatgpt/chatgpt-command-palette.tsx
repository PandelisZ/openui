import {
  FileText,
  Search,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ChatGPTCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatGPTCommandPalette({
  open,
  onOpenChange,
}: ChatGPTCommandPaletteProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3 p-3">
        <DialogHeader className="sr-only">
          <DialogTitle>Command palette</DialogTitle>
          <DialogDescription>Search actions and saved chats.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
          <Search data-icon="inline-start" />
          <Input
            className="h-8 border-0 px-0 focus-visible:ring-0"
            placeholder="Search chats and actions"
          />
        </div>
        <div className="flex flex-col gap-1">
          <CommandItem icon={Sparkles} label="New chat" />
          <CommandItem icon={FileText} label="Open library" />
          <CommandItem icon={Settings} label="Open settings" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CommandItemProps {
  icon: LucideIcon;
  label: string;
}

function CommandItem({ icon: Icon, label }: CommandItemProps) {
  return (
    <Button variant="ghost" className="justify-start rounded-lg">
      <Icon data-icon="inline-start" />
      {label}
    </Button>
  );
}
