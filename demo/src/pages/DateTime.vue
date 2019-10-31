<template>
  <div class="q-markdown">
    <example-title title="view='date-time'" />
    <example-card title="Basic" name="DateTimeBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Basic.vue').default)" />
    <example-card title="Colors" name="DateTimeColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Colors.vue').default)" />
    <example-card title="QInput" name="DateTimeQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/QInput.vue').default)" />
    <example-card title="Disabled" name="DateTimeDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Disabled.vue').default)" />
    <example-card title="Intervals" name="DateTimeIntervals" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Intervals.vue').default)" />
    <example-card title="Types" name="DateTimeTypes" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Types.vue').default)" />
    <example-card title="Locale" name="DateTimeLocale" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Locale.vue').default)" />
    <example-card title="Slots" name="DateTimeSlots" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-time/Slots.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import getTagParts from '@quasar/quasar-app-extension-qmarkdown/src/lib/getTagParts'

export default {
  name: 'DateTime',

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
