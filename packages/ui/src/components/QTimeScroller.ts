import { computed, defineComponent, h, ref, watch, type SlotsType, type VNode } from 'vue'
import {
  PARSE_TIME,
  Timestamp as EmptyTimestamp,
  createNativeLocaleFormatter,
  getDate,
  getDateObject,
  padNumber,
  parseDate,
  parseTimestamp,
  type Timestamp,
} from '@timestamp-js/core'
import { useScrollerShell } from '../composables/use-scroller-shell'
import ScrollerBase from './private/ScrollerBase'
import { baseProps, commonProps, localeProps, timeProps, verticalBarProps } from '../utils/props'

export interface QTimeScrollerSlotScope {
  /**
   * Current selected timestamp value.
   */
  value: Timestamp
}

export interface QTimeScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QTimeScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QTimeScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QTimeScroller',

  props: {
    ...commonProps,
    ...baseProps,
    ...timeProps,
    ...verticalBarProps,
    ...localeProps,
    /**
     * Turns on 12 hour time.
     *
     * @category behavior
     * @applicable time, date-time
     */
    hour12: Boolean,
    /**
     * Labels used for AM/PM values. Only applies when `hour12` is enabled.
     *
     * @category content
     * @applicable time, date-time
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

  slots: Object as SlotsType<QTimeScrollerSlots>,

  setup(props, { emit, expose, slots }) {
    const { renderCommon } = useScrollerShell(props)
    const amPmLabels = computed(() => props.amPmLabels as string[])
    const timestamp = ref<Timestamp>(EmptyTimestamp)
    const type = ref<string | null>(null)
    const ampmIndex = ref(-1)
    const hour = ref('')
    const minute = ref('')
    const disabledMinutesList = ref<string[]>([])
    const disabledHoursList = ref<string[]>([])
    const syncing = ref(false)

    const ampm = computed(() => amPmLabels.value[ampmIndex.value] ?? '')

    const slotData = computed(() => ({ value: timestamp.value }))
    const displayed = computed(() => displayTime.value)

    const ampmList = computed(() =>
      amPmLabels.value.map((value) => ({
        value,
        disabled: false,
        noCaps: true,
      })),
    )

    const minutesList = computed(() => {
      let count = 60
      const interval = parseInt(String(props.minuteInterval ?? 1), 10)
      if (props.minuteInterval !== void 0 && interval > 0) {
        count /= interval
      }

      return Array.from({ length: count }, (_, index) => index).map((entry) => {
        const value =
          entry * (props.minuteInterval ? parseInt(String(props.minuteInterval), 10) : 1)
        const padded = value < 10 ? `0${value}` : `${value}`
        return {
          value: padded,
          disabled: disabledMinutesList.value.includes(padded),
        }
      })
    })

    const hoursList = computed(() => {
      let count = props.hour12 === true ? 12 : 24
      const interval = parseInt(String(props.hourInterval ?? 1), 10)
      if (props.hourInterval !== void 0 && interval > 0) {
        count /= interval
      }

      return Array.from({ length: count }, (_, index) => index).map((entry) => {
        let value = props.hour12 === true ? entry + 1 : entry
        value *= props.hourInterval ? parseInt(String(props.hourInterval), 10) : 1
        const padded = value < 10 ? `0${value}` : `${value}`
        return {
          value: padded,
          disabled: disabledHoursList.value.includes(padded),
        }
      })
    })

    const timeFormatter = computed(() => {
      const longOptions = {
        timeZone: 'UTC',
        hour12: props.hour12,
        hour: '2-digit',
        minute: '2-digit',
      } satisfies Intl.DateTimeFormatOptions
      const shortOptions = {
        timeZone: 'UTC',
        hour12: props.hour12,
        hour: 'numeric',
        minute: '2-digit',
      } satisfies Intl.DateTimeFormatOptions
      const shortHourOptions = {
        timeZone: 'UTC',
        hour12: props.hour12,
        hour: 'numeric',
      } satisfies Intl.DateTimeFormatOptions

      return createNativeLocaleFormatter(props.locale, (value, short) =>
        short ? (value.minute === 0 ? shortHourOptions : shortOptions) : longOptions,
      )
    })

    const displayTime = computed(() => {
      if (timestamp.value.hasTime !== true) return '00:00'
      if (props.noMinutes === true) return `${padNumber(parseInt(hour.value || '0', 10), 2)}h`
      if (props.noHours === true) return `:${padNumber(parseInt(minute.value || '0', 10), 2)}`

      let value = timeFormatter.value(timestamp.value, props.shortTimeLabel)
      if (amPmLabels.value.length > 0 && ampmIndex.value > -1) {
        const suffix = value.substring(value.length - amPmLabels.value[ampmIndex.value].length)
        if (suffix !== amPmLabels.value[ampmIndex.value]) {
          const replacementIndex = value.lastIndexOf(' ')
          if (replacementIndex > -1) {
            value = `${value.slice(0, replacementIndex + 1)}${amPmLabels.value[ampmIndex.value]}`
          }
        }
      }

      return value
    })

    function selectedHour() {
      const parsedHour = parseInt(hour.value, 10)
      if (props.hour12 !== true || ampmIndex.value < 0) {
        return parsedHour
      }

      if (ampmIndex.value === 0) {
        return parsedHour === 12 ? 0 : parsedHour
      }

      if (ampmIndex.value === 1) {
        if (parsedHour === 0) {
          hour.value = '12'
          return 12
        }

        return parsedHour < 12 ? parsedHour + 12 : parsedHour
      }

      return parsedHour
    }

    function fallbackDate() {
      return parseDate(new Date()) ?? EmptyTimestamp
    }

    function snapMinute(value: number) {
      const interval = Number(props.minuteInterval)
      return interval > 0 ? Math.floor(value / interval) * interval : value
    }

    function timestampFromTimeParts(base: Timestamp, nextHour: number, nextMinute: number) {
      const normalizedHour = ((nextHour % 24) + 24) % 24
      return (
        parseTimestamp(
          `${getDate(base)} ${padNumber(normalizedHour, 2)}:${padNumber(nextMinute, 2)}`,
        ) ?? base
      )
    }

    function emitValue() {
      switch (type.value) {
        case 'date':
          emit('input', getDateObject(timestamp.value))
          return
        case 'array':
          emit('input', [padNumber(timestamp.value.hour, 2), padNumber(timestamp.value.minute, 2)])
          return
        case 'object':
          emit('input', {
            hour: padNumber(timestamp.value.hour, 2),
            minute: padNumber(timestamp.value.minute, 2),
          })
          return
        case 'string':
          emit(
            'input',
            [padNumber(timestamp.value.hour, 2), padNumber(timestamp.value.minute, 2)].join(':'),
          )
      }
    }

    function handleDisabledLists() {
      disabledMinutesList.value = []
      disabledHoursList.value = []

      ;(props.disabledMinutes as Array<string | number>).forEach((entry) =>
        disabledMinutesList.value.push(padNumber(parseInt(String(entry), 10), 2)),
      )
      ;(props.disabledHours as Array<string | number>).forEach((entry) =>
        disabledHoursList.value.push(padNumber(parseInt(String(entry), 10), 2)),
      )
    }

    function fromTimestamp() {
      minute.value = padNumber(timestamp.value.minute, 2)

      if (props.hour12 === true) {
        if (timestamp.value.hour === 12) {
          hour.value = '12'
          ampmIndex.value = 1
        } else if (timestamp.value.hour === 0) {
          hour.value = '12'
          ampmIndex.value = 0
        } else if (timestamp.value.hour > 12) {
          hour.value = padNumber(timestamp.value.hour - 12, 2)
          ampmIndex.value = 1
        } else {
          hour.value = padNumber(timestamp.value.hour, 2)
          ampmIndex.value = 0
        }
      } else {
        hour.value = padNumber(timestamp.value.hour, 2)
      }
    }

    function splitTime() {
      syncing.value = true

      const valueType = Object.prototype.toString.call(props.value)
      let now
      let value

      switch (valueType) {
        case '[object Date]':
          type.value = 'date'
          now = parseDate(props.value) ?? EmptyTimestamp
          timestamp.value = timestampFromTimeParts(now, now.hour, snapMinute(now.minute))
          fromTimestamp()
          syncing.value = false
          return
        case '[object Array]':
          type.value = 'array'
          value = props.value as Array<string | number>
          now = fallbackDate()
          timestamp.value = timestampFromTimeParts(
            now,
            parseInt(String(value[0]), 10),
            snapMinute(parseInt(String(value[1]), 10)),
          )
          fromTimestamp()
          syncing.value = false
          return
        case '[object Object]':
          type.value = 'object'
          value = props.value as { hour: string | number; minute: string | number }
          now = fallbackDate()
          timestamp.value = timestampFromTimeParts(
            now,
            parseInt(String(value.hour), 10),
            snapMinute(parseInt(String(value.minute), 10)),
          )
          fromTimestamp()
          syncing.value = false
          return
        case '[object String]':
          type.value = 'string'
          now = fallbackDate()
          if (props.value) {
            const parts = PARSE_TIME.exec(String(props.value))
            now = timestampFromTimeParts(
              now,
              parseInt(parts?.[1] ?? '0', 10),
              snapMinute(parseInt(parts?.[2] ?? '0', 10)),
            )
          }
          timestamp.value = now
          fromTimestamp()
          syncing.value = false
          return
      }

      syncing.value = false

      if (props.value !== '') {
        console.error(`QTimeScroller: invalid time format - '${props.value}'`)
      }
    }

    watch(() => props.value, splitTime)

    watch(hour, () => {
      if (syncing.value === true) {
        return
      }

      timestamp.value = timestampFromTimeParts(
        timestamp.value,
        selectedHour(),
        timestamp.value.minute,
      )
      emitValue()
    })

    watch(minute, () => {
      if (syncing.value === true) {
        return
      }

      timestamp.value = timestampFromTimeParts(
        timestamp.value,
        timestamp.value.hour,
        parseInt(minute.value, 10),
      )
      emitValue()
    })

    watch(ampmIndex, () => {
      if (syncing.value === true) {
        return
      }

      timestamp.value = timestampFromTimeParts(
        timestamp.value,
        selectedHour(),
        timestamp.value.minute,
      )
      emitValue()
    })

    watch(
      () => props.hour12,
      () => {
        syncing.value = true
        if (props.hour12 === true) {
          fromTimestamp()
        } else {
          hour.value = padNumber(timestamp.value.hour, 2)
        }
        syncing.value = false
        emitValue()
      },
    )

    watch(() => props.disabledMinutes, handleDisabledLists, { deep: true })
    watch(() => props.disabledHours, handleDisabledLists, { deep: true })

    handleDisabledLists()
    splitTime()

    expose({
      displayTime,
      /**
       * Gets the current timestamp value.
       */
      getTimestamp: () => timestamp.value,
    })

    function renderHoursScroller() {
      return h(ScrollerBase, {
        class: [
          'col',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        value: hour.value,
        items: hoursList.value,
        dense: props.dense,
        disable: props.disable,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          hour.value = value
        },
      })
    }

    function renderMinutesScroller() {
      return h(ScrollerBase, {
        class: [
          'col',
          {
            'q-scroller__vertical-bar': props.verticalBar === true && props.hour12 === true,
          },
        ],
        value: minute.value,
        items: minutesList.value,
        dense: props.dense,
        disable: props.disable,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          minute.value = value
        },
      })
    }

    function renderAmPmScroller() {
      return h(ScrollerBase, {
        class: 'col',
        value: ampm.value,
        items: ampmList.value,
        dense: props.dense,
        disable: props.disable,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        onInput: (value) => {
          ampmIndex.value = amPmLabels.value.findIndex((entry) => entry === value)
        },
      })
    }

    function renderScrollers() {
      return [
        props.noHours !== true ? renderHoursScroller() : null,
        props.noMinutes !== true ? renderMinutesScroller() : null,
        props.hour12 === true ? renderAmPmScroller() : null,
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
