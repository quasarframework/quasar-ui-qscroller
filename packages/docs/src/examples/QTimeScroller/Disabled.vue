<template>
  <div class="q-pa-md example-grid">
    <q-time-scroller
      :value="selectedTime"
      class="example-scroller"
      no-footer
      disable
      @input="selectedTime = $event"
    />

    <q-time-scroller
      :value="selectedTime"
      :disabled-hours="[1, 2, 3, 4, 5, 6]"
      :disabled-minutes="[10, 12, 14, 16, 18, 20]"
      disabled-text-color="orange-4"
      class="example-scroller"
      no-footer
      @input="selectedTime = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedTime = ref("09:30");
</script>

<style scoped lang="scss">
.example-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-scroller {
  height: 260px;
  max-width: 180px;
  min-width: 150px;
}
</style>
