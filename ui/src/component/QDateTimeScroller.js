// Mixins
import DateTimeBase from './mixins/date-time-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QDateScroller from './QDateScroller'
import QTimeScroller from './QTimeScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
import {
  Timestamp,
  parsed,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  copyTimestamp,
  compareTimestamps,
  padNumber
} from './utils/timestamp'

/* @vue/component */
export default {
  name: 'QDateTimeScroller',

  mixins: [DateTimeBase, QColorizeMixin],

  props: {
    ...props.time,
    ...props.date,
    ...props.verticalBar,
    ...props.locale
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
      date: '',
      time: '',
      timestamp: null,
      type: null
    }
  },

  created () {
    this.timestamp = copyTimestamp(Timestamp)
  },

  beforeMount () {
    this.splitDateTime()
  },

  mounted () {
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
      if (this.locale === '') return ''
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
      switch (this.type) {
        case 'date':
          this.$emit('input', getDateObject(this.timestamp))
          return
        case 'array':
          this.$emit('input', [padNumber(this.timestamp.year, 2), padNumber(this.timestamp.month, 2), padNumber(this.timestamp.day, 2), padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)])
          return
        case 'object':
          this.$emit('input', { year: padNumber(this.timestamp.year, 2), month: padNumber(this.timestamp.month, 2), day: padNumber(this.timestamp.day, 2), hour: padNumber(this.timestamp.hour, 2), minute: padNumber(this.timestamp.minute, 2) })
          return
        case 'string':
          this.$emit('input', [padNumber(this.timestamp.year, 2), padNumber(this.timestamp.month, 2), padNumber(this.timestamp.day, 2)].join('-') + ' ' + [padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)].join(':'))
      }
    },

    onResize ({ height }) {
      this.adjustBodyHeight()
    },

    adjustBodyHeight () {
      let self = this
      this.$nextTick(() => {
        this.headerHeight = this.noHeader === true ? 0 : this.$refs.header ? parseInt(window.getComputedStyle(this.$refs.header, null).getPropertyValue('height'), 10) : 0
        this.footerHeight = this.noFooter === true ? 0 : this.$refs.footer ? parseInt(window.getComputedStyle(this.$refs.footer, null).getPropertyValue('height'), 10) : 0
        this.height = parseInt(window.getComputedStyle(self.$el, null).getPropertyValue('height', 10))
        this.bodyHeight = this.height - this.headerHeight - this.footerHeight
        if (this.noHeader !== true && this.noFooter !== true && this.noBorder !== true) {
          this.bodyHeight -= 1
        }
      })
    },

    splitDateTime () {
      const type = Object.prototype.toString.call(this.value)
      let now, date, parts, parts2
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          now = parseDate(this.value)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
        case '[object Array]':
          this.type = 'array'
          // 1st item is hour, 2nd item is minutes
          now = parseDate(new Date())
          now.year = parseInt(this.value[0], 10)
          now.month = parseInt(this.value[1], 10)
          now.day = parseInt(this.value[2], 10)
          now.hour = parseInt(this.value[3], 10)
          now.minute = parseInt(this.value[4], 10)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
        case '[object Object]':
          this.type = 'object'
          // object must contain keys 'year', 'month', 'day', 'hour', 'minute'
          now = parseDate(new Date())
          now.year = parseInt(this.value.year, 10)
          now.month = parseInt(this.value.month, 10)
          now.day = parseInt(this.value.day, 10)
          now.hour = parseInt(this.value.hour, 10)
          now.minute = parseInt(this.value.minute, 10)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
        case '[object String]':
          // use today's date (but not time, unless it wasn't passed in)
          this.type = 'string'
          now = parseDate(new Date())
          if (this.value) {
            parts = this.value.split(' ')
            parts2 = parts[1].split(':')
            parts = parts[0].split('-')
            now.year = parseInt(parts[0], 10)
            now.month = parseInt(parts[1], 10)
            now.day = parseInt(parts[2], 10)
            now.hour = parseInt(parts2[0], 10)
            now.minute = parseInt(parts2[1], 10)
          }
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
      }
      if (this.value !== '') {
        console.error(`QDateTimeScroller: invalid time format - '${this.value}'`)
      }
    },

    fromTimestamp () {
      this.date = getDate(this.timestamp)
      this.time = getTime(this.timestamp)
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderDate (h) {
      return h(QDateScroller, {
        ref: 'date',
        staticClass: this.hour12 === true ? 'col-7' : 'col-8',
        props: {
          value: this.date,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.innerTextColor,
          innerColor: this.innerColor,
          disabledTextColor: this.disabledTextColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          startDate: this.startDate,
          endDate: this.EndDate,
          disabledYears: this.disabledYears,
          disabledMonths: this.disabledMonths,
          disabledDays: this.disabledDays,
          shortYearLabel: this.shortYearLabel,
          shortMonthLabel: this.shortMonthLabel,
          shortDayLabel: this.shortDayLabel,
          showMonthLabel: this.showMonthLabel,
          showWeekdayLabel: this.showWeekdayLabel,
          noDays: this.noDays,
          noMonths: this.noMonths,
          noYears: this.noYears
        },
        class: {
          'q-scroller__vertical-bar': this.verticalBar === true
        },
        on: {
          input: v => { this.date = v }
        }
      })
    },

    __renderTime (h) {
      return h(QTimeScroller, {
        ref: 'time',
        staticClass: this.hour12 === true ? 'col-5' : 'col-4',
        props: {
          value: this.time,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.innerTextColor,
          innerColor: this.innerColor,
          disabledTextColor: this.disabledTextColor,
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
          disabledMinutes: this.disabledMinutes,
          noMinutes: this.noMinutes,
          noHours: this.noHours
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
        staticClass: `q-scroller__body q-scroller__horizontal-bar${this.dense ? '--dense' : ''} row full-width`,
        style: {
          height: `${this.bodyHeight}px`
        }
      }), [
        this.__renderScrollers(h)
      ])
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.header
      let displayDateTime = ''

      if (this.date !== '' && this.time !== '') {
        if (this.$refs.date && this.$refs.time) {
          displayDateTime = this.$refs.date.displayDate + ' ' + this.$refs.time.displayTime
        } else {
          displayDateTime = `${this.date} ${this.time}`
        }
      } else {
        displayDateTime = ''
      }

      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot(this.timestamp) : [
        h('span', {
          staticClass: 'ellipsis'
        }, displayDateTime)
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
      const slot = this.$scopedSlots.footer
      return h('div', {
        ref: 'footer',
        staticClass: (this.dense ? 'q-scroller__footer--dense' : 'q-scroller__footer') + ' flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-up-20': this.noShadow === false
        }
      }, slot ? slot(this.timestamp) : [
        this.__renderFooterButton(h)
      ])
    }
  },

  render (h) {
    const resize = [
      h(QResizeObserver, {
        props: { debounce: 0 },
        on: { resize: this.onResize }
      })
    ]

    return h('div', this.setBothColors(this.textColor, this.color, {
      ref: 'scroller',
      staticClass: 'q-scroller flex',
      class: {
        'q-scroller__disabled': this.disable === true,
        'rounded-borders': this.roundedBorders === true,
        'q-scroller__border': this.noBorder !== true
      },
      style: this.style
    }), resize.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
}
