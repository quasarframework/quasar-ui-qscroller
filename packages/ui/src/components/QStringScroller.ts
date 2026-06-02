import { computed, defineComponent, h, ref } from "vue";
import { useScrollerShell } from "../composables/use-scroller-shell";
import ScrollerBase from "./private/ScrollerBase";
import props from "../utils/props";

export default defineComponent({
  name: "QStringScroller",

  props: {
    ...props.common,
    ...props.base,
    items: {
      type: Array,
      required: true,
    },
  },

  emits: ["close", "input"],

  setup(props, { attrs, slots, emit, expose }) {
    const items = computed(() => (props.items ?? []) as Array<Record<string, any>>);
    const scrollerRef = ref<{
      canScroll: (dir: number) => boolean;
      getItemIndex: (value: unknown) => number;
      move: (dir: number) => boolean;
    } | null>(null);

    const { renderCommon } = useScrollerShell(props);

    const slotData = computed(() => ({ value: props.value }));

    const displayed = computed(() => {
      if (!props.value) {
        return "";
      }

      const item = items.value.find((entry) => entry.value === props.value);
      return item?.label ?? item?.value ?? "";
    });

    function canMovePrevious() {
      return scrollerRef.value?.canScroll(-1) ?? false;
    }

    function canMoveNext() {
      return scrollerRef.value?.canScroll(1) ?? false;
    }

    function previous() {
      return scrollerRef.value?.move(-1) ?? false;
    }

    function next() {
      return scrollerRef.value?.move(1) ?? false;
    }

    function getItemIndex(value: unknown) {
      return scrollerRef.value?.getItemIndex(value) ?? -1;
    }

    function getCurrentIndex() {
      return getItemIndex(props.value);
    }

    expose({
      canMoveNext,
      canMovePrevious,
      getCurrentIndex,
      getItemIndex,
      next,
      previous,
    });

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
          emit("input", value);
        },
      });
    }

    return () =>
      renderCommon({
        displayed,
        emitClose: () => emit("close"),
        renderScrollers,
        slotData,
        slots,
      });
  },
});
