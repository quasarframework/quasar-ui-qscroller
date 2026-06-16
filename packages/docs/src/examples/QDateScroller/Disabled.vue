<template>
  <div class="q-pa-md example-grid">
    <q-date-scroller
      :value="selectedDate"
      class="example-scroller"
      no-footer
      disable
      @input="selectedDate = $event"
    />

    <q-date-scroller
      :value="selectedDate"
      :disabled-years="[2024]"
      :disabled-months="[6, 7, 8]"
      :disabled-days="[1, 2, 3]"
      disabled-text-color="orange-4"
      class="example-scroller"
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
</style>
