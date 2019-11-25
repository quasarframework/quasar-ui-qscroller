<template>
  <div class="q-markdown">
    <example-title title="view='time-range'" />
    <example-card title="Basic" name="TimeRangeBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Basic.vue').default)" />
    <example-card title="Colors" name="TimeRangeColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Colors.vue').default)" />
    <example-card title="QInput" name="TimeRangeQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/QInput.vue').default)" />
    <example-card title="Disabled" name="TimeRangeDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Disabled.vue').default)" />
    <example-card title="Intervals" name="TimeRangeIntervals" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Intervals.vue').default)" />
    <example-card title="12 Hour" name="TimeRange12Hour" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/12Hour.vue').default)" />
    <example-card title="Types" name="TimeRangeTypes" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Types.vue').default)" />
    <example-card title="Slots" name="TimeRangeSlots" :tag-parts="getTagParts(require('!!raw-loader!../examples/time-range/Slots.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-app-extension-qmarkdown'

export default {
  name: 'TimeRange',

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

    this.addToToc('TimeRange')
    this.addToToc('Basic', 2)
    this.addToToc('Colors', 2)
    this.addToToc('QInput', 2)
    this.addToToc('Disabled', 2)
    this.addToToc('Intervals', 2)
    this.addToToc('12 Hour', 2)
    this.addToToc('Types', 2)
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
