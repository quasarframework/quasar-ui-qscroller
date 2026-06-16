<template>
  <div class="q-pa-md example-grid">
    <q-time-scroller
      :value="selectedTime"
      hour12
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />

    <q-time-scroller
      :value="selectedTime"
      hour12
      :am-pm-labels="['a', 'p']"
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedTime = ref('13:30')
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
