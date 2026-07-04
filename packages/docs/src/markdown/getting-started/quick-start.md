---
title: Quick Start
desc: Common QScroller setup and first patterns
keys: getting started,quick start,model,scroller
related:
  - /getting-started/installation-types
  - /developing/qstring-scroller
  - /developing/qtime-scroller
  - /developing/qdate-scroller
  - /developing/timestamp-recipes
---

This page covers the common choices you make when adding QScroller to a form or compact picker. Component-specific options and full examples live on the Developing pages.

## Pick a scroller

| Need                 | Component            | Model example                  |
| -------------------- | -------------------- | ------------------------------ |
| Fixed string choices | `QStringScroller`    | `"medium"`                     |
| Time                 | `QTimeScroller`      | `"09:30"`                      |
| Time range           | `QTimeRangeScroller` | `["09:00", "17:00"]`           |
| Date                 | `QDateScroller`      | `"2026-07-01"`                 |
| Date and time        | `QDateTimeScroller`  | `"2026-07-01 09:30"`           |
| Date range           | `QDateRangeScroller` | `["2026-07-01", "2026-07-05"]` |

Use `QScroller` with `view` when one wrapper component makes a dynamic template easier. Use the dedicated component when the picker type is known.

```vue
<script setup>
import { ref } from 'vue'

const size = ref('medium')
const sizes = ['small', 'medium', 'large']
</script>

<template>
  <q-string-scroller v-model="size" :items="sizes" />
</template>
```

## Install and style

The App Extension registers the component and stylesheet for Quasar CLI apps:

```bash
quasar ext add @quasar/qscroller
```

For direct package use, import the stylesheet once:

```ts
import '@quasar/quasar-ui-qscroller/dist/index.css'
```

See [Installation Types](/getting-started/installation-types) for App Extension, Vue plugin, direct import, and UMD setup.

## Model values

Most QScroller components emit the same value shape they receive. String models stay strings, range models stay arrays, and object/date models are preserved where the component supports them.

| Prop          | Type                              | Example   |
| ------------- | --------------------------------- | --------- |
| `model-value` | String \| Array \| Object \| Date | `"09:30"` |

```vue
<script setup>
import { ref } from 'vue'

const time = ref('09:30')
</script>

<template>
  <q-time-scroller v-model="time" />
</template>
```

## Common controls

| Prop        | Type    | Example     |
| ----------- | ------- | ----------- |
| `dense`     | Boolean |             |
| `disabled`  | Boolean |             |
| `readonly`  | Boolean |             |
| `no-header` | Boolean |             |
| `no-footer` | Boolean |             |
| `color`     | String  | `"primary"` |
| `bar-color` | String  | `"primary"` |

Use `dense` for compact surfaces, `no-header` or `no-footer` when the surrounding UI already labels the picker, and color props to match a form or card.

## Intervals

Time and date-time scrollers can step values so the user only lands on useful choices.

| Prop              | Type   | Example |
| ----------------- | ------ | ------- |
| `hour-interval`   | Number | `1`     |
| `minute-interval` | Number | `15`    |
| `second-interval` | Number | `30`    |

```vue
<q-time-scroller v-model="time" :minute-interval="15" />
```

## Ranges

Use range scrollers when users select a start and end value together. QScroller keeps the pair ordered, but business rules still belong in your app.

```vue
<script setup>
import { ref } from 'vue'

const bookingRange = ref(['2026-07-01', '2026-07-05'])
</script>

<template>
  <q-date-range-scroller v-model="bookingRange" />
</template>
```

For blackout dates, availability windows, and UTC storage, use Timestamp helpers with the emitted values. See [Timestamp Recipes](/developing/timestamp-recipes).

## Locale

Date and date-time scrollers use browser `Intl` formatting for generated labels.

| Prop     | Type    | Example   |
| -------- | ------- | --------- |
| `locale` | String  | `"fr-CA"` |
| `hour12` | Boolean |           |

```vue
<q-date-scroller v-model="date" locale="fr-CA" />
```

## Calendar adapters

QScroller's date components use Gregorian by default. Pass `calendar-system` for native calendar systems such as Hijri, Saka, Hebrew, or Persian; string, array, and object model values become native to that adapter while JavaScript `Date` values remain Gregorian interop values.

```bash
pnpm add @timestamp-js/core @timestamp-js/calendar-hebrew
```

See [Timestamp Recipes](/developing/timestamp-recipes) for the adapter scroller example.

## Where next

- [QStringScroller](/developing/qstring-scroller) for fixed option lists.
- [QTimeScroller](/developing/qtime-scroller) and [QTimeRangeScroller](/developing/qtime-range-scroller) for time input.
- [QDateScroller](/developing/qdate-scroller), [QDateTimeScroller](/developing/qdate-time-scroller), and [QDateRangeScroller](/developing/qdate-range-scroller) for date input.
- [QScroller](/developing/qscroller) for the wrapper component.
