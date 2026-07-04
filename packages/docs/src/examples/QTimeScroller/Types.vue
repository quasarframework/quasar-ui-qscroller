<template>
  <div class="q-pa-md value-types">
    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">String value</div>
        <h4>Persist a time string</h4>
        <p>Use this shape when forms, APIs, or query params already expect `HH:mm`.</p>
        <pre>{{ formatModel(stringValue) }}</pre>
      </div>
      <q-time-scroller
        :value="stringValue"
        class="value-type__scroller"
        no-footer
        @input="stringValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Object value</div>
        <h4>Keep named time parts</h4>
        <p>Use this shape when the calling code reads `hour` and `minute` directly.</p>
        <pre>{{ formatModel(objectValue) }}</pre>
      </div>
      <q-time-scroller
        :value="objectValue"
        class="value-type__scroller"
        no-footer
        @input="objectValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Array value</div>
        <h4>Use positional parts</h4>
        <p>Use this shape when compact tuples are easier to store or compare.</p>
        <pre>{{ formatModel(arrayValue) }}</pre>
      </div>
      <q-time-scroller
        :value="arrayValue"
        class="value-type__scroller"
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
      <q-time-scroller
        :value="dateValue"
        class="value-type__scroller"
        no-footer
        @input="dateValue = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>('09:00')
const objectValue = ref<unknown>({ hour: '12', minute: '15' })
const arrayValue = ref<unknown>(['15', '30'])
const dateValue = ref<unknown>(new Date(2026, 4, 30, 18, 45))

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
  grid-template-columns: minmax(220px, 300px) minmax(180px, 240px);
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
    min-height: 72px;
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
  height: 260px;
  width: 100%;
}

@media (max-width: 620px) {
  .value-type {
    grid-template-columns: 1fr;
  }
}
</style>
