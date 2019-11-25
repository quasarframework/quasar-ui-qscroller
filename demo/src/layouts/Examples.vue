<template>
  <q-layout view="HHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          QScroller <span class="text-subtitle2">v{{ version }}</span>
        </q-toolbar-title>

        <q-space />

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        <div v-if="$q.screen.width > 500">Quasar v{{ $q.version }}</div>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Table of Contents"
        >
          <q-icon name="menu" />
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <div class="col-12">
        <q-expansion-item
          expand-separator
          default-opened
          group="somegroup"
          icon="fas fa-cogs"
          label="QScroller"
          caption="QScroller Examples"
        >
          <q-list dense bordered separator>

            <q-item clickable to="/examples/string">
              <q-item-section>
                <q-item-label>String</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/examples/time">
              <q-item-section>
                <q-item-label>Time</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/examples/date">
              <q-item-section>
                <q-item-label>Date</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/examples/time-range">
              <q-item-section>
                <q-item-label>Time Range</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/examples/date-range">
              <q-item-section>
                <q-item-label>Date Range</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/examples/date-time">
              <q-item-section>
                <q-item-label>Date/Time</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list dense>
          <q-item
            v-for="item in toc"
            :key="item.id"
            clickable
            v-ripple
            dense
            @click="scrollTo(item.id)"
            :active="activeToc === item.id"
          >
          <q-item-section v-if="item.level > 1" side> • </q-item-section>
            <q-item-section
              :class="`toc-item toc-level-${item.level}`"
            >{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition name="slide-left">
        <router-view />
      </transition>
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>

  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'
const { setScrollPosition } = scroll
import { version } from 'ui'

export default {
  name: 'ExamplesLayout',
  components: {
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      version: version,
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      activeToc: 0
    }
  },
  computed: {
    ...mapGetters({
      toc: 'common/toc'
    })
  },
  mounted () {
    // code to handle anchor link on refresh/new page, etc
    if (location.hash !== '') {
      const id = location.hash.substring(1, location.hash.length)
      setTimeout(() => {
        this.scrollTo(id)
      }, 200)
    }
  },
  methods: {
    scrollTo (id) {
      this.activeToc = id
      const el = document.getElementById(id)

      if (el) {
        setTimeout(() => {
          this.scrollPage(el)
        }, 200)
      }
    },
    scrollPage (el) {
      // const target = getScrollTarget(el)
      const offset = el.offsetTop - 50
      // setScrollPosition(target, offset, 500)
      setScrollPosition(window, offset, 500)
    }
  }
}
</script>
