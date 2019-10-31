QScroller
===

[![npm](https://img.shields.io/npm/v/quasar-ui-qscroller.svg?label=quasar-ui-qscroller)](https://www.npmjs.com/package/quasar-ui-qscroller)
[![npm](https://img.shields.io/npm/dt/quasar-ui-qscroller.svg)](https://www.npmjs.com/package/quasar-ui-qscroller)

QScroller is a [Quasar](https://quasar.dev) component. It allows you to have time and date selections or a combination of both, including range selections.


# Examples and Documentation
Can be found [here](https://quasarframework.github.io/quasar-ui-qscroller)

# Usage

## Quasar CLI project

Install the [App Extension](../app-extension).

**OR**:

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'

Vue.use(Plugin)
```

**OR**:

```html
<style src="@quasar/quasar-ui-qscroller/dist/index.css"></style>

<script>
import { Component as QScroller } from '@quasar/quasar-ui-qscroller'

export default {
  components: {
    QScroller
  }
}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'

Vue.use(Plugin)
```

**OR**:

```html
<style src="@quasar/quasar-ui-qscroller/dist/index.css"></style>

<script>
import { Component as QScroller } from '@quasar/quasar-ui-qscroller'

export default {
  components: {
    QScroller
  }
}
</script>
```

## UMD variant

Exports `window.QScroller`.

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```
# Building the Projects

## Setup

In both the `ui` and `ui/dev` folders:

```bash
$ yarn
```

## Developing

In the `ui` folder

```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

## Building package

```bash
$ yarn build
```

# Donate

If you appreciate the work that went into this, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License
MIT (c) Jeff Galbraith <jeff@quasar.dev>
