<template>
  <div class="q-pa-md value-types">
    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">String value</div>
        <h4>Persist a date-time string</h4>
        <p>Use this shape when forms, APIs, or query params already use a compact text value.</p>
        <pre>{{ formatModel(stringValue) }}</pre>
      </div>
      <q-date-time-scroller
        :value="stringValue"
        class="value-type__scroller"
        show-month-label
        no-footer
        @input="stringValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Object value</div>
        <h4>Keep named date and time fields</h4>
        <p>Use this shape when downstream code reads individual parts without parsing.</p>
        <pre>{{ formatModel(objectValue) }}</pre>
      </div>
      <q-date-time-scroller
        :value="objectValue"
        class="value-type__scroller"
        show-month-label
        no-footer
        @input="objectValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Array value</div>
        <h4>Store positional parts</h4>
        <p>Use this shape when compact tuples are easier to store or compare.</p>
        <pre>{{ formatModel(arrayValue) }}</pre>
      </div>
      <q-date-time-scroller
        :value="arrayValue"
        class="value-type__scroller"
        show-month-label
        no-footer
        @input="arrayValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Date value</div>
        <h4>Interop with JavaScript Date</h4>
        <p>Use this shape when another library expects a native JavaScript `Date`.</p>
        <pre>{{ formatModel(dateValue) }}</pre>
      </div>
      <q-date-time-scroller
        :value="dateValue"
        class="value-type__scroller"
        show-month-label
        no-footer
        @input="dateValue = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>('2026-05-30 09:30')
const objectValue = ref<unknown>({
  year: '2026',
  month: '06',
  day: '10',
  hour: '12',
  minute: '15',
})
const arrayValue = ref<unknown>(['2026', '07', '20', '15', '30'])
const dateValue = ref<unknown>(new Date(2026, 7, 30, 18, 45))

function serialize(value: unknown): unknown {
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (Array.isArray(value)) {
    return value.map(serialize)
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        serialize(entry),
      ]),
    )
  }

  return value
}

function formatModel(value: unknown) {
  return JSON.stringify(serialize(value), null, 2)
}
</script>

<style scoped lang="scss">
.value-types {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.value-type {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(360px, 500px);
  gap: 20px;
  align-items: start;
  padding: 16px;
  border: 1px solid rgba(160, 79, 23, 0.7);
  border-radius: 6px;
}

.value-type__copy {
  h4 {
    margin: 0 0 12px;
    font-size: 1.25rem;
  }

  p {
    margin: 0 0 16px;
    line-height: 1.5;
  }

  pre {
    min-height: 96px;
    margin: 0;
    padding: 12px;
    overflow: auto;
    border: 1px solid rgba(160, 79, 23, 0.45);
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.35;
    white-space: pre-wrap;
  }
}

.value-type__scroller {
  height: 300px;
  width: 100%;
}

@media (max-width: 820px) {
  .value-type {
    grid-template-columns: 1fr;
  }
}
</style>
