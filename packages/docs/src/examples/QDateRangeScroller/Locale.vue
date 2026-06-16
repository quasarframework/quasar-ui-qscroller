<template>
  <div class="q-pa-md example-frame">
    <q-select v-model="locale" :options="locales" label="Locale" filled class="example-select" />

    <q-date-range-scroller
      :value="selectedRange"
      :locale="locale"
      class="example-scroller q-mt-md"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedRange = ref(['2026-05-24', '2026-05-30'])
const locale = ref('en-us')
const locales = ['en-us', 'fr', 'ro', 'se', 'ru', 'ar', 'ca']
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 400px;
}

.example-select {
  max-width: 280px;
}

.example-scroller {
  height: 300px;
  max-width: 620px;
}
</style>
