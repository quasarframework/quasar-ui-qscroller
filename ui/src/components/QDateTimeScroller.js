// Mixins
import Common from '../mixins/common'
import DateTimeBase from '../mixins/date-time-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QDateScroller from './QDateScroller'
import QTimeScroller from './QTimeScroller'

// Util
import props from '../utils/props'
import {
  Timestamp,
  parseTimestamp,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  copyTimestamp,
  compareTimestamps,
  padNumber
} from '../utils/timestamp'

/* @vue/component */
export default {
  name: 'QDateTimeScroller',

  mixins: [DateTimeBase, QColorizeMixin, Common],

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
    slotData () {
      return this.timestamp
    },

    displayed () {
      return this.displayDateTime
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
      this.timestamp = parseTimestamp(this.date + ' ' + this.time)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    time () {
      const timestamp = copyTimestamp(this.timestamp)
      this.timestamp = parseTimestamp(this.date + ' ' + this.time)
      if (!compareTimestamps(timestamp, this.timestamp)) {
        this.emitValue()
      }
    },

    timestamp: {
      handler (val, oldVal) {
        if (oldVal === null || val.date !== oldVal.date) {
          this.emitValue()
        }
      },
      deep: true
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

    splitDateTime () {
      const type = Object.prototype.toString.call(this.value)
      let now, date
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          now = parseDate(this.value)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parseTimestamp(date)
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
          this.timestamp = parseTimestamp(date)
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
          this.timestamp = parseTimestamp(date)
          this.fromTimestamp()
          return
        case '[object String]':
          // use today's date (but not time, unless it wasn't passed in)
          this.type = 'string'
          now = parseDate(new Date())
          if (this.value) {
            const tm = parseTimestamp(this.value)
            if (tm.year) now.year = tm.year
            if (tm.month) now.month = tm.month
            if (tm.day) now.day = tm.day
            if (tm.hour) now.hour = tm.hour
            if (tm.minute) now.minute = tm.minute
          }
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parseTimestamp(date)
          this.fromTimestamp()
          return
      }
      if (this.value !== '') {
        /* eslint-disable-next-line */
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
          noYears: this.noYears,
          childHeight: this.bodyHeight
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
          noHours: this.noHours,
          childHeight: this.bodyHeight
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
    }
  }
}
