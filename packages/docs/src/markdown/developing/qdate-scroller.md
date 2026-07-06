---
title: QDateScroller
desc: Developing with QDateScroller
keys: developing
examples: QDateScroller
---

`QDateScroller` renders year, month, and day columns for compact date selection. Use it when users need nearby date values visible without opening a full calendar.

<script import>
import QDateScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QDateScroller.json'
</script>

<MarkdownApi :api="QDateScrollerApi" name="QDateScroller"/>

## Basic

<MarkdownExample title="Basic Date Scroller" file="Basic" />

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the shell, selected bar, and inner scroller area.

<MarkdownExample title="Date Scroller Colors" file="Colors" />

## Disabled

Disable the full scroller or block specific years, months, and days.

<MarkdownExample title="Disabled Date Scroller" file="Disabled" />

## Visible Parts

Hide year, month, or day columns when the surrounding UI already provides that context.

<MarkdownExample title="Date Scroller Visible Parts" file="Parts" />

## Locale

Use the `locale` prop to change the generated date labels.

<MarkdownExample title="Date Scroller Locale" file="Locale" />

## QInput

Place the date scroller in a popup when the form should still show a compact input field.

<MarkdownExample title="Date Scroller In QInput" file="QInput" />

## Slots

Use slots to display the selected date in custom header or footer content.

<MarkdownExample title="Date Scroller Slots" file="Slots" />

## Value Types

The scroller can accept common date shapes and emits the same shape back where possible.

<MarkdownExample title="Date Scroller Value Types" file="Types" />
