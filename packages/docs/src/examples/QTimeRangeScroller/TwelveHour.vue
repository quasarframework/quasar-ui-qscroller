<template>
  <div class="q-pa-md example-grid">
    <q-time-range-scroller
      :value="selectedRange"
      hour12
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-time-range-scroller
      :value="selectedRange"
      hour12
      :start-am-pm-labels="['a', 'p']"
      :end-am-pm-labels="['a', 'p']"
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
