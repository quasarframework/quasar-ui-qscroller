<template>
  <div class="q-pa-md example-frame">
    <q-string-scroller
      :value="selectedSize"
      :items="sizes"
      class="example-scroller"
      @input="selectedSize = $event"
    />

    <div class="text-caption q-mt-md">Selected size: {{ selectedSize }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QStringScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const selectedSize = ref("medium");

const sizes = [
  { label: "Extra small", value: "extra-small" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Extra large", value: "extra-large" },
];
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 280px;
}

.example-scroller {
  height: 220px;
  max-width: 280px;
}
</style>
