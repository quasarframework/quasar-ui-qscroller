<template>
  <div class="q-markdown">
    <example-title title="view='time'" />
    <example-card title="Basic" name="TimeBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Basic.vue').default)" />
    <example-card title="Colors" name="TimeColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Colors.vue').default)" />
    <example-card title="QInput" name="TimeQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/QInput.vue').default)" />
    <example-card title="Disabled" name="TimeDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Disabled.vue').default)" />
    <example-card title="Intervals" name="TimeIntervals" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Intervals.vue').default)" />
    <example-card title="12 Hour" name="Time12Hour" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/12Hour.vue').default)" />
    <example-card title="Types" name="TimeTypes" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Types.vue').default)" />
    <example-card title="Slots" name="TimeSlots" :tag-parts="getTagParts(require('!!raw-loader!../examples/time/Slots.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-ui-qmarkdown'

export default {
  name: 'Time',

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

    this.addToToc('Time')
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
