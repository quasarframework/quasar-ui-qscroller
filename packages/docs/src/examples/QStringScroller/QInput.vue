<template>
  <div class="q-pa-md example-frame">
    <QInput :model-value="selected" label="Animal" filled readonly class="example-input">
      <template #append>
        <QIcon name="pets" class="cursor-pointer">
          <QPopupProxy v-model="showScroller" anchor="bottom right" self="top right">
            <q-string-scroller
              :value="selected"
              :items="items"
              rounded-borders
              class="popup-scroller"
              @input="selected = $event"
              @close="showScroller = false"
            />
          </QPopupProxy>
        </QIcon>
      </template>
    </QInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QIcon, QInput, QPopupProxy } from "quasar";
import { QStringScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const showScroller = ref(false);
const selected = ref("Gibbon");
const items = ["Anteater", "Baboons", "Cheetah", "Gibbon", "Koala", "Penguin", "Tiger"].map(
  (value) => ({ value, noCaps: true }),
);
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 140px;
}

.example-input {
  max-width: 320px;
}

.popup-scroller {
  height: 260px;
  width: min(320px, 90vw);
}
</style>
