import { computed, defineComponent, h, ref, type SlotsType, type VNode } from 'vue'
import ScrollerBase from './private/ScrollerBase'
import QDateRangeScroller from './QDateRangeScroller'
import QDateScroller from './QDateScroller'
import QDateTimeScroller from './QDateTimeScroller'
import QStringScroller from './QStringScroller'
import QTimeRangeScroller from './QTimeRangeScroller'
import QTimeScroller from './QTimeScroller'
import {
  baseProps,
  calendarSystemProps,
  commonProps,
  dateProps,
  dateRangeProps,
  localeProps,
  scrollerProps,
  timeProps,
  timeRangeProps,
  verticalBarProps,
  viewProps,
} from '../utils/props'

export interface QScrollerSlotScope {
  /**
   * Current selected value.
   */
  value: unknown
}

export interface QScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QScrollerSlotScope) => VNode[]
}

/**
 * Generic wrapper that forwards events to the active scroller selected by `view`.
 *
 * @api-events QStringScroller, QTimeScroller, QTimeRangeScroller, QDateScroller, QDateRangeScroller, QDateTimeScroller
 */
export default defineComponent({
  name: 'QScroller',

  props: {
    ...commonProps,
    ...viewProps,
    ...scrollerProps,
    ...baseProps,
    ...localeProps,
    ...dateProps,
    ...calendarSystemProps,
    ...timeProps,
    ...timeRangeProps,
    ...dateRangeProps,
    ...verticalBarProps,
    ...localeProps,
    /**
     * Turns on 12 hour time.
     *
     * @category behavior
     * @applicable time, time-range, date-time
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
    amPmLabels: Array,
  },

  slots: Object as SlotsType<QScrollerSlots>,

  setup(props, { attrs, slots }) {
    const componentRef = ref()

    const component = computed(() => {
      switch (props.view) {
        case 'string':
          if (!props.items || Array.isArray(props.items) !== true) {
            throw new Error(
              'QScroller: items [array] prop is required when view="string" (default)',
            )
          }
          return QStringScroller
        case 'time':
          return QTimeScroller
        case 'date':
          return QDateScroller
        case 'date-time':
          return QDateTimeScroller
        case 'time-range':
          return QTimeRangeScroller
        case 'date-range':
          return QDateRangeScroller
        default:
          return ScrollerBase
      }
    })

    return () =>
      h(
        component.value,
        {
          ref: componentRef,
          ...props,
          ...attrs,
        },
        slots,
      )
  },
})
