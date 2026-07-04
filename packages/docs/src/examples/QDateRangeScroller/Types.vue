<template>
  <div class="q-pa-md value-types">
    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">String pair</div>
        <h4>Persist compact date strings</h4>
        <p>Use this shape when forms, APIs, or query params already expect ISO-like strings.</p>
        <pre>{{ formatModel(stringValue) }}</pre>
      </div>
      <q-date-range-scroller
        :value="stringValue"
        class="value-type__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="stringValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Object pair</div>
        <h4>Keep named date fields</h4>
        <p>Use objects when the calling code prefers explicit year, month, and day keys.</p>
        <pre>{{ formatModel(objectValue) }}</pre>
      </div>
      <q-date-range-scroller
        :value="objectValue"
        class="value-type__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="objectValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Array pair</div>
        <h4>Store positional parts</h4>
        <p>Use arrays when a compact tuple is easier to move through your app.</p>
        <pre>{{ formatModel(arrayValue) }}</pre>
      </div>
      <q-date-range-scroller
        :value="arrayValue"
        class="value-type__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="arrayValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Date pair</div>
        <h4>Interop with JavaScript Date</h4>
        <p>Use Date objects when another library or legacy model already owns that shape.</p>
        <pre>{{ formatModel(dateValue) }}</pre>
      </div>
      <q-date-range-scroller
        :value="dateValue"
        class="value-type__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="dateValue = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>(['2026-05-24', '2026-05-30'])
const objectValue = ref<unknown>([
  { year: '2026', month: '06', day: '03' },
  { year: '2026', month: '06', day: '09' },
])
const arrayValue = ref<unknown>([
  ['2026', '07', '12'],
  ['2026', '07', '18'],
])
const dateValue = ref<unknown>([new Date(2026, 7, 21), new Date(2026, 7, 27)])

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
  grid-template-columns: minmax(220px, 320px) minmax(420px, 620px);
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
