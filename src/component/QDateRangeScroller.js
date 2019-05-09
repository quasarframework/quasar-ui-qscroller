// Styles
// import './date-range-scroller.styl'
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
  name: `q-date-range-scroller`,

  data () {
    return {
      dateStart: {
        year: 0,
        month: 0,
        day: 0
      },
      dateEnd: {
        year: 0,
        month: 0,
        day: 0
      }
    }
  },

  props: {
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
      staticClass: 'q-date-range-scroller fit'
    })
  }
})
