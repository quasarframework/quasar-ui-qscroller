<template>
  <div class="q-pa-md example-frame">
    <q-date-range-scroller
      :value="selectedRange"
      class="example-scroller"
      rounded-borders
      @input="selectedRange = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Booking window</div>
        <div class="text-caption">{{ formatRange(value) }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">{{ formatRange(value) }}</q-chip>
      </template>
    </q-date-range-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateRangeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedRange = ref(["2026-05-24", "2026-05-30"]);

function formatRange(value: unknown) {
  if (Array.isArray(value) && value.length === 2) {
    const [start, end] = value as Array<{ date?: string }>;
    return `${start?.date ?? selectedRange.value[0]} - ${end?.date ?? selectedRange.value[1]}`;
  }

  return selectedRange.value.join(" - ");
}
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 380px;
}

.example-scroller {
  height: 340px;
  max-width: 680px;
}
</style>
