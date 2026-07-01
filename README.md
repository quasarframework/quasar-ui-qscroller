# QScroller

[![UI package](https://img.shields.io/npm/v/@quasar/quasar-ui-qscroller?label=@quasar/quasar-ui-qscroller)](https://www.npmjs.com/package/@quasar/quasar-ui-qscroller)
[![App Extension](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qscroller?label=@quasar/quasar-app-extension-qscroller)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qscroller)
[![Netlify Status](https://api.netlify.com/api/v1/badges/533e396c-4793-45af-a0db-6a401f90f748/deploy-status)](https://app.netlify.com/projects/qscroller/deploys)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

QScroller provides string, time, date, date-time, and range scrollers for Vue and Quasar applications.

[Live Q-Press documentation site](https://qscroller.netlify.app/)

# Structure

This is a pnpm workspace mono-repo. You cannot use npm for building.

- [/ui](packages/ui) - standalone npm package (go here for more information)
- [/app-extension](packages/app-extension) - Quasar app extension
- [/docs](packages/docs) - Q-Press documentation site with docs, demos, and examples
- [live demo](https://qscroller.netlify.app/) - **live Q-Press docs, demos, and examples**

## Install

```bash
pnpm add @quasar/quasar-ui-qscroller
# or
bun add @quasar/quasar-ui-qscroller
# or
yarn add @quasar/quasar-ui-qscroller
# or
npm install @quasar/quasar-ui-qscroller
# or, in a Quasar CLI project
quasar ext add @quasar/qscroller
```

## Development

```bash
pnpm install
pnpm verify
pnpm --filter docs dev
```

## Support

If QScroller is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

MIT (c) Jeff Galbraith <jeff@quasar.dev>
