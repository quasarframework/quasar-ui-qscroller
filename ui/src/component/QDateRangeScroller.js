// Mixins
import DateTimeBase from './mixins/datetime-base'
import QDateScroller from './QDateScroller'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'
import {
  daysInMonth
} from './utils/timestamp'

/* @vue/component */
export default {
  name: `QDateRangeScroller`,

  mixins: [DateTimeBase],

  props: {
    ...props.common,
    ...props.dateRange
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100,
      startDate: '',
      endDate: '',
      type: null
    }
  },

  mounted () {
    if (!(Array.isArray(this.value) || typeof this.value === 'string')) {
      console.error('QDateRangeScroller - value (v-model) must to be an array of dates')
    }
    if (Array.isArray(this.value) && this.value.length !== 2) {
      console.error('QDateRangeScroller - value (v-model) must contain 2 array elements')
    }
    this.splitDate()
    this.adjustBodyHeight()
  },

  computed: {
    displayDate () {
      if (this.startDate !== void 0 && this.endDate !== void 0) {
        if (this.$refs.startDate && this.$refs.endDate) {
          return this.$refs.startDate.displayDate + this.displaySeparator + this.$refs.endDate.displayDate
        }
        return `${this.startDate}${this.displaySeparator}${this.endDate}`
      }
      return ''
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
      if (this.type === 'array') {
        this.$emit('input', [
          this.startDate, this.endDate
        ])
      } else if (this.type === 'string') {
        this.$emit('input', `${this.startDate}${this.displaySeparator}${this.endDate}`)
      }
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

    splitDate () {
      if (Array.isArray(this.value)) {
        const start = this.value[0].trim()
        const end = this.value[1].trim()
        if (this.isValidDate(start) && this.isValidDate(end)) {
          this.startDate = start
          this.endDate = end
          this.type = 'array'
          return
        }
      } else {
        const parts = this.value.split(this.displaySeparator)
        if (parts.length === 2) {
          const start = parts[0].trim()
          const end = parts[1].trim()
          if (this.isValidDate(start) && this.isValidDate(end)) {
            this.startDate = start
            this.endDate = end
            this.type = 'string'
            return
          }
        }
      }
      console.error(`QDateRangeScroller: invalid date format - '${this.value}'`)
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
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot([this.$refs.startDate.getTimestamp(), this.$refs.endDate.getTimestamp()]) : [
        this.displayDate
      ])
    },

    __renderStartDate (h) {
      return h(QDateScroller, {
        ref: 'startDate',
        staticClass: 'col-6',
        props: {
          value: this.startDate,
          locale: this.locale,
          showVerticalBar: true,
          barColor: this.barColor,
          color: this.color,
          backgroundColor: this.backgroundColor,
          innerColor: this.innerColor,
          innerBackgroundColor: this.innerBackgroundColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          minDate: this.startMinDate,
          maxDate: this.startMaxDate,
          dates: this.startDates,
          disabledDate: this.startDisabledDates,
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
          noYears: this.startNoYears,
          height: this.bodyHeight
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
          color: this.color,
          backgroundColor: this.backgroundColor,
          innerColor: this.innerColor,
          innerBackgroundColor: this.innerBackgroundColor,
          dense: this.dense,
          disable: this.disable,
          noBorder: true,
          noHeader: true,
          noFooter: true,
          minDate: this.endMinDate,
          maxDate: this.endMaxDate,
          dates: this.endDates,
          disabledDate: this.endDisabledDates,
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
          noYears: this.endNoYears,
          height: this.bodyHeight
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
      staticClass: 'q-date-range-scroller flex',
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller__border': this.noBorder !== true
      },
      style: {
        '--scroller-border-color': this.borderColor,
        '--scroller-bar-color': this.barColor,
        'overflow': 'hidden'
      }
    }), child.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
}
