<template>
  <div class="q-pa-md example-frame">
    <q-date-time-scroller
      :value="selectedDateTime"
      class="example-scroller"
      rounded-borders
      @input="selectedDateTime = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Appointment</div>
        <div class="text-caption">{{ value.date || '2026-05-30' }} {{ value.time || '09:30' }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">
          {{ value.date || '2026-05-30' }} {{ value.time || '09:30' }}
        </q-chip>
      </template>
    </q-date-time-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDateTime = ref('2026-05-30 09:30')
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 380px;
}

.example-scroller {
  height: 340px;
  max-width: 400px;
}
</style>
