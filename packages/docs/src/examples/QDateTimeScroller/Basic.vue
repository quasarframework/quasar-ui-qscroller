<template>
  <div class="q-pa-md date-time-basic">
    <div class="date-time-basic__copy">
      <div class="text-overline text-primary">Date + time model</div>
      <h3>Appointment start</h3>
      <p>
        Combine date and time selection when a single model value should represent a scheduled
        moment in the user interface.
      </p>

      <q-list dense bordered separator class="date-time-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected date-time</q-item-label>
            <q-item-label>{{ selectedDateTime }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Date portion</q-item-label>
            <q-item-label>{{ selectedParts[0] }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Time portion</q-item-label>
            <q-item-label>{{ selectedParts[1] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-date-time-scroller
      :value="selectedDateTime"
      year-begin="2024"
      year-stop="2028"
      minute-interval="15"
      class="date-time-basic__scroller"
      no-footer
      @input="selectedDateTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDateTime = ref('2026-05-26 09:30')
const selectedParts = computed(() => selectedDateTime.value.split(' '))
</script>

<style scoped lang="scss">
.date-time-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(360px, 560px);
  gap: 24px;
  align-items: center;
  min-height: 360px;
}

.date-time-basic__copy {
  display: grid;
  gap: 12px;
}

.date-time-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.date-time-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.date-time-basic__summary {
  overflow: hidden;
}

.date-time-basic__scroller {
  height: 280px;
  width: 100%;
}

@media (max-width: 860px) {
  .date-time-basic {
    grid-template-columns: 1fr;
  }
}
</style>
