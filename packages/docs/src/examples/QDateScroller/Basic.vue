<template>
  <div class="q-pa-md example-frame">
    <q-date-scroller
      :value="selectedDate"
      year-begin="2024"
      year-stop="2028"
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />

    <div class="text-caption q-mt-md">Selected date: {{ selectedDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDate = ref('2026-05-26')
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 320px;
}

.example-scroller {
  height: 260px;
  max-width: 320px;
}
</style>
