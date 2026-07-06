<template>
  <div class="q-pa-md interval-examples">
    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Minute intervals</div>
        <h4>Quarter-hour range</h4>
        <p>Both start and end minutes move in 15-minute steps against the shared range.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-time-range-scroller
        :value="selectedRange"
        start-minute-interval="15"
        end-minute-interval="15"
        class="interval-example__scroller"
        no-footer
        @input="selectedRange = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Hour intervals</div>
        <h4>Two-hour range</h4>
        <p>Both start and end hours move in two-hour steps while minutes stay visible.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-time-range-scroller
        :value="selectedRange"
        start-hour-interval="2"
        end-hour-interval="2"
        class="interval-example__scroller"
        no-footer
        @input="selectedRange = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Hour-only range</div>
        <h4>Hide both minute columns</h4>
        <p>Use this when a time range only needs hour-level precision.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedRange.join(' to ') }}</strong>
        </div>
      </div>
      <q-time-range-scroller
        :value="selectedRange"
        start-no-minutes
        end-no-minutes
        class="interval-example__scroller"
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
.interval-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.interval-example {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(300px, 420px);
  gap: 20px;
  align-items: start;
  padding: 16px;
  border: 1px solid rgba(160, 79, 23, 0.7);
  border-radius: 6px;
}

.interval-example__copy {
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

.interval-example__scroller {
  height: 280px;
  width: 100%;
}

@media (max-width: 760px) {
  .interval-example {
    grid-template-columns: 1fr;
  }
}
</style>
