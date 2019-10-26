// Mixins
import DateBase from './mixins/date-base'
import { QColorizeMixin } from 'q-colorize-mixin'
import QDateScroller from './QDateScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
import {
  getDayIdentifier,
  parsed,
  parseDate,
  getDate,
  getTime,
  daysInMonth,
  padNumber
} from './utils/timestamp'

/* @vue/component */
export default {
  name: `QDateRangeScroller`,

  mixins: [DateBase, QColorizeMixin],

  props: {
    ...props.common,
    ...props.dateRange,
    ...props.verticalBar
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
    style () {
      let style = {}
      style['--scroller-border-color'] = this.calculateColor(this.borderColor)
      style['--scroller-bar-color'] = this.calculateColor(this.barColor)
      return style
    },

    displayDate () {
      if (this.startDate !== void 0 && this.endDate !== void 0) {
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
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          start.year = parseInt(startParts[0])
          start.month = parseInt(startParts[1])
          start.day = parseInt(startParts[2])
          end.year = parseInt(endParts[0])
          end.month = parseInt(endParts[1])
          end.day = parseInt(endParts[2])
          this.$emit('input', [ getDateObject(this.start), getDateObject(this.end) ])
          return
        case 'array':
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          this.$emit('input', [
            [ parseInt(startParts[0]), parseInt(startParts[1]), parseInt(startParts[2]) ],[ parseInt(endParts[0]), parseInt(endParts[1]), parseInt(endParts[2]) ]
          ])
          return
        case 'object':
          startParts = this.startDate.split('-')
          endParts = this.endDate.split('-')
          this.$emit('input', [
            { year: parseInt(startParts[0]), month: parseInt(startParts[1]), day: parseInt(startParts[2]) }, { year: parseInt(endParts[0]), month: parseInt(endParts[1]), day: parseInt(endParts[2]) }
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
      // check if endDate is > startDate
      if (this.startDate && this.endDate) {
        let start = parseDate(new Date())
        let end = parseDate(new Date())
        const startParts = this.startDate.split('-')
        const endParts = this.endDate.split('-')
        start.year = parseInt(startParts[0])
        start.month = parseInt(startParts[1])
        start.day = parseInt(startParts[2])
        end.year = parseInt(endParts[0])
        end.month = parseInt(endParts[1])
        end.day = parseInt(endParts[2])
        const startDate = getDayIdentifier(start)
        const endDate = getDayIdentifier(end)
        if (endDate >= startDate) {
          return true
        }
        return false
      }
      // until everything is mounted, just return true
      return true
    },

    onResize ({ height }) {
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

    splitDate () {
      // QDateRangeScroller takes an array of Date, Object, Array or String
      let start, end, now
      let type = Object.prototype.toString.call(this.value)
      // use first item to determine type; convert to string for sub-components
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
            console.error('QDateRangeScroller: invalid start or end dates')
          }
          return
        case '[object Array]':
          this.type = 'array'
          start = padNumber(parseInt(this.value[0][0]), 2) + '-' + padNumber(parseInt(this.value[0][1]), 2) + '-' + padNumber(parseInt(this.value[0][2]), 2)
          end = padNumber(parseInt(this.value[1][0]), 2) + '-' + padNumber(parseInt(this.value[1][1]), 2) + '-' + padNumber(parseInt(this.value[1][2]), 2)
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            console.error('QDateRangeScroller: invalid start or end dates')
          }
          return
        case '[object Object]':
          this.type = 'object'
          start = padNumber(parseInt(this.value[0].year), 2) + '-' + padNumber(parseInt(this.value[0].month), 2) + '-' + padNumber(parseInt(this.value[0].day), 2)
          end = padNumber(parseInt(this.value[1].year), 2) + '-' + padNumber(parseInt(this.value[1].month), 2) + '-' + padNumber(parseInt(this.value[1].minute), 2)
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
          } else {
            console.error('QDateRangeScroller: invalid start or end dates')
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
            console.error('QDateRangeScroller: invalid start or end dates')
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
            console.error('QDateRangeScroller: invalid start or end dates')
          }
      }
    },

    isValidDate (date) {
      const parts = date.split('-')
      if (parts.length === 3) {
        const year = parseInt(parts[0])
        const month = parseInt(parts[1])
        const day = parseInt(parts[2])
        const daysInM = daysInMonth(year, month)
        if (year !== 0 && month > 0 && month <= 12 && day > 0 && day <= daysInM) {
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
      }, slot ? slot([this.$refs.startDate.getTimestamp(), this.$refs.endDate.getTimestamp()]) : [
        h('span', {
          staticClass: 'ellipsis'
        }, this.displayDate)
      ])
    },

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
          startDate: this.startStartDate,
          endDate: this.startEndDate,
          disabledYears: this.startDisabledYears,
          disabledMonths: this.startDisabledMonths,
          disabledDays: this.startDisabledDays,
          shortYearLabel: this.startShortYearLabel,
          shortMonthLabel: this.startShortMonthLabel,
          shortDayLabel: this.startShortDayLabel,
          showMonthLabel: this.startShowMonthLabel,
          showWeekdayLabel: this.startShowWeekdayLabel,
          noDays: this.startNoDays,
          noMonths: this.startNoMonths,
          noYears: this.startNoYears
        },
        class: {
          'q-scroller__vertical-bar': this.showVerticalBar === true
        },
        on: {
          input: v => { this.startDate = v }
        }
      })
    },

    __renderEndDate (h) {
      return h(QDateScroller, {
        ref: 'endDate',
        staticClass: 'col-6',
        props: {
          value: this.endDate,
          locale: this.locale,
          barColor: this.barColor,
          textColor: this.textColor,
          color: this.color,
          innerTextColor: this.isValidRange() ? this.innerTextColor : this.errorTextColor,
          innerColor: this.isValidRange() ? this.innerColor : this.errorColor,
          disabledTextColor: this.disabledTextColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          startDate: this.endStartDate,
          startDate: this.endStartDate,
          disabledYears: this.endDisabledYears,
          disabledMonths: this.endDisabledMonths,
          disabledDays: this.endDisabledDays,
          shortYearLabel: this.endShortYearLabel,
          shortMonthLabel: this.endShortMonthLabel,
          shortDayLabel: this.endShortDayLabel,
          showMonthLabel: this.endShowMonthLabel,
          showWeekdayLabel: this.endShowWeekdayLabel,
          noDays: this.endNoDays,
          noMonths: this.endNoMonths,
          noYears: this.endNoYears
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
      }, slot || [
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
      staticClass: 'q-date-range-scroller flex',
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
