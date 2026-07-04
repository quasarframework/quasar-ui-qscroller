<template>
  <div class="q-pa-md qscroller-basic">
    <div class="qscroller-basic__copy">
      <div class="text-overline text-primary">Generic wrapper</div>
      <h3>String view</h3>
      <p>
        Use the generic component when a single template needs to switch between scroller views. The
        model stays simple while the wrapper handles the active view.
      </p>

      <q-list dense bordered separator class="qscroller-basic__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>View</q-item-label>
            <q-item-label>string</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected value</q-item-label>
            <q-item-label>{{ selected }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Available choices</q-item-label>
            <q-item-label>{{ items.length }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-scroller
      :value="selected"
      :items="items"
      view="string"
      no-footer
      class="qscroller-basic__scroller"
      @input="selected = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QScroller } from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/src/index.scss'

const selected = ref('Medium')
const items = ['Small', 'Medium', 'Large', 'Extra large'].map((value) => ({ value }))
</script>

<style scoped lang="scss">
.qscroller-basic {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(220px, 280px);
  gap: 24px;
  align-items: center;
  min-height: 300px;
}

.qscroller-basic__copy {
  display: grid;
  gap: 12px;
}

.qscroller-basic__copy h3 {
  margin: 0;
  font-size: 1.35rem;
}

.qscroller-basic__copy p {
  margin: 0;
  max-width: 56ch;
}

.qscroller-basic__summary {
  overflow: hidden;
}

.qscroller-basic__scroller {
  height: 220px;
  width: 100%;
}

@media (max-width: 700px) {
  .qscroller-basic {
    grid-template-columns: 1fr;
  }
}
</style>
