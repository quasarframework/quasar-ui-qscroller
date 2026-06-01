<template>
  <div class="q-pa-md example-frame">
    <q-date-time-scroller
      :value="selectedDateTime"
      year-begin="2024"
      year-stop="2028"
      minute-interval="15"
      class="example-scroller"
      @input="selectedDateTime = $event"
    />

    <div class="text-caption q-mt-md">Selected date and time: {{ selectedDateTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedDateTime = ref("2026-05-26 09:30");
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 340px;
}

.example-scroller {
  height: 280px;
  max-width: 560px;
}
</style>
