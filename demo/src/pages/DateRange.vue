<template>
  <div class="q-markdown">
    <example-title title="view='date-range'" />
    <example-card title="Basic" name="DateRangeBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Basic.vue').default)" />
    <example-card title="Colors" name="DateRangeColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Colors.vue').default)" />
    <example-card title="QInput" name="DateRangeQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/QInput.vue').default)" />
    <example-card title="Disabled" name="DateRangeDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Disabled.vue').default)" />
    <example-card title="Intervals" name="DateRangeIntervals" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Intervals.vue').default)" />
    <example-card title="Types" name="DateRangeTypes" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Types.vue').default)" />
    <example-card title="Locale" name="DateRangeLocale" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Locale.vue').default)" />
    <example-card title="Slots" name="DateRangeSlots" :tag-parts="getTagParts(require('!!raw-loader!../examples/date-range/Slots.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-ui-qmarkdown'

export default {
  name: 'DateRange',

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

    this.addToToc('DateRange')
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
