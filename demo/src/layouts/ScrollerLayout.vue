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

        <q-toolbar-title v-if="$q.screen.width > 500">
          Quasar Scroller
          <q-tooltip v-if="$q.screen.width < 1077">
            Quasar Scroller
          </q-tooltip>
        </q-toolbar-title>

        <q-space></q-space>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="white"
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
          <q-list>
            <q-item clickable tag="a" target="_blank" href="http://v1.quasar-framework.org">
              <q-item-section avatar>
                <q-icon name="school"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Docs</q-item-label>
                <q-item-label caption>v1.quasar-framework.org</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
              <q-item-section avatar>
                <q-icon name="code"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Github</q-item-label>
                <q-item-label caption>github.com/quasarframework</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="http://chat.quasar-framework.org">
              <q-item-section avatar>
                <q-icon name="chat"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Discord Chat Channel</q-item-label>
                <q-item-label caption>chat.quasar-framework.org</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://forum.quasar-framework.org">
              <q-item-section avatar>
                <q-icon name="record_voice_over"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Forum</q-item-label>
                <q-item-label caption>forum.quasar-framework.org</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
              <q-item-section avatar>
                <q-icon name="rss_feed"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Twitter</q-item-label>
                <q-item-label caption>@quasarframework</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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

export default {
  name: 'ScrollerLayout',
  components: {
    'playground': () => import('../components/Playground')
  },
  data () {
    return {
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
        return this.$store.state.datetime.locale
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
