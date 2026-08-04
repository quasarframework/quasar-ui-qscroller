---
title: Installation Types
desc: How to install QScroller
keys: Getting Started
related:
  - /getting-started/introduction
  - /developing/qscroller
---

QScroller can be installed as a Quasar App Extension, as a Vue plugin, as a direct component import, or through the UMD bundle.

## Recommended Path

::: steps

## Use the App Extension in Quasar CLI apps

Choose the App Extension when you want Quasar to add the boot file and stylesheet for you.

## Use the Vue plugin for manual registration

Install the UI package directly when your app owns plugin registration or when you are not using the Quasar CLI App Extension flow.

## Import scrollers directly for targeted bundles

Import only the scroller components your feature uses when you want tighter control over registration.
:::

## Quasar CLI

### App Extension

To add QScroller to your Quasar application, run the following in your Quasar app folder:

```bash
quasar ext add @quasar/qscroller
```

The QScroller v3 App Extension targets Quasar CLI Vite 3 and requires `@quasar/app-vite` >=3.0.0. It does not support webpack-based Quasar applications.

::: tip
The App Extension can register QScroller components without an import from application source. If your application imports a component or type from `@quasar/quasar-ui-qscroller`, add the UI package as a direct application dependency (for example, `pnpm add @quasar/quasar-ui-qscroller`). Do not rely on the App Extension's transitive dependency, especially with strict package managers such as pnpm.
:::

### Manual Boot File

If you do not install through the App Extension, install the UI package directly:

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

Then create and register a boot file:

```js
import { defineBoot } from '#q-app'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'

export default defineBoot(({ app }) => {
  app.use(Plugin)
})
```

## Vue 3 Or Vite

```js
import { createApp } from 'vue'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Plugin)
app.mount('#app')
```

## Component Import

```html
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
  } from '@quasar/quasar-ui-qscroller'
</script>
```
