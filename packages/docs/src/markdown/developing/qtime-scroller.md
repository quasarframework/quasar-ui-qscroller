---
title: QTimeScroller
desc: Developing with QTimeScroller
keys: developing
examples: QTimeScroller
---

`QTimeScroller` renders hour and minute columns for compact time selection. Use it where a full time-picker popup would interrupt the flow, such as scheduling forms, dashboard filters, and mobile dialogs.

<script import>
import QTimeScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QTimeScroller.json'
</script>

<MarkdownApi :api="QTimeScrollerApi" name="QTimeScroller"/>

## Basic

<MarkdownExample title="Basic Time Scroller" file="Basic" />

## 12 Hour

Use `hour12` when the picker should display AM/PM values, and customize the labels when the default `AM` and `PM` text is too wide for the design.

<MarkdownExample title="12 Hour Time Scroller" file="TwelveHour" />

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the shell, selected bar, and inner scroller area.

<MarkdownExample title="Time Scroller Colors" file="Colors" />

## Disabled

Disable the full scroller or block specific hours and minutes.

<MarkdownExample title="Disabled Time Scroller" file="Disabled" />

## Intervals

Reduce the visible choices by stepping hours or minutes, or hide an entire time segment.

<MarkdownExample title="Time Scroller Intervals" file="Intervals" />

## QInput

Place the time scroller in a popup when the form should still show a compact input field.

<MarkdownExample title="Time Scroller In QInput" file="QInput" />

## Slots

Use the header and footer slots to add labels, helper text, or confirmation UI around the current timestamp.

<MarkdownExample title="Time Scroller Slots" file="Slots" />

## Value Types

The scroller can accept common date/time shapes and emits the same shape back where possible.

<MarkdownExample title="Time Scroller Value Types" file="Types" />
