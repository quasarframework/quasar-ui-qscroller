---
title: QStringScroller
desc: Developing with QStringScroller
keys: developing
examples: QStringScroller
---

`QStringScroller` scrolls through a fixed list of string choices. It is a good fit for sizes,
statuses, durations, quantities, and other compact option lists where nearby choices should stay
visible.

Use the dedicated component when you know the view is always string-based. Use `QScroller` with
`view="string"` only when a single wrapper component helps simplify dynamic templates.

<script import>
import QScrollerApi from '@quasar/quasar-ui-qscroller/dist/api/QScroller.json'
</script>

<MarkdownApi :api="QScrollerApi" name="QStringScroller"/>

## Basic

<MarkdownExample title="Basic String Scroller" file="Basic" no-edit/>
