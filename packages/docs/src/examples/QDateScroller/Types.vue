<template>
  <div class="q-pa-md example-grid">
    <q-date-scroller
      :value="stringValue"
      class="example-scroller"
      no-footer
      @input="stringValue = $event"
    />
    <q-date-scroller
      :value="objectValue"
      class="example-scroller"
      no-footer
      @input="objectValue = $event"
    />
    <q-date-scroller
      :value="arrayValue"
      class="example-scroller"
      no-footer
      @input="arrayValue = $event"
    />
    <q-date-scroller
      :value="dateValue"
      class="example-scroller"
      no-footer
      @input="dateValue = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const stringValue = ref<unknown>('2026-05-30')
const objectValue = ref<unknown>({ year: '2026', month: '05', day: '30' })
const arrayValue = ref<unknown>(['2026', '05', '30'])
const dateValue = ref<unknown>(new Date(2026, 4, 30))
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 280px;
  max-width: 320px;
  min-width: 260px;
}
</style>
