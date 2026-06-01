<template>
  <div class="q-pa-md example-frame">
    <QInput :model-value="selectedTime" label="Time" filled readonly class="example-input">
      <template #append>
        <QIcon name="schedule" class="cursor-pointer">
          <QPopupProxy v-model="showScroller" anchor="bottom right" self="top right">
            <q-time-scroller
              :value="selectedTime"
              rounded-borders
              class="popup-scroller"
              @input="selectedTime = $event"
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
import { QTimeScroller } from "@quasar/quasar-ui-qscroller";
import "@quasar/quasar-ui-qscroller/src/index.scss";

const showScroller = ref(false);
const selectedTime = ref("09:30");
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
  width: min(220px, 90vw);
}
</style>
