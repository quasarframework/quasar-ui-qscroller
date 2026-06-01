<template>
  <div class="q-pa-md example-grid">
    <q-time-range-scroller
      :value="selectedRange"
      color="blue-8"
      text-color="yellow-2"
      inner-color="blue-10"
      inner-text-color="yellow-2"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-time-range-scroller
      :value="selectedRange"
      border-color="purple-8"
      bar-color="orange-8"
      class="example-scroller"
      no-footer
      @input="selectedRange = $event"
    />

    <q-time-range-scroller
      :value="selectedRange"
      vertical-bar
      class="example-scroller themed-scroller"
      no-footer
      @input="selectedRange = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QTimeRangeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedRange = ref(["09:00", "17:00"]);
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
  min-width: 240px;
}

.themed-scroller {
  --q-scroller-border-color: var(--q-accent);
  --q-scroller-bar-color: color-mix(in srgb, var(--q-accent), transparent 35%);
}
</style>
