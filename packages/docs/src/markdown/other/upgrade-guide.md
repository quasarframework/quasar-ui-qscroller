---
title: Upgrade Guide
desc: Upgrade to QScroller v3
keys: other
related:
  - /getting-started/installation-types
  - /developing/using-qscroller
---

QScroller v3 modernizes the package for Vue 3, Quasar v2, `@quasar/app-vite` v3, and ESM-first
tooling.

## Requirements

- Vue 3 and Quasar v2.
- Quasar CLI Vite with `@quasar/app-vite` v3 beta for the App Extension.
- Node.js 22.13 or newer.
- pnpm 11.4 or newer when working in this repository.

## Update Packages

For Quasar App Extension installs:

```bash
quasar ext add @quasar/qscroller@beta
```

For direct UI package installs:

```bash
pnpm add @quasar/quasar-ui-qscroller@beta
# or
bun add @quasar/quasar-ui-qscroller@beta
# or
yarn add @quasar/quasar-ui-qscroller@beta
# or
npm install @quasar/quasar-ui-qscroller@beta
```

## Import Changes

Use the package entrypoint instead of old source-file imports:

```ts [twoslash]
import { QScroller } from "@quasar/quasar-ui-qscroller";

QScroller
// ^?
```

Import the component stylesheet alongside the component:

```ts
import "@quasar/quasar-ui-qscroller/dist/index.css";
```

Do not import legacy source paths such as `src/index.sass` or component implementation files. Those
paths belonged to the old package layout and may change without warning.

## Build Output

QScroller v3 publishes ESM and UMD builds. CommonJS entrypoints have been removed to match the
modern Quasar and Vite ecosystem.

## Component Imports

The dedicated scroller components remain available from the package entrypoint, including
`QStringScroller`, `QTimeScroller`, `QDateScroller`, `QDateTimeScroller`, and the range scrollers.
