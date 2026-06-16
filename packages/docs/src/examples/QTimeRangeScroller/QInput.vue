<template>
  <div class="q-pa-md example-frame">
    <QInput :model-value="displayValue" label="Time range" filled readonly class="example-input">
      <template #append>
        <QIcon name="schedule" class="cursor-pointer">
          <QPopupProxy v-model="showScroller" anchor="bottom right" self="top right">
            <q-time-range-scroller
              :value="selectedRange"
              rounded-borders
              class="popup-scroller"
              @input="selectedRange = $event"
              @close="showScroller = false"
            />
          </QPopupProxy>
        </QIcon>
      </template>
    </QInput>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QIcon, QInput, QPopupProxy } from 'quasar'
import { QTimeRangeScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const showScroller = ref(false)
const selectedRange = ref(['09:00', '17:00'])
const displayValue = computed(() => selectedRange.value.join(' - '))
</script>

<style scoped lang="scss">
.example-frame {
  min-height: 140px;
}

.example-input {
  max-width: 340px;
}

.popup-scroller {
  height: 280px;
  width: min(320px, 90vw);
}
</style>
