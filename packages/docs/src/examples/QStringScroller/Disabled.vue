<template>
  <div class="q-pa-md example-grid">
    <q-string-scroller
      :value="selected"
      :items="items"
      class="example-scroller"
      no-footer
      disable
      @input="selected = $event"
    />

    <q-string-scroller
      :value="selected"
      :items="items"
      disabled-text-color="orange-4"
      class="example-scroller"
      no-footer
      @input="selected = $event"
    />
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
</style>
