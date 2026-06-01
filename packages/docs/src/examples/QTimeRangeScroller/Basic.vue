<template>
  <div class="q-pa-md example-frame">
    <q-time-range-scroller
      :value="selectedRange"
      start-minute-interval="15"
      end-minute-interval="15"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <div class="text-caption q-mt-md">
      Selected time range: {{ selectedRange[0] }} to {{ selectedRange[1] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QTimeRangeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedRange = ref(["09:00", "17:00"]);
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 320px;
}

.example-scroller {
  height: 260px;
  max-width: 520px;
}
</style>
