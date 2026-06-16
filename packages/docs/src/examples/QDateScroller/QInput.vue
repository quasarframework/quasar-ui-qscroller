<template>
  <div class="q-pa-md example-frame">
    <QInput :model-value="selectedDate" label="Date" filled readonly class="example-input">
      <template #append>
        <QIcon name="event" class="cursor-pointer">
          <QPopupProxy v-model="showScroller" anchor="bottom right" self="top right">
            <q-date-scroller
              :value="selectedDate"
              rounded-borders
              class="popup-scroller"
              @input="selectedDate = $event"
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
import { QDateScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const showScroller = ref(false)
const selectedDate = ref('2026-05-30')
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 140px;
}

.example-input {
  max-width: 320px;
}

.popup-scroller {
  height: 280px;
  width: min(360px, 90vw);
}
</style>
