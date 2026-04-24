# shadcn Registry

The source registry lives in `registry.json`.

Build generated registry artifacts:

```bash
npm run registry:build
```

This writes files to `r/`:

- `r/openui-theme.json`
- `r/openui-chatgpt.json`

After publishing to npm, CDN URLs can be used directly with shadcn:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-chatgpt.json
```

## Registry Items

### `openui-theme`

Type: `registry:style`

Installs OpenUI theme tokens:

- core neutral shadcn tokens
- sidebar tokens
- ChatGPT-specific tokens: `chat-soft`, `chat-login`, `chat-auth`, `chat-voice`, `chat-mode`

### `openui-chatgpt`

Type: `registry:block`

Installs the full ChatGPT component set and local shadcn primitives. It includes dependencies for Radix primitives, lucide icons, CVA, clsx, and tailwind-merge.

## Notes

The registry is intended for existing shadcn projects using Tailwind CSS v4 and a `@/` alias. If a consumer project uses a different alias, run `npx shadcn@latest info --json` in that project and adjust imports after installation as needed.
