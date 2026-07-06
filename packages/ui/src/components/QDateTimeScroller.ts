import { computed, defineComponent, h, ref, watch, type SlotsType, type VNode } from 'vue'
import {
  Timestamp as EmptyTimestamp,
  compareTimestamps,
  copyTimestamp,
  convertCalendarTimestamp,
  getTime,
  padNumber,
  type Timestamp,
} from '@timestamp-js/core'
import { useScrollerShell } from '../composables/use-scroller-shell'
import QDateScroller from './QDateScroller'
import QTimeScroller from './QTimeScroller'
import {
  baseProps,
  calendarSystemProps,
  commonProps,
  dateProps,
  localeProps,
  timeProps,
  verticalBarProps,
} from '../utils/props'
import {
  getCalendarTimestampDate,
  getCalendarTimestampDateObject,
  getCalendarTimestampFromDate,
  getCurrentCalendarTimestamp,
  getResolvedCalendarSystem,
  parseCalendarDateTimeSafe,
} from '../utils/calendar'

export interface QDateTimeScrollerSlotScope {
  /**
   * Current selected timestamp value.
   */
  value: Timestamp
}

export interface QDateTimeScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QDateTimeScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QDateTimeScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QDateTimeScroller',

  props: {
    ...commonProps,
    ...baseProps,
    ...timeProps,
    ...dateProps,
    ...calendarSystemProps,
    ...verticalBarProps,
    ...localeProps,
    /**
     * Turns on 12 hour time.
     *
     * @category behavior
     * @applicable date-time
     */
    hour12: Boolean,
    /**
     * Labels used for AM/PM values. Only applies when `hour12` is enabled.
     *
     * @category content
     * @applicable date-time
     * @tsType StringArray
     * @default ['AM', 'PM']
     * @example :am-pm-labels="['a', 'p']"
     */
    amPmLabels: {
      type: Array,
      default: () => ['AM', 'PM'],
      validator: (value) =>
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'string' &&
        typeof value[1] === 'string',
    },
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
  ],

  slots: Object as SlotsType<QDateTimeScrollerSlots>,

  setup(props, { emit, expose, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props)
    const dateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null)
    const timeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null)
    const timestamp = ref<Timestamp>(EmptyTimestamp)
    const type = ref<string | null>(null)
    const date = ref('')
    const time = ref('')
    const syncing = ref(false)

    const calendar = computed(() => getResolvedCalendarSystem(props.calendarSystem))
    const slotData = computed(() => ({ value: timestamp.value }))
    const displayed = computed(() => displayDateTime.value)

    const displayDateTime = computed(() => {
      if (props.locale === '') return ''
      if (date.value !== '' && time.value !== '') {
        if (dateRef.value?.displayDate && timeRef.value?.displayTime) {
          return `${dateRef.value.displayDate} ${timeRef.value.displayTime}`
        }
        return `${date.value} ${time.value}`
      }
      return ''
    })

    function emitValue() {
      switch (type.value) {
        case 'date':
          emit('input', getCalendarTimestampDateObject(timestamp.value, calendar.value))
          return
        case 'array':
          emit('input', [
            padNumber(timestamp.value.year, 2),
            padNumber(timestamp.value.month, 2),
            padNumber(timestamp.value.day, 2),
            padNumber(timestamp.value.hour, 2),
            padNumber(timestamp.value.minute, 2),
          ])
          return
        case 'object':
          emit('input', {
            year: padNumber(timestamp.value.year, 2),
            month: padNumber(timestamp.value.month, 2),
            day: padNumber(timestamp.value.day, 2),
            hour: padNumber(timestamp.value.hour, 2),
            minute: padNumber(timestamp.value.minute, 2),
          })
          return
        case 'string':
          emit(
            'input',
            [
              padNumber(timestamp.value.year, 2),
              padNumber(timestamp.value.month, 2),
              padNumber(timestamp.value.day, 2),
            ].join('-') +
              ' ' +
              [padNumber(timestamp.value.hour, 2), padNumber(timestamp.value.minute, 2)].join(':'),
          )
      }
    }

    function fromTimestamp() {
      date.value = getCalendarTimestampDate(timestamp.value)
      time.value = getTime(timestamp.value)
    }

    function fallbackDate() {
      return getCurrentCalendarTimestamp(calendar.value)
    }

    function timestampFromParts(
      base: Timestamp,
      nextYear: number,
      nextMonth: number,
      nextDay: number,
      nextHour: number,
      nextMinute: number,
    ) {
      return (
        parseCalendarDateTimeSafe(
          `${padNumber(nextYear, 4)}-${padNumber(nextMonth, 2)}-${padNumber(nextDay, 2)} ${padNumber(nextHour, 2)}:${padNumber(nextMinute, 2)}`,
          calendar.value,
          base,
        ) ?? base
      )
    }

    function parseDateTime(value: string) {
      return parseCalendarDateTimeSafe(value, calendar.value, timestamp.value) ?? timestamp.value
    }

    function splitDateTime() {
      syncing.value = true

      const valueType = Object.prototype.toString.call(props.value)
      let now

      switch (valueType) {
        case '[object Date]':
          type.value = 'date'
          timestamp.value = getCalendarTimestampFromDate(props.value as Date, calendar.value)
          fromTimestamp()
          syncing.value = false
          return
        case '[object Array]':
          type.value = 'array'
          timestamp.value = timestampFromParts(
            fallbackDate(),
            parseInt(props.value[0], 10),
            parseInt(props.value[1], 10),
            parseInt(props.value[2], 10),
            parseInt(props.value[3], 10),
            parseInt(props.value[4], 10),
          )
          fromTimestamp()
          syncing.value = false
          return
        case '[object Object]':
          type.value = 'object'
          timestamp.value = timestampFromParts(
            fallbackDate(),
            parseInt(props.value.year, 10),
            parseInt(props.value.month, 10),
            parseInt(props.value.day, 10),
            parseInt(props.value.hour, 10),
            parseInt(props.value.minute, 10),
          )
          fromTimestamp()
          syncing.value = false
          return
        case '[object String]':
          type.value = 'string'
          now = fallbackDate()
          if (props.value) {
            const parsed = parseCalendarDateTimeSafe(String(props.value), calendar.value)
            if (parsed !== null) {
              now = timestampFromParts(
                now,
                parsed.year,
                parsed.month,
                parsed.day,
                parsed.hour,
                parsed.minute,
              )
            }
          }
          timestamp.value = now
          fromTimestamp()
          syncing.value = false
          return
      }

      syncing.value = false

      if (props.value !== '') {
        console.error(`QDateTimeScroller: invalid time format - '${props.value}'`)
      }
    }

    watch(() => props.value, splitDateTime)
    watch(calendar, (nextCalendar, previousCalendar) => {
      if (syncing.value === true || previousCalendar.id === nextCalendar.id) {
        return
      }

      syncing.value = true
      timestamp.value =
        timestamp.value.hasDay === true
          ? convertCalendarTimestamp(timestamp.value, previousCalendar, nextCalendar)
          : fallbackDate()
      fromTimestamp()
      syncing.value = false
      emitValue()
    })

    watch(date, () => {
      if (syncing.value === true) {
        return
      }

      const previous = copyTimestamp(timestamp.value)
      timestamp.value = parseDateTime(`${date.value} ${time.value}`)
      if (compareTimestamps(previous, timestamp.value) !== true) {
        emitValue()
      }
    })

    watch(time, () => {
      if (syncing.value === true) {
        return
      }

      const previous = copyTimestamp(timestamp.value)
      timestamp.value = parseDateTime(`${date.value} ${time.value}`)
      if (compareTimestamps(previous, timestamp.value) !== true) {
        emitValue()
      }
    })

    splitDateTime()

    expose({
      displayDateTime,
      /**
       * Gets the current timestamp value.
       */
      getTimestamp: () => timestamp.value,
    })

    function renderDate() {
      return h(QDateScroller, {
        ref: dateRef,
        class: [
          props.hour12 === true ? 'col-7' : 'col-8',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        value: date.value,
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
        disabledYears: props.disabledYears,
        disabledMonths: props.disabledMonths,
        disabledDays: props.disabledDays,
        shortYearLabel: props.shortYearLabel,
        shortMonthLabel: props.shortMonthLabel,
        shortDayLabel: props.shortDayLabel,
        showMonthLabel: props.showMonthLabel,
        showWeekdayLabel: props.showWeekdayLabel,
        noDays: props.noDays,
        noMonths: props.noMonths,
        noYears: props.noYears,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          date.value = value
        },
      })
    }

    function renderTime() {
      return h(QTimeScroller, {
        ref: timeRef,
        class: props.hour12 === true ? 'col-5' : 'col-4',
        value: time.value,
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
        hour12: props.hour12,
        amPmLabels: props.amPmLabels,
        minuteInterval: props.minuteInterval,
        hourInterval: props.hourInterval,
        shortTimeLabel: props.shortTimeLabel,
        disabledHours: props.disabledHours,
        disabledMinutes: props.disabledMinutes,
        noMinutes: props.noMinutes,
        noHours: props.noHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          time.value = value
        },
      })
    }

    function renderScrollers() {
      return [renderDate(), renderTime()]
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
