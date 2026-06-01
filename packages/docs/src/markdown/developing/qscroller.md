---
title: QScroller
desc: Developing with QScroller
keys: developing
examples: QScroller
---

`QScroller` is the generic wrapper component. Use it when you want to choose the active scroller
with the `view` prop instead of importing one dedicated component directly.

Available `view` values are `string`, `time`, `date`, `date-time`, `time-range`, and `date-range`.
If you already know which scroller you need, prefer the dedicated component page so your imports and
templates stay explicit.

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

<script import>
import QScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QScroller.json'
</script>

<MarkdownApi :api="QScrollerApi" name="QScroller"/>

## String View

Use `view="string"` when a single wrapper component is convenient but the choices still come from a
fixed list.

<MarkdownExample title="Basic String Scroller" file="Basic" no-edit/>

## Date And Time Views

The same wrapper can render date and time views by changing `view`.

<MarkdownExample title="Date And Time Scrollers" file="DateAndTime" no-edit/>
