# Components

## App-Level Components

- `ChatGPTApp`: complete demo shell with sidebar, header, home state, thread state, dialogs, and composer.
- `ChatGPTShell`: layout primitive that accepts `sidebar`, `header`, `children`, and optional `composer`.
- `ChatGPTSidebar`: ChatGPT-style navigation rail with grouped thread history and account row.
- `ChatGPTHeader`: model picker, share/menu controls, sync status, and sidebar restore button.
- `ChatGPTLoginScreen`: public get-started/login surface.

## Composer

- `ChatGPTComposer`: prompt input with add-content menu, clickable response-mode dropdown, disabled/send states, and optional footnote.

## Messages

- `ChatGPTThread`: scrollable message timeline with sample data.
- `ChatGPTMessageBubble`: role-aware message frame for user, assistant, and system messages.
- `ChatGPTMessageContent`: renders typed message blocks.
- `ChatGPTAttachmentList`: compact attachment preview chips.
- `ChatGPTSourceList`: source/reference chips.
- `ChatGPTToolCallList`: tool activity cards with queued/running/complete states.
- `ChatGPTThinkingState`: skeleton loading state.

## Settings And Commands

- `ChatGPTSettingsDialog`: tabbed settings dialog using shadcn field/switch patterns.
- `ChatGPTCommandPalette`: compact command/search dialog.

## Types

The package exports these core types:

- `ChatGPTMessage`
- `ChatGPTMessageBlock`
- `ChatGPTAttachment`
- `ChatGPTSource`
- `ChatGPTToolCall`
- `ChatGPTThreadItem`
- `ChatGPTPromptCard`
- `ChatGPTComposerMode`
- `ChatGPTToolOption`

## UI Primitives

OpenUI also exports the local shadcn-style primitives from `src/components/ui`, including `Button`, `Badge`, `Dialog`, `DropdownMenu`, `Tabs`, `Tooltip`, `Card`, `ScrollArea`, `Switch`, and related components.
