<template>
  <div class="q-pa-md example-frame">
    <q-select v-model="locale" :options="locales" label="Locale" filled class="example-select" />

    <q-date-time-scroller
      :value="selectedDateTime"
      :locale="locale"
      class="example-scroller q-mt-md"
      show-month-label
      no-footer
      @input="selectedDateTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedDateTime = ref('2026-05-30 09:30')
const locale = ref('en-us')
const locales = ['en-us', 'fr', 'ro', 'sv-SE', 'ru', 'ar', 'ca']
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
  max-width: 460px;
}
</style>
