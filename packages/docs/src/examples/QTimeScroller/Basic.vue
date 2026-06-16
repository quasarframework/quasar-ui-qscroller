<template>
  <div class="q-pa-md example-frame">
    <q-time-scroller
      :value="selectedTime"
      minute-interval="15"
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />

    <div class="text-caption q-mt-md">Selected time: {{ selectedTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedTime = ref('09:30')
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 320px;
}

.example-scroller {
  height: 260px;
  max-width: 240px;
}
</style>
