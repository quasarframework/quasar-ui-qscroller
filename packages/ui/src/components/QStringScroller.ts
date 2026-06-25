import { computed, defineComponent, h, ref, type SlotsType, type VNode } from 'vue'
import { useScrollerShell } from '../composables/use-scroller-shell'
import ScrollerBase from './private/ScrollerBase'
import { baseProps, commonProps } from '../utils/props'

export interface QStringScrollerSlotScope {
  /**
   * Current selected string value.
   */
  value: unknown
}

export interface QStringScrollerSlots {
  /**
   * Replaces the header content when the header is displayed.
   */
  header: (scope: QStringScrollerSlotScope) => VNode[]
  /**
   * Replaces the footer content when the footer is displayed.
   */
  footer: (scope: QStringScrollerSlotScope) => VNode[]
}

export default defineComponent({
  name: 'QStringScroller',

  props: {
    ...commonProps,
    ...baseProps,
    /**
     * Items to display.
     *
     * @category content
     * @applicable string
     * @required true
     * @type Array
     * @example :items="items"
     */
    items: {
      type: Array,
      required: true,
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

  slots: Object as SlotsType<QStringScrollerSlots>,

  setup(props, { attrs, slots, emit, expose }) {
    const items = computed(() => (props.items ?? []) as Array<Record<string, any>>)
    const scrollerRef = ref<{
      canScroll: (dir: number) => boolean
      getItemIndex: (value: unknown) => number
      move: (dir: number) => boolean
    } | null>(null)

    const { renderCommon } = useScrollerShell(props)

    const slotData = computed(() => ({ value: props.value }))

    const displayed = computed(() => {
      if (!props.value) {
        return ''
      }

      const item = items.value.find((entry) => entry.value === props.value)
      return item?.label ?? item?.value ?? ''
    })

    function canMovePrevious() {
      return scrollerRef.value?.canScroll(-1) ?? false
    }

    function canMoveNext() {
      return scrollerRef.value?.canScroll(1) ?? false
    }

    function previous() {
      return scrollerRef.value?.move(-1) ?? false
    }

    function next() {
      return scrollerRef.value?.move(1) ?? false
    }

    function getItemIndex(value: unknown) {
      return scrollerRef.value?.getItemIndex(value) ?? -1
    }

    function getCurrentIndex() {
      return getItemIndex(props.value)
    }

    expose({
      /**
       * Returns true when the next item can be selected.
       */
      canMoveNext,
      /**
       * Returns true when the previous item can be selected.
       */
      canMovePrevious,
      /**
       * Gets the index of the current selected item.
       */
      getCurrentIndex,
      /**
       * Gets the index for a value.
       *
       * @param value Value to find.
       */
      getItemIndex,
      /**
       * Moves to the next item when possible.
       */
      next,
      /**
       * Moves to the previous item when possible.
       */
      previous,
    })

    function renderScrollers() {
      return h(ScrollerBase, {
        ref: scrollerRef,
        value: props.value,
        items: items.value,
        dense: props.dense,
        disable: props.disable,
        textColor: props.innerTextColor,
        color: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        noCaps: props.noCaps,
        ...attrs,
        onInput: (value) => {
          emit('input', value)
        },
      })
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
