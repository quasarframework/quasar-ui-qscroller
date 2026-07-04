---
title: Upgrade Guide
desc: Upgrade to QScroller v3
keys: other
related:
  - /getting-started/installation-types
  - /developing/qscroller
---

QScroller v3 modernizes the package for Vue 3, Quasar v2, `@quasar/app-vite` v3, and ESM-first
tooling.

## Requirements

- Vue 3 and Quasar v2.
- Quasar CLI Vite with `@quasar/app-vite` >=3.0.0-rc.6 for the App Extension.
- Node.js 22.13 or newer.
- pnpm 11.5 or newer when working in this repository.

## Timestamp Utilities

QScroller v3 no longer publishes the old QScroller-owned Timestamp utility as a public import. Date and time helpers have moved to the standalone, framework-agnostic `@timestamp-js/core` package.

If your application imported Timestamp helpers from QScroller, add `@timestamp-js/core` as a direct dependency and update those imports:

```bash
pnpm add @timestamp-js/core
```

```ts
import { parseTimestamp, today } from '@timestamp-js/core'
```

This is a breaking change for applications that used QScroller's previous Timestamp export surface directly. QScroller components continue to manage their own date/time model behavior internally.

## Update Packages

For Quasar App Extension installs:

```bash
quasar ext add @quasar/qscroller
```

For direct UI package installs:

```tabs
<<| bash pnpm |>>
pnpm add @quasar/quasar-ui-qscroller
<<| bash bun |>>
bun add @quasar/quasar-ui-qscroller
<<| bash yarn |>>
yarn add @quasar/quasar-ui-qscroller
<<| bash npm |>>
npm install @quasar/quasar-ui-qscroller
```

## Import Changes

Use the package entrypoint instead of old source-file imports:

```ts [twoslash minheight=6rem]
import { QScroller } from '@quasar/quasar-ui-qscroller'

QScroller
// ^?
```

Import the component stylesheet alongside the component:

```ts
import '@quasar/quasar-ui-qscroller/dist/index.css'
```

Do not import legacy source paths such as `src/index.sass` or component implementation files. Those
paths belonged to the old package layout and may change without warning.

## Build Output

QScroller v3 publishes ESM and UMD builds. CommonJS entrypoints have been removed to match the
modern Quasar and Vite ecosystem.

## Component Imports

The dedicated scroller components remain available from the package entrypoint, including
`QStringScroller`, `QTimeScroller`, `QDateScroller`, `QDateTimeScroller`, and the range scrollers.
