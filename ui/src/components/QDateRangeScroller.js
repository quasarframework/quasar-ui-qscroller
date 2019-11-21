// Mixins
import Common from '../mixins/common'
import DateBase from '../mixins/date-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QDateScroller from './QDateScroller'

// Util
import props from '../utils/props'
import {
  getDayIdentifier,
  parsed,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  padNumber
} from '../utils/timestamp'

/* @vue/component */
export default {
  name: 'QDateRangeScroller',

  mixins: [DateBase, QColorizeMixin, Common],

  props: {
    ...props.dateRange,
    ...props.verticalBar,
    ...props.locale
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
      startDate: '',
      endDate: '',
      type: null
    }
  },

  mounted () {
    this.splitDate()
    this.adjustBodyHeight()
  },

  computed: {
    slotData () {
      if (this.$refs.startDate && this.$refs.endDate) {
        return [this.$refs.startDate.getTimestamp(), this.$refs.endDate.getTimestamp()]
      }
      return []
    },

    displayed () {
      return this.displayDate
    },

    displayDate () {
      if (this.startDate !== '' && this.endDate !== '') {
        if (this.$refs.startDate && this.$refs.endDate) {
          return this.$refs.startDate.displayDate + this.displaySeparator + this.$refs.endDate.displayDate
        }
        return `${this.startDate}${this.displaySeparator}${this.endDate}`
      }
      return `${this.displaySeparator}`
    }
  },

  watch: {
    value () {
      this.splitDate()
    },

    startDate () {
      this.emitValue()
    },

    endDate () {
      this.emitValue()
    }
  },

  methods: {
    emitValue () {
      let startParts, endParts, start, end
      switch (this.type) {
        case 'date':
          start = parseDate(new Date())
          end = parseDate(new Date())
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          start.year = parseInt(startParts[0], 10)
          start.month = parseInt(startParts[1], 10)
          start.day = parseInt(startParts[2], 10)
          end.year = parseInt(endParts[0], 10)
          end.month = parseInt(endParts[1], 10)
          end.day = parseInt(endParts[2], 10)
          this.$emit('input', [ getDateObject(start), getDateObject(end) ])
          return
        case 'array':
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          this.$emit('input', [
            [ parseInt(startParts[0], 10), parseInt(startParts[1], 10), parseInt(startParts[2], 10) ], [ parseInt(endParts[0], 10), parseInt(endParts[1], 10), parseInt(endParts[2], 10) ]
          ])
          return
        case 'object':
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          this.$emit('input', [
            { year: parseInt(startParts[0], 10), month: parseInt(startParts[1], 10), day: parseInt(startParts[2], 10) }, { year: parseInt(endParts[0], 10), month: parseInt(endParts[1], 10), day: parseInt(endParts[2], 10) }
          ])

          return
        case 'string':
          this.$emit('input', [
            this.startDate, this.endDate
          ])
          return
      }
      if (this.startDate !== '' && this.endDate !== '') {
        if (this.type === 'array') {
          this.$emit('input', [
            this.startDate, this.endDate
          ])
        } else if (this.type === 'object') {
          this.$emit('input', `{ start: ${this.startDate}, end: ${this.endDate} }`)
        } else { // if (this.type === 'string') {
          this.$emit('input', `${this.startDate}${this.displaySeparator}${this.endDate}`)
        }
      }
    },

    isValidRange () {
      if (this.disableValidation === true) {
        return true
      }
      // check if endDate is > startDate
      if (this.startDate && this.endDate) {
        let start = parseDate(new Date())
        let end = parseDate(new Date())
        const startParts = this.startDate.split('-')
        const endParts = this.endDate.split('-')
        start.year = parseInt(startParts[0], 10)
        start.month = parseInt(startParts[1], 10)
        start.day = parseInt(startParts[2], 10)
        end.year = parseInt(endParts[0], 10)
        end.month = parseInt(endParts[1], 10)
        end.day = parseInt(endParts[2], 10)
        const startDate = getDayIdentifier(start)
        const endDate = getDayIdentifier(end)
        if (endDate >= startDate) {
          return true
        }
        this.$emit('invalid-range', { startDate: this.startDate, endDate: this.endDate })
        return false
      }
      // until everything is mounted, just return true
      return true
    },

    splitDate () {
      // QDateRangeScroller takes an array of Date, Object, Array or String
      let start, end, now
      let type = Object.prototype.toString.call(this.value)
      if (type !== '[object Array]' && type !== '[object Undefined]' && type !== '[object String]') {
        /* eslint-disable-next-line */
        console.error(`QDateRangeScroller: value needs to be an array of types (${this.value})`)
        return
      }
      // use first item to determine type
      type = Object.prototype.toString.call(this.value[0])
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          start = parseDate(this.value[0])
          start = getDate(start) + ' ' + getTime(start)
          start = getDate(parsed(start))
          end = parseDate(this.value[1])
          end = getDate(end) + ' ' + getTime(end)
          end = getDate(parsed(end))
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
          }
          return
        case '[object Array]':
          this.type = 'array'
          start = padNumber(parseInt(this.value[0][0], 10), 2) + '-' + padNumber(parseInt(this.value[0][1], 10), 2) + '-' + padNumber(parseInt(this.value[0][2], 10), 2)
          end = padNumber(parseInt(this.value[1][0], 10), 2) + '-' + padNumber(parseInt(this.value[1][1], 10), 2) + '-' + padNumber(parseInt(this.value[1][2], 10), 2)
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
          }
          return
        case '[object Object]':
          this.type = 'object'
          start = padNumber(parseInt(this.value[0].year, 10), 2) + '-' + padNumber(parseInt(this.value[0].month, 10), 2) + '-' + padNumber(parseInt(this.value[0].day, 10), 2)
          end = padNumber(parseInt(this.value[1].year, 10), 2) + '-' + padNumber(parseInt(this.value[1].month, 10), 2) + '-' + padNumber(parseInt(this.value[1].day, 10), 2)
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
          }
          return
        case '[object String]':
          this.type = 'string'
          start = this.value[0]
          end = this.value[1]
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
          }
          return
        case '[object Undefined]':
          // if nothing is provided, then use current time as array of strings
          this.type = 'string'
          now = new Date()
          now = parseDate(now)
          start = getDate(now) + ' ' + getTime(now)
          start = getDate(parsed(start))
          end = start
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
          }
      }
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderStartDate (h) {
      return h(QDateScroller, {
        ref: 'startDate',
        staticClass: 'col-6',
        props: {
          value: this.startDate,
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
          // startDate: this.startStartDate,
          // endDate: this.startEndDate,
          disabledYears: this.startDisabledYears,
          disabledMonths: this.startDisabledMonths,
          disabledDays: this.startDisabledDays,
          // shortYearLabel: this.startShortYearLabel,
          // shortMonthLabel: this.startShortMonthLabel,
          // shortDayLabel: this.startShortDayLabel,
          // showMonthLabel: this.startShowMonthLabel,
          // showWeekdayLabel: this.startShowWeekdayLabel,
          noDays: this.startNoDays,
          noMonths: this.startNoMonths,
          noYears: this.startNoYears,
          yearBegin: this.startYearBegin,
          yearStop: this.startYearStop,
          childHeight: this.bodyHeight
        },
        class: {
          'q-scroller__vertical-bar': this.verticalBar === true
        },
        on: {
          input: v => { this.startDate = v }
        }
      })
    },

    __renderEndDate (h) {
      const isValidRange = this.isValidRange()
      return h(QDateScroller, {
        ref: 'endDate',
        staticClass: 'col-6',
        props: {
          value: this.endDate,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: isValidRange ? this.innerTextColor : this.errorTextColor,
          innerColor: isValidRange ? this.innerColor : this.errorColor,
          disabledTextColor: this.disabledTextColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          // startDate: this.endStartDate,
          // endDate: this.endStartDate,
          disabledYears: this.endDisabledYears,
          disabledMonths: this.endDisabledMonths,
          disabledDays: this.endDisabledDays,
          // shortYearLabel: this.endShortYearLabel,
          // shortMonthLabel: this.endShortMonthLabel,
          // shortDayLabel: this.endShortDayLabel,
          // showMonthLabel: this.endShowMonthLabel,
          // showWeekdayLabel: this.endShowWeekdayLabel,
          noDays: this.endNoDays,
          noMonths: this.endNoMonths,
          noYears: this.endNoYears,
          yearBegin: this.endYearBegin,
          yearStop: this.endYearStop,
          childHeight: this.bodyHeight
        },
        on: {
          input: v => { this.endDate = v }
        }
      })
    },

    __renderScrollers (h) {
      return [
        this.__renderStartDate(h),
        this.__renderEndDate(h)
      ]
    }
  }
}
