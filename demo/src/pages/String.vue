<template>
  <div class="q-markdown">
    <example-title title="view='string'" />
    <example-viewer title="Basic" file="string/Basic" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Colors" file="string/Colors" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="QInput" file="string/QInput" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Disabled" file="string/Disabled" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import { slugify } from 'assets/page-utils'
import { version } from 'ui'

export default {
  name: 'String',

  components: {
    ExampleTitle
  },

  data () {
    return {
      tempToc: [],
      locationUrl: 'https://github.com/quasarframework/quasar-ui-qscroller/tree/dev/demo/src/examples/',
      jsPaths: [`https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller@${ version }/dist/index.umd.min.js`],
      cssPaths: [
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller@${ version }/dist/index.min.css`,
        'https://cdn.jsdelivr.net/npm/@quasar/extras/fontawesome-v5/fontawesome-v5.css'
      ]
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('view=\'string\'')
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
    addToToc (name, level = 1) {
      let n = name
      if (level > 1) {
        n = 'example-' + n
      }
      const slug = slugify(n)
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
