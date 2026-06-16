<template>
  <div class="q-pa-md example-grid">
    <q-time-range-scroller
      :value="stringValue"
      class="example-scroller"
      no-footer
      @input="stringValue = $event"
    />
    <q-time-range-scroller
      :value="objectValue"
      class="example-scroller"
      no-footer
      @input="objectValue = $event"
    />
    <q-time-range-scroller
      :value="arrayValue"
      class="example-scroller"
      no-footer
      @input="arrayValue = $event"
    />
    <q-time-range-scroller
      :value="dateValue"
      class="example-scroller"
      no-footer
      @input="dateValue = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>(['09:00', '17:00'])
const objectValue = ref<unknown>([
  { hour: '09', minute: '00' },
  { hour: '17', minute: '00' },
])
const arrayValue = ref<unknown>([
  ['09', '00'],
  ['17', '00'],
])
const dateValue = ref<unknown>([new Date(2026, 4, 30, 9, 0), new Date(2026, 4, 30, 17, 0)])
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 280px;
  max-width: 280px;
  min-width: 240px;
}
</style>
