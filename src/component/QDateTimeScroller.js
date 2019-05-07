// Styles
// import './date-time-scroller.styl'
// import './time-scroller.styl'
// import './date-scroller.styl'

// Mixins
import DateTimeBase from './mixins/datetime-base'

// Util
import props from './utils/props'
// import { debounce, QBtn } from 'quasar'
// import {
//   PARSE_TIME,
//   padNumber
// } from './utils/timestamp'

/* @vue/component */
export default DateTimeBase.extend({
  name: `q-date-time-scroller`,

  data () {
    return {
      year: 0,
      month: 0,
      day: '',
      hour: 0,
      minute: 0
    }
  },

  props: {
    ...props.time,
    ...props.date

  },

  mounted () {
    //
  },

  computed: {
    //
  },

  watch: {
    //
  },

  methods: {

  },

  render (h) {
    return h('div', {
      staticClass: 'q-date-time-scroller fit'
    })
  }
})
