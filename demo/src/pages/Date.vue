<template>
  <div class="q-markdown">
    <example-title title="view='date'" />
    <example-card title="Basic" name="DateBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Basic.vue').default)" />
    <example-card title="Colors" name="DateColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Colors.vue').default)" />
    <example-card title="QInput" name="DateQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/QInput.vue').default)" />
    <example-card title="Disabled" name="DateDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Disabled.vue').default)" />
    <example-card title="Intervals" name="DateIntervals" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Intervals.vue').default)" />
    <example-card title="Types" name="DateTypes" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Types.vue').default)" />
    <example-card title="Locale" name="DateLocale" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Locale.vue').default)" />
    <example-card title="Slots" name="DateSlots" :tag-parts="getTagParts(require('!!raw-loader!../examples/date/Slots.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import getTagParts from '@quasar/quasar-app-extension-qmarkdown/src/lib/getTagParts'

export default {
  name: 'Date',

  components: {
    ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: []
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('Date')
    this.addToToc('Basic', 2)
    this.addToToc('Colors', 2)
    this.addToToc('QInput', 2)
    this.addToToc('Disabled', 2)
    this.addToToc('Intervals', 2)
    this.addToToc('Types', 2)
    this.addToToc('Locale', 2)
    this.addToToc('Slots', 2)

    this.toc = this.tempToc
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    }
  }
}
</script>
