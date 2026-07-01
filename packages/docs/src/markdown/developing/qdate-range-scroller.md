---
title: QDateRangeScroller
desc: Developing with QDateRangeScroller
keys: developing
examples: QDateRangeScroller
---

`QDateRangeScroller` renders start and end date scrollers together. It validates that the end date does not come before the start date unless `disable-validation` is enabled.

<script import>
import QDateRangeScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QDateRangeScroller.json'
</script>

<MarkdownApi :api="QDateRangeScrollerApi" name="QDateRangeScroller"/>

## Basic

<MarkdownExample title="Basic Date Range Scroller" file="Basic" />

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the date range scroller.

<MarkdownExample title="Date Range Scroller Colors" file="Colors" />

## Disabled

Disable the full range picker or block specific start/end date values.

<MarkdownExample title="Disabled Date Range Scroller" file="Disabled" />

## Visible Parts

Hide year, month, or day columns when the surrounding UI already provides that context.

<MarkdownExample title="Date Range Scroller Visible Parts" file="Parts" />

## Locale

Use the `locale` prop to change generated labels for both date scrollers in the range.

<MarkdownExample title="Date Range Scroller Locale" file="Locale" />

## QInput

Use a popup range scroller when the main form should keep a simple input-shaped control.

<MarkdownExample title="Date Range Scroller In QInput" file="QInput" />

## Slots

Use slots to display the selected range in custom header or footer content.

<MarkdownExample title="Date Range Scroller Slots" file="Slots" />

## Value Types

Range scrollers can work with string, object, array, and `Date` pairs.

<MarkdownExample title="Date Range Scroller Value Types" file="Types" />
