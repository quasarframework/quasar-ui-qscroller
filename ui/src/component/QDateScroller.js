// Mixins
import DateTimeBase from './mixins/datetime-base'
import { QColorizeMixin } from 'q-colorize-mixin'

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
  daysInMonth,
  copyTimestamp,
  compareTimestamps,
  padNumber,
  createNativeLocaleFormatter,
  DAYS_IN_MONTH_MAX
} from './utils/timestamp'

/* @vue/component */
export default {
  name: `QDateScroller`,

  mixins: [DateTimeBase, QColorizeMixin],

  props: {
    ...props.common,
    ...props.date,
    ...props.verticalBar
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
      year: '',
      month: '',
      day: '',
      timestamp: null,
      disabledYearsList: [],
      disabledMonthsList: [],
      disabledDaysList: []
    }
  },

  created () {
    this.timestamp = copyTimestamp(Timestamp)
  },

  beforeMount () {
    this.handleDisabledLists()
    this.splitDate()
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

    daysList () {
      let length = daysInMonth(parseInt(this.year), parseInt(this.month))
      if (!this.year || !this.month) {
        length = DAYS_IN_MONTH_MAX
      }
      return [...Array(length)]
        .map((_, i) => i)
        .map(d => {
          ++d // days start with 1
          d = d < 10 ? '0' + d : '' + d
          return { value: d, disabled: this.disabledDaysList.includes(d) }
        })
    },

    monthsList () {
      return [...Array(12)]
        .map((_, i) => i)
        .map(m => {
          ++m // Jan = 0
          let mon = this.showMonthLabel === true ? this.monthNameLabel(m) : void 0
          m = m < 10 ? '0' + m : '' + m
          return { display: mon, value: m, disabled: this.disabledMonthsList.includes(m) }
        })
    },

    yearsList () {
      let yearStart = 0
      let yearEnd = 0
      if (this.yearStart && parseInt(this.yearStart) > 0) {
        yearStart = parseInt(this.yearStart)
      }
      if (this.yearEnd && parseInt(this.yearEnd) > 0) {
        yearEnd = parseInt(this.yearEnd)
      }

      // if date range not given, calculate 5 before and 5 after years
      const d = new Date()
      let year = d.getFullYear()
      if (yearStart === 0) {
        yearStart = year - 5
      }
      if (yearEnd === 0) {
        yearEnd = year + 5
      }
      let dates = []
      let date = yearStart
      while (date <= yearEnd) {
        dates.push(padNumber(date, 4))
        ++date
      }
      return dates.map(y => {
        return { value: y, disabled: this.disabledYearsList.includes(y) }
      })
    },

    displayDate () {
      if (!this.year || !this.month || !this.day) return ''
      if (this.timestamp.hasDay === false) return ''
      // year only
      if (this.noDays === true && this.noMonths === true) return this.yearFormatter(this.timestamp, this.shortYearLabel)
      // month only
      if (this.noDays === true && this.noYears === true) return this.monthFormatter(this.timestamp, this.shortMonthLabel)
      // day only
      if (this.noMonths === true && this.noYears === true) return this.dayFormatter(this.timestamp, this.shortDayLabel)
      // month and year
      if (this.noDays) return this.yearMonthFormatter(this.timestamp)
      // year and day
      if (this.noMonths) return this.yearDayFormatter(this.timestamp)
      // month and day
      if (this.noYears) return this.monthDayFormatter(this.timestamp)
      // everything else
      return this.dateFormatter(this.timestamp)
    },

    dateFormatter () {
      const year = this.shortYearLabel ? '2-digit' : 'numeric'
      const month = this.shortMonthLabel ? 'numeric' : '2-digit'
      const day = this.shortDayLabel ? 'numeric' : '2-digit'
      const options = { timeZone: 'UTC', year: year, month: month, day: day }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },

    dayFormatter () {
      const options = { timeZone: 'UTC', day: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },

    // showWeekdays = true
    weekdayFormatter () {
      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    monthFormatter () {
      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    yearFormatter () {
      const longOptions = { timeZone: 'UTC', year: 'numeric' }
      const shortOptions = { timeZone: 'UTC', year: '2-digit' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    yearMonthFormatter () {
      const longOptions = { timeZone: 'UTC', month: 'long', year: 'numeric' }
      const shortOptions = { timeZone: 'UTC', month: 'short', year: '2-digit' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    yearDayFormatter () {
      const longOptions = { timeZone: 'UTC', day: 'numeric', year: 'numeric' }
      const shortOptions = { timeZone: 'UTC', day: '2-digit', year: '2-digit' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    yearMonthDayFormatter () {
      const options = { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },

    monthDayFormatter () {
      const longOptions = { timeZone: 'UTC', day: 'numeric', month: 'long' }
      const shortOptions = { timeZone: 'UTC', day: '2-digit', month: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    }
  },

  watch: {
    value () {
      this.splitDate()
    },

    year () {
      this.toTimestamp()
    },

    month (newMonth, oldMonth) {
      if (this.day > 28) {
        const nm = parseInt(newMonth)
        const om = parseInt(oldMonth)
        const year = parseInt(this.year)
        // if the month changed and current day does not exist
        // then set to last day of the month. For instance,
        // Jan 31, then switched to Feb 28
        const oldDays = daysInMonth(year, om)
        const newDays = daysInMonth(year, nm)
        // the decision
        if (oldDays > newDays) {
          this.day = padNumber(newDays, 2)
        }
      }
      this.toTimestamp()
    },

    day () {
      this.toTimestamp()
    },

    disabledDays () {
      this.handleDisabledLists()
    },

    disabledMonths () {
      this.handleDisabledLists()
    },

    disabledYears () {
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
      switch (this.type) {
        case 'date':
          this.$emit('input', getDateObject(this.timestamp))
          return
        case 'array':
          this.$emit('input', [padNumber(this.timestamp.year, 2), padNumber(this.timestamp.month, 2), padNumber(this.timestamp.day, 2)])
          return
        case 'object':
            this.$emit('input', { year: padNumber(this.timestamp.year, 2), month: padNumber(this.timestamp.month, 2), day: padNumber(this.timestamp.day, 2) })
          return
        case 'string':
          this.$emit('input', [padNumber(this.timestamp.year, 2), padNumber(this.timestamp.month, 2), padNumber(this.timestamp.day, 2)].join('-'))
          return
      }
    },

    onResize () {
      this.adjustBodyHeight()
    },

    adjustBodyHeight () {
      let self = this
      this.$nextTick(() => {
        this.headerHeight = this.noHeader === true ? 0 : this.$refs.header ? parseInt(window.getComputedStyle(this.$refs.header, null).getPropertyValue('height')) : 0
        this.footerHeight = this.noFooter === true ? 0 : this.$refs.footer ? parseInt(window.getComputedStyle(this.$refs.footer, null).getPropertyValue('height')) : 0
        this.height = parseInt(window.getComputedStyle(self.$el, null).getPropertyValue('height'))
        this.bodyHeight = this.height - this.headerHeight - this.footerHeight
      })
    },

    handleDisabledLists () {
      this.disabledDaysList = []
      this.disabledMonthsList = []
      this.disabledYearsList = []

      this.disabledDays.forEach(d => this.disabledDaysList.push(padNumber(parseInt(d), 2)))
      this.disabledMonths.forEach(m => this.disabledMonthsList.push(padNumber(parseInt(m), 2)))
      this.disabledYears.forEach(h => this.disabledYearsList.push(padNumber(parseInt(h), 4)))
    },

    splitDate () {
      const type = Object.prototype.toString.call(this.value)
      let now, date, parts
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
          // 1st item is year, 2nd item is month, 3rd item is day
          now = parseDate(new Date())
          now.year = parseInt(this.value[0])
          now.month = parseInt(this.value[1])
          now.day = parseInt(this.value[2])
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
        case '[object Object]':
          this.type = 'object'
          // object must contain keys 'year', 'month', 'day'
          now = parseDate(new Date())
          now.year = parseInt(this.value.year)
          now.month = parseInt(this.value.month)
          now.day = parseInt(this.value.day)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
        case '[object String]':
          // use today's date and time
          this.type = 'string'
          now = parseDate(new Date())
          if (this.value) {
            parts = this.value.split('-')
            now.year = parseInt(parts[0])
            now.month = parseInt(parts[1])
            now.day = parseInt(parts[2])
          }
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.fromTimestamp()
          return
      }
      if (this.value !== '') {
        console.error(`QDateScroller: invalid date format - '${this.value}'`)
      }
    },

    fromTimestamp () {
      this.day = padNumber(this.timestamp.day, 2)
      this.month = padNumber(this.timestamp.month, 2)
      this.year = padNumber(this.timestamp.year, 4)
    },

    toTimestamp () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp.day = parseInt(this.day)
      this.timestamp.month = parseInt(this.month)
      this.timestamp.year = parseInt(this.year)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    // passed month needs to be 1-based
    monthNameLabel (month) {
      const now = parseDate(new Date())
      let date = getDate(now) + ' 00:00'
      let timestamp = parsed(date)
      timestamp.day = 1
      timestamp.month = parseInt(month)
      return this.monthFormatter(timestamp, this.shortMonthLabel)
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderYearsScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.year,
          items: this.yearsList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          textColor: this.innerTextColor,
          color: this.innerColor
        },
        class: {
          'q-scroller__vertical-bar': this.showVerticalBar === true
        },
        on: {
          input: (val) => { this.year = val }
        }
      })
    },

    __renderMonthsScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.month,
          items: this.monthsList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          textColor: this.innerTextColor,
          color: this.innerColor
        },
        class: {
          'q-scroller__vertical-bar': this.showVerticalBar === true
        },
        on: {
          input: (val) => { this.month = val }
        }
      })
    },

    __renderDaysScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.day,
          items: this.daysList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          textColor: this.innerTextColor,
          color: this.innerColor
        },
        on: {
          input: (val) => { this.day = val }
        }
      })
    },
    __renderScrollers (h) {
      return [
        this.noYears !== true && this.__renderYearsScroller(h),
        this.noMonths !== true && this.__renderMonthsScroller(h),
        this.noDays !== true && this.__renderDaysScroller(h)
      ]
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerColor, {
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
      const slot = this.$scopedSlots.header
      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot(this.timestamp) : [
        this.displayDate
      ])
    },

    // the cancel/ok buttons show up only if not inline
    __renderFooterButton (h) {
      return h(QBtn, {
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
      }, slot ? slot(this.timestamp) : [ this.__renderFooterButton(h) ])
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
