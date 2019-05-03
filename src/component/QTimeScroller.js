// Styles
import './scroller.styl'

// Directives
import Resize from './directives/resize'

// Mixins
import DateTimeBase from './mixins/datetime-base'
import Colorize from './mixins/colorize'

// Components
import ScrollerBase from './mixins/scroller-base'

// Util
import props from './utils/props'
import { QBtn } from 'quasar'
import {
  Timestamp,
  parsed,
  parseDate,
  getDate,
  getTime,
  copyTimestamp,
  compareTimestamps,
  padNumber,
  createNativeLocaleFormatter
} from './utils/timestamp'

/* @vue/component */
export default DateTimeBase.extend({
  name: `q-time-scroller`,

  directives: { Resize },

  mixins: [Colorize],

  props: {
    ...props.time
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      hour: '',
      minute: '',
      ampm: '', // 3 states: 'am', 'pm' and ''
      hour24: this.hour24Format, // don't mutate property
      timestamp: { ...Timestamp },
      disabledMinutesList: [],
      disabledHoursList: []
    }
  },

  mounted () {
    this.handleDisabledLists()
    this.splitTime()
    this.adjustBodyHeight()
  },

  computed: {
    minutesList () {
      let count = 60
      if (this.minuteInterval !== void 0 && parseInt(this.minuteInterval) > 0) {
        count /= parseInt(this.minuteInterval)
      }
      return [...Array(count)]
        .map((_, i) => i)
        .map(m => {
          m *= this.minuteInterval ? parseInt(this.minuteInterval) : 1
          m = m < 10 ? '0' + m : '' + m
          return { value: m, disabled: this.disabledMinutesList.includes(m) }
        })
    },

    hoursList () {
      const length = (this.hour24 === true ? 24 : 12)

      return [...Array(length)]
        .map((_, i) => i)
        .map(h => {
          h = h < 10 ? '0' + h : '' + h
          return { value: h, disabled: this.disabledHoursList.includes(h) }
        })
    },

    displayTime () {
      if (this.timestamp.hasTime === false) return ''
      if (this.noMinutes) return padNumber(this.hour, 2) + 'h'
      else if (this.noHours) return ':' + padNumber(this.minute, 2)
      return this.timeFormatter(this.timestamp, this.shortTimeLabel)
    },

    timeFormatter () {
      const longOptions = { timeZone: 'UTC', hour12: !this.hour24, hour: '2-digit', minute: '2-digit' }
      const shortOptions = { timeZone: 'UTC', hour12: !this.hour24, hour: 'numeric', minute: '2-digit' }
      const shortHourOptions = { timeZone: 'UTC', hour12: !this.hour24, hour: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
      )
    }
  },

  watch: {
    value () {
      this.splitTime()
    },

    hour () {
      this.toTimestamp()
    },

    minute () {
      this.toTimestamp()
    },

    ampm () {
      this.toTimestamp()
    },

    hour24Format (val) {
      this.hour24 = val
    },

    disabledMinutes () {
      this.handleDisabledLists()
    },

    disabledHours () {
      this.handleDisabledLists()
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
      this.$emit('input', [padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)].join(':'))
    },

    onResize () {
      this.adjustBodyHeight()
    },

    adjustBodyHeight () {
      this.$nextTick(() => {
        let headerHeight = this.noHeader ? 0 : this.$refs.header ? this.$refs.header.clientHeight : 0
        let footerHeight = this.noFooter ? 0 : this.$refs.footer ? this.$refs.footer.clientHeight : 0
        this.headerFooterHeight = headerHeight + footerHeight
        const parentHeight = this.$refs.scroller ? window.getComputedStyle(this.$refs.scroller, null).getPropertyValue('height') : 0
        this.bodyHeight = parseInt(parentHeight) - this.headerFooterHeight
      })
    },

    handleDisabledLists () {
      this.disabledMinutesList = []
      this.disabledHoursList = []

      this.disabledMinutes.forEach(m => this.disabledMinutesList.push(padNumber(parseInt(m), 2)))
      this.disabledHours.forEach(h => this.disabledHoursList.push(padNumber(parseInt(h), 2)))
    },

    splitTime () {
      // use today's date (but not time, unless it wasn't passed in)
      const now = parseDate(new Date())
      const date = getDate(now) + ' ' + (this.value ? this.value : getTime(now))
      this.timestamp = parsed(date)
      this.timestamp.minute = Math.floor((this.timestamp.minute / this.minuteInterval)) * this.minuteInterval
      this.fromTimestamp()
    },

    fromTimestamp () {
      this.minute = padNumber(this.timestamp.minute, 2)
      if (this.hour24 === true) {
        this.ampm = ''
        this.hour = padNumber(this.timestamp.hour, 2)
      } else {
        this.ampm = this.timestamp.hour < 12 ? 'am' : 'pm'
        this.hour = padNumber(this.timestamp.hour % 12, 2)
      }
    },

    toTimestamp () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp.minute = parseInt(this.minute)
      if (this.hour24 === true || this.ampm === 'am') {
        this.timestamp.hour = parseInt(this.hour)
      } else {
        // for 'pm'
        this.timestamp.hour = parseInt(this.hour) + 12
      }
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    toggleAmPm () {
      this.ampm = this.ampm === 'am' ? 'pm' : 'am'
      this.toTimestamp()
    },

    toggle24h () {
      this.hour24 = !this.hour24
      if (this.hour24 === false) {
        if (this.hour < 12) {
          this.ampm = 'am'
        } else {
          this.ampm = 'pm'
          this.hour = padNumber(parseInt(this.hour) % 12, 2)
        }
      } else {
        if (this.ampm === 'pm') {
          this.hour = padNumber(parseInt(this.hour) + 12, 2)
        }
      }
      this.toTimestamp()
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderHoursScroller (h) {
      return h(ScrollerBase, {
        props: {
          height: this.bodyHeight,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor,
          value: this.hour,
          items: this.hoursList,
          disable: this.disable
        },
        on: {
          input: (val) => { this.hour = val }
        }
      })
    },

    __renderMinutesScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.minute,
          items: this.minutesList,
          height: this.bodyHeight,
          disable: this.disable,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          input: (val) => { this.minute = val }
        }
      })
    },

    __renderScrollers (h) {
      return [
        this.noHours !== true && this.__renderHoursScroller(h),
        this.noMinutes !== true && this.__renderMinutesScroller(h)
      ]
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerBackgroundColor, {
        staticClass: 'q-scroller__body flex full-width',
        style: {
          height: `${this.bodyHeight}px`
        }
      }), this.__renderScrollers(h))
    },

    __renderAmPmButton (h) {
      return h(QBtn, {
        staticClass: `q-scroller__header--ampm ${this.ampm}`,
        class: {
        },
        props: {
          'flat': true,
          'dense': true,
          'round': true,
          'size': 'sm'
        },
        on: {
          'click': () => this.toggleAmPm()
        }
      })
    },

    __render24hButton (h, label) {
      // colors are reversed
      return h(QBtn, this.setBothColors(this.backgroundColor, this.color, {
        staticClass: `q-scroller__header--h24` + (this.hour24 === false ? ' q-time-selector__header--selected' : ''),
        props: {
          'flat': true,
          'dense': true,
          'round': true,
          'size': 'sm',
          'label': this.hour24 === true ? '24' : '12'
        },
        on: {
          'click': () => this.toggle24h(label)
        }
      }))
    },

    __renderAmPmButtons (h) {
      if (this.hour24 === false) return [this.__renderAmPmButton(h)]
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.timeHeader
      return h('div', {
        ref: 'header',
        staticClass: 'q-scroller__header flex justify-around items-center full-width shadow-20 ellipsis q-pa-xs'
      }, slot ? slot(this.timestamp) : [
        this.noHours !== true && this.__render24hButton(h, 'h24'),
        this.displayTime
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
              this.emitValue()
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
        staticClass: 'q-scroller__footer flex justify-around items-center full-width shadow-up-20 q-pa-xs'
      }, slot || [
        this.noHours !== true && this.__renderAmPmButtons(h),
        this.__renderFooterButton(h)
      ])
    }
  },

  render (h) {
    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      ref: 'scroller',
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.onResize
      }],
      staticClass: 'q-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller--border': this.noBorder !== true
      },
      style: {
        '--scroller-bar-color': this.barColor
      }
    }), [
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ])
  }
})
