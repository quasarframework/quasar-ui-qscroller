<template>
  <div class="q-pa-md timestamp-date-range">
    <div class="timestamp-date-range__copy">
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

      <div class="timestamp-date-range__meta">
        Requested duration: {{ requestedDuration }}
        <br />
        Next open gap: {{ nextGap }}
      </div>
    </div>

    <q-date-range-scroller
      :value="dateRangeValue"
      class="timestamp-date-range__scroller"
      no-footer
      @input="onDateRangeInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import {
  createTimestampRange,
  durationBetween,
  findRangeGaps,
  getDate,
  isRangeOverlapping,
  parseTimestamp,
  type Timestamp,
  type TimestampRange,
} from '@timestamp-js/core'
import '@quasar/quasar-ui-qscroller/src/index.scss'

type DateRangeValue = [string, string]

const dateRangeValue = ref<DateRangeValue>(['2036-06-08', '2036-06-12'])

const bookingWindow = createTimestampRange(
  parseTimestamp('2036-06-01 00:00') as Timestamp,
  parseTimestamp('2036-06-30 00:00') as Timestamp,
)
const blackoutRange = createTimestampRange(
  parseTimestamp('2036-06-14 00:00') as Timestamp,
  parseTimestamp('2036-06-17 00:00') as Timestamp,
)

const selectedRange = computed(() => createDateRange(dateRangeValue.value))
const rangeOverlapsBlackout = computed(() => isRangeOverlapping(selectedRange.value, blackoutRange))
const requestedDuration = computed(() => {
  const duration = durationBetween(selectedRange.value.start, selectedRange.value.end)
  const parts = [`${duration.days} ${duration.days === 1 ? 'day' : 'days'}`]

  if (duration.hours > 0) {
    parts.push(`${duration.hours} ${duration.hours === 1 ? 'hour' : 'hours'}`)
  }

  return parts.join(', ')
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

function createDateRange(value: DateRangeValue): TimestampRange {
  return createTimestampRange(
    parseTimestamp(`${value[0]} 00:00`) as Timestamp,
    parseTimestamp(`${value[1]} 00:00`) as Timestamp,
  )
}

function onDateRangeInput(value: unknown) {
  if (Array.isArray(value) !== true || value.length < 2) {
    return
  }

  dateRangeValue.value = [String(value[0]), String(value[1])]
}
</script>

<style scoped lang="scss">
.timestamp-date-range {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(300px, 420px);
  gap: 24px;
  align-items: center;
}

.timestamp-date-range__copy {
  display: grid;
  gap: 12px;
}

.timestamp-date-range__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.timestamp-date-range__copy p {
  margin: 0;
  max-width: 56ch;
}

.timestamp-date-range__scroller {
  height: 300px;
  width: 100%;
}

.timestamp-date-range__meta {
  color: rgba(0, 0, 0, 0.68);
  font-size: 0.9rem;
  line-height: 1.5;
}

.body--dark .timestamp-date-range__meta,
.q-dark .timestamp-date-range__meta {
  color: rgba(255, 255, 255, 0.76);
}

@media (max-width: 780px) {
  .timestamp-date-range {
    grid-template-columns: 1fr;
  }

  .timestamp-date-range__scroller {
    max-width: 100%;
  }
}
</style>
