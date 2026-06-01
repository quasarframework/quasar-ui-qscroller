<template>
  <div class="q-pa-md example-frame">
    <q-date-scroller
      :value="selectedDate"
      class="example-scroller"
      rounded-borders
      @input="selectedDate = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Due date</div>
        <div class="text-caption">{{ value.date || selectedDate }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">
          {{ value.date || selectedDate }}
        </q-chip>
      </template>
    </q-date-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedDate = ref("2026-05-30");
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 360px;
}

.example-scroller {
  height: 320px;
  max-width: 360px;
}
</style>
