<template>
  <div class="q-pa-md example-grid">
    <q-date-scroller
      :value="selectedDate"
      no-years
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />

    <q-date-scroller
      :value="selectedDate"
      no-months
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />

    <q-date-scroller
      :value="selectedDate"
      no-days
      class="example-scroller"
      no-footer
      @input="selectedDate = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedDate = ref("2026-05-30");
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 280px;
  max-width: 280px;
  min-width: 220px;
}
</style>
