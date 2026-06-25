<template>
  <div class="q-pa-md timestamp-recipes">
    <section class="timestamp-recipes__panel">
      <div class="timestamp-recipes__copy">
        <div class="text-overline text-primary">UTC storage + interval snap</div>
        <h3>Date-time scroller</h3>
        <p>
          Keep the scroller model easy to display, then normalize the emitted value through
          Timestamp before storing it.
        </p>

        <q-list dense bordered separator class="rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label caption>Scroller model</q-item-label>
              <q-item-label>{{ dateTimeValue }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Stored UTC milliseconds</q-item-label>
              <q-item-label>{{ storedMilliseconds }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>UTC instant</q-item-label>
              <q-item-label>{{ storedIso }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-date-time-scroller
        :value="dateTimeValue"
        class="timestamp-recipes__date-time"
        minute-interval="15"
        no-footer
        @input="onDateTimeInput"
      />
    </section>

    <section class="timestamp-recipes__panel">
      <div class="timestamp-recipes__copy">
        <div class="text-overline text-primary">Range validation</div>
        <h3>Date range scroller</h3>
        <p>
          Let QScroller collect the date pair, then use Timestamp ranges to compare it against
          business rules such as blackout windows.
        </p>

        <q-banner
          rounded
          :class="rangeOverlapsBlackout ? 'bg-red-1 text-red-10' : 'bg-green-1 text-green-10'"
        >
          {{ rangeStatus }}
        </q-banner>

        <div class="timestamp-recipes__meta">
          Requested days: {{ requestedDays }}
          <br />
          Next open gap: {{ nextGap }}
        </div>
      </div>

      <q-date-range-scroller
        :value="dateRangeValue"
        class="timestamp-recipes__range"
        no-footer
        @input="onDateRangeInput"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QDateRangeScroller, QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import {
  createTimestampRange,
  durationBetween,
  findRangeGaps,
  formatDuration,
  fromUnixMilliseconds,
  getDate,
  getDateTime,
  isRangeOverlapping,
  parseDate,
  parseTimestamp,
  roundToInterval,
  toUnixMilliseconds,
  type Timestamp,
  type TimestampRange,
} from '@timestamp-js/core'
import '@quasar/quasar-ui-qscroller/src/index.scss'

type DateTimeValue =
  | string
  | Date
  | Array<string | number>
  | {
      year: string | number
      month: string | number
      day: string | number
      hour: string | number
      minute: string | number
    }

type DateRangeValue = [string, string]

const initialDateTime = parseTimestamp('2036-06-08 09:30') as Timestamp
const storedMilliseconds = ref(toUnixMilliseconds(initialDateTime))
const dateTimeValue = ref(getDateTime(initialDateTime))
const dateRangeValue = ref<DateRangeValue>(['2036-06-08', '2036-06-12'])

const bookingWindow = createTimestampRange(
  parseTimestamp('2036-06-01 00:00') as Timestamp,
  parseTimestamp('2036-06-30 00:00') as Timestamp,
)
const blackoutRange = createTimestampRange(
  parseTimestamp('2036-06-14 00:00') as Timestamp,
  parseTimestamp('2036-06-17 00:00') as Timestamp,
)

const storedIso = computed(() => new Date(storedMilliseconds.value).toISOString())
const selectedRange = computed(() => createDateRange(dateRangeValue.value))
const rangeOverlapsBlackout = computed(() => isRangeOverlapping(selectedRange.value, blackoutRange))
const requestedDays = computed(() => {
  const duration = durationBetween(selectedRange.value.start, selectedRange.value.end)
  return formatDuration(duration)
})
const nextGap = computed(() => {
  const [gap] = findRangeGaps(bookingWindow, [blackoutRange])
  return gap === undefined ? 'No open gaps' : `${getDate(gap.start)} through ${getDate(gap.end)}`
})
const rangeStatus = computed(() =>
  rangeOverlapsBlackout.value === true
    ? 'This request overlaps the blackout period.'
    : 'This request is clear of the blackout period.',
)

function normalizeDateTime(value: DateTimeValue): Timestamp | null {
  if (value instanceof Date) {
    return parseDate(value)
  }

  if (typeof value === 'string') {
    return parseTimestamp(value)
  }

  if (Array.isArray(value)) {
    return parseTimestamp(`${value[0]}-${value[1]}-${value[2]} ${value[3]}:${value[4]}`)
  }

  return parseTimestamp(`${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}`)
}

function createDateRange(value: DateRangeValue): TimestampRange {
  return createTimestampRange(
    parseTimestamp(`${value[0]} 00:00`) as Timestamp,
    parseTimestamp(`${value[1]} 00:00`) as Timestamp,
  )
}

function onDateTimeInput(value: DateTimeValue) {
  const timestamp = normalizeDateTime(value)

  if (timestamp === null) {
    return
  }

  const snapped = roundToInterval(timestamp, 15)
  storedMilliseconds.value = toUnixMilliseconds(snapped)
  dateTimeValue.value = getDateTime(fromUnixMilliseconds(storedMilliseconds.value) as Timestamp)
}

function onDateRangeInput(value: unknown) {
  if (Array.isArray(value) !== true || value.length < 2) {
    return
  }

  dateRangeValue.value = [String(value[0]), String(value[1])]
}
</script>

<style scoped lang="scss">
.timestamp-recipes {
  display: grid;
  gap: 24px;
}

.timestamp-recipes__panel {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(300px, 420px);
  gap: 24px;
  align-items: center;
}

.timestamp-recipes__copy {
  display: grid;
  gap: 12px;
}

.timestamp-recipes__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.timestamp-recipes__copy p {
  margin: 0;
  max-width: 56ch;
}

.timestamp-recipes__date-time,
.timestamp-recipes__range {
  height: 300px;
  width: 100%;
}

.timestamp-recipes__meta {
  color: color-mix(in srgb, currentColor 76%, transparent);
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 780px) {
  .timestamp-recipes__panel {
    grid-template-columns: 1fr;
  }

  .timestamp-recipes__date-time,
  .timestamp-recipes__range {
    max-width: 100%;
  }
}
</style>
