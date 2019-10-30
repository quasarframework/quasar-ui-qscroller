// Scrollers
import ScrollerBase from './mixins/scroller-base'
import QStringScroller from './QStringScroller.js'
import QDateScroller from './QDateScroller.js'
import QTimeScroller from './QTimeScroller.js'
import QDateTimeScroller from './QDateTimeScroller.js'
import QTimeRangeScroller from './QTimeRangeScroller.js'
import QDateRangeScroller from './QDateRangeScroller.js'

import props from './utils/props.js'

/* @vue/component */
export default {
  name: 'QScroller',

  props: {
    ...props.common,
    ...props.view,
    ...props.scroller,
    ...props.base,
    ...props.locale,
    ...props.date,
    ...props.time,
    ...props.timeRange,
    ...props.dateRange,
    ...props.verticalBar,
    ...props.locale,
    hour12: Boolean,
    amPmLabels: Array
  },

  computed: {
    renderProps () {
      let component = 'div'
      switch (this.view) {
        case 'string':
          component = QStringScroller
          if (!this.items || !Array.isArray(this.items)) {
            throw new Error('QScroller: items [array] prop is required when view="string" (default)')
          }
          break
        case 'time':
          component = QTimeScroller
          break
        case 'date':
          component = QDateScroller
          break
        case 'date-time':
          component = QDateTimeScroller
          break
        case 'time-range':
          component = QTimeRangeScroller
          break
        case 'date-range':
          component = QDateRangeScroller
          break
        default:
          component = ScrollerBase
          break
      }

      return { component }
    }
  },

  methods: {
    __renderComponent (h, component, data) {
      return h(component, data)
    }
  },

  render (h) {
    const { component } = this.renderProps

    const data = {
      props: {
        ...this.$props
      },
      on: {
        ...this.$listeners
      },
      scopedSlots: this.$scopedSlots
    }

    return this.__renderComponent(h, component, data)
  }
}
