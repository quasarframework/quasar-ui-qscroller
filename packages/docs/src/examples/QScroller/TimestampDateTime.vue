<template>
  <div class="q-pa-md timestamp-date-time">
    <div class="timestamp-date-time__copy">
      <div class="text-overline text-primary">UTC storage + interval snap</div>
      <h3>Date-time scroller</h3>
      <p>
        Keep the scroller model easy to display, then normalize the emitted value through Timestamp
        before storing it.
      </p>

      <q-list dense bordered separator class="timestamp-date-time__summary rounded-borders">
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
      class="timestamp-date-time__scroller"
      minute-interval="15"
      no-footer
      @input="onDateTimeInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import {
  fromUnixMilliseconds,
  getDateTime,
  parseDate,
  parseTimestamp,
  roundToInterval,
  toUnixMilliseconds,
  type Timestamp,
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

const initialDateTime = parseTimestamp('2036-06-08 09:30') as Timestamp
const storedMilliseconds = ref(toUnixMilliseconds(initialDateTime))
const dateTimeValue = ref(getDateTime(initialDateTime))

const storedIso = computed(() => new Date(storedMilliseconds.value).toISOString())

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

function onDateTimeInput(value: DateTimeValue) {
  const timestamp = normalizeDateTime(value)

  if (timestamp === null) {
    return
  }

  const snapped = roundToInterval(timestamp, 15)
  storedMilliseconds.value = toUnixMilliseconds(snapped)
  dateTimeValue.value = getDateTime(fromUnixMilliseconds(storedMilliseconds.value) as Timestamp)
}
</script>

<style scoped lang="scss">
.timestamp-date-time {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(300px, 420px);
  gap: 24px;
  align-items: center;
}

.timestamp-date-time__copy {
  display: grid;
  gap: 12px;
}

.timestamp-date-time__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.timestamp-date-time__copy p {
  margin: 0;
  max-width: 56ch;
}

.timestamp-date-time__summary {
  overflow: hidden;
}

.timestamp-date-time__scroller {
  height: 300px;
  width: 100%;
}

@media (max-width: 780px) {
  .timestamp-date-time {
    grid-template-columns: 1fr;
  }

  .timestamp-date-time__scroller {
    max-width: 100%;
  }
}
</style>
