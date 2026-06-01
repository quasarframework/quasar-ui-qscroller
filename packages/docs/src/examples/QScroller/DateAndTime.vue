<template>
  <div class="q-pa-md row q-col-gutter-lg items-start">
    <q-date-scroller
      :value="date"
      no-footer
      style="height: 260px; max-width: 280px"
      @input="date = $event"
    />

    <q-time-scroller
      :value="time"
      no-footer
      style="height: 260px; max-width: 220px"
      @input="time = $event"
    />

    <div class="col-12 text-caption">Date: {{ date }} · Time: {{ time }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QDateScroller, QTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const date = ref("2026-05-26");
const time = ref("09:30");
</script>
