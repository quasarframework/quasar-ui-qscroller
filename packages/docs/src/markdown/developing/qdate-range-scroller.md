---
title: QDateRangeScroller
desc: Developing with QDateRangeScroller
keys: developing
examples: QDateRangeScroller
---

`QDateRangeScroller` renders start and end date scrollers together. It validates that the end date
does not come before the start date unless `disable-validation` is enabled.

<script import>
import QScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QScroller.json'
</script>

<MarkdownApi :api="QScrollerApi" name="QDateRangeScroller"/>

## Basic

<MarkdownExample title="Basic Date Range Scroller" file="Basic" no-edit/>
