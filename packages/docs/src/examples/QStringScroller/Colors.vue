<template>
  <div class="q-pa-md color-grid">
    <section class="color-example">
      <div class="color-example__copy">
        <div class="text-overline text-primary">Palette tokens</div>
        <h4>Quasar color names</h4>
        <p>Use palette names when the string scroller should follow the app color system.</p>
      </div>
      <q-string-scroller
        :value="selected"
        :items="items"
        color="blue-8"
        text-color="yellow-2"
        inner-color="blue-10"
        inner-text-color="yellow-2"
        border-color="blue-4"
        bar-color="yellow-2"
        class="example-scroller"
        no-footer
        @input="selected = $event"
      />
    </section>

    <section class="color-example">
      <div class="color-example__copy">
        <div class="text-overline text-primary">CSS colors</div>
        <h4>Hex values</h4>
        <p>Use CSS color strings when a brand theme comes from outside Quasar.</p>
      </div>
      <q-string-scroller
        :value="selected"
        :items="items"
        color="#7c2d12"
        text-color="#fff7ed"
        inner-color="#fff7ed"
        inner-text-color="#9a3412"
        border-color="#fb923c"
        bar-color="#ea580c"
        class="example-scroller"
        no-footer
        @input="selected = $event"
      />
    </section>

    <section class="color-example">
      <div class="color-example__copy">
        <div class="text-overline text-primary">CSS variables</div>
        <h4>Theme custom properties</h4>
        <p>Use CSS variables when the shell should react to app-level theme tokens.</p>
      </div>
      <q-string-scroller
        :value="selected"
        :items="items"
        color="--example-scroller-header"
        text-color="--example-scroller-header-text"
        inner-color="--example-scroller-surface"
        inner-text-color="--example-scroller-surface-text"
        border-color="--example-scroller-border"
        bar-color="--example-scroller-bar"
        class="example-scroller themed-scroller"
        no-footer
        rounded-borders
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
const items = ['Anteater', 'Baboons', 'Cheetah', 'Gibbon', 'Koala', 'Penguin', 'Tiger'].map(
  (value) => ({ value, noCaps: true }),
)
</script>

<style scoped lang="scss">
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.color-example {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(160, 79, 23, 0.7);
  border-radius: 6px;
}

.color-example__copy {
  h4 {
    margin: 0 0 8px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    line-height: 1.45;
  }
}

.example-scroller {
  height: 240px;
  width: 100%;
}

.themed-scroller {
  --example-scroller-header: #134e4a;
  --example-scroller-header-text: #ccfbf1;
  --example-scroller-surface: #ecfdf5;
  --example-scroller-surface-text: #115e59;
  --example-scroller-border: #14b8a6;
  --example-scroller-bar: #0f766e;
}
</style>
