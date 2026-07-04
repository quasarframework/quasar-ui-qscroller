---
title: Timestamp Recipes
desc: Use @timestamp-js/core and calendar adapters with QScroller values
keys: developing,timestamp,utc,range,intervals,calendar,hijri,saka,hebrew
examples: QScroller
related:
  - /developing/qdate-time-scroller
  - /developing/qdate-range-scroller
  - /other/upgrade-guide
---

QScroller keeps the UI small and focused. `@timestamp-js/core` is the companion layer for date math, UTC persistence, interval snapping, and range validation when the selected values need to become application data.

Use the scroller for collection, then normalize the emitted value into a Timestamp before saving, comparing, or sending the value to an API.

<MarkdownExample title="Date-Time Storage" file="TimestampDateTime" />

<MarkdownExample title="Range Validation" file="TimestampDateRange" />

## Calendar Adapters

`QDateScroller`, `QDateRangeScroller`, and `QDateTimeScroller` model dates in the active Timestamp calendar system. For native calendar systems such as Islamic Civil (Hijri), Indian National (Saka), Hebrew, or Persian, pass `calendar-system`; string, array, and object model values use that calendar's native `YYYY-MM-DD` fields, while JavaScript `Date` values remain Gregorian interop values.

Install the adapter package you need beside `@timestamp-js/core`:

```bash
pnpm add @timestamp-js/core @timestamp-js/calendar-hebrew @timestamp-js/calendar-islamic @timestamp-js/calendar-saka @timestamp-js/calendar-persian
```

<MarkdownExample title="Calendar Adapter Scrollers" file="CalendarAdapters" />

## Store Instants Explicitly

`QDateTimeScroller` emits the same shape it received where possible. If your app stores instants in a database, normalize the emitted value, snap it if needed, and store Unix milliseconds.

```ts [twoslash minheight=12rem]
import {
  getDateTime,
  roundToInterval,
  toUnixMilliseconds,
  parseTimestamp,
} from '@timestamp-js/core'

const input = parseTimestamp('2036-06-08 09:37')
const snapped = input === null ? null : roundToInterval(input, 15)

snapped === null ? null : getDateTime(snapped) // "2036-06-08 09:30"
snapped === null ? null : toUnixMilliseconds(snapped)
```

## Validate Ranges Outside The Picker

`QDateRangeScroller` validates that the end date does not come before the start date. Domain validation, such as checking blackout windows, booking windows, or availability gaps, belongs in your app logic.

```ts [twoslash minheight=14rem]
import {
  createTimestampRange,
  findRangeGaps,
  isRangeOverlapping,
  parseTimestamp,
} from '@timestamp-js/core'

const request = createTimestampRange(
  parseTimestamp('2036-06-08 00:00')!,
  parseTimestamp('2036-06-12 00:00')!,
)
const blackout = createTimestampRange(
  parseTimestamp('2036-06-14 00:00')!,
  parseTimestamp('2036-06-17 00:00')!,
)

isRangeOverlapping(request, blackout) // false
findRangeGaps(request, [blackout]) // request is still open
```

## Preserve UI Precision

QScroller date-time views are minute-focused today. Timestamp can still parse, store, and format seconds and milliseconds for API payloads, audit values, or background scheduling state.

```ts [twoslash minheight=10rem]
import { makeDateTimeUTC, parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2036-06-08T09:30:15.250Z')

timestamp?.second // 15
timestamp?.millisecond // 250
timestamp === null ? null : makeDateTimeUTC(timestamp).toISOString()
```
