<template>
  <div class="q-pa-md date-range-basic">
    <div class="date-range-basic__copy">
      <div class="text-overline text-primary">Date range model</div>
      <h3>Booking window</h3>
      <p>
        Collect start and end dates in one control. QDateRangeScroller keeps the emitted range
        ordered unless validation is explicitly disabled.
      </p>

      <q-list dense bordered separator class="date-range-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Start date</q-item-label>
            <q-item-label>{{ selectedRange[0] }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>End date</q-item-label>
            <q-item-label>{{ selectedRange[1] }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Year window</q-item-label>
            <q-item-label>2024 through 2028</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-date-range-scroller
      :value="selectedRange"
      start-year-begin="2024"
      start-year-stop="2028"
      end-year-begin="2024"
      end-year-stop="2028"
      class="date-range-basic__scroller"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['2026-05-24', '2026-05-30'])
</script>

<style scoped lang="scss">
.date-range-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(360px, 640px);
  gap: 24px;
  align-items: center;
  min-height: 360px;
}

.date-range-basic__copy {
  display: grid;
  gap: 12px;
}

.date-range-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.date-range-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.date-range-basic__summary {
  overflow: hidden;
}

.date-range-basic__scroller {
  height: 280px;
  width: 100%;
}

@media (max-width: 860px) {
  .date-range-basic {
    grid-template-columns: 1fr;
  }
}
</style>
