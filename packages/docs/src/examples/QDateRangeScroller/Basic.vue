<template>
  <div class="q-pa-md example-frame">
    <q-date-range-scroller
      :value="selectedRange"
      start-year-begin="2024"
      start-year-stop="2028"
      end-year-begin="2024"
      end-year-stop="2028"
      class="example-scroller"
      @input="selectedRange = $event"
    />

    <div class="text-caption q-mt-md">
      Selected date range: {{ selectedRange[0] }} to {{ selectedRange[1] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateRangeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedRange = ref(["2026-05-24", "2026-05-30"]);
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 340px;
}

.example-scroller {
  height: 280px;
  max-width: 640px;
}
</style>
