<template>
  <div class="q-pa-md example-grid">
    <q-time-scroller
      :value="selectedTime"
      color="blue-8"
      text-color="yellow-2"
      inner-color="blue-10"
      inner-text-color="yellow-2"
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />

    <q-time-scroller
      :value="selectedTime"
      bar-color="orange-8"
      border-color="purple-8"
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />

    <q-time-scroller
      :value="selectedTime"
      class="example-scroller themed-scroller"
      no-footer
      vertical-bar
      @input="selectedTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedTime = ref('09:30')
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

.themed-scroller {
  --q-scroller-border-color: var(--q-accent);
  --q-scroller-bar-color: color-mix(in srgb, var(--q-accent), transparent 35%);
  --q-scroller-inner-background: color-mix(in srgb, var(--q-accent), transparent 88%);
}
</style>
