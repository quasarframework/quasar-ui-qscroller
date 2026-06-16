<template>
  <div class="q-pa-md example-grid">
    <q-time-range-scroller
      :value="selectedRange"
      class="example-scroller"
      no-footer
      disable
      @input="selectedRange = $event"
    />

    <q-time-range-scroller
      :value="selectedRange"
      :start-disabled-hours="[1, 2, 3, 4, 5, 6]"
      :end-disabled-hours="[1, 2, 3, 4, 5, 6]"
      :start-disabled-minutes="[10, 12, 14, 16, 18, 20]"
      :end-disabled-minutes="[10, 12, 14, 16, 18, 20]"
      disabled-text-color="orange-4"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['09:00', '17:00'])
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
