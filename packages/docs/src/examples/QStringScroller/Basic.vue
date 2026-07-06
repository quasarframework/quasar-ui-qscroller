<template>
  <div class="q-pa-md string-basic">
    <div class="string-basic__copy">
      <div class="text-overline text-primary">Fixed choices</div>
      <h3>Size picker</h3>
      <p>
        Use a string scroller for compact option sets where nearby choices help users understand the
        available scale.
      </p>

      <q-list dense bordered separator class="string-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected value</q-item-label>
            <q-item-label>{{ selectedSize }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected label</q-item-label>
            <q-item-label>{{ selectedLabel }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Choice count</q-item-label>
            <q-item-label>{{ sizes.length }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-string-scroller
      :value="selectedSize"
      :items="sizes"
      class="string-basic__scroller"
      no-footer
      @input="selectedSize = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QStringScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selectedSize = ref('medium')

const sizes = [
  { label: 'Extra small', value: 'extra-small' },
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
  { label: 'Extra large', value: 'extra-large' },
]

const selectedLabel = computed(
  () => sizes.find((entry) => entry.value === selectedSize.value)?.label ?? selectedSize.value,
)
</script>

<style scoped lang="scss">
.string-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(220px, 280px);
  gap: 24px;
  align-items: center;
  min-height: 300px;
}

.string-basic__copy {
  display: grid;
  gap: 12px;
}

.string-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.string-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.string-basic__summary {
  overflow: hidden;
}

.string-basic__scroller {
  height: 220px;
  width: 100%;
}

@media (max-width: 700px) {
  .string-basic {
    grid-template-columns: 1fr;
  }
}
</style>
