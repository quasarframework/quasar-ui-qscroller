<template>
  <q-layout view="HHh Lpr lFf">

    <q-header elevated>
      <q-resize-observer @resize="onTitlebarResized"></q-resize-observer>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu"></q-icon>
        </q-btn>

        <q-icon name="far fa-calendar-alt" class="q-ml-md" size="1.5rem"></q-icon>

        <q-toolbar-title>
          QScroller <span class="text-subtitle2">v{{ version }}</span>
        </q-toolbar-title>

        <q-space />

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        <div v-if="$q.screen.width > 500">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="350"
    >
      <div class="col-12">
        <q-expansion-item
          expand-separator
          default-opened
          group="somegroup"
          icon="fas fa-cogs"
          label="Playground"
          caption="Play with properties"
        >
          <playground></playground>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="somegroup"
          icon="fas fa-link"
          label="Essential Links"
        >
          <essential-links />
        </q-expansion-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { version } from 'ui'

export default {
  name: 'ScrollerLayout',
  components: {
    'playground': () => import('../components/Playground'),
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      version: version,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  beforeMount () {
  },
  computed: {
    titlebarHeight: {
      get () {
        return this.$store.state.common.titlebarHeight
      },
      set (height) {
        this.$store.commit('common/titlebarHeight', height)
      }
    },
    displayedLocale () {
      if (this.locale === void 0 || this.locale === '') {
        return 'en-US'
      }
      return this.locale
    },
    locale:
    {
      get () {
        return this.$store.state.scroller.locale
      },
      set (locale) {
        this.$store.commit('scroller/locale', locale)
      }
    }
  },
  watch: {
  },
  methods: {
    openURL,
    onTitlebarResized (size) {
      this.titlebarHeight = size.height
    }
  }
}
</script>

<style>
</style>
