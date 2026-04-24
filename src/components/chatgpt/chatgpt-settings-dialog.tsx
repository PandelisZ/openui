import { Bell, Database, Palette, Shield, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatGPTSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatGPTSettingsDialog({
  open,
  onOpenChange,
}: ChatGPTSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] gap-3 rounded-2xl p-4 text-[13px]">
        <DialogHeader className="gap-1 pr-8">
          <DialogTitle className="text-[15px] font-semibold leading-5">
            Settings
          </DialogTitle>
          <DialogDescription className="text-[12px] leading-4">
            Component examples for account, personalization, and data controls.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general" className="flex flex-col gap-3">
          <TabsList className="h-8 self-start rounded-full p-0.5">
            <TabsTrigger
              value="general"
              className="gap-1.5 px-2 py-1 text-[12px] [&_svg]:size-3.5"
            >
              <Palette data-icon="inline-start" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="gap-1.5 px-2 py-1 text-[12px] [&_svg]:size-3.5"
            >
              <Database data-icon="inline-start" />
              Data
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-1.5 px-2 py-1 text-[12px] [&_svg]:size-3.5"
            >
              <Shield data-icon="inline-start" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-0">
            <FieldGroup className="gap-2">
              <SettingsSwitch
                label="Always show code"
                description="Prefer code blocks when answering implementation prompts."
              />
              <SettingsSwitch
                label="Compact sidebar"
                description="Reduce thread row spacing for dense navigation."
              />
              <SettingsSwitch
                label="Enable notifications"
                description="Show local notifications for long-running responses."
                icon={Bell}
              />
            </FieldGroup>
          </TabsContent>
          <TabsContent value="data" className="mt-0">
            <FieldGroup className="gap-2">
              <SettingsSwitch
                label="Improve model responses"
                description="Represent the training-data consent row found in account settings."
              />
              <SettingsSwitch
                label="Temporary chats"
                description="Start new chats without saving them in history."
              />
            </FieldGroup>
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <FieldGroup className="gap-2">
              <SettingsSwitch
                label="Multi-factor authentication"
                description="Show a security preference with disabled or enabled state."
              />
            </FieldGroup>
          </TabsContent>
        </Tabs>
        <DialogFooter className="pt-1">
          <Button
            className="h-8 px-3 text-[12px]"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SettingsSwitchProps {
  label: string;
  description: string;
  icon?: LucideIcon;
}

function SettingsSwitch({ label, description, icon: Icon }: SettingsSwitchProps) {
  return (
    <Field className="flex-row items-center justify-between gap-3 rounded-lg border px-3 py-2.5">
      <div className="flex min-w-0 items-start gap-2.5">
        {Icon && (
          <div className="mt-0.5 text-muted-foreground [&_svg]:size-3.5">
            <Icon data-icon="inline-start" />
          </div>
        )}
        <span className="min-w-0 flex flex-col gap-1">
          <FieldLabel className="text-[13px] leading-4">{label}</FieldLabel>
          <FieldDescription className="text-[11.5px] leading-4">
            {description}
          </FieldDescription>
        </span>
      </div>
      <Switch
        aria-label={label}
        className="h-5 w-9 [&>span]:size-4 [&>span]:data-[state=checked]:translate-x-4"
      />
    </Field>
  );
}
