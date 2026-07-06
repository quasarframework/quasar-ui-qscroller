---
title: QDateTimeScroller
desc: Developing with QDateTimeScroller
keys: developing
examples: QDateTimeScroller
---

`QDateTimeScroller` combines date and time scrollers into one compact control. It is useful when a single field needs both pieces of information, such as appointment starts, reminders, and schedule cutoffs.

<script import>
import QDateTimeScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QDateTimeScroller.json'
</script>

<MarkdownApi :api="QDateTimeScrollerApi" name="QDateTimeScroller"/>

## Basic

<MarkdownExample title="Basic Date Time Scroller" file="Basic" />

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the combined date-time scroller.

<MarkdownExample title="Date Time Scroller Colors" file="Colors" />

## Disabled

Disable the full scroller or block specific date and time values.

<MarkdownExample title="Disabled Date Time Scroller" file="Disabled" />

## Intervals

Use time intervals and hidden date parts when only part of the date-time value should be adjustable.

<MarkdownExample title="Date Time Scroller Intervals" file="Intervals" />

## Locale

Use the `locale` prop to change generated date labels in the date-time header.

<MarkdownExample title="Date Time Scroller Locale" file="Locale" />

## QInput

Place the date-time scroller in a popup when the form should still show a compact input field.

<MarkdownExample title="Date Time Scroller In QInput" file="QInput" />

## Slots

Use slots to display the selected date-time value in custom header or footer content.

<MarkdownExample title="Date Time Scroller Slots" file="Slots" />

## Value Types

The scroller can accept common date-time shapes and emits the same shape back where possible.

<MarkdownExample title="Date Time Scroller Value Types" file="Types" />
