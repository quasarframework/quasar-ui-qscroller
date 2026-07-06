<template>
  <div class="q-pa-md time-basic">
    <div class="time-basic__copy">
      <div class="text-overline text-primary">Minute intervals</div>
      <h3>Meeting time</h3>
      <p>
        Use the time scroller when users need a compact hour/minute picker with predictable steps.
        This example snaps minutes to 15-minute intervals.
      </p>

      <q-list dense bordered separator class="time-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected time</q-item-label>
            <q-item-label>{{ selectedTime }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Minute interval</q-item-label>
            <q-item-label>15 minutes</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-time-scroller
      :value="selectedTime"
      minute-interval="15"
      class="time-basic__scroller"
      no-footer
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
.time-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(180px, 240px);
  gap: 24px;
  align-items: center;
  min-height: 340px;
}

.time-basic__copy {
  display: grid;
  gap: 12px;
}

.time-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.time-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.time-basic__summary {
  overflow: hidden;
}

.time-basic__scroller {
  height: 260px;
  width: 100%;
}

@media (max-width: 700px) {
  .time-basic {
    grid-template-columns: 1fr;
  }
}
</style>
