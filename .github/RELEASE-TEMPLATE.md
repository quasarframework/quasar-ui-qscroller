<!--
Release drafting notes:
- Lead with changes QScroller users feel in their apps: component behavior, app-extension behavior, public API, styling, compatibility, install, and migration notes.
- Include docs, CodePen, build tooling, dependency, or release-process changes only when they affect package consumers.
- Fixes should include the short commit id.
- Keep the summary short and concrete.
-->

# QScroller v3.0.2

Release date: 2026-08-19

## Summary

QScroller v3.0.2 improves Quasar CLI Vite integration by keeping the UI package out of
Vite dependency optimization. This ensures its Quasar imports use the application's runtime
instance.

## What's Changed

**Features:**

- None.

**Fixes:**

- `7d70356` Exclude the QScroller UI package from Vite dependency optimization when installed
  through the App Extension, preventing a separately optimized Quasar runtime.

**Maintenance:**

- `122229b` Refresh dependencies and the QPress documentation runtime.

## Breaking Changes

- None.

## Compatibility

- Node.js: `>=22.13`
- Quasar: `^2.25.1`
- Quasar App Vite target: `@quasar/app-vite@3.7.0`
- Timestamp package: `@timestamp-js/core@1.0.0`
- npm dist-tag: `latest`

## Installation

```bash
pnpm add @quasar/quasar-ui-qscroller
# or
bun add @quasar/quasar-ui-qscroller
# or
yarn add @quasar/quasar-ui-qscroller
# or
npm install @quasar/quasar-ui-qscroller
# or
quasar ext add @quasar/qscroller
```

## Documentation

- Docs: https://qscroller.netlify.app/
- Installation: https://qscroller.netlify.app/getting-started/installation-types
- Upgrade Guide: https://qscroller.netlify.app/other/upgrade-guide

## Full Changelog

https://github.com/quasarframework/quasar-ui-qscroller/compare/v3.0.1...v3.0.2

## Donations

If QScroller is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64
