<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Default labels</div>
        <h4>AM/PM selection</h4>
        <p>Use `hour12` to render a 12-hour time picker with the default AM and PM labels.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        hour12
        class="comparison-example__scroller"
        no-footer
        @input="selectedTime = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Compact labels</div>
        <h4>Custom AM/PM text</h4>
        <p>Use `am-pm-labels` when shorter labels fit better in constrained layouts.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        hour12
        :am-pm-labels="['a', 'p']"
        class="comparison-example__scroller"
        no-footer
        @input="selectedTime = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedTime = ref('13:30')
</script>

<style scoped lang="scss">
.comparison-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.comparison-example {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(180px, 240px);
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
  height: 260px;
  width: 100%;
}

@media (max-width: 620px) {
  .comparison-example {
    grid-template-columns: 1fr;
  }
}
</style>
