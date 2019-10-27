// Mixins
import TimeBase from './mixins/time-base'
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
  getDateObject,
  getDate,
  getTime,
  copyTimestamp,
  padNumber,
  createNativeLocaleFormatter
} from './utils/timestamp'

/* @vue/component */
export default {
  name: 'QTimeScroller',

  mixins: [TimeBase, QColorizeMixin],

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
    style () {
      let style = {}
      style['--scroller-border-color'] = this.calculateColor(this.borderColor)
      style['--scroller-bar-color'] = this.calculateColor(this.barColor)
      return style
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
      let count = (this.hour12 === true ? 12 : 24)
      if (this.hourInterval !== void 0 && parseInt(this.hourInterval) > 0) {
        count /= parseInt(this.hourInterval)
      }
      return [...Array(count)]
        .map((_, i) => i)
        .map(h => {
          h = this.hour12 ? h + 1 : h
          h *= this.hourInterval ? parseInt(this.hourInterval) : 1
          h = h < 10 ? '0' + h : '' + h
          return {
            value: h,
            disabled: this.disabledHoursList.includes(h)
          }
        })
    },

    displayTime () {
      if (this.timestamp.hasTime !== true) return ''
      if (this.noMinutes === true) return padNumber(this.hour, 2) + 'h'
      else if (this.noHours === true) return ':' + padNumber(this.minute, 2)
      let time = this.timeFormatter(this.timestamp, this.shortTimeLabel)
      if (this.amPmLabels !== void 0 && this.amPmLabels.length > 0 && this.ampmIndex > -1) {
        const c = time.substr(-(this.amPmLabels[this.ampmIndex].length))
        if (c !== this.amPmLabels[this.ampmIndex]) {
          let rindex = time.lastIndexOf(' ')
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
        this.timestamp.hour = parseInt(this.hour)
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
        this.timestamp.hour = parseInt(this.hour)
      }
      this.timestamp.hour %= 24
      if (this.hourInitialized === true) {
        this.emitValue()
      } else {
        this.hourInitialized = true
      }
    },

    minute () {
      this.timestamp.minute = parseInt(this.minute)
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

    handle12Hour () {
      if (this.hour12 === true && this.ampmIndex > -1) {
        let hour = parseInt(this.hour)
        if (this.ampmIndex === 0) {
          if (hour === 12) {
            this.timestamp.hour = 0
          } else {
            this.timestamp.hour = parseInt(this.hour)
          }
        } else if (this.ampmIndex === 1) {
          if (hour === 0) {
            this.timestamp.hour = 12
            this.hour = padNumber(this.timestamp.hour, 2)
          } else {
            this.timestamp.hour = hour < 12 ? hour + 12 : hour
          }
        } else {
          this.timestamp.hour = parseInt(this.hour)
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
      this.disabledMinutesList = []
      this.disabledHoursList = []

      this.disabledMinutes.forEach(m => this.disabledMinutesList.push(padNumber(parseInt(m), 2)))
      this.disabledHours.forEach(h => this.disabledHoursList.push(padNumber(parseInt(h), 2)))
    },

    splitTime () {
      const type = Object.prototype.toString.call(this.value)
      let now, date, parts
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
          now.hour = parseInt(this.value[0])
          now.minute = parseInt(this.value[1])
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
          now.hour = parseInt(this.value.hour)
          now.minute = parseInt(this.value.minute)
          date = getDate(now) + ' ' + getTime(now)
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
            parts = this.value.split(':')
            now.hour = parseInt(parts[0])
            now.minute = parseInt(parts[1])
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
        console.error(`QTimeScroller: invalid time format - '${this.value}'`)
      }
    },

    fromTimestamp () {
      this.minute = padNumber(this.timestamp.minute, 2)
      if (this.hour12 === true) {
        if (this.timestamp.hour === 12) {
          this.hour = '12'
          this.amPmIndex = 1
        } else if (this.timestamp.hour === 0) {
          this.hour = '12'
          this.amPmIndex = 0
        } else if (this.timestamp.hour > 12) {
          this.hour = padNumber(this.timestamp.hour - 12, 2)
          this.amPmIndex = 1
        } else if (this.timestamp.hour === 0) {
          this.hour = '12'
          this.amPmIndex = 0
        } else {
          this.hour = padNumber(this.timestamp.hour, 2)
          this.amPmIndex = 0
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
          'q-scroller__vertical-bar': this.showVerticalBar === true
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
          'q-scroller__vertical-bar': this.showVerticalBar === true && this.hour12 === true
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
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerColor, {
        staticClass: `row q-scroller__horizontal-bar${this.dense ? '--dense' : ''} row full-width`,
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
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        },
        style: {
          maxHeight: this.dense ? '30px' : '50px',
          minHeight: this.dense ? '30px' : '50px'
        }
      }, slot ? slot(this.timestamp) : [
        h('span', {
          staticClass: 'ellipsis'
        }, this.displayTime)
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
        },
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
      staticClass: 'q-scroller',
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
