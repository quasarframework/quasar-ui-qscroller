import Vue from 'vue'

import props from '../utils/props'

export default Vue.extend({
  name: 'datetime-base',

  props: {
    ...props.base,
    ...props.dateTimeBase
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
