<template>
  <div class="q-pa-md value-types">
    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">String pair</div>
        <h4>Persist compact time strings</h4>
        <p>Use this shape when storage or URLs already use `HH:mm` start and end values.</p>
        <pre>{{ formatModel(stringValue) }}</pre>
      </div>
      <q-time-range-scroller
        :value="stringValue"
        class="value-type__scroller"
        no-footer
        @input="stringValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Object pair</div>
        <h4>Keep named time fields</h4>
        <p>Use objects when downstream code reads `hour` and `minute` without parsing.</p>
        <pre>{{ formatModel(objectValue) }}</pre>
      </div>
      <q-time-range-scroller
        :value="objectValue"
        class="value-type__scroller"
        no-footer
        @input="objectValue = $event"
      />
    </section>

    <section class="value-type">
      <div class="value-type__copy">
        <div class="text-overline text-primary">Array pair</div>
        <h4>Store positional parts</h4>
        <p>Use arrays when compact tuples are easier to compare or send across a boundary.</p>
        <pre>{{ formatModel(arrayValue) }}</pre>
      </div>
      <q-time-range-scroller
        :value="arrayValue"
        class="value-type__scroller"
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
      <q-time-range-scroller
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
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>(['09:00', '17:00'])
const objectValue = ref<unknown>([
  { hour: '10', minute: '15' },
  { hour: '14', minute: '45' },
])
const arrayValue = ref<unknown>([
  ['12', '30'],
  ['18', '00'],
])
const dateValue = ref<unknown>([new Date(2026, 4, 30, 15, 15), new Date(2026, 4, 30, 21, 30)])

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
  grid-template-columns: minmax(220px, 320px) minmax(300px, 420px);
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
  height: 280px;
  width: 100%;
}

@media (max-width: 760px) {
  .value-type {
    grid-template-columns: 1fr;
  }
}
</style>
