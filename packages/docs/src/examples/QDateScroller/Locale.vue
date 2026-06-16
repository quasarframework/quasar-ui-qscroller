<template>
  <div class="q-pa-md example-frame">
    <q-select v-model="locale" :options="locales" label="Locale" filled class="example-select" />

    <q-date-scroller
      :value="selectedDate"
      :locale="locale"
      class="example-scroller q-mt-md"
      no-footer
      @input="selectedDate = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDate = ref('2026-05-30')
const locale = ref('en-us')
const locales = ['en-us', 'fr', 'ro', 'se', 'ru', 'ar', 'ca']
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 380px;
}

.example-select {
  max-width: 280px;
}

.example-scroller {
  height: 280px;
  max-width: 320px;
}
</style>
