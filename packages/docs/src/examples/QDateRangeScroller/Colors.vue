<template>
  <div class="q-pa-md example-grid">
    <q-date-range-scroller
      :value="selectedRange"
      color="blue-8"
      text-color="yellow-2"
      inner-color="blue-10"
      inner-text-color="yellow-2"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-date-range-scroller
      :value="selectedRange"
      border-color="purple-8"
      bar-color="orange-8"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['2026-05-24', '2026-05-30'])
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 300px;
  max-width: 620px;
  min-width: 420px;
}
</style>
