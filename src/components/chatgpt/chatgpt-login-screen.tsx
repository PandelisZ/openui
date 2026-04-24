import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatGPTMark } from "./chatgpt-mark";

interface ChatGPTLoginScreenProps {
  className?: string;
}

export function ChatGPTLoginScreen({ className }: ChatGPTLoginScreenProps) {
  return (
    <section
      className={cn(
        "grid min-h-screen bg-background md:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)]",
        className,
      )}
    >
      <div className="hidden bg-chat-login p-6 md:flex md:flex-col md:justify-between">
        <ChatGPTMark className="text-orange-600" />
        <p className="max-w-sm text-2xl font-medium leading-tight text-orange-700">
          Write a thank-you note to my interviewer
        </p>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <ChatGPTMark className="md:hidden" />
          <h1 className="text-3xl font-semibold tracking-normal">Get started</h1>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button className="flex-1 bg-chat-auth hover:bg-chat-auth/90">
              Log in
            </Button>
            <Button className="flex-1 bg-chat-auth hover:bg-chat-auth/90">
              Sign up for free
            </Button>
          </div>
        </div>
        <div className="fixed bottom-6 flex items-center gap-3 text-xs text-muted-foreground">
          <ChatGPTMark compact />
          <Button variant="link" size="sm">
            Terms of use
          </Button>
          <span>|</span>
          <Button variant="link" size="sm">
            Privacy policy
          </Button>
        </div>
      </div>
    </section>
  );
}
