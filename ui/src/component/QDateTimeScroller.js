// Mixins
import DateTimeBase from './mixins/date-time-base'
import QDateScroller from './QDateScroller'
import QTimeScroller from './QTimeScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
import {
  Timestamp,
  parsed,
  getDate,
  getTime,
  copyTimestamp,
  compareTimestamps
} from './utils/timestamp'

/* @vue/component */
export default {
  name: `QDateTimeScroller`,

  mixins: [DateTimeBase],

  props: {
    ...props.common,
    ...props.time,
    ...props.date
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      date: '',
      time: '',
      timestamp: { ...Timestamp }
    }
  },

  mounted () {
    this.splitDateTime()
    this.adjustBodyHeight()
  },

  computed: {
    style () {
      let style = {}
      style['--scroller-border-color'] = this.calculateColor(this.borderColor)
      style['--scroller-bar-color'] = this.calculateColor(this.barColor)
      return style
    },

    displayDateTime () {
      if (this.date !== '' && this.time !== '') {
        if (this.$refs.date && this.$refs.time) {
          return this.$refs.date.displayDate + ' ' + this.$refs.time.displayTime
        }
        return `${this.date} ${this.time}`
      }
      return ''
    }
  },

  watch: {
    value () {
      this.splitDateTime()
    },

    date () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp = parsed(this.date + ' ' + this.time)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    time () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp = parsed(this.date + ' ' + this.time)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    noHeader () {
      this.adjustBodyHeight()
    },

    noFooter () {
      this.adjustBodyHeight()
    },

    dense () {
      this.adjustBodyHeight()
    }
  },

  methods: {
    emitValue () {
      if (this.timestamp !== void 0 && this.timestamp.date !== void 0) {
        this.$emit('input', this.timestamp.date)
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

    splitDateTime () {
      if (this.value !== void 0) {
        this.timestamp = parsed(this.value)
        this.fromTimestamp()
      }
    },

    fromTimestamp () {
      this.date = getDate(this.timestamp)
      this.time = getTime(this.timestamp)
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.header
      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot(this.timestamp) : [
        this.displayDateTime
      ])
    },

    __renderDate (h) {
      return h(QDateScroller, {
        ref: 'date',
        staticClass: 'col-6',
        props: {
          value: this.date,
          locale: this.locale,
          showVerticalBar: true,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.innerTextColor,
          innerColor: this.innerColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          minDate: this.minDate,
          maxDate: this.maxDate,
          dates: this.dates,
          disabledDate: this.disabledDates,
          disabledYears: this.disabledYears,
          disabledMonths: this.disabledMonths,
          disabledDays: this.disabledDays,
          shortYearLabel: this.shortYearLabel,
          shortMonthLabel: this.shortMonthLabel,
          shortDayLabel: this.shortDayLabel,
          showMonthLabel: this.showMonthLabel,
          showWeekdayLabel: this.showWeekdayLabel,
          noYears: this.noYears,
          noMonths: this.noMonths,
          noDays: this.noDays,
          height: this.bodyHeight
        },
        on: {
          input: v => { this.date = v }
        }
      })
    },

    __renderTime (h) {
      return h(QTimeScroller, {
        ref: 'time',
        staticClass: 'col-6',
        props: {
          value: this.time,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.innerTextColor,
          innerColor: this.innerColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          hour12: this.hour12,
          amPmLabels: this.ampPmLabels,
          minuteInterval: this.minuteInterval,
          hourInterval: this.hourInterval,
          shortTimeLabel: this.shortTimeLabel,
          disabledHours: this.disabledHours,
          disabledMinutes: this.disbaledMinutes,
          noMinutes: this.noMinutes,
          noHours: this.noHours,
          hours: this.hours,
          minutes: this.minutes,
          minTime: this.minTime,
          maxTime: this.maxTime,
          height: this.bodyHeight
        },
        on: {
          input: v => { this.time = v }
        }
      })
    },

    __renderScrollers (h) {
      return [
        this.__renderDate(h),
        this.__renderTime(h)
      ]
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerColor, {
        staticClass: `q-scroller__body q-scroller__horizontal-bar${this.dense ? '--dense' : ''} row full-width`
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
      const slot = this.$slots.footer
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
      staticClass: 'q-date-time-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller__border': this.noBorder !== true
      },
      style: this.style
    }), child.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
}
