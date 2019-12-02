// Mixins
import Common from '../mixins/common'
import TimeBase from '../mixins/time-base'
import { QColorizeMixin } from 'q-colorize-mixin'

// Components
import ScrollerBase from '../mixins/scroller-base'

// Util
import props from '../utils/props'
import {
  Timestamp,
  parsed,
  parseDate,
  PARSE_TIME,
  getDateObject,
  getDate,
  getTime,
  copyTimestamp,
  padNumber,
  createNativeLocaleFormatter
} from '../utils/timestamp'

/* @vue/component */
export default {
  name: 'QTimeScroller',

  mixins: [TimeBase, QColorizeMixin, Common],

  props: {
    ...props.time,
    ...props.verticalBar
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
      ampm: '',
      hour: '',
      minute: '',
      ampmIndex: -1, // 2 states: 0=AM, 1=PM (indices into amPmLabels)
      timestamp: null,
      type: null,
      disabledMinutesList: [],
      disabledHoursList: [],
      hourInitialized: false,
      minuteInitialized: false,
      ampmInitialized: false
    }
  },

  created () {
    this.timestamp = copyTimestamp(Timestamp)
  },

  beforeMount () {
    this.handleDisabledLists()
    this.splitTime()
  },

  mounted () {
    this.adjustBodyHeight()
  },

  computed: {
    slotData () {
      return this.timestamp
    },

    displayed () {
      return this.displayTime
    },

    ampmList () {
      return this.amPmLabels
        .map((ap, index) => {
          return {
            value: ap,
            disabled: false,
            noCaps: true
          }
        })
    },

    minutesList () {
      let count = 60
      if (this.minuteInterval !== void 0 && parseInt(this.minuteInterval, 10) > 0) {
        count /= parseInt(this.minuteInterval, 10)
      }
      let data = []
      for (let index = 0; index < count; ++index) {
        data.push(index)
      }
      data = data.map(m => {
        m *= this.minuteInterval ? parseInt(this.minuteInterval, 10) : 1
        m = m < 10 ? '0' + m : '' + m
        return {
          value: m,
          disabled: this.disabledMinutesList.includes(m)
        }
      })
      return data
    },

    hoursList () {
      let count = (this.hour12 === true ? 12 : 24)
      if (this.hourInterval !== void 0 && parseInt(this.hourInterval) > 0) {
        count /= parseInt(this.hourInterval, 10)
      }
      let data = []
      for (let index = 0; index < count; ++index) {
        data.push(index)
      }
      data = data.map(h => {
        h = this.hour12 ? h + 1 : h
        h *= this.hourInterval ? parseInt(this.hourInterval, 10) : 1
        h = h < 10 ? '0' + h : '' + h
        return {
          value: h,
          disabled: this.disabledHoursList.includes(h)
        }
      })
      return data
    },

    displayTime () {
      if (this.timestamp.hasTime !== true) return ''
      if (this.noMinutes === true) return padNumber(this.hour, 2) + 'h'
      else if (this.noHours === true) return ':' + padNumber(this.minute, 2)
      let time = this.timeFormatter(this.timestamp, this.shortTimeLabel)
      if (this.amPmLabels !== void 0 && this.amPmLabels.length > 0 && this.ampmIndex > -1) {
        const c = time.substr(-(this.amPmLabels[this.ampmIndex].length))
        if (c !== this.amPmLabels[this.ampmIndex]) {
          const rindex = time.lastIndexOf(' ')
          if (rindex > -1) {
            time = time.slice(0, rindex + 1)
            time += this.amPmLabels[this.ampmIndex]
          }
        }
      }
      return time
    },

    timeFormatter () {
      const longOptions = { timeZone: 'UTC', hour12: this.hour12, hour: '2-digit', minute: '2-digit' }
      const shortOptions = { timeZone: 'UTC', hour12: this.hour12, hour: 'numeric', minute: '2-digit' }
      const shortHourOptions = { timeZone: 'UTC', hour12: this.hour12, hour: 'numeric' }

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
      this.ampm = this.amPmLabels[this.ampmIndex]
      if (this.hour12 === true) {
        this.handle12Hour()
      } else {
        this.timestamp.hour = parseInt(this.hour, 10)
      }
      if (this.ampmInitialized === true) {
        this.emitValue()
      } else {
        this.ampmInitialized = true
      }
    },

    hour () {
      if (this.hour12 === true) {
        this.handle12Hour()
      } else {
        this.timestamp.hour = parseInt(this.hour, 10)
      }
      this.timestamp.hour %= 24
      if (this.hourInitialized === true) {
        this.emitValue()
      } else {
        this.hourInitialized = true
      }
    },

    minute () {
      this.timestamp.minute = parseInt(this.minute, 10)
      if (this.minuteInitialized === true) {
        this.emitValue()
      } else {
        this.minuteInitialized = true
      }
    },

    ampm () {
      this.ampmIndex = this.amPmLabels.findIndex(ap => ap === this.ampm)
    },

    hour12 () {
      this.hour = padNumber(this.timestamp.hour, 2)
      if (this.hour12 === true) {
        this.handle12Hour()
      } else {
        this.hour = padNumber(this.timestamp.hour, 2)
      }
      this.emitValue()
    },

    disabledMinutes () {
      this.handleDisabledLists()
    },

    disabledHours () {
      this.handleDisabledLists()
    }
  },

  methods: {
    getTimestamp () {
      return this.timestamp
    },

    handle12Hour () {
      if (this.hour12 === true && this.ampmIndex > -1) {
        const hour = parseInt(this.hour, 10)
        if (this.ampmIndex === 0) {
          if (hour === 12) {
            this.timestamp.hour = 0
          } else {
            this.timestamp.hour = parseInt(this.hour, 10)
          }
        } else if (this.ampmIndex === 1) {
          if (hour === 0) {
            this.timestamp.hour = 12
            this.hour = padNumber(this.timestamp.hour, 2)
          } else {
            this.timestamp.hour = hour < 12 ? hour + 12 : hour
          }
        } else {
          this.timestamp.hour = parseInt(this.hour, 10)
        }
      }
    },

    emitValue () {
      switch (this.type) {
        case 'date':
          this.$emit('input', getDateObject(this.timestamp))
          return
        case 'array':
          this.$emit('input', [padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)])
          return
        case 'object':
          this.$emit('input', { hour: padNumber(this.timestamp.hour, 2), minute: padNumber(this.timestamp.minute, 2) })
          return
        case 'string':
          this.$emit('input', [padNumber(this.timestamp.hour, 2), padNumber(this.timestamp.minute, 2)].join(':'))
      }
    },

    handleDisabledLists () {
      this.disabledMinutesList = []
      this.disabledHoursList = []

      this.disabledMinutes.forEach(m => this.disabledMinutesList.push(padNumber(parseInt(m, 10), 2)))
      this.disabledHours.forEach(h => this.disabledHoursList.push(padNumber(parseInt(h, 10), 2)))
    },

    splitTime () {
      const type = Object.prototype.toString.call(this.value)
      let now, date
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          now = parseDate(this.value)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.timestamp.minute = Math.floor((this.timestamp.minute / this.minuteInterval)) * this.minuteInterval
          // this.ampmIndex = this.timestamp.hour > 12 && this.timestamp.minute >= 0 ? 1 : 0
          this.fromTimestamp()
          return
        case '[object Array]':
          this.type = 'array'
          // 1st item is hour, 2nd item is minutes
          now = parseDate(new Date())
          now.hour = parseInt(this.value[0], 10)
          now.minute = parseInt(this.value[1], 10)
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.timestamp.minute = Math.floor((this.timestamp.minute / this.minuteInterval)) * this.minuteInterval
          // this.ampmIndex = this.timestamp.hour > 12 && this.timestamp.minute >= 0 ? 1 : 0
          this.fromTimestamp()
          return
        case '[object Object]':
          this.type = 'object'
          // object must contain keys 'hour', 'minute'
          now = parseDate(new Date())
          now.hour = parseInt(this.value.hour, 10)
          now.minute = parseInt(this.value.minute, 10)
          date = getDate(now) + ' ' + getTime(now, 10)
          this.timestamp = parsed(date)
          this.timestamp.minute = Math.floor((this.timestamp.minute / this.minuteInterval)) * this.minuteInterval
          // this.ampmIndex = this.timestamp.hour > 12 && this.timestamp.minute >= 0 ? 1 : 0
          this.fromTimestamp()
          return
        case '[object String]':
          // use today's date (but not time, unless it wasn't passed in)
          this.type = 'string'
          now = parseDate(new Date())
          if (this.value) {
            const parts = PARSE_TIME.exec(this.value)
            now.hour = parseInt(parts[1], 10)
            now.minute = parseInt(parts[3] || 0, 10)
          }
          date = getDate(now) + ' ' + getTime(now)
          this.timestamp = parsed(date)
          this.timestamp.minute = Math.floor((this.timestamp.minute / this.minuteInterval)) * this.minuteInterval
          if (this.timestamp.hour >= 24) {
            this.timestamp.hour %= 24
          }
          // this.ampmIndex = this.timestamp.hour > 12 && this.timestamp.minute >= 0 ? 1 : 0
          this.fromTimestamp()
          return
      }
      if (this.value !== '') {
        /* eslint-disable-next-line */
        console.error(`QTimeScroller: invalid time format - '${this.value}'`)
      }
    },

    fromTimestamp () {
      this.minute = padNumber(this.timestamp.minute, 2)
      if (this.hour12 === true) {
        if (this.timestamp.hour === 12) {
          this.hour = '12'
          this.ampmIndex = 1
        } else if (this.timestamp.hour === 0) {
          this.hour = '12'
          this.ampmIndex = 0
        } else if (this.timestamp.hour > 12) {
          this.hour = padNumber(this.timestamp.hour - 12, 2)
          this.ampmIndex = 1
        } else if (this.timestamp.hour === 0) {
          this.hour = '12'
          this.ampmIndex = 0
        } else {
          this.hour = padNumber(this.timestamp.hour, 2)
          this.ampmIndex = 0
        }
      } else {
        this.hour = padNumber(this.timestamp.hour, 2)
      }
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderHoursScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.hour,
          items: this.hoursList,
          dense: this.dense,
          disable: this.disable,
          textColor: this.innerTextColor,
          color: this.innerColor,
          disabledTextColor: this.disabledTextColor
        },
        class: {
          'q-scroller__vertical-bar': this.verticalBar === true
        },
        on: {
          input: (val) => { this.hour = val }
        }
      })
    },

    __renderMinutesScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.minute,
          items: this.minutesList,
          dense: this.dense,
          disable: this.disable,
          textColor: this.innerTextColor,
          color: this.innerColor,
          disabledTextColor: this.disabledTextColor
        },
        class: {
          'q-scroller__vertical-bar': this.verticalBar === true && this.hour12 === true
        },
        on: {
          input: (val) => { this.minute = val }
        }
      })
    },

    __renderAmPmScroller (h) {
      return h(ScrollerBase, {
        staticClass: 'col',
        props: {
          value: this.ampm,
          items: this.ampmList,
          dense: this.dense,
          disable: this.disable,
          textColor: this.innerTextColor,
          color: this.innerColor,
          disabledTextColor: this.disabledTextColor
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
        this.hour12 === true && this.__renderAmPmScroller(h)
      ]
    }
  }
}
