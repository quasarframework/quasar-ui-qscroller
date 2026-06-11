# QScroller

[![UI package](https://img.shields.io/npm/v/@quasar/quasar-ui-qscroller/beta?label=@quasar/quasar-ui-qscroller)](https://www.npmjs.com/package/@quasar/quasar-ui-qscroller)
[![App Extension](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qscroller/beta?label=@quasar/quasar-app-extension-qscroller)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qscroller)

QScroller provides string, time, date, date-time, and range scrollers for Vue and Quasar applications.

# Structure

This is a pnpm workspace mono-repo. You cannot use npm for building.

- [/ui](packages/ui) - standalone npm package (go here for more information)
- [/app-extension](packages/app-extension) - Quasar app extension
- [/docs](packages/docs) - Q-Press documentation site with docs, demos, and examples
- [live demo](https://qscroller.netlify.app/) - **live Q-Press docs, demos, and examples**

## Install

```bash
pnpm add @quasar/quasar-ui-qscroller@beta
# or
bun add @quasar/quasar-ui-qscroller@beta
# or
yarn add @quasar/quasar-ui-qscroller@beta
# or
npm install @quasar/quasar-ui-qscroller@beta
# or, in a Quasar CLI project
quasar ext add @quasar/qscroller@beta
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
