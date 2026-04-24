import * as React from "react";
import { ChatGPTComposer } from "./chatgpt-composer";
import { ChatGPTEmptyState } from "./chatgpt-empty-state";
import { ChatGPTHeader } from "./chatgpt-header";
import { ChatGPTSettingsDialog } from "./chatgpt-settings-dialog";
import { ChatGPTShell } from "./chatgpt-shell";
import { ChatGPTSidebar } from "./chatgpt-sidebar";
import { ChatGPTThread } from "./chatgpt-thread";

export function ChatGPTApp() {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [hasMessages, setHasMessages] = React.useState(false);

  const composer = (
    <ChatGPTComposer
      showFootnote={hasMessages}
      onSubmit={() => {
        setHasMessages(true);
      }}
    />
  );

  return (
    <>
      <ChatGPTShell
        sidebar={
          <ChatGPTSidebar
            onOpenSettings={() => setSettingsOpen(true)}
            onToggleSidebar={() => setSidebarCollapsed(true)}
          />
        }
        sidebarCollapsed={sidebarCollapsed}
        header={
          <ChatGPTHeader
            title={hasMessages ? "Shadcn-compatible ChatGPT UI" : undefined}
            showShare={hasMessages}
            showSidebarToggle={sidebarCollapsed}
            onOpenSettings={() => setSettingsOpen(true)}
            onToggleSidebar={() =>
              setSidebarCollapsed((collapsed) => !collapsed)
            }
          />
        }
        composer={hasMessages ? composer : undefined}
      >
        {hasMessages ? (
          <ChatGPTThread />
        ) : (
          <div className="relative flex flex-1 flex-col px-3 pt-[256px]">
            <ChatGPTEmptyState
              className="max-w-[640px] flex-none px-0 py-0"
              showCompanyKnowledge={false}
              showPromptCards={false}
            />
            <div className="mt-11">{composer}</div>
            <p className="absolute bottom-4 left-1/2 w-full max-w-[640px] -translate-x-1/2 px-3 text-center text-[11px] text-muted-foreground">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        )}
      </ChatGPTShell>
      <ChatGPTSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
