<template>
  <div class="q-pa-md example-grid">
    <q-time-scroller
      :value="stringValue"
      class="example-scroller"
      no-footer
      @input="stringValue = $event"
    />
    <q-time-scroller
      :value="objectValue"
      class="example-scroller"
      no-footer
      @input="objectValue = $event"
    />
    <q-time-scroller
      :value="arrayValue"
      class="example-scroller"
      no-footer
      @input="arrayValue = $event"
    />
    <q-time-scroller
      :value="dateValue"
      class="example-scroller"
      no-footer
      @input="dateValue = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>('09:00')
const objectValue = ref<unknown>({ hour: '09', minute: '10' })
const arrayValue = ref<unknown>(['09', '20'])
const dateValue = ref<unknown>(new Date(2026, 4, 30, 9, 30))
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 260px;
  max-width: 180px;
  min-width: 150px;
}
</style>
