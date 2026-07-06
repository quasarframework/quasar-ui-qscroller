<template>
  <div class="q-pa-md time-range-basic">
    <div class="time-range-basic__copy">
      <div class="text-overline text-primary">Range selection</div>
      <h3>Work block</h3>
      <p>
        Let the range scroller collect start and end times together. The vertical bar keeps paired
        hour/minute columns visually connected.
      </p>

      <q-list dense bordered separator class="time-range-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Start time</q-item-label>
            <q-item-label>{{ selectedRange[0] }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>End time</q-item-label>
            <q-item-label>{{ selectedRange[1] }}</q-item-label>
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

    <q-time-range-scroller
      :value="selectedRange"
      start-minute-interval="15"
      end-minute-interval="15"
      vertical-bar
      class="time-range-basic__scroller"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['09:00', '17:00'])
</script>

<style scoped lang="scss">
.time-range-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(240px, 280px);
  gap: 24px;
  align-items: center;
  min-height: 340px;
}

.time-range-basic__copy {
  display: grid;
  gap: 12px;
}

.time-range-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.time-range-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.time-range-basic__summary {
  overflow: hidden;
}

.time-range-basic__scroller {
  height: 260px;
  width: 100%;
}

@media (max-width: 740px) {
  .time-range-basic {
    grid-template-columns: 1fr;
  }
}
</style>
