// Mixins
import TimeBase from './mixins/time-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QTimeScroller from './QTimeScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
import {
  getTimeIdentifier,
  parsed,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  padNumber
} from './utils/timestamp'

/* @vue/component */
export default {
  name: `QTimeRangeScroller`,

  mixins: [TimeBase, QColorizeMixin],

  props: {
    ...props.common,
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
    style () {
      let style = {}
      style['--scroller-border-color'] = this.calculateColor(this.borderColor)
      style['--scroller-bar-color'] = this.calculateColor(this.barColor)
      return style
    },

    displayTime () {
      if (this.startTime !== void 0 && this.endTime !== void 0) {
        if (this.$refs.startTime && this.$refs.endTime) {
          return this.$refs.startTime.displayTime + this.displaySeparator + this.$refs.endTime.displayTime
        }
        const time = `${this.startTime}${this.displaySeparator}${this.endTime}`
        return time
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
      let startParts, endParts,  start, end
      switch (this.type) {
        case 'date':
            start = parseDate(new Date())
            end = parseDate(new Date())
            startParts = this.startTime.split(':')
            endParts = this.endTime.split(':')
            start.hour = parseInt(startParts[0])
            start.minute = parseInt(startParts[1])
            end.hour = parseInt(endParts[0])
            end.minute = parseInt(endParts[1])
            this.$emit('input', [ getDateObject(this.start), getDateObject(this.end) ])
          return
        case 'array':
            startParts = this.startTime.split(':')
            endParts = this.endTime.split(':')
            this.$emit('input', [
              [ parseInt(startParts[0]), parseInt(startParts[1]) ],[ parseInt(endParts[0]), parseInt(endParts[1]) ]
            ])
            return
        case 'object':
          startParts = this.startTime.split(':')
          endParts = this.endTime.split(':')
          this.$emit('input', [
            { hour: parseInt(startParts[0]), minute: parseInt(startParts[1]) }, { hour: parseInt(endParts[0]), minute: parseInt(endParts[1]) }
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
      // check if endTime is > startTime
      if (this.startTime && this.endTime) {
        let start = parseDate(new Date())
        let end = parseDate(new Date())
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
        return false
      }
      // until everything is mounted, just return true
      return true
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

    splitTime () {
      // QTimeRangeScroller takes an array of Date, Object, Array or String
      let start, end, now
      let type = Object.prototype.toString.call(this.value)
      // use first item to determine type; convert to string for sub-components
      type = Object.prototype.toString.call(this.value[0])
      switch (type) {
        case '[object Date]':
          this.type = 'date'
          start = parseDate(this.value[0])
          start = getDate(start) + ' ' + getTime(start)
          start = parsed(start)
          end = parseDate(this.value[1])
          end = getDate(end) + ' ' + getTime(end)
          end = parsed(start)
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          }
          return
        case '[object Array]':
          this.type = 'array'
          start = padNumber(parseInt(this.value[0][0]), 2) + ':' + padNumber(parseInt(this.value[0][1]), 2)
          end = padNumber(parseInt(this.value[1][0]), 2) + ':' + padNumber(parseInt(this.value[1][1]), 2)
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          }
          return
        case '[object Object]':
          this.type = 'object'
          start = padNumber(parseInt(this.value[0].hour), 2) + ':' + padNumber(parseInt(this.value[0].minute), 2)
          end = padNumber(parseInt(this.value[1].hour), 2) + ':' + padNumber(parseInt(this.value[1].minute), 2)
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
          }
          return
        case '[object String]':
          this.type = 'string'
          start = this.value[0]
          end = this.value[1]
          if (this.isValidTime(start) && this.isValidTime(end)) {
            this.startTime = start
            this.endTime = end
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
          }
      }
    },

    isValidTime (time) {
      const parts = time.split(':')
      if (parts.length === 2) {
        const hour = parseInt(parts[0])
        const minute = parseInt(parts[1])
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
          return true
        }
      }
      return false
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
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          hour12: this.hour12,
          amPmLabels: this.amPmLabels,
          minuteInterval: this.startMinuteInterval,
          hourInterval: this.startHourInterval,
          shortTimeLabel: this.startShortTimeLabel,
          disabledHours: this.startDisabledHours,
          disabledMinutes: this.startDisabledMinutes,
          noMinutes: this.startNoMinutes,
          noHours: this.startNoHours
        },
        class: {
          'q-scroller__vertical-bar': this.showVerticalBar === true
        },
        on: {
          input: v => { this.startTime = v }
        }
      })
    },

    __renderEndTime (h) {
      return h(QTimeScroller, {
        ref: 'endTime',
        staticClass: 'col-6',
        props: {
          value: this.endTime,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.isValidRange() ? this.innerTextColor : this.errorTextColor,
          innerColor: this.isValidRange() ? this.innerColor : this.errorColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          hour12: this.hour12,
          amPmLabels: this.amPmLabels,
          minuteInterval: this.endMinuteInterval,
          hourInterval: this.endHourInterval,
          shortTimeLabel: this.endShortTimeLabel,
          disabledHours: this.endDisabledHours,
          disabledMinutes: this.endDisbaledMinutes,
          noMinutes: this.endNoMinutes,
          noHours: this.endNoHours
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
        },
        style: {
          maxHeight: this.dense ? '30px' : '50px',
          minHeight: this.dense ? '30px' : '50px'
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

    return h('div', this.setBothColors(this.textColor, this.color, {
      ref: 'scroller',
      staticClass: 'q-time-range-scroller flex',
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
