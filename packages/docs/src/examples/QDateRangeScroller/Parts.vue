<template>
  <div class="q-pa-md example-grid">
    <q-date-range-scroller
      :value="selectedRange"
      start-no-years
      end-no-years
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-date-range-scroller
      :value="selectedRange"
      start-no-months
      end-no-months
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-date-range-scroller
      :value="selectedRange"
      start-no-days
      end-no-days
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
  max-width: 520px;
  min-width: 360px;
}
</style>
