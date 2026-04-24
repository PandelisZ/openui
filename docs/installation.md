# Installation

OpenUI supports npm package usage and shadcn source-owned installation.

## npm

```bash
npm install @pandelis/openui
```

Import styles once near your app root:

```tsx
import "@pandelis/openui/styles.css";
```

Then import components:

```tsx
import { ChatGPTApp } from "@pandelis/openui";
```

The npm package externalizes React and React DOM as peer dependencies. Radix primitives, lucide icons, and class utilities are package dependencies.

## shadcn

Install into an existing shadcn project:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-chatgpt.json
```

Install only the theme tokens:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-theme.json
```

The shadcn install mode copies editable source files into the consumer project. This is the preferred mode when you want to customize the ChatGPT UI deeply.

## Local Registry Testing

Build registry artifacts:

```bash
npm run registry:build
```

Then install from the generated local file in another test project:

```bash
npx shadcn@latest add /absolute/path/to/openai-ui/r/openui-chatgpt.json
```
