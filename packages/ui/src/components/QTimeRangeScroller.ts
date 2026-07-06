import { computed, defineComponent, h, ref, watch, type SlotsType, type VNode } from 'vue'
import {
  Timestamp as EmptyTimestamp,
  getDate,
  getDateObject,
  getTime,
  getTimeIdentifier,
  padNumber,
  parseDate,
  parseTimestamp,
  type Timestamp,
} from '@timestamp-js/core'
import { useScrollerShell } from '../composables/use-scroller-shell'
import QTimeScroller from './QTimeScroller'
import {
  baseProps,
  commonProps,
  localeProps,
  timeRangeProps,
  verticalBarProps,
} from '../utils/props'
import { isValidTime } from '../utils/validation'

export interface QTimeRangeScrollerSlotScope {
  /**
   * Current selected range value.
   */
  value: unknown
}

export interface QTimeRangeScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QTimeRangeScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QTimeRangeScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QTimeRangeScroller',

  props: {
    ...commonProps,
    ...baseProps,
    ...timeRangeProps,
    ...verticalBarProps,
    ...localeProps,
    /**
     * Turns on 12 hour time.
     *
     * @category behavior
     * @applicable time-range
     */
    hour12: Boolean,
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

  slots: Object as SlotsType<QTimeRangeScrollerSlots>,

  setup(props, { emit, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props)
    const startTimeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null)
    const endTimeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null)
    const startTime = ref('')
    const endTime = ref('')
    const type = ref<string | null>(null)
    const syncing = ref(false)

    const slotData = computed(() => {
      if (startTimeRef.value && endTimeRef.value) {
        return { value: [startTimeRef.value.getTimestamp(), endTimeRef.value.getTimestamp()] }
      }
      return { value: [] }
    })

    const displayed = computed(() => displayTime.value)

    function fallbackDate() {
      return parseDate(new Date()) ?? EmptyTimestamp
    }

    function timestampFromTime(value: string, base: Timestamp = fallbackDate()): Timestamp {
      return parseTimestamp(`${getDate(base)} ${value}`) ?? base
    }

    const rangeIsValid = computed(() => {
      if (props.disableValidation === true) {
        return true
      }

      if (startTime.value && endTime.value) {
        return (
          getTimeIdentifier(timestampFromTime(endTime.value)) >=
          getTimeIdentifier(timestampFromTime(startTime.value))
        )
      }

      return true
    })

    const displayTime = computed(() => {
      if (startTime.value !== '' && endTime.value !== '') {
        if (startTimeRef.value?.displayTime && endTimeRef.value?.displayTime) {
          return `${startTimeRef.value.displayTime}${props.displaySeparator}${endTimeRef.value.displayTime}`
        }
        return `${startTime.value}${props.displaySeparator}${endTime.value}`
      }
      return `${props.displaySeparator}`
    })

    function emitValue() {
      if (type.value === null || startTime.value === '' || endTime.value === '') {
        return
      }

      let startParts
      let endParts

      switch (type.value) {
        case 'date':
          emit('input', [
            getDateObject(timestampFromTime(startTime.value)),
            getDateObject(timestampFromTime(endTime.value)),
          ])
          return
        case 'array':
          startParts = startTime.value.split(':')
          endParts = endTime.value.split(':')
          emit('input', [
            [parseInt(startParts[0], 10), parseInt(startParts[1], 10)],
            [parseInt(endParts[0], 10), parseInt(endParts[1], 10)],
          ])
          return
        case 'object':
          startParts = startTime.value.split(':')
          endParts = endTime.value.split(':')
          emit('input', [
            { hour: parseInt(startParts[0], 10), minute: parseInt(startParts[1], 10) },
            { hour: parseInt(endParts[0], 10), minute: parseInt(endParts[1], 10) },
          ])
          return
        case 'string':
          emit('input', [startTime.value, endTime.value])
      }
    }

    function splitTime() {
      syncing.value = true

      let start
      let end
      let now
      const valueType = Object.prototype.toString.call(props.value)

      if (valueType === '[object Undefined]' || props.value === null) {
        type.value = 'string'
        now = fallbackDate()
        start = getTime(now)
        end = start
        if (isValidTime(start) && isValidTime(end)) {
          startTime.value = start
          endTime.value = end
        } else {
          console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
        }
        syncing.value = false
        return
      }

      if (Array.isArray(props.value) !== true || props.value.length < 2) {
        syncing.value = false
        console.error(`QTimeRangeScroller: value needs to be an array of types (${props.value})`)
        return
      }

      switch (Object.prototype.toString.call(props.value[0])) {
        case '[object Date]':
          type.value = 'date'
          start = getTime(parseDate(props.value[0]) ?? EmptyTimestamp)
          end = getTime(parseDate(props.value[1]) ?? EmptyTimestamp)
          break
        case '[object Array]':
          type.value = 'array'
          start = `${padNumber(parseInt(props.value[0][0], 10), 2)}:${padNumber(parseInt(props.value[0][1], 10), 2)}`
          end = `${padNumber(parseInt(props.value[1][0], 10), 2)}:${padNumber(parseInt(props.value[1][1], 10), 2)}`
          break
        case '[object Object]':
          type.value = 'object'
          start = `${padNumber(parseInt(props.value[0].hour, 10), 2)}:${padNumber(parseInt(props.value[0].minute, 10), 2)}`
          end = `${padNumber(parseInt(props.value[1].hour, 10), 2)}:${padNumber(parseInt(props.value[1].minute, 10), 2)}`
          break
        case '[object String]':
          type.value = 'string'
          start = props.value[0]
          end = props.value[1]
          break
        case '[object Undefined]':
          type.value = 'string'
          now = fallbackDate()
          start = getTime(now)
          end = start
          break
        default:
          syncing.value = false
          console.error(`QTimeRangeScroller: value needs to be an array of types (${props.value})`)
          return
      }

      if (isValidTime(start) && isValidTime(end)) {
        startTime.value = start
        endTime.value = end
      } else {
        console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`)
      }

      syncing.value = false
    }

    watch(() => props.value, splitTime)
    watch(startTime, () => {
      if (syncing.value !== true) {
        emitValue()
      }
    })
    watch(endTime, () => {
      if (syncing.value !== true) {
        emitValue()
      }
    })
    watch(rangeIsValid, (value) => {
      if (value === false) {
        emit('invalid-range', { startTime: startTime.value, endTime: endTime.value })
      }
    })

    splitTime()

    function renderStartTime() {
      return h(QTimeScroller, {
        ref: startTimeRef,
        class: [
          'col-6',
          {
            'q-scroller__vertical-bar': props.verticalBar === true,
          },
        ],
        value: startTime.value,
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
        amPmLabels: props.startAmPmLabels,
        minuteInterval: props.startMinuteInterval,
        hourInterval: props.startHourInterval,
        shortTimeLabel: props.startShortTimeLabel,
        disabledHours: props.startDisabledHours,
        disabledMinutes: props.startDisabledMinutes,
        noMinutes: props.startNoMinutes,
        noHours: props.startNoHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          startTime.value = value
        },
      })
    }

    function renderEndTime() {
      return h(QTimeScroller, {
        ref: endTimeRef,
        class: 'col-6',
        value: endTime.value,
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
        hour12: props.hour12,
        amPmLabels: props.endAmPmLabels,
        minuteInterval: props.endMinuteInterval,
        hourInterval: props.endHourInterval,
        shortTimeLabel: props.endShortTimeLabel,
        disabledHours: props.endDisabledHours,
        disabledMinutes: props.endDisabledMinutes,
        noMinutes: props.endNoMinutes,
        noHours: props.endNoHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          endTime.value = value
        },
      })
    }

    function renderScrollers() {
      return [renderStartTime(), renderEndTime()]
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
