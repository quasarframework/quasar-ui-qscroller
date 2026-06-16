<template>
  <div class="q-pa-md example-grid">
    <q-date-range-scroller
      :value="selectedRange"
      class="example-scroller"
      no-footer
      disable
      @input="selectedRange = $event"
    />

    <q-date-range-scroller
      :value="selectedRange"
      :start-disabled-days="[1, 2, 3]"
      :end-disabled-days="[1, 2, 3]"
      disabled-text-color="orange-4"
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
