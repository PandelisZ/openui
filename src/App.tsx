import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { ChatGPTApp, ChatGPTLoginScreen } from "@/components/chatgpt";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DemoMode = "app" | "login";

function App() {
  const [mode, setMode] = React.useState<DemoMode>("app");
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen">
        <div className="fixed bottom-3 right-3 flex items-center gap-1 rounded-full border bg-background/95 p-1 opacity-0 shadow-sm transition-opacity hover:opacity-100 focus-within:opacity-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={mode === "app" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setMode("app")}
                aria-label="Show chat app"
              >
                <Monitor data-icon="inline-start" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat app</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={mode === "login" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setMode("login")}
                aria-label="Show login screen"
              >
                <Sun data-icon="inline-start" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Login screen</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setDark((value) => !value)}
                aria-label="Toggle theme"
              >
                <Moon data-icon="inline-start" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
        </div>
        {mode === "app" ? <ChatGPTApp /> : <ChatGPTLoginScreen />}
      </div>
    </TooltipProvider>
  );
}

export default App;
