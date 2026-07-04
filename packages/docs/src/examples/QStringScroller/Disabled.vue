<template>
  <div class="q-pa-md comparison-examples">
    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Whole string scroller</div>
        <h4>Disable all interaction</h4>
        <p>Use `disable` when the current string value should be visible but locked.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selected }}</strong>
        </div>
      </div>
      <q-string-scroller
        :value="selected"
        :items="items"
        class="comparison-example__scroller"
        no-footer
        disable
        @input="selected = $event"
      />
    </section>

    <section class="comparison-example">
      <div class="comparison-example__copy">
        <div class="text-overline text-primary">Specific items</div>
        <h4>Disable unavailable options</h4>
        <p>Use item-level `disabled` flags to keep only some choices unavailable.</p>
        <div class="model-preview">
          <span>Shared model</span>
          <strong>{{ selected }}</strong>
        </div>
      </div>
      <q-string-scroller
        :value="selected"
        :items="items"
        disabled-text-color="orange-4"
        class="comparison-example__scroller"
        no-footer
        @input="selected = $event"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QStringScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selected = ref('Gibbon')
const items = [
  { value: 'Anteater', noCaps: true },
  { value: 'Baboons', noCaps: true, disabled: true },
  { value: 'Cheetah', noCaps: true },
  { value: 'Gibbon', noCaps: true },
  { value: 'Koala', noCaps: true, disabled: true },
  { value: 'Penguin', noCaps: true },
  { value: 'Tiger', noCaps: true },
]
</script>

<style scoped lang="scss">
.comparison-examples {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.comparison-example {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(220px, 300px);
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
  height: 240px;
  width: 100%;
}

@media (max-width: 680px) {
  .comparison-example {
    grid-template-columns: 1fr;
  }
}
</style>
