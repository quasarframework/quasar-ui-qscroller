<template>
  <div class="q-markdown">
    <example-title title="view='date-range'" />
    <example-viewer title="Basic" file="date-range/Basic" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Colors" file="date-range/Colors" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="QInput" file="date-range/QInput" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Disabled" file="date-range/Disabled" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Intervals" file="date-range/Intervals" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Types" file="date-range/Types" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
      <q-markdown>
Open the browser's Dev Tools (console) and then click on examples to see the different types.
      </q-markdown>
    </example-viewer>
    <example-viewer title="Locale" file="date-range/Locale" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
    <example-viewer title="Slots" file="date-range/Slots" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
  </div>
</template>

<script>
import ExampleTitle from '../components/ExampleTitle'
import { slugify } from 'assets/page-utils'
import { version } from 'ui'

export default {
  name: 'DateRange',

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

    this.addToToc('view=\'date-range\'')
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
