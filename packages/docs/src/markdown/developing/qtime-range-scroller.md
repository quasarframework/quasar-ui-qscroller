---
title: QTimeRangeScroller
desc: Developing with QTimeRangeScroller
keys: developing
examples: QTimeRangeScroller
---

`QTimeRangeScroller` renders start and end time scrollers together. It validates that the end time does not come before the start time unless `disable-validation` is enabled.

<script import>
import QTimeRangeScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QTimeRangeScroller.json'
</script>

<MarkdownApi :api="QTimeRangeScrollerApi" name="QTimeRangeScroller"/>

## Basic

<MarkdownExample title="Basic Time Range Scroller" file="Basic" no-edit/>

## 12 Hour

Use `hour12` for AM/PM ranges and customize start/end AM/PM labels when compact labels fit better.

<MarkdownExample title="12 Hour Time Range Scroller" file="TwelveHour" no-edit/>

## Colors

Use palette names, CSS colors, or CSS custom properties to tune the range scroller.

<MarkdownExample title="Time Range Scroller Colors" file="Colors" no-edit/>

## Disabled

Disable the whole range picker or block specific start/end hours and minutes.

<MarkdownExample title="Disabled Time Range Scroller" file="Disabled" no-edit/>

## Intervals

Set start/end hour and minute intervals when the range should snap to larger steps.

<MarkdownExample title="Time Range Scroller Intervals" file="Intervals" no-edit/>

## QInput

Use a popup range scroller when the main form should keep a simple input-shaped control.

<MarkdownExample title="Time Range Scroller In QInput" file="QInput" no-edit/>

## Slots

Use slots to display the selected range in custom header or footer content.

<MarkdownExample title="Time Range Scroller Slots" file="Slots" no-edit/>

## Value Types

Range scrollers can work with string, object, array, and `Date` pairs.

<MarkdownExample title="Time Range Scroller Value Types" file="Types" no-edit/>
