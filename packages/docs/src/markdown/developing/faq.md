---
title: FAQ
desc: Frequently asked questions
keys: developing
---

:::details Q. Do I need to import QScroller CSS myself?

The App Extension adds the stylesheet for you.

If you install the UI package directly, import the stylesheet in your boot file or app entry:

```ts
import "@quasar/quasar-ui-qscroller/dist/index.css";
```

Quasar CLI projects can also centralize the stylesheet in `quasar.config.ts`:

```ts
// Note: using ~ tells Quasar the file resides in node_modules
css: [
  "app.scss",
  "~@quasar/quasar-ui-qscroller/dist/index.css",
],
```

:::

:::details Q. Can I inspect the component API from the Quasar CLI?

Yes. After the App Extension is installed, run:

```bash
quasar describe QScroller
```

The same generated API is shown on the [Using QScroller](/developing/using-qscroller) page.

:::

:::details Q. When should I use QScroller instead of QSelect or QDate?

Use QScroller when the user benefits from seeing nearby choices while they adjust a value. It is
best for compact pickers, dashboards, embedded form controls, and kiosk-style UIs. Use Quasar's
native inputs when you need the broadest platform conventions, validation ecosystem, or mobile OS
input behavior.

:::

:::details Q. Can I use it with QInput?

Yes. The scrollers can be placed in popups, dialogs, menus, or appended sections around `QInput`.
For the beta docs we are keeping the examples focused on the component itself first, then we can add
more integration examples as the migration settles.

:::

:::details Q. Does QScroller support dark mode?

Yes. Style props accept Quasar palette names and CSS colors, so you can tune the scroller shell and
inner value area for light or dark layouts.

:::

:::details Q. Which component should I import?

Use `QScroller` when you want one wrapper controlled by the `view` prop. Use the dedicated
components when you know the value type up front and want clearer templates or stronger IDE hints.
:::
