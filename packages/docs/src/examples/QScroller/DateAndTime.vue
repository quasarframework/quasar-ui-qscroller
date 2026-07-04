<template>
  <div class="q-pa-md date-and-time">
    <div class="date-and-time__copy">
      <div class="text-overline text-primary">Wrapper views</div>
      <h3>Date and time views</h3>
      <p>
        Use the generic wrapper when the surrounding UI chooses the active scroller view. This
        example shows date and time values side by side with the current model visible.
      </p>

      <q-list dense bordered separator class="date-and-time__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Date</q-item-label>
            <q-item-label>{{ date }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Time</q-item-label>
            <q-item-label>{{ time }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="date-and-time__scrollers">
      <q-date-scroller :value="date" no-footer class="date-and-time__date" @input="date = $event" />

      <q-time-scroller :value="time" no-footer class="date-and-time__time" @input="time = $event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller, QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const date = ref('2026-05-26')
const time = ref('09:30')
</script>

<style scoped lang="scss">
.date-and-time {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(500px, 560px);
  gap: 24px;
  align-items: center;
  min-height: 340px;
}

.date-and-time__copy {
  display: grid;
  gap: 12px;
}

.date-and-time__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.date-and-time__copy p {
  margin: 0;
  max-width: 56ch;
}

.date-and-time__summary {
  overflow: hidden;
}

.date-and-time__scrollers {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.date-and-time__date {
  height: 260px;
  max-width: 280px;
  min-width: 240px;
}

.date-and-time__time {
  height: 260px;
  max-width: 220px;
  min-width: 180px;
}

@media (max-width: 1100px) {
  .date-and-time {
    grid-template-columns: 1fr;
  }
}
</style>
