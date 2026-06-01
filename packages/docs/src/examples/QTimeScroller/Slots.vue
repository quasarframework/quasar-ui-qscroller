<template>
  <div class="q-pa-md example-frame">
    <q-time-scroller
      :value="selectedTime"
      class="example-scroller"
      rounded-borders
      @input="selectedTime = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Appointment time</div>
        <div class="text-caption">{{ value.time || selectedTime }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">
          {{ value.time || selectedTime }}
        </q-chip>
      </template>
    </q-time-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedTime = ref("09:30");
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 340px;
}

.example-scroller {
  height: 300px;
  max-width: 240px;
}
</style>
