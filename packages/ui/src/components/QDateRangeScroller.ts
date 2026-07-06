import { computed, defineComponent, h, ref, watch, type SlotsType, type VNode } from 'vue'
import {
  Timestamp as EmptyTimestamp,
  getCalendarDayIdentifier,
  formatCalendarDate,
  padNumber,
  parseDate,
  toCalendarTimestamp,
  type Timestamp,
} from '@timestamp-js/core'
import { useScrollerShell } from '../composables/use-scroller-shell'
import QDateScroller from './QDateScroller'
import {
  baseProps,
  calendarSystemProps,
  commonProps,
  dateRangeProps,
  localeProps,
  verticalBarProps,
} from '../utils/props'
import {
  getCalendarTimestampDate,
  getCalendarTimestampDateObject,
  getCurrentCalendarTimestamp,
  getResolvedCalendarSystem,
  isValidCalendarDateString,
  parseCalendarDateTimeSafe,
} from '../utils/calendar'

export interface QDateRangeScrollerSlotScope {
  /**
   * Current selected range value.
   */
  value: unknown
}

export interface QDateRangeScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QDateRangeScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QDateRangeScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QDateRangeScroller',

  props: {
    ...commonProps,
    ...baseProps,
    ...dateRangeProps,
    ...calendarSystemProps,
    ...verticalBarProps,
    ...localeProps,
  },

  emits: [
    /**
     * Emitted when the footer close button is clicked.
     */
    'close',
    /**
     * Emitted when the selected value changes.
     *
     * @param value New model value.
     * @param-type value Any
     * @param-required value true
     */
    'input',
    /**
     * Emitted when the end range value is less than the start range.
     *
     * @param value Current start and end range values.
     * @param-type value Object
     */
    'invalid-range',
  ],

  slots: Object as SlotsType<QDateRangeScrollerSlots>,

  setup(props, { emit, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props)
    const startDateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null)
    const endDateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null)
    const startDate = ref('')
    const endDate = ref('')
    const type = ref<string | null>(null)
    const syncing = ref(false)

    const calendar = computed(() => getResolvedCalendarSystem(props.calendarSystem))
    const slotData = computed(() => {
      if (startDateRef.value && endDateRef.value) {
        return { value: [startDateRef.value.getTimestamp(), endDateRef.value.getTimestamp()] }
      }
      return { value: [] }
    })

    const displayed = computed(() => displayDate.value)

    function fallbackDate() {
      return getCurrentCalendarTimestamp(calendar.value)
    }

    function timestampFromDate(value: string): Timestamp {
      return parseCalendarDateTimeSafe(`${value} 00:00`, calendar.value) ?? EmptyTimestamp
    }

    function timestampFromDateWithCalendar(value: string, calendarSystem = calendar.value) {
      return parseCalendarDateTimeSafe(`${value} 00:00`, calendarSystem)
    }

    const rangeIsValid = computed(() => {
      if (props.disableValidation === true) {
        return true
      }

      if (startDate.value && endDate.value) {
        return (
          getCalendarDayIdentifier(timestampFromDate(endDate.value), calendar.value) >=
          getCalendarDayIdentifier(timestampFromDate(startDate.value), calendar.value)
        )
      }

      return true
    })

    const displayDate = computed(() => {
      if (startDate.value !== '' && endDate.value !== '') {
        if (startDateRef.value?.displayDate && endDateRef.value?.displayDate) {
          return `${startDateRef.value.displayDate}${props.displaySeparator}${endDateRef.value.displayDate}`
        }
        return `${startDate.value}${props.displaySeparator}${endDate.value}`
      }
      return `${props.displaySeparator}`
    })

    function emitValue() {
      if (type.value === null || startDate.value === '' || endDate.value === '') {
        return
      }

      let startParts
      let endParts

      switch (type.value) {
        case 'date':
          emit('input', [
            getCalendarTimestampDateObject(timestampFromDate(startDate.value), calendar.value),
            getCalendarTimestampDateObject(timestampFromDate(endDate.value), calendar.value),
          ])
          return
        case 'array':
          startParts = startDate.value.split('-')
          endParts = endDate.value.split('-')
          emit('input', [
            [parseInt(startParts[0], 10), parseInt(startParts[1], 10), parseInt(startParts[2], 10)],
            [parseInt(endParts[0], 10), parseInt(endParts[1], 10), parseInt(endParts[2], 10)],
          ])
          return
        case 'object':
          startParts = startDate.value.split('-')
          endParts = endDate.value.split('-')
          emit('input', [
            {
              year: parseInt(startParts[0], 10),
              month: parseInt(startParts[1], 10),
              day: parseInt(startParts[2], 10),
            },
            {
              year: parseInt(endParts[0], 10),
              month: parseInt(endParts[1], 10),
              day: parseInt(endParts[2], 10),
            },
          ])
          return
        case 'string':
          emit('input', [startDate.value, endDate.value])
      }
    }

    function splitDate() {
      syncing.value = true

      let start
      let end
      let now
      const valueType = Object.prototype.toString.call(props.value)

      if (valueType === '[object Undefined]' || props.value === null) {
        type.value = 'string'
        now = fallbackDate()
        start = getCalendarTimestampDate(now)
        end = start
        if (
          isValidCalendarDateString(start, calendar.value) &&
          isValidCalendarDateString(end, calendar.value)
        ) {
          startDate.value = start
          endDate.value = end
        } else {
          console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
        }
        syncing.value = false
        return
      }

      if (Array.isArray(props.value) !== true || props.value.length < 2) {
        syncing.value = false
        console.error(`QDateRangeScroller: value needs to be an array of types (${props.value})`)
        return
      }

      switch (Object.prototype.toString.call(props.value[0])) {
        case '[object Date]':
          type.value = 'date'
          {
            const parsedStart = parseDate(props.value[0])
            const parsedEnd = parseDate(props.value[1])

            start = getCalendarTimestampDate(
              parsedStart === null
                ? fallbackDate()
                : toCalendarTimestamp(parsedStart, calendar.value),
            )
            end = getCalendarTimestampDate(
              parsedEnd === null ? fallbackDate() : toCalendarTimestamp(parsedEnd, calendar.value),
            )
          }
          break
        case '[object Array]':
          type.value = 'array'
          start = `${padNumber(parseInt(props.value[0][0], 10), 2)}-${padNumber(parseInt(props.value[0][1], 10), 2)}-${padNumber(parseInt(props.value[0][2], 10), 2)}`
          end = `${padNumber(parseInt(props.value[1][0], 10), 2)}-${padNumber(parseInt(props.value[1][1], 10), 2)}-${padNumber(parseInt(props.value[1][2], 10), 2)}`
          break
        case '[object Object]':
          type.value = 'object'
          start = `${padNumber(parseInt(props.value[0].year, 10), 2)}-${padNumber(parseInt(props.value[0].month, 10), 2)}-${padNumber(parseInt(props.value[0].day, 10), 2)}`
          end = `${padNumber(parseInt(props.value[1].year, 10), 2)}-${padNumber(parseInt(props.value[1].month, 10), 2)}-${padNumber(parseInt(props.value[1].day, 10), 2)}`
          break
        case '[object String]':
          type.value = 'string'
          start = props.value[0]
          end = props.value[1]
          break
        case '[object Undefined]':
          type.value = 'string'
          now = fallbackDate()
          start = getCalendarTimestampDate(now)
          end = start
          break
        default:
          syncing.value = false
          console.error(`QDateRangeScroller: value needs to be an array of types (${props.value})`)
          return
      }

      if (
        isValidCalendarDateString(start, calendar.value) &&
        isValidCalendarDateString(end, calendar.value)
      ) {
        startDate.value = start
        endDate.value = end
      } else {
        console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`)
      }

      syncing.value = false
    }

    watch(() => props.value, splitDate)
    watch(calendar, (nextCalendar, previousCalendar) => {
      if (syncing.value === true || previousCalendar.id === nextCalendar.id) {
        return
      }

      const start = timestampFromDateWithCalendar(startDate.value, previousCalendar)
      const end = timestampFromDateWithCalendar(endDate.value, previousCalendar)

      if (start === null || end === null) {
        return
      }

      syncing.value = true
      startDate.value = formatCalendarDate(
        nextCalendar.fromEpochDay(getCalendarDayIdentifier(start, previousCalendar)),
      )
      endDate.value = formatCalendarDate(
        nextCalendar.fromEpochDay(getCalendarDayIdentifier(end, previousCalendar)),
      )
      syncing.value = false
      emitValue()
    })
    watch(startDate, () => {
      if (syncing.value !== true) {
        emitValue()
      }
    })
    watch(endDate, () => {
      if (syncing.value !== true) {
        emitValue()
      }
    })
    watch(rangeIsValid, (value) => {
      if (value === false) {
        emit('invalid-range', { startDate: startDate.value, endDate: endDate.value })
      }
    })

    splitDate()

    function renderStartDate() {
      return h(QDateScroller, {
        ref: startDateRef,
        class: [
          'col-6',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        value: startDate.value,
        calendarSystem: props.calendarSystem,
        locale: props.locale,
        barColor: props.barColor,
        textColor: props.textColor,
        color: props.color,
        innerTextColor: props.innerTextColor,
        innerColor: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        dense: props.dense,
        disable: props.disable,
        noBorder: true,
        noHeader: true,
        noFooter: true,
        disabledYears: props.startDisabledYears,
        disabledMonths: props.startDisabledMonths,
        disabledDays: props.startDisabledDays,
        shortYearLabel: props.startShortYearLabel,
        shortMonthLabel: props.startShortMonthLabel,
        shortDayLabel: props.startShortDayLabel,
        showMonthLabel: props.startShowMonthLabel,
        showWeekdayLabel: props.startShowWeekdayLabel,
        noDays: props.startNoDays,
        noMonths: props.startNoMonths,
        noYears: props.startNoYears,
        yearBegin: props.startYearBegin,
        yearStop: props.startYearStop,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          startDate.value = value
        },
      })
    }

    function renderEndDate() {
      return h(QDateScroller, {
        ref: endDateRef,
        class: 'col-6',
        value: endDate.value,
        calendarSystem: props.calendarSystem,
        locale: props.locale,
        barColor: props.barColor,
        textColor: props.textColor,
        color: props.color,
        innerTextColor: rangeIsValid.value ? props.innerTextColor : props.errorTextColor,
        innerColor: rangeIsValid.value ? props.innerColor : props.errorColor,
        disabledTextColor: props.disabledTextColor,
        dense: props.dense,
        disable: props.disable,
        noBorder: true,
        noHeader: true,
        noFooter: true,
        disabledYears: props.endDisabledYears,
        disabledMonths: props.endDisabledMonths,
        disabledDays: props.endDisabledDays,
        shortYearLabel: props.endShortYearLabel,
        shortMonthLabel: props.endShortMonthLabel,
        shortDayLabel: props.endShortDayLabel,
        showMonthLabel: props.endShowMonthLabel,
        showWeekdayLabel: props.endShowWeekdayLabel,
        noDays: props.endNoDays,
        noMonths: props.endNoMonths,
        noYears: props.endNoYears,
        yearBegin: props.endYearBegin,
        yearStop: props.endYearStop,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          endDate.value = value
        },
      })
    }

    function renderScrollers() {
      return [renderStartDate(), renderEndDate()]
    }

    return () =>
      renderCommon({
        displayed,
        emitClose: () => emit('close'),
        renderScrollers,
        slotData,
        slots,
      })
  },
})
