// Styles
import './scroller.styl'

// Mixins
import TimeBase from './mixins/time-base'
import Colorize from './mixins/colorize'

// Components
import ScrollerBase from './mixins/scroller-base'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
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
export default TimeBase.extend({
  name: `q-time-scroller`,

  mixins: [Colorize],

  props: {
    ...props.time,
    showVerticalBar: Boolean
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      ampm: '',
      hour: '',
      minute: '',
      ampmIndex: -1, // 2 states: 0=AM, 1=PM (indices into amPmLabels)
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
    ampmList () {
      return this.amPmLabels
        .map(ap => {
          return { value: ap, disabled: false }
        })
    },
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
      const length = (this.hour24Format === true ? 24 : 12)

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
      const longOptions = { timeZone: 'UTC', hour12: !this.hour24Format, hour: '2-digit', minute: '2-digit' }
      const shortOptions = { timeZone: 'UTC', hour12: !this.hour24Format, hour: 'numeric', minute: '2-digit' }
      const shortHourOptions = { timeZone: 'UTC', hour12: !this.hour24Format, hour: 'numeric' }

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

    ampmIndex () {
      const timestamp = copyTimestamp(this.timestamp)
      this.ampm = this.amPmLabels[this.ampmIndex]
      this.timestamp.hour = parseInt(this.hour)
      if (this.ampmIndex === 1 && this.hour24Format === false) {
        this.timestamp.hour = parseInt(this.hour) + 12
      }
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    hour () {
      const timestamp = copyTimestamp(this.timestamp)
      if (this.hour24Format === true) {
        this.timestamp.hour = parseInt(this.hour)
      } else {
        if (this.ampmIndex === 0) {
          this.timestamp.hour = parseInt(this.hour)
        } else if (this.ampmIndex === 1) {
          this.timestamp.hour = parseInt(this.hour) + 12
        }
      }
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    minute () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp.minute = parseInt(this.minute)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    ampm () {
      this.ampmIndex = this.amPmLabels.findIndex(ap => ap === this.ampm)
    },

    hour24Format () {
      const timestamp = copyTimestamp(this.timestamp)
      if (this.hour24Format === true) {
        this.hour = padNumber(this.timestamp.hour, 2)
      } else {
        if (this.timestamp.hour > 12) {
          this.hour = padNumber(this.timestamp.hour - 12, 2)
          this.ampmIndex = 1
        } else {
          this.hour = padNumber(this.timestamp.hour, 2)
          this.ampmIndex = 0
        }
      }
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
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
    },

    height () {
      this.adjustBodyHeight()
    },

    dense () {
      this.adjustBodyHeight()
    }
  },

  methods: {
    getTimestamp () {
      return this.timestamp
    },

    emitValue () {
      this.$emit('input', [padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)].join(':'))
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
          const parentHeight = this.height || this.$refs.scroller ? window.getComputedStyle(this.$refs.scroller, null).getPropertyValue('height') : 0
          this.bodyHeight = parseInt(parentHeight) - this.headerFooterHeight
        })
      }
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
      this.ampmIndex = this.timestamp.hour > 12 && this.timestamp.minute > 0 ? 1 : 0
      this.fromTimestamp()
    },

    fromTimestamp () {
      this.minute = padNumber(this.timestamp.minute, 2)
      this.hour = padNumber(this.timestamp.hour, 2)
      if (this.hour24Format === false && this.ampmIndex === 1) {
        this.hour = padNumber(this.timestamp.hour - 12, 2)
      }
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderHoursScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.hour,
          items: this.hoursList,
          height: this.bodyHeight,
          dense: this.dense,
          disable: this.disable,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
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
          dense: this.dense,
          disable: this.disable,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          input: (val) => { this.minute = val }
        }
      })
    },

    __renderAmPmScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.ampm,
          items: this.ampmList,
          height: this.bodyHeight,
          dense: this.dense,
          disable: this.disable,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          input: (val) => { this.ampm = val }
        }
      })
    },

    __renderScrollers (h) {
      return [
        this.noHours !== true && this.__renderHoursScroller(h),
        this.noMinutes !== true && this.__renderMinutesScroller(h),
        this.hour24Format === false && this.__renderAmPmScroller(h)
      ]
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerBackgroundColor, {
        staticClass: `q-scroller__body q-scroller__horizontal-bar${this.dense ? '--dense' : ''} row full-width`,
        class: {
          'q-scroller__vertical-bar': this.showVerticalBar === true
        },
        style: {
          height: `${this.bodyHeight}px`
        }
      }), this.__renderScrollers(h))
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.timeHeader
      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot(this.timestamp) : [
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
        staticClass: (this.dense ? 'q-scroller__footer--dense' : 'q-scroller__footer') + ' flex justify-around items-center full-width q-pa-xs',
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
      staticClass: 'q-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller--border': this.noBorder !== true
      },
      style: {
        '--scroller-border-color': this.borderColor,
        '--scroller-bar-color': this.barColor
      }
    }), child.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
})
