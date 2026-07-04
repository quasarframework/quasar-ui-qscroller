<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Month/day range</div>
        <h4>Hide both year columns</h4>
        <p>Use this when the range belongs to a known year and users only adjust month and day.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-date-range-scroller
        :value="selectedRange"
        start-no-years
        end-no-years
        class="comparison-example__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="selectedRange = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Year/day range</div>
        <h4>Hide both month columns</h4>
        <p>Use this when the month is implied and the editable surface should stay narrower.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-date-range-scroller
        :value="selectedRange"
        start-no-months
        end-no-months
        class="comparison-example__scroller"
        no-footer
        @input="selectedRange = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Year/month range</div>
        <h4>Hide both day columns</h4>
        <p>
          Use this when users select a month-level range rather than specific start and end days.
        </p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-date-range-scroller
        :value="selectedRange"
        start-no-days
        end-no-days
        class="comparison-example__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        @input="selectedRange = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['2026-05-24', '2026-05-30'])
</script>

<style scoped lang="scss">
.comparison-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.comparison-example {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(420px, 620px);
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
  height: 300px;
  width: 100%;
}

@media (max-width: 820px) {
  .comparison-example {
    grid-template-columns: 1fr;
  }
}
</style>
