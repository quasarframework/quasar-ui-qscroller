---
title: QTimeRangeScroller
desc: Developing with QTimeRangeScroller
keys: developing
examples: QTimeRangeScroller
---

`QTimeRangeScroller` renders start and end time scrollers together. It validates that the end time
does not come before the start time unless `disable-validation` is enabled.

<script import>
import QScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QScroller.json'
</script>

<MarkdownApi :api="QScrollerApi" name="QTimeRangeScroller"/>

## Basic

<MarkdownExample title="Basic Time Range Scroller" file="Basic" no-edit/>
