> It's likely this App Extension will be deprecated (no support for Quasar v2/Vue 3) unless it gets a strong representation from developers using it.

QScroller (Vue Plugin, UMD and Quasar App Extension)
===

![@quasar/quasar-ui-qscroller](https://img.shields.io/npm/v/@quasar/quasar-ui-qscroller.svg?label=@quasar/quasar-ui-qscroller)
![@quasar/quasar-app-extension-qscroller](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qscroller.svg?label=@quasar/quasar-app-extension-qscroller)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/quasar-ui-qscroller.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/quasar-ui-qscroller.svg)]()

# Structure

* [/ui](ui) - standalone npm package (go here for more information)
* [/app-extension](app-extension) - Quasar app extension
* [/demo](demo) - docs, demo and examples project
* [live demo](https://quasarframework.github.io/quasar-ui-qscroller/docs) - live docs, demo and examples

# Demo Workflow
If you fork or download this project, make sure you have the Quasar CLI globally installed:

```
$ npm i -g @quasar/cli
```

The workflow to build the demo, on a fresh project, is as follows:
```
$ cd ui
$ yarn
$ yarn build
$ cd ../demo
$ yarn
$ quasar dev
```

# Donate
If you appreciate the work that went into this, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License
MIT (c) Jeff Galbraith <jeff@quasar.dev>
