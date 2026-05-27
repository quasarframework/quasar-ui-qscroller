---
title: Using QScroller
desc: How to use QScroller
keys: developing
examples: QScroller
---

QScroller gives you compact wheel-style controls for values that should be easy to nudge up or
down. Use it for string choices, date and time inputs, range boundaries, or any place where showing
nearby values makes the picker easier to understand.

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
