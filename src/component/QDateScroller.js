// Styles
import './scroller.styl'

// Mixins
import DateTimeBase from './mixins/datetime-base'
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
  daysInMonth,
  copyTimestamp,
  compareTimestamps,
  padNumber,
  createNativeLocaleFormatter,
  DAYS_IN_MONTH_MAX
} from './utils/timestamp'

/* @vue/component */
export default DateTimeBase.extend({
  name: `q-date-scroller`,

  mixins: [Colorize],

  props: {
    ...props.date,
    showVerticalBar: Boolean
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      year: '',
      month: '',
      day: '',
      timestamp: { ...Timestamp },
      disabledYearsList: [],
      disabledMonthsList: [],
      disabledDaysList: []
    }
  },

  mounted () {
    this.handleDisabledLists()
    this.splitDate()
    this.adjustBodyHeight()
  },

  computed: {
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
          return { value: d, disabled: this.disabledDays.includes(d) }
        })
    },

    monthsList () {
      return [...Array(12)]
        .map((_, i) => i)
        .map(m => {
          ++m // Jan = 0
          let mon = this.showMonthLabel === true ? this.monthNameLabel(m) : void 0
          m = m < 10 ? '0' + m : '' + m
          return { display: mon, value: m, disabled: this.disabledMonths.includes(m) }
        })
    },

    yearsList () {
      let minDate = 0
      let maxDate = 0
      if (this.minDate && this.maxDate) {
        minDate = parseInt(minDate)
        maxDate = parseInt(maxDate)
      } else {
        const date = new Date()
        let year = date.getFullYear()
        minDate = year - 5
        maxDate = year + 5
      }
      let dates = []
      let date = minDate
      while (date <= maxDate) {
        dates.push(padNumber(date, 4))
        ++date
      }
      return dates.map(y => {
        return { value: y, disabled: this.disabledYears.includes(y) }
      })
    },

    displayDate () {
      // console.log('displayDate')
      if (!this.year || !this.month || !this.day) return ''
      if (this.timestamp.hasDay === false) return ''
      // year only
      if (this.noDays === true && this.noMonths === true) return this.yearFormatter(this.timestamp, this.shortYearLabel)
      // month only
      if (this.noDays === true && this.noYears === true) return this.monthFormatter(this.timestamp, this.shortMonthLabel)
      // day only
      if (this.noMonths === true && this.noYears === true) return this.dayFormatter(this.timestamp, this.shortDayLabel)
      // month and year
      // if (this.noDays) return this.yearMonthFormatter(this.timestamp)
      // year and day
      // if (this.noMonths) return this.yearDayFormatter(this.timestamp)
      // month and day
      // if (this.noYears) return this.monthDayFormatter(this.timestamp)
      // everything
      return this.dateFormatter(this.timestamp)
    },

    dateFormatter () {
      // console.log('dateFormatter')
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
      const longOptions = { timeZone: 'UTC', year: 'long' }
      const shortOptions = { timeZone: 'UTC', year: 'short' }

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
      this.$emit('input', [this.year, this.month, this.day].join('-'))
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

    handleDisabledLists () {
      this.disabledDaysList = []
      this.disabledMonthsList = []
      this.disabledYearsList = []

      this.disabledDays.forEach(m => this.disabledDaysList.push(padNumber(parseInt(m), 2)))
      this.disabledMonths.forEach(h => this.disabledMonthsList.push(padNumber(parseInt(h), 2)))
      this.disabledYears.forEach(h => this.disabledYearsList.push(padNumber(parseInt(h), 4)))
    },

    splitDate () {
      // use today's date (but not time, unless it wasn't passed in)
      const now = parseDate(new Date())
      const date = (this.value ? this.value : getDate(now)) + ' 00:00'
      this.timestamp = parsed(date)
      this.fromTimestamp()
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

    // renderers
    __renderYearsScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.year,
          items: this.yearsList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          input: (val) => { this.year = val }
        }
      })
    },

    __renderMonthsScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.month,
          items: this.monthsList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          input: (val) => { this.month = val }
        }
      })
    },

    __renderDaysScroller (h) {
      return h(ScrollerBase, {
        props: {
          value: this.day,
          items: this.daysList,
          dense: this.dense,
          disable: this.disable,
          height: this.bodyHeight,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
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
