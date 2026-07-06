import { computed, defineComponent, h, ref, watch, type SlotsType, type VNode } from 'vue'
import {
  DAYS_IN_MONTH_MAX,
  Timestamp as EmptyTimestamp,
  compareTimestamps,
  copyTimestamp,
  createCalendarLocaleFormatterUTC,
  convertCalendarTimestamp,
  getCalendarMonthFormatter,
  padNumber,
  type Timestamp,
} from '@timestamp-js/core'
import { useScrollerShell } from '../composables/use-scroller-shell'
import ScrollerBase from './private/ScrollerBase'
import {
  baseProps,
  calendarSystemProps,
  commonProps,
  dateProps,
  localeProps,
  verticalBarProps,
} from '../utils/props'
import {
  createCalendarTimestampFromParts,
  getCalendarDaysInMonth,
  getCalendarMonthsInYear,
  getCalendarTimestampDateObject,
  getCalendarTimestampFromDate,
  getCurrentCalendarTimestamp,
  getResolvedCalendarSystem,
  parseCalendarDateTimeSafe,
} from '../utils/calendar'

export interface QDateScrollerSlotScope {
  /**
   * Current selected timestamp value.
   */
  value: Timestamp
}

export interface QDateScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QDateScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QDateScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QDateScroller',

  props: {
    ...commonProps,
    ...baseProps,
    ...dateProps,
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
  ],

  slots: Object as SlotsType<QDateScrollerSlots>,

  setup(props, { emit, expose, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props)
    const day = ref('')
    const month = ref('')
    const year = ref('')
    const timestamp = ref<Timestamp>(EmptyTimestamp)
    const type = ref<string | null>(null)
    const disabledYearsList = ref<string[]>([])
    const disabledMonthsList = ref<string[]>([])
    const disabledDaysList = ref<string[]>([])
    const syncing = ref(false)

    const calendar = computed(() => getResolvedCalendarSystem(props.calendarSystem))
    const slotData = computed(() => ({ value: timestamp.value }))
    const displayed = computed(() => displayDate.value)

    const daysList = computed(() => {
      let length = getCalendarDaysInMonth(
        parseInt(year.value, 10),
        parseInt(month.value, 10),
        calendar.value,
        DAYS_IN_MONTH_MAX,
      )
      if (!year.value || !month.value) {
        length = DAYS_IN_MONTH_MAX
      }

      return Array.from({ length }, (_, index) => index + 1).map((entry) => {
        const value = entry < 10 ? `0${entry}` : `${entry}`
        return {
          value,
          disabled: disabledDaysList.value.includes(value),
        }
      })
    })

    const monthsList = computed(() =>
      Array.from(
        {
          length: getCalendarMonthsInYear(
            parseInt(year.value, 10) || fallbackDate().year,
            calendar.value,
          ),
        },
        (_, index) => index + 1,
      ).map((entry) => {
        const display = props.showMonthLabel === true ? monthNameLabel(entry) : void 0
        const value = entry < 10 ? `0${entry}` : `${entry}`
        return {
          display,
          value,
          disabled: disabledMonthsList.value.includes(value),
        }
      }),
    )

    const yearsList = computed(() => {
      let yearBegin =
        props.yearBegin && parseInt(String(props.yearBegin), 10) > 0
          ? parseInt(String(props.yearBegin), 10)
          : 0
      let yearStop =
        props.yearStop && parseInt(String(props.yearStop), 10) > 0
          ? parseInt(String(props.yearStop), 10)
          : 0

      const currentYear = fallbackDate().year
      if (yearBegin === 0) {
        yearBegin = currentYear - 5
      }
      if (yearStop === 0) {
        yearStop = currentYear + 5
      }

      const values: string[] = []
      let cursor = yearBegin
      while (cursor <= yearStop) {
        values.push(padNumber(cursor++, 4))
      }

      return values.map((value) => ({
        value,
        disabled: disabledYearsList.value.includes(value),
      }))
    })

    const dateFormatter = computed(() => {
      const yearFormat: Intl.DateTimeFormatOptions['year'] = props.shortYearLabel
        ? '2-digit'
        : 'numeric'
      const monthFormat: Intl.DateTimeFormatOptions['month'] = props.shortMonthLabel
        ? 'numeric'
        : '2-digit'
      const dayFormat: Intl.DateTimeFormatOptions['day'] = props.shortDayLabel
        ? 'numeric'
        : '2-digit'
      const options = {
        timeZone: 'UTC',
        year: yearFormat,
        month: monthFormat,
        day: dayFormat,
      } satisfies Intl.DateTimeFormatOptions

      return createCalendarLocaleFormatterUTC(calendar.value, props.locale, () => options)
    })

    const dayFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, () => ({
        timeZone: 'UTC',
        day: 'numeric',
      })),
    )

    const monthFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, (_value, short) =>
        short
          ? {
              timeZone: 'UTC',
              month: 'short',
            }
          : {
              timeZone: 'UTC',
              month: 'long',
            },
      ),
    )

    const yearFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, (_value, short) =>
        short
          ? {
              timeZone: 'UTC',
              year: '2-digit',
            }
          : {
              timeZone: 'UTC',
              year: 'numeric',
            },
      ),
    )

    const yearMonthFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, (_value, short) =>
        short
          ? {
              timeZone: 'UTC',
              month: 'short',
              year: '2-digit',
            }
          : {
              timeZone: 'UTC',
              month: 'long',
              year: 'numeric',
            },
      ),
    )

    const yearDayFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, (_value, short) =>
        short
          ? {
              timeZone: 'UTC',
              day: '2-digit',
              year: '2-digit',
            }
          : {
              timeZone: 'UTC',
              day: 'numeric',
              year: 'numeric',
            },
      ),
    )

    const monthDayFormatter = computed(() =>
      createCalendarLocaleFormatterUTC(calendar.value, props.locale, (_value, short) =>
        short
          ? {
              timeZone: 'UTC',
              day: '2-digit',
              month: 'short',
            }
          : {
              timeZone: 'UTC',
              day: 'numeric',
              month: 'long',
            },
      ),
    )

    const displayDate = computed(() => {
      if (
        !props.locale ||
        !year.value ||
        !month.value ||
        !day.value ||
        timestamp.value.hasDay === false
      ) {
        return ''
      }
      if (props.noDays === true && props.noMonths === true) {
        return yearFormatter.value(timestamp.value, props.shortYearLabel === true)
      }
      if (props.noDays === true && props.noYears === true) {
        return monthFormatter.value(timestamp.value, props.shortMonthLabel === true)
      }
      if (props.noMonths === true && props.noYears === true) {
        return dayFormatter.value(timestamp.value, props.shortDayLabel === true)
      }
      if (props.noDays === true) {
        return yearMonthFormatter.value(timestamp.value, false)
      }
      if (props.noMonths === true) {
        return yearDayFormatter.value(timestamp.value, false)
      }
      if (props.noYears === true) {
        return monthDayFormatter.value(timestamp.value, false)
      }

      return dateFormatter.value(timestamp.value, false)
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
          ])
          return
        case 'object':
          emit('input', {
            year: padNumber(timestamp.value.year, 2),
            month: padNumber(timestamp.value.month, 2),
            day: padNumber(timestamp.value.day, 2),
          })
          return
        case 'string':
          emit(
            'input',
            [
              padNumber(timestamp.value.year, 2),
              padNumber(timestamp.value.month, 2),
              padNumber(timestamp.value.day, 2),
            ].join('-'),
          )
      }
    }

    function handleDisabledLists() {
      disabledDaysList.value = (props.disabledDays as Array<string | number>).map((entry) =>
        padNumber(parseInt(String(entry), 10), 2),
      )
      disabledMonthsList.value = (props.disabledMonths as Array<string | number>).map((entry) =>
        padNumber(parseInt(String(entry), 10), 2),
      )
      disabledYearsList.value = (props.disabledYears as Array<string | number>).map((entry) =>
        padNumber(parseInt(String(entry), 10), 4),
      )
    }

    function fromTimestamp() {
      day.value = padNumber(timestamp.value.day, 2)
      month.value = padNumber(timestamp.value.month, 2)
      year.value = padNumber(timestamp.value.year, 4)
    }

    function fallbackDate() {
      return getCurrentCalendarTimestamp(calendar.value)
    }

    function timestampFromDateParts(
      base: Timestamp,
      nextYear: number,
      nextMonth: number,
      nextDay: number,
    ) {
      return createCalendarTimestampFromParts(base, nextYear, nextMonth, nextDay, calendar.value)
    }

    function toTimestamp() {
      const previous = copyTimestamp(timestamp.value)
      timestamp.value = timestampFromDateParts(
        timestamp.value,
        parseInt(year.value, 10),
        parseInt(month.value, 10),
        parseInt(day.value, 10),
      )

      if (compareTimestamps(previous, timestamp.value) !== true) {
        emitValue()
      }
    }

    function splitDate() {
      syncing.value = true

      const valueType = Object.prototype.toString.call(props.value)
      let now
      let value

      switch (valueType) {
        case '[object Date]':
          type.value = 'date'
          timestamp.value = getCalendarTimestampFromDate(props.value as Date, calendar.value)
          fromTimestamp()
          syncing.value = false
          return
        case '[object Array]':
          type.value = 'array'
          value = props.value as Array<string | number>
          timestamp.value = timestampFromDateParts(
            fallbackDate(),
            parseInt(String(value[0]), 10),
            parseInt(String(value[1]), 10),
            parseInt(String(value[2]), 10),
          )
          fromTimestamp()
          syncing.value = false
          return
        case '[object Object]':
          type.value = 'object'
          value = props.value as {
            year: string | number
            month: string | number
            day: string | number
          }
          timestamp.value = timestampFromDateParts(
            fallbackDate(),
            parseInt(String(value.year), 10),
            parseInt(String(value.month), 10),
            parseInt(String(value.day), 10),
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
              now = timestampFromDateParts(now, parsed.year, parsed.month, parsed.day)
            }
          }
          timestamp.value = now
          fromTimestamp()
          syncing.value = false
          return
      }

      syncing.value = false

      if (props.value !== '') {
        console.error(`QDateScroller: invalid date format - '${props.value}'`)
      }
    }

    function monthNameLabel(monthValue: number) {
      const type = props.shortMonthLabel === true ? 'short' : 'long'
      return getCalendarMonthFormatter(calendar.value)(
        monthValue,
        type,
        props.locale,
        parseInt(year.value, 10) || fallbackDate().year,
      )
    }

    watch(() => props.value, splitDate)
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
    watch(day, () => {
      if (syncing.value !== true) {
        toTimestamp()
      }
    })
    watch(year, () => {
      if (syncing.value !== true) {
        toTimestamp()
      }
    })
    watch(month, (newMonth, oldMonth) => {
      if (syncing.value === true) {
        return
      }

      if (parseInt(day.value, 10) > 28) {
        const nextMonth = parseInt(newMonth, 10)
        const previousMonth = parseInt(oldMonth, 10)
        const numericYear = parseInt(year.value, 10)
        const previousDays = getCalendarDaysInMonth(numericYear, previousMonth, calendar.value)
        const nextDays = getCalendarDaysInMonth(numericYear, nextMonth, calendar.value)

        if (previousDays > nextDays) {
          day.value = padNumber(nextDays, 2)
        }
      }

      toTimestamp()
    })
    watch(() => props.disabledDays, handleDisabledLists, { deep: true })
    watch(() => props.disabledMonths, handleDisabledLists, { deep: true })
    watch(() => props.disabledYears, handleDisabledLists, { deep: true })

    handleDisabledLists()
    splitDate()

    expose({
      displayDate,
      /**
       * Gets the current timestamp value.
       */
      getTimestamp: () => timestamp.value,
    })

    function renderYearsScroller() {
      let maxWidth = '60%'
      if (props.noDays === true && props.noMonths === true) {
        maxWidth = '100%'
      }

      return h(ScrollerBase, {
        class: [
          'col',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        style: {
          maxWidth,
        },
        value: year.value,
        items: yearsList.value,
        dense: props.dense,
        disable: props.disable,
        childHeight: bodyHeight.value,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          year.value = value
        },
      })
    }

    function renderMonthsScroller() {
      let maxWidth = '30%'
      if (props.noYears === true && props.noDays === true) maxWidth = '100%'
      else if (props.noDays === true && props.noYears !== true) maxWidth = '40%'
      else if (props.noYears === true) maxWidth = '50%'

      return h(ScrollerBase, {
        class: [
          'col',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        style: {
          maxWidth,
        },
        value: month.value,
        items: monthsList.value,
        dense: props.dense,
        disable: props.disable,
        childHeight: bodyHeight.value,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          month.value = value
        },
      })
    }

    function renderDaysScroller() {
      let maxWidth = '30%'
      if (props.noYears === true && props.noMonths === true) maxWidth = '100%'
      else if (props.noMonths === true && props.noYears !== true) maxWidth = '40%'
      else if (props.noYears === true) maxWidth = '50%'

      return h(ScrollerBase, {
        class: 'col',
        style: {
          maxWidth,
        },
        value: day.value,
        items: daysList.value,
        dense: props.dense,
        disable: props.disable,
        childHeight: bodyHeight.value,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          day.value = value
        },
      })
    }

    function renderScrollers() {
      return [
        props.noYears !== true ? renderYearsScroller() : null,
        props.noMonths !== true ? renderMonthsScroller() : null,
        props.noDays !== true ? renderDaysScroller() : null,
      ]
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
