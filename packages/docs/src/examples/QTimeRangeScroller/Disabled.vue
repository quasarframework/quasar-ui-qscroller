<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Whole time range</div>
        <h4>Disable all interaction</h4>
        <p>Use `disable` when a selected range should be visible but locked.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-time-range-scroller
        :value="selectedRange"
        class="comparison-example__scroller"
        no-footer
        disable
        @input="selectedRange = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Specific range parts</div>
        <h4>Disable unavailable values</h4>
        <p>Use start/end disabled hour and minute lists to block invalid choices in either side.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-time-range-scroller
        :value="selectedRange"
        :start-disabled-hours="[1, 2, 3, 4, 5, 6]"
        :end-disabled-hours="[1, 2, 3, 4, 5, 6]"
        :start-disabled-minutes="[10, 12, 14, 16, 18, 20]"
        :end-disabled-minutes="[10, 12, 14, 16, 18, 20]"
        disabled-text-color="orange-4"
        class="comparison-example__scroller"
        no-footer
        @input="selectedRange = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['09:00', '17:00'])
</script>

<style scoped lang="scss">
.comparison-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.comparison-example {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(300px, 420px);
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
