import Vue from 'vue'

import props from '../utils/props'

export default Vue.extend({
  name: 'datetime-base',

  props: {
    ...props.base,
    ...props.locale,
    hour24Format: {
      type: Boolean,
      default: true
    },
    amPmLabels: {
      type: Array,
      default: () => ['AM', 'PM'],
      validator: v => Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'string'
    }
  },

  data () {
    return {
      //
    }
  },

  computed: {
    //
  },

  methods: {
    //
  }
})
