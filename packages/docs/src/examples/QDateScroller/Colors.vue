<template>
  <div class="q-pa-md example-grid">
    <q-date-scroller
      :value="selectedDate"
      color="blue-8"
      text-color="yellow-2"
      inner-color="blue-10"
      inner-text-color="yellow-2"
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />

    <q-date-scroller
      :value="selectedDate"
      border-color="purple-8"
      bar-color="orange-8"
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />

    <q-date-scroller
      :value="selectedDate"
      vertical-bar
      class="example-scroller themed-scroller"
      no-footer
      @input="selectedDate = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDate = ref('2026-05-30')
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

.themed-scroller {
  --q-scroller-border-color: var(--q-accent);
  --q-scroller-bar-color: color-mix(in srgb, var(--q-accent), transparent 35%);
}
</style>
