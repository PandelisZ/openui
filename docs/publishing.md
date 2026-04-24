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

## GitHub Actions Artifact

Every push to `main`, pull request, tag beginning with `v`, or manual workflow dispatch runs `.github/workflows/build.yml`.

The workflow:

- installs dependencies with `npm ci`
- runs `npm run build`
- runs `npm run pack:dry-run`
- creates an npm `.tgz` with `npm pack`
- uploads an `openui-compiled-<sha>` artifact containing `dist/`, `r/`, docs, metadata, and the tarball

## GitHub Pages Demo

The `.github/workflows/pages.yml` workflow deploys the Vite demo to GitHub Pages on every push to `main` and on manual dispatch.

The demo build uses:

```bash
npm run build:pages
```

That script builds to `dist-pages/` with Vite's base path set to `/openui/`, so assets resolve correctly at:

```text
https://pandelisz.github.io/openui/
```

## After Publish

Verify npm package install:

```bash
npm install @pandelis/openui
```

Verify shadcn registry install:

```bash
npx shadcn@latest add https://unpkg.com/@pandelis/openui@latest/r/openui-chatgpt.json
```
