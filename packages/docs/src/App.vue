<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar'
import { useDark } from '@/.q-press/composables/dark'

import getMeta from '@/.q-press/assets/get-meta'

const { initDark } = useDark()
initDark()

useMeta({
  title: 'QScroller for Vue and Quasar',
  titleTemplate: (title) => `${title} | QScroller`,

  meta: getMeta(
    'QScroller - wheel-style string, time, date, and range scrollers for Vue and Quasar',
    'QScroller is a Vue and Quasar component for building compact string, time, date, and range scrollers and scroller controls.',
  ),
})
</script>
