// Mixins
import TimeBase from './mixins/time-base'
import Colorize from './mixins/colorize'
import QTimeScroller from './QTimeScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'

/* @vue/component */
export default TimeBase.extend({
  name: `q-time-range-scroller`,

  mixins: [Colorize],

  props: {
    ...props.timeRange
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      startTime: '',
      endTime: '',
      type: null
    }
  },

  mounted () {
    if (!(Array.isArray(this.value) || typeof this.value === 'string')) {
      console.error('QTimeRangeScroller - value (v-model) must to be an array of times')
    }
    if (Array.isArray(this.value) && this.value.length !== 2) {
      console.error('QTimeRangeScroller - value (v-model) must contain 2 array elements')
    }
    this.splitTime()
    this.adjustBodyHeight()
  },

  computed: {
    displayTime () {
      if (this.startTime !== void 0 && this.endTime !== void 0) {
        if (this.$refs.startTime && this.$refs.endTime) {
          return this.$refs.startTime.displayTime + this.displaySeparator + this.$refs.endTime.displayTime
        }
        return `${this.startTime}${this.displaySeparator}${this.endTime}`
      }
      return ''
    }
  },

  watch: {
    value () {
      this.splitTime()
    },

    startTime () {
      this.emitValue()
    },

    endTime () {
      this.emitValue()
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
      if (this.type === 'array') {
        this.$emit('input', [
          this.startTime, this.endTime
        ])
      } else if (this.type === 'string') {
        this.$emit('input', `${this.startTime}${this.displaySeparator}${this.endTime}`)
      }
    },

    onResize ({ height }) {
      this.adjustBodyHeight()
    },

    adjustBodyHeight () {
      if (this.height !== void 0) {
        this.bodyHeight = this.height
      } else {
        this.$nextTick(() => {
          let headerHeight = this.noHeader ? 0 : this.$refs.header ? this.$refs.header.clientHeight : 0
          let footerHeight = this.noFooter ? 0 : this.$refs.footer ? this.$refs.footer.clientHeight : 0
          this.headerFooterHeight = headerHeight + footerHeight
          const parentHeight = this.$refs.scroller ? window.getComputedStyle(this.$refs.scroller, null).getPropertyValue('height') : 0
          this.bodyHeight = parseInt(parentHeight) - this.headerFooterHeight
        })
      }
    },

    splitTime () {
      if (Array.isArray(this.value)) {
        const start = this.value[0].trim()
        const end = this.value[1].trim()
        if (this.isValidTime(start) && this.isValidTime(end)) {
          this.startTime = start
          this.endTime = end
          this.type = 'array'
          return
        }
      } else {
        const parts = this.value.split(this.displaySeparator)
        if (parts.length === 2) {
          const start = parts[0].trim()
          const end = parts[1].trim()
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
            this.type = 'string'
            return
          }
        }
      }
      console.error(`QTimeRangeScroller: invalid time format - '${this.value}'`)
    },

    isValidTime (time) {
      let parts = time.split(':')
      if (parts.length === 2) {
        let hour = parseInt(parts[0])
        let minute = parseInt(parts[1])
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
          return true
        }
      }
      return false
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.timeHeader
      return h('div', {
        ref: 'header',
        staticClass: 'q-scroller__header flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot([this.$refs.startTime.getTimestamp(), this.$refs.endTime.getTimestamp()]) : [
        this.displayTime
      ])
    },

    __renderStartTime (h) {
      return h(QTimeScroller, {
        ref: 'startTime',
        staticClass: 'col-6',
        props: {
          value: this.startTime,
          locale: this.locale,
          showVerticalBar: true,
          barColor: this.barColor,
          color: this.color,
          backgroundColor: this.backgroundColor,
          innerColor: this.innerColor,
          innerBackgroundColor: this.innerBackgroundColor,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          hour24Format: this.hour24Format,
          amPmLabels: this.amPmLabels,
          minuteInterval: this.startMinuteInterval,
          hourInterval: this.startHourInterval,
          shortTimeLabel: this.startShortTimeLabel,
          disabledHours: this.startDisabledHours,
          disabledMinutes: this.startDisbaledMinutes,
          noMinutes: this.startNoMinutes,
          noHours: this.startNoHours,
          hours: this.startHours,
          minutes: this.startMinutes,
          minTime: this.startMinTime,
          maxTime: this.startMaxTime,
          height: this.bodyHeight
        },
        on: {
          input: v => { this.startTime = v }
        }
      })
    },

    __renderEndTime (h) {
      return h(QTimeScroller, {
        ref: 'endTime',
        staticClass: 'col-6',
        props: {
          value: this.endTime,
          locale: this.locale,
          barColor: this.barColor,
          color: this.color,
          backgroundColor: this.backgroundColor,
          innerColor: this.innerColor,
          innerBackgroundColor: this.innerBackgroundColor,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          hour24Format: this.hour24Format,
          amPmLabels: this.ampPmLabels,
          minuteInterval: this.endMinuteInterval,
          hourInterval: this.endHourInterval,
          shortTimeLabel: this.endShortTimeLabel,
          disabledHours: this.endDisabledHours,
          disabledMinutes: this.endDisbaledMinutes,
          noMinutes: this.endNoMinutes,
          noHours: this.endNoHours,
          hours: this.endHours,
          minutes: this.endMinutes,
          minTime: this.endMinTime,
          maxTime: this.endMaxTime,
          height: this.bodyHeight
        },
        on: {
          input: v => { this.endTime = v }
        }
      })
    },

    __renderScrollers (h) {
      return [
        this.__renderStartTime(h),
        this.__renderEndTime(h)
      ]
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerBackgroundColor, {
        staticClass: 'q-scroller__body q-scroller__horizontal-bar row full-width'
      }), [
        this.__renderScrollers(h)
      ])
    },

    // the close button
    __renderFooterButton (h) {
      return [
        h(QBtn, {
          staticClass: 'q-scroller__cancel-btn q-ml-xs',
          props: {
            'flat': true,
            'dense': true,
            'round': true,
            'icon': 'close'
          },
          on: {
            'click': () => {
              this.$emit('close')
            }
          }
        })
      ]
    },

    __renderFooter (h) {
      if (this.noFooter) return ''
      const slot = this.$slots.timeFooter
      return h('div', {
        ref: 'footer',
        staticClass: 'q-scroller__footer flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-up-20': this.noShadow === false
        }
      }, slot || [
        this.__renderFooterButton(h)
      ])
    }
  },

  render (h) {
    const child = [
      h(QResizeObserver, {
        props: { debounce: 0 },
        on: { resize: this.onResize }
      })
    ]

    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      ref: 'scroller',
      staticClass: 'q-time-range-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller--border': this.noBorder !== true
      },
      style: {
        '--scroller-border-color': this.borderColor,
        '--scroller-bar-color': this.barColor,
        'overflow': 'hidden'
      }
    }), child.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
})
