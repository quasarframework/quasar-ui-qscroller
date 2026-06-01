---
title: Using QScroller
desc: How to use QScroller
keys: developing
examples: QScroller
---

QScroller gives you compact wheel-style controls for values that should be easy to nudge up or
down. Use it for string choices, date and time inputs, range boundaries, or any place where showing
nearby values makes the picker easier to understand.

## Styling With CSS Variables

QScroller v3 uses CSS custom properties for its internal colors and sizing. The color props are still
the easiest way to set common colors, but CSS variables are useful when you want one app-level theme
to control every scroller.

```scss
.settings-scroller {
  --q-scroller-border-color: var(--q-primary);
  --q-scroller-bar-color: color-mix(in srgb, var(--q-primary), transparent 45%);
  --q-scroller-item-height: 30px;
  --q-scroller-header-height: 56px;
  --q-scroller-footer-height: 44px;
  --q-scroller-disabled-color: color-mix(in srgb, currentColor, transparent 45%);
}
```

Dense mode has matching `-dense` variables, such as `--q-scroller-item-height-dense`,
`--q-scroller-header-height-dense`, and `--q-scroller-font-size-dense`.

## API

`QScroller` is the generic wrapper. Set `view` to choose between string, time, date, date-time, time
range, and date range behavior. You can also import the dedicated components directly when that makes
your template easier to read.

<script import>
import QScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QScroller.json'
</script>

<MarkdownApi :api="QScrollerApi" name="QScroller"/>

## String Values

String scrollers are useful when the choices are known and close together: sizes, labels, quantity
steps, compact status choices, and other small enumerations.

<MarkdownExample title="Basic String Scroller" file="Basic" no-edit/>

## Dates And Times

The date and time scrollers keep picker controls compact without hiding the neighboring values. That
makes them a nice fit for dense forms, schedule controls, and dashboard filters.

<MarkdownExample title="Date And Time Scrollers" file="DateAndTime" no-edit/>
