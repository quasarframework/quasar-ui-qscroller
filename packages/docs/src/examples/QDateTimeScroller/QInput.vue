<template>
  <div class="q-pa-md example-frame">
    <QInput
      :model-value="selectedDateTime"
      label="Date and time"
      filled
      readonly
      class="example-input"
    >
      <template #append>
        <QIcon name="event" class="cursor-pointer q-mr-xs" />
        <QIcon name="schedule" class="cursor-pointer">
          <QPopupProxy v-model="showScroller" anchor="bottom right" self="top right">
            <q-date-time-scroller
              :value="selectedDateTime"
              rounded-borders
              class="popup-scroller"
              @input="selectedDateTime = $event"
              @close="showScroller = false"
            />
          </QPopupProxy>
        </QIcon>
      </template>
    </QInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIcon, QInput, QPopupProxy } from 'quasar'
import { QDateTimeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const showScroller = ref(false)
const selectedDateTime = ref('2026-05-30 09:30')
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 140px;
}

.example-input {
  max-width: 360px;
}

.popup-scroller {
  height: 300px;
  width: min(420px, 90vw);
}
</style>
