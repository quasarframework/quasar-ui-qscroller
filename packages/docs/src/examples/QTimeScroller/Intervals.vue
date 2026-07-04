<template>
  <div class="q-pa-md interval-examples">
    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Minute interval</div>
        <h4>Five-minute selection</h4>
        <p>Minutes move in five-minute steps while the hour remains fully selectable.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        minute-interval="5"
        class="interval-example__scroller"
        no-footer
        @input="selectedTime = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Hour interval</div>
        <h4>Two-hour selection</h4>
        <p>Hours move in two-hour steps while minutes continue to use the normal list.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        hour-interval="2"
        class="interval-example__scroller"
        no-footer
        @input="selectedTime = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Hour only</div>
        <h4>Hide the minute column</h4>
        <p>Use this when only hour-level selection should be available to the user.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        no-minutes
        class="interval-example__scroller"
        no-footer
        @input="selectedTime = $event"
      />
    </section>

    <section class="interval-example">
      <div class="interval-example__copy">
        <div class="text-overline text-primary">Minute only</div>
        <h4>Hide the hour column</h4>
        <p>Use this when the hour is owned elsewhere and only minutes should be adjusted.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selectedTime }}</strong>
        </div>
      </div>
      <q-time-scroller
        :value="selectedTime"
        no-hours
        class="interval-example__scroller"
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

const selectedTime = ref('09:30')
</script>

<style scoped lang="scss">
.interval-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.interval-example {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(180px, 240px);
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
  height: 260px;
  width: 100%;
}

@media (max-width: 620px) {
  .interval-example {
    grid-template-columns: 1fr;
  }
}
</style>
