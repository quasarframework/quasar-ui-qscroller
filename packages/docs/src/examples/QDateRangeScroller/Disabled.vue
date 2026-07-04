<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Whole range scroller</div>
        <h4>Disable all interaction</h4>
        <p>Use `disable` when the existing range should remain visible but locked.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-date-range-scroller
        :value="selectedRange"
        class="comparison-example__scroller"
        start-show-month-label
        end-show-month-label
        no-footer
        disable
        @input="selectedRange = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Specific days</div>
        <h4>Disable unavailable range days</h4>
        <p>
          Use start/end disabled day lists to block specific values while keeping the rest
          selectable.
        </p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-date-range-scroller
        :value="selectedRange"
        :start-disabled-days="[1, 2, 3]"
        :end-disabled-days="[1, 2, 3]"
        disabled-text-color="orange-4"
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
  grid-template-columns: minmax(220px, 320px) minmax(420px, 660px);
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

@media (max-width: 860px) {
  .comparison-example {
    grid-template-columns: 1fr;
  }
}
</style>
