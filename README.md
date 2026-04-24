# OpenUI

Shadcn-compatible React components for ChatGPT-style interfaces.

OpenUI ships in two forms:

- An npm package: `@pandelis/openui`
- A shadcn registry artifact for source-owned installs

The component set includes the ChatGPT shell, sidebar, header, composer, messages UI, login screen, settings dialog, command palette, and OpenAI-like theme tokens.

## Install From npm

```bash
npm install @pandelis/openui
```

Import the compiled styles once:

```tsx
import "@pandelis/openui/styles.css";
```

Use the composed app:

```tsx
import { ChatGPTApp } from "@pandelis/openui";

export default function Page() {
  return <ChatGPTApp />;
}
```

Or compose individual surfaces:

```tsx
import {
  ChatGPTComposer,
  ChatGPTHeader,
  ChatGPTShell,
  ChatGPTSidebar,
  ChatGPTThread,
} from "@pandelis/openui";
```

## Install Into shadcn

After publishing to npm, the registry files are available through npm CDNs.

Install the full ChatGPT component set into an existing shadcn project:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-chatgpt.json
```

Install only the theme tokens:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-theme.json
```

The generated registry artifacts are written to `r/` by:

```bash
npm run registry:build
```

## Component Coverage

- Chat shell with collapsible desktop sidebar
- Current ChatGPT-style sidebar: new chat, search, images, apps, Codex, grouped history, account row
- Header with ChatGPT model dropdown, share/menu controls, and sync status state
- Centered home state with compact composer and bottom disclaimer
- Composer with attachment/tools menu, clickable response-mode dropdown, disabled/send states
- Full messages UI: user turns, assistant turns, system separators, structured response blocks, code blocks, tool cards, source chips, attachment previews, response action bar, skeleton thinking state
- Login/get-started screen matching the public ChatGPT layout
- Settings dialog with tabs, fields, switches, data/security surfaces

## Development

```bash
npm install
npm run dev -- --port 5173
npm run build
```

Useful scripts:

```bash
npm run typecheck
npm run build:demo
npm run build:lib
npm run registry:build
npm run pack:dry-run
```

## Documentation

- [Installation](./docs/installation.md)
- [Components](./docs/components.md)
- [shadcn Registry](./docs/shadcn-registry.md)
- [Publishing](./docs/publishing.md)

## Package Contents

- `dist/` compiled ESM package and declarations
- `dist/styles.css` compiled OpenUI styles
- `r/openui-chatgpt.json` shadcn registry item
- `r/openui-theme.json` shadcn theme item
- `registry.json` source registry manifest

## License

MIT
