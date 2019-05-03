import Vue from 'vue'

// Styles
import './time-range-scroller.styl'
import './time-scroller.styl'

// Mixins
import Colorize from '../mixins/colorize'

// Util
import props from './utils/props'
import {
  padNumber
} from './utils/timestamp'

/* @vue/component */
export default Vue.extend({
  name: `q-time-range-scroller`,

  mixins: [Colorize],

  props: {
    ...props.base,
    ...props.dateTimeBase,
    ...props.timeRange
  },

  data () {
    return {
      timeStart: {
        hour: 0,
        minute: 0
      },
      startTimestamp: {},
      timeEnd: {
        hour: 0,
        minute: 0
      },
      endTimestamp: {}
    }
  },

  mounted () {
    this.splitTime()
  },

  computed: {
    //
  },

  watch: {
    value () {
      this.splitTime()
    },

    noHeader () {
      this.adjustBodyHeight()
    },

    noFooter () {
      this.adjustBodyHeight()
    }
  },

  methods: {
    emitValue () {
      this.$emit('input', [
        [padNumber(this.startTimestamp.hour, 2), padNumber(this.startTimestamp.minute, 2)].join(':'),
        [padNumber(this.endTimestamp.hour, 2), padNumber(this.endTimestamp.minute, 2)].join(':')
      ])
    },

    __renderHeader (h) {
      return ''
    },

    __renderBody (h) {

    },

    __renderFooter (h) {
      return ''
    }
  },

  render (h) {
    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      staticClass: 'q-time-range-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller--border': this.noBorder !== true
      }
    }), [
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ])
  }
})
