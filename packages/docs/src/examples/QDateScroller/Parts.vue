<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Month and day only</div>
        <h4>Hide the year column</h4>
        <p>
          Use this when the year is fixed elsewhere and the user should only adjust month and day.
        </p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedDate }}</strong>
        </div>
      </div>
      <q-date-scroller
        :value="selectedDate"
        no-years
        class="comparison-example__scroller"
        show-month-label
        no-footer
        @input="selectedDate = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Year and day only</div>
        <h4>Hide the month column</h4>
        <p>
          Use this when the month is implicit and only the year/day fields should remain visible.
        </p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedDate }}</strong>
        </div>
      </div>
      <q-date-scroller
        :value="selectedDate"
        no-months
        class="comparison-example__scroller"
        no-footer
        @input="selectedDate = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Year and month only</div>
        <h4>Hide the day column</h4>
        <p>Use this when the user chooses a month-level value rather than a specific day.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedDate }}</strong>
        </div>
      </div>
      <q-date-scroller
        :value="selectedDate"
        no-days
        class="comparison-example__scroller"
        show-month-label
        no-footer
        @input="selectedDate = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDate = ref('2026-05-30')
</script>

<style scoped lang="scss">
.comparison-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.comparison-example {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(280px, 420px);
  gap: 20px;
  align-items: start;
  padding: 16px;
  border: 1px solid rgba(160, 79, 23, 0.7);
  border-radius: 6px;
}

.comparison-example__copy {
  h4 {
    margin: 0 0 12px;
    font-size: 1.25rem;
  }

  p {
    margin: 0 0 16px;
    line-height: 1.5;
  }
}

.model-preview {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid rgba(160, 79, 23, 0.45);
  border-radius: 4px;

  span {
    font-size: 11px;
    opacity: 0.75;
  }
}

.comparison-example__scroller {
  height: 280px;
  width: 100%;
}

@media (max-width: 760px) {
  .comparison-example {
    grid-template-columns: 1fr;
  }
}
</style>
