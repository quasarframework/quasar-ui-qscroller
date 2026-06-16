<template>
  <div class="q-pa-md example-frame">
    <q-time-range-scroller
      :value="selectedRange"
      class="example-scroller"
      rounded-borders
      @input="selectedRange = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Shift window</div>
        <div class="text-caption">{{ formatRange(value) }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">{{ formatRange(value) }}</q-chip>
      </template>
    </q-time-range-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['09:00', '17:00'])

function formatRange(value: unknown) {
  if (Array.isArray(value) && value.length === 2) {
    const [start, end] = value as Array<{ time?: string }>
    return `${start?.time ?? selectedRange.value[0]} - ${end?.time ?? selectedRange.value[1]}`
  }

  return selectedRange.value.join(' - ')
}
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 360px;
}

.example-scroller {
  height: 320px;
  max-width: 360px;
}
</style>
