# QScroller

[![npm](https://img.shields.io/npm/v/@quasar/quasar-ui-qscroller/beta?label=@quasar/quasar-ui-qscroller)](https://www.npmjs.com/package/@quasar/quasar-ui-qscroller)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-ui-qscroller.svg)](https://www.npmjs.com/package/@quasar/quasar-ui-qscroller)

QScroller provides string, time, date, date-time, and range scrollers for Vue and Quasar applications.

## Install

```bash
pnpm add @quasar/quasar-ui-qscroller@beta
# or
bun add @quasar/quasar-ui-qscroller@beta
# or
yarn add @quasar/quasar-ui-qscroller@beta
# or
npm install @quasar/quasar-ui-qscroller@beta
```

## Quasar CLI Vite

Use the App Extension when you want QScroller registered for the whole app:

```bash
quasar ext add @quasar/qscroller@beta
```

Or register the UI package manually in a boot file:

```ts
import { defineBoot } from "@quasar/app-vite";
import Plugin from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/dist/index.css";

export default defineBoot(({ app }) => {
  app.use(Plugin);
});
```

## Vue 3 Or Vite

```ts
import { createApp } from "vue";
import Plugin from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/dist/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(Plugin);
app.mount("#app");
```

## Component Import

```vue
<style src="@quasar/quasar-ui-qscroller/dist/index.css"></style>

<script setup lang="ts">
import {
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
} from "@quasar/quasar-ui-qscroller";
</script>
```

## UMD

The UMD bundle exposes `window.QScroller`.

Add the QScroller assets after the Quasar assets:

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller@beta/dist/index.min.css"
  rel="stylesheet"
  type="text/css"
/>
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller@beta/dist/index.umd.min.js"></script>
```

Use `dist/index.rtl.min.css` when your app needs the RTL stylesheet.

## Development

```bash
pnpm install
pnpm --filter @quasar/quasar-ui-qscroller build
pnpm --filter @quasar/quasar-ui-qscroller typecheck
```

## Support

If QScroller is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

MIT (c) Jeff Galbraith <jeff@quasar.dev>
