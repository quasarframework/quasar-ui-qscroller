---
title: QStringScroller
desc: Developing with QStringScroller
keys: developing
examples: QStringScroller
---

`QStringScroller` scrolls through a fixed list of string choices. It is a good fit for sizes, statuses, durations, quantities, and other compact option lists where nearby choices should stay visible.

Use the dedicated component when you know the view is always string-based. Use `QScroller` with `view="string"` only when a single wrapper component helps simplify dynamic templates.

<script import>
import QStringScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QStringScroller.json'
</script>

<MarkdownApi :api="QStringScrollerApi" name="QStringScroller"/>

## Basic

<MarkdownExample title="Basic String Scroller" file="Basic" no-edit/>

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the shell, selected bar, and inner scroller area.

<MarkdownExample title="String Scroller Colors" file="Colors" no-edit/>

## Disabled

Disable the whole scroller or individual string items.

<MarkdownExample title="Disabled String Scroller" file="Disabled" no-edit/>

## QInput

Place a scroller inside a popup when an input should keep a compact text field in the main form.

<MarkdownExample title="String Scroller In QInput" file="QInput" no-edit/>

## Slots

Use the header and footer slots to add context around the selected value.

<MarkdownExample title="String Scroller Slots" file="Slots" no-edit/>
