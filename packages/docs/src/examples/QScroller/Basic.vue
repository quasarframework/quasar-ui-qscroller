<template>
  <div class="q-pa-md example-frame">
    <q-scroller
      :value="selected"
      :items="items"
      view="string"
      style="height: 220px; max-width: 280px"
      @input="selected = $event"
    />

    <div class="text-caption q-mt-md">Selected: {{ selected }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selected = ref("Medium");
const items = ["Small", "Medium", "Large", "Extra large"].map((value) => ({ value }));
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 280px;
}
</style>
