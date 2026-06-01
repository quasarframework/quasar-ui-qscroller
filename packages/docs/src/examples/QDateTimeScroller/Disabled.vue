<template>
  <div class="q-pa-md example-grid">
    <q-date-time-scroller
      :value="selectedDateTime"
      class="example-scroller"
      no-footer
      disable
      @input="selectedDateTime = $event"
    />

    <q-date-time-scroller
      :value="selectedDateTime"
      :disabled-days="[1, 2, 3]"
      :disabled-hours="[1, 2, 3, 4, 5, 6]"
      disabled-text-color="orange-4"
      class="example-scroller"
      no-footer
      @input="selectedDateTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedDateTime = ref("2026-05-30 09:30");
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 300px;
  max-width: 360px;
  min-width: 300px;
}
</style>
