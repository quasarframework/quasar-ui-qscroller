import { computed, defineComponent, h, nextTick, onMounted, ref, watch } from 'vue'
import { debounce, QBtn, QResizeObserver, scroll, useQuasar } from 'quasar'
import { useScrollerColors } from '../../composables/use-scroller-colors'
import { commonProps, scrollerProps } from '../../utils/props'

const { getVerticalScrollPosition, setVerticalScrollPosition, getScrollTarget } = scroll as any
const { setScrollerBothColors, setScrollerTextColor } = useScrollerColors()

const ITEM_HEIGHT = 26
const ITEM_HEIGHT_DENSE = 24

export default defineComponent({
  name: 'ScrollerBase',

  props: {
    ...commonProps,
    ...scrollerProps,
  },

  emits: ['input'],

  setup(props, { attrs, emit, expose }) {
    const $q = useQuasar()
    const items = computed(() => (props.items ?? []) as Array<Record<string, any>>)
    const rootRef = ref<HTMLElement | null>(null)
    const height = ref(0)
    const columnPadding = ref<Record<string, string>>({})
    const padding = ref(0)
    const pendingValue = ref<unknown>()

    const itemHeight = computed(() => (props.dense === true ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT))

    const selectedArea = computed(() => {
      const rect = rootRef.value?.getBoundingClientRect() ?? { width: 0, height: 0 }
      const top = rect.height / 2 - itemHeight.value / 2

      return {
        x: 0,
        y: top,
        width: rect.width,
        height: itemHeight.value,
        top,
        bottom: top + itemHeight.value,
        right: rect.width,
        left: 0,
      }
    })

    const showLabel = computed(() => {
      if (!props.value) {
        return ''
      }

      const item = items.value.find((entry) => itemMatchesValue(entry, props.value))
      return item === void 0 ? '' : getItemLabelText(item)
    })

    function getItemLabel(item: Record<string, any>) {
      return item.display ?? item.label ?? item.value
    }

    function getItemLabelText(item: Record<string, any>) {
      return String(getItemLabel(item) ?? '')
    }

    function currentElement() {
      const container = rootRef.value?.children[0] as HTMLElement | undefined
      const children = container?.children

      if (children === void 0) {
        return null
      }

      for (let index = 1; index < children.length - 1; ++index) {
        const child = children[index] as HTMLElement
        const rect = getElementOffsets(child)
        if (intersectRect(selectedArea.value, rect) === true) {
          return child
        }
      }

      return null
    }

    function getElementOffsets(childEl: HTMLElement) {
      const target = getScrollTarget(childEl)
      const scrollTop = getVerticalScrollPosition(target)
      const top = childEl.offsetTop - scrollTop

      return {
        x: childEl.offsetLeft,
        y: top,
        left: childEl.offsetLeft,
        right: childEl.offsetLeft + childEl.offsetWidth,
        top,
        bottom: top + childEl.offsetHeight,
        width: childEl.offsetWidth,
        height: childEl.offsetHeight,
      }
    }

    function intersectRect(
      r1: { left: number; right: number; top: number; bottom: number },
      r2: { left: number; right: number; top: number; bottom: number },
    ) {
      return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)
    }

    function clearSelectedClasses() {
      const klass = `.q-scroller__item--selected${props.dense === true ? '--dense' : ''}`
      let selected = rootRef.value?.querySelector(klass)

      while (selected) {
        selected.classList.remove(klass.slice(1))
        selected = rootRef.value?.querySelector(klass) ?? null
      }
    }

    function itemMatchesValue(item: Record<string, any>, value: unknown) {
      return item.value === value || item.label === value || item.display === value
    }

    function getActiveItemIndex() {
      const value = pendingValue.value ?? props.value
      const index = items.value.findIndex((item) => itemMatchesValue(item, value))

      if (index !== -1) {
        return index
      }

      const elem = currentElement()
      if (elem === null) {
        return -1
      }

      const text = elem.innerText.replace(/\n|\r/g, '')

      return items.value.findIndex(
        (item) =>
          getItemLabelText(item) === text ||
          item.value === text ||
          item.value?.toString() === text ||
          item.label === text ||
          item.label?.toString() === text ||
          item.display === text ||
          item.display?.toString() === text,
      )
    }

    function getNextEnabledItemIndex(index: number, dir: number) {
      for (
        let nextIndex = index + dir;
        nextIndex >= 0 && nextIndex < items.value.length;
        nextIndex += dir
      ) {
        if (items.value[nextIndex].disabled !== true) {
          return nextIndex
        }
      }

      return -1
    }

    function moveToIndex(index: number) {
      if (rootRef.value === null) {
        return
      }

      clearSelectedClasses()
      setVerticalScrollPosition(rootRef.value, index * itemHeight.value, 40)
    }

    function move(dir: number) {
      if (dir !== 1 && dir !== -1) {
        return false
      }

      const activeIndex = getActiveItemIndex()
      if (activeIndex === -1) {
        return false
      }

      const nextIndex = getNextEnabledItemIndex(activeIndex, dir)
      if (nextIndex === -1) {
        return false
      }

      const item = items.value[nextIndex]
      pendingValue.value = item.value
      moveToIndex(nextIndex)
      emit('input', item.value)

      return true
    }

    function onResize() {
      adjustColumnPadding()
    }

    function canScroll(dir: number) {
      if (items.value.length > 1) {
        if (dir === 1) {
          return props.value !== items.value[items.value.length - 1].value
        }

        return props.value !== items.value[0].value
      }

      return false
    }

    function adjustColumnPadding() {
      const parentHeight = rootRef.value?.parentElement
        ? parseInt(
            window.getComputedStyle(rootRef.value.parentElement, null).getPropertyValue('height'),
            10,
          )
        : 0

      height.value = parentHeight
      padding.value = parentHeight / 2 - itemHeight.value / 2

      if (isNaN(padding.value) !== true && padding.value > -1) {
        columnPadding.value = {
          height: `${padding.value}px`,
        }
      }

      setTimeout(() => {
        updatePosition()
      }, 100)
    }

    function wheelEvent(event: WheelEvent) {
      if (props.disable !== true) {
        const delta =
          'wheelDeltaY' in event
            ? (event as WheelEvent & { wheelDeltaY: number }).wheelDeltaY
            : -event.deltaY
        const dir = delta < 0 ? 1 : -1
        move(dir)
      }

      event.preventDefault()
    }

    function getItemIndex(value: unknown) {
      return items.value.findIndex((item) => itemMatchesValue(item, value))
    }

    function getItemIndexFromEvent(event: Event) {
      const target = event.target as HTMLElement
      return Math.round(target.scrollTop / itemHeight.value)
    }

    const scrollEvent = debounce((event: Event) => {
      if ($q.platform.is.desktop === true) {
        return
      }

      if (props.disable !== true) {
        const index = getItemIndexFromEvent(event)

        if (index > -1 && index < items.value.length) {
          const item = items.value[index]
          if (item.disabled !== true && item.value !== props.value) {
            emit('input', item.value)
          }
          event.preventDefault()
        } else {
          console.error(`QScroller: index (${index}) is out of bounds (${items.value.length})`)
        }
      }
    }, 250)

    function clickEvent(item: Record<string, any>) {
      if (props.disable === true || item.disabled === true) {
        return
      }

      const elem = currentElement()
      if (elem === null) {
        return
      }

      if (elem.innerText.replace(/\n|\r/g, '') !== getItemLabelText(item)) {
        const klass = `q-scroller__item--selected${props.dense === true ? '--dense' : ''}`
        elem.classList.remove(klass)
        emit('input', item.value)
        return
      }

      const klass = `.q-scroller__item--selected${props.dense === true ? '--dense' : ''}`
      clearSelectedClasses()
      elem.classList.add(klass.slice(1))
      emit('input', item.value)
    }

    function updatePosition() {
      setTimeout(() => {
        const klass = `.q-scroller__item--selected${props.dense === true ? '--dense' : ''}`
        let found: Element | undefined
        let selected = rootRef.value?.querySelector(klass)

        while (selected) {
          if ((selected as HTMLElement).innerText.replace(/\n|\r/g, '') === showLabel.value) {
            found = selected
          }

          selected.classList.remove(klass.slice(1))
          selected = rootRef.value?.querySelector(klass) ?? null
        }

        if (found instanceof HTMLElement && rootRef.value !== null) {
          found.classList.add(klass.slice(1))
          const position = found.offsetTop - padding.value
          setVerticalScrollPosition(rootRef.value, position, 100)
        }
      }, 150)
    }

    watch(
      () => props.value,
      () => {
        if (itemMatchesValue({ value: pendingValue.value }, props.value) === true) {
          pendingValue.value = void 0
        }

        updatePosition()
      },
    )
    watch(() => props.items, adjustColumnPadding, { deep: true })
    watch(() => props.dense, adjustColumnPadding)

    onMounted(() => {
      adjustColumnPadding()
      nextTick(() => {
        if (!props.value && items.value.length > 0 && items.value[0].value !== void 0) {
          emit('input', items.value[0].value)
        }
      })
    })

    expose({
      canScroll,
      getItemIndex,
      move,
    })

    function renderPadding() {
      return h('div', {
        class: 'q-scroller__padding',
        style: columnPadding.value,
      })
    }

    function renderItem(item: Record<string, any>) {
      const disabled = props.disable === true || item.disabled === true

      return h(
        QBtn,
        setScrollerTextColor(disabled === true ? props.disabledTextColor : void 0, {
          key: item.value ?? item.label,
          class: [
            `q-scroller__item${props.dense === true ? '--dense' : ''}`,
            'justify-center align-center',
            {
              'q-scroller__item--selected':
                props.dense !== true && itemMatchesValue(item, props.value),
              'q-scroller__item--disabled': props.dense !== true && disabled === true,
              'q-scroller__item--selected--dense':
                props.dense === true && itemMatchesValue(item, props.value),
              'q-scroller__item--disabled--dense': props.dense === true && disabled === true,
            },
          ],
          flat: true,
          dense: true,
          noWrap: true,
          label: getItemLabel(item),
          disable: disabled,
          icon: item.icon !== void 0 ? item.icon : void 0,
          iconRight: item.iconRight !== void 0 ? item.iconRight : void 0,
          noCaps: item.noCaps !== void 0 ? item.noCaps : item.display !== void 0 ? true : void 0,
          align: item.align !== void 0 ? item.align : void 0,
          onClick: () => clickEvent(item),
        }),
      )
    }

    function renderContents() {
      return h(
        'div',
        setScrollerBothColors(props.textColor, void 0, {
          class: 'q-scroller__body',
          onWheel: wheelEvent,
        }),
        [renderPadding(), ...items.value.map(renderItem), renderPadding()],
      )
    }

    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: rootRef,
          class: [
            attrs.class,
            'q-scroller__content scroll',
            {
              'q-scroller__overflow-hidden': $q.platform.is.mobile !== true,
            },
          ],
          style: attrs.style,
          onScroll: scrollEvent,
        },
        [
          h(QResizeObserver, {
            debounce: 0,
            onResize,
          }),
          renderContents(),
        ],
      )
  },
})
