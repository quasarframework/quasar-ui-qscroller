// Mixins
import Common from '../mixins/common'
import TimeBase from '../mixins/time-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QTimeScroller from './QTimeScroller'

// Util
import props from '../utils/props'
import {
  getTimeIdentifier,
  parsed,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  padNumber
} from '../utils/timestamp'

/* @vue/component */
export default {
  name: 'QTimeRangeScroller',

  mixins: [TimeBase, QColorizeMixin, Common],

  props: {
    ...props.timeRange,
    ...props.verticalBar
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
      startTime: '',
      endTime: '',
      type: null
    }
  },

  mounted () {
    this.splitTime()
    this.adjustBodyHeight()
  },

  computed: {
    slotData () {
      if (this.$refs.startTime && this.$refs.endTime) {
        return [this.$refs.startTime.getTimestamp(), this.$refs.endTime.getTimestamp()]
      }
      return ''
    },

    displayed () {
      return this.displayTime
    },

    displayTime () {
      if (this.startTime !== '' && this.endTime !== '') {
        if (this.$refs.startTime && this.$refs.endTime) {
          return this.$refs.startTime.displayTime + this.displaySeparator + this.$refs.endTime.displayTime
        }
        return `${this.startTime}${this.displaySeparator}${this.endTime}`
      }
      return `${this.displaySeparator}`
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
    }
  },

  methods: {
    emitValue () {
      let startParts, endParts, start, end
      switch (this.type) {
        case 'date':
          start = parseDate(new Date())
          end = parseDate(new Date())
          startParts = this.startTime.split(':')
          endParts = this.endTime.split(':')
          start.hour = parseInt(startParts[0], 10)
          start.minute = parseInt(startParts[1], 10)
          end.hour = parseInt(endParts[0], 10)
          end.minute = parseInt(endParts[1], 10)
          this.$emit('input', [getDateObject(start), getDateObject(end)])
          return
        case 'array':
          startParts = this.startTime.split(':')
          endParts = this.endTime.split(':')
          this.$emit('input', [
            [parseInt(startParts[0], 10), parseInt(startParts[1], 10)], [parseInt(endParts[0], 10), parseInt(endParts[1], 10)]
          ])
          return
        case 'object':
          startParts = this.startTime.split(':')
          endParts = this.endTime.split(':')
          this.$emit('input', [
            { hour: parseInt(startParts[0], 10), minute: parseInt(startParts[1], 10) }, { hour: parseInt(endParts[0], 10), minute: parseInt(endParts[1], 10) }
          ])

          return
        case 'string':
          this.$emit('input', [
            this.startTime, this.endTime
          ])
          return
      }
      if (this.startTime !== '' && this.endTime !== '') {
        if (this.type === 'array') {
          this.$emit('input', [
            this.startTime, this.endTime
          ])
        } else if (this.type === 'object') {
          this.$emit('input', `{ start: ${this.startTime}, end: ${this.endTime} }`)
        } else { // if (this.type === 'string') {
          this.$emit('input', `${this.startTime}${this.displaySeparator}${this.endTime}`)
        }
      }
    },

    isValidRange () {
      if (this.disableValidation === true) {
        return true
      }
      // check if endTime is > startTime
      if (this.startTime && this.endTime) {
        const start = parseDate(new Date())
        const end = parseDate(new Date())
        const startParts = this.startTime.split(':')
        const endParts = this.endTime.split(':')
        start.hour = parseInt(startParts[0])
        start.minute = parseInt(startParts[1])
        end.hour = parseInt(endParts[0])
        end.minute = parseInt(endParts[1])
        const startTime = getTimeIdentifier(start)
        const endTime = getTimeIdentifier(end)
        if (endTime >= startTime) {
          return true
        }
        this.$emit('invalid-range', { startTime: this.startTime, endTime: this.endTime })
        return false
      }
      // until everything is mounted, just return true
      return true
    },

    splitTime () {
      // QTimeRangeScroller takes an array of Date, Object, Array or String
      let start, end, now
      let type = Object.prototype.toString.call(this.value)
      if (type !== '[object Array]' && type !== '[object Undefined]' && type !== '[object String]') {
        /* eslint-disable-next-line */
        console.error(`QTimeRangeScroller: value needs to be an array of types (${this.value})`)
        return
      }
      // use first item to determine type
      type = Object.prototype.toString.call(this.value[0])
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          start = parseDate(this.value[0])
          start = getDate(start) + ' ' + getTime(start)
          start = getTime(parsed(start))
          end = parseDate(this.value[1])
          end = getDate(end) + ' ' + getTime(end)
          end = getTime(parsed(end))
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
          }
          return
        case '[object Array]':
          this.type = 'array'
          start = padNumber(parseInt(this.value[0][0], 10), 2) + ':' + padNumber(parseInt(this.value[0][1], 10), 2)
          end = padNumber(parseInt(this.value[1][0], 10), 2) + ':' + padNumber(parseInt(this.value[1][1], 10), 2)
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
          }
          return
        case '[object Object]':
          this.type = 'object'
          start = padNumber(parseInt(this.value[0].hour, 10), 2) + ':' + padNumber(parseInt(this.value[0].minute, 10), 2)
          end = padNumber(parseInt(this.value[1].hour, 10), 2) + ':' + padNumber(parseInt(this.value[1].minute, 10), 2)
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
          }
          return
        case '[object String]':
          this.type = 'string'
          start = this.value[0]
          end = this.value[1]
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
          }
          return
        case '[object Undefined]':
          // if nothing is provided, then use current time as array of strings
          this.type = 'string'
          now = new Date()
          now = parseDate(now)
          start = getDate(now) + ' ' + getTime(now)
          start = getTime(parsed(start))
          end = start
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          } else {
            /* eslint-disable-next-line */
            console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
          }
      }
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderStartTime (h) {
      return h(QTimeScroller, {
        ref: 'startTime',
        staticClass: 'col-6',
        props: {
          value: this.startTime,
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
          amPmLabels: this.startAmPmLabels,
          minuteInterval: this.startMinuteInterval,
          hourInterval: this.startHourInterval,
          shortTimeLabel: this.startShortTimeLabel,
          disabledHours: this.startDisabledHours,
          disabledMinutes: this.startDisabledMinutes,
          noMinutes: this.startNoMinutes,
          noHours: this.startNoHours,
          childHeight: this.bodyHeight
        },
        class: {
          'q-scroller__vertical-bar': this.verticalBar === true
        },
        on: {
          input: v => { this.startTime = v }
        }
      })
    },

    __renderEndTime (h) {
      const isValidRange = this.isValidRange()
      return h(QTimeScroller, {
        ref: 'endTime',
        staticClass: 'col-6',
        props: {
          value: this.endTime,
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
          hour12: this.hour12,
          amPmLabels: this.endAmPmLabels,
          minuteInterval: this.endMinuteInterval,
          hourInterval: this.endHourInterval,
          shortTimeLabel: this.endShortTimeLabel,
          disabledHours: this.endDisabledHours,
          disabledMinutes: this.endDisabledMinutes,
          noMinutes: this.endNoMinutes,
          noHours: this.endNoHours,
          childHeight: this.bodyHeight
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
    }
  }
}
