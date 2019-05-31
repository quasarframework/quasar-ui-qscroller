<template>
  <hero>
    <div class="q-markdown">
      Coming soon!
    </div>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import { slugify } from 'assets/page-utils'

export default {
  name: 'Examples',

  components: {
    Hero
  },

  data () {
    return {
      tempToc: []
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    // this.addToToc('Basic')
    // this.addToToc('Default', 2)

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
