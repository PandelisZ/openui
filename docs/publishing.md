# Publishing

Package name:

```text
@pandelis/openui
```

## Preflight

Run:

```bash
npm install
npm run build
npm run pack:dry-run
```

Check that the package contains:

- `dist/index.js`
- `dist/index.d.ts`
- `dist/styles.css`
- `r/openui-chatgpt.json`
- `r/openui-theme.json`
- `registry.json`
- `README.md`
- `LICENSE`

## Publish

The package is configured for public scoped publishing:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

Publish when ready:

```bash
npm publish
```

Publishing is an external action that changes npm state. Run it manually after reviewing the dry-run output.

## After Publish

Verify npm package install:

```bash
npm install @pandelis/openui
```

Verify shadcn registry install:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-chatgpt.json
```
