<template>
  <div class="q-pa-md example-grid">
    <q-string-scroller
      :value="selected"
      :items="items"
      color="blue-8"
      text-color="yellow-2"
      inner-color="blue-10"
      inner-text-color="yellow-2"
      class="example-scroller"
      no-footer
      @input="selected = $event"
    />

    <q-string-scroller
      :value="selected"
      :items="items"
      border-color="purple-8"
      bar-color="orange-8"
      class="example-scroller"
      no-footer
      @input="selected = $event"
    />

    <q-string-scroller
      :value="selected"
      :items="items"
      class="example-scroller themed-scroller"
      no-footer
      rounded-borders
      @input="selected = $event"
    />
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
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 240px;
  max-width: 220px;
  min-width: 180px;
}

.themed-scroller {
  --q-scroller-border-color: var(--q-secondary);
  --q-scroller-bar-color: color-mix(in srgb, var(--q-secondary), transparent 35%);
  --q-scroller-background: color-mix(in srgb, var(--q-secondary), transparent 78%);
  --q-scroller-inner-background: color-mix(in srgb, var(--q-secondary), transparent 88%);
}
</style>
