<template>
  <div class="q-pa-md date-basic">
    <div class="date-basic__copy">
      <div class="text-overline text-primary">Date model</div>
      <h3>Schedule date</h3>
      <p>
        Use the date scroller when the surrounding workflow should stay compact but nearby years,
        months, and days still matter.
      </p>

      <q-list dense bordered separator class="date-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected date</q-item-label>
            <q-item-label>{{ selectedDate }}</q-item-label>
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

    <q-date-scroller
      :value="selectedDate"
      year-begin="2024"
      year-stop="2028"
      class="date-basic__scroller"
      no-footer
      @input="selectedDate = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDate = ref('2026-05-26')
</script>

<style scoped lang="scss">
.date-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(280px, 340px);
  gap: 24px;
  align-items: center;
  min-height: 340px;
}

.date-basic__copy {
  display: grid;
  gap: 12px;
}

.date-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.date-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.date-basic__summary {
  overflow: hidden;
}

.date-basic__scroller {
  height: 260px;
  width: 100%;
}

@media (max-width: 740px) {
  .date-basic {
    grid-template-columns: 1fr;
  }
}
</style>
