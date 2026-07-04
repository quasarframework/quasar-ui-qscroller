<template>
  <div class="q-pa-md interval-examples">
    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Minute interval</div>
        <h4>Snap minutes to quarter hours</h4>
        <p>The full date-time model stays editable while minutes move in 15-minute steps.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedDateTime }}</strong>
        </div>
      </div>
      <q-date-time-scroller
        :value="selectedDateTime"
        minute-interval="15"
        class="interval-example__scroller"
        show-month-label
        no-footer
        @input="selectedDateTime = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Hidden year + hour interval</div>
        <h4>Edit a partial date-time surface</h4>
        <p>
          The year column is hidden and the hour column moves in two-hour steps against the same
          model.
        </p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedDateTime }}</strong>
        </div>
      </div>
      <q-date-time-scroller
        :value="selectedDateTime"
        hour-interval="2"
        no-years
        class="interval-example__scroller"
        show-month-label
        no-footer
        @input="selectedDateTime = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDateTime = ref('2026-05-30 09:30')
</script>

<style scoped lang="scss">
.interval-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.interval-example {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(360px, 500px);
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
  height: 300px;
  width: 100%;
}

@media (max-width: 820px) {
  .interval-example {
    grid-template-columns: 1fr;
  }
}
</style>
