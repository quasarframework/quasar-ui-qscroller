<template>
  <div class="q-markdown">
    <example-title title="view='string'" />
    <example-card title="Basic" name="StringBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/string/Basic.vue').default)" />
    <example-card title="Colors" name="StringColors" :tag-parts="getTagParts(require('!!raw-loader!../examples/string/Colors.vue').default)" />
    <example-card title="QInput" name="StringQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/string/QInput.vue').default)" />
    <example-card title="Disabled" name="StringDisabled" :tag-parts="getTagParts(require('!!raw-loader!../examples/string/Disabled.vue').default)" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-app-extension-qmarkdown'

export default {
  name: 'String',

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

    this.addToToc('String')
    this.addToToc('Basic', 2)
    this.addToToc('Colors', 2)
    this.addToToc('QInput', 2)
    this.addToToc('Disabled', 2)

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
