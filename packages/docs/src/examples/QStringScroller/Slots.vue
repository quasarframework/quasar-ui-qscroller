<template>
  <div class="q-pa-md example-frame">
    <q-string-scroller
      :value="selected"
      :items="items"
      class="example-scroller"
      rounded-borders
      @input="selected = $event"
    >
      <template #header="{ value }">
        <div class="text-weight-bold">Selected animal</div>
        <div class="text-caption">{{ value }}</div>
      </template>

      <template #footer="{ value }">
        <q-chip dense color="primary" text-color="white">{{ value }}</q-chip>
      </template>
    </q-string-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QStringScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selected = ref("Gibbon");
const items = ["Anteater", "Baboons", "Cheetah", "Gibbon", "Koala", "Penguin", "Tiger"].map(
  (value) => ({ value, noCaps: true }),
);
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 340px;
}

.example-scroller {
  height: 300px;
  max-width: 280px;
}
</style>
