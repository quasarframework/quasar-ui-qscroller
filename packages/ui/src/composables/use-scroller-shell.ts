import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Ref,
  type Slots,
  type VNodeChild,
} from "vue";
import { QBtn, QResizeObserver, useQuasar } from "quasar";
import {
  setScrollerBackgroundColor,
  setScrollerBothColors,
  setScrollerCssColorVar,
} from "./use-scroller-colors";

type ShellProps = {
  barColor?: string;
  borderColor?: string;
  childHeight?: number | string;
  color?: string;
  dense?: boolean;
  disable?: boolean;
  disabledTextColor?: string;
  innerColor?: string;
  innerTextColor?: string;
  noBorder?: boolean;
  noFooter?: boolean;
  noHeader?: boolean;
  noShadow?: boolean;
  roundedBorders?: boolean;
  textColor?: string;
};

type ShellOptions = {
  displayed: Ref<string> | { value: string };
  emitClose: () => void;
  renderScrollers: () => VNodeChild;
  slotData: Ref<unknown> | { value: unknown };
  slots: Slots;
};

const DEFAULT_HEIGHT = 100;
const DEFAULT_HEADER_HEIGHT = 50;
const DEFAULT_HEADER_HEIGHT_DENSE = 30;
const DEFAULT_FOOTER_HEIGHT = 50;
const DEFAULT_FOOTER_HEIGHT_DENSE = 30;

export function useScrollerShell(props: ShellProps) {
  const $q = useQuasar();
  const shellRef = ref<HTMLElement | null>(null);
  const headerRef = ref<HTMLElement | null>(null);
  const footerRef = ref<HTMLElement | null>(null);
  const headerHeight = ref(DEFAULT_HEADER_HEIGHT);
  const footerHeight = ref(DEFAULT_FOOTER_HEIGHT);
  const bodyHeight = ref(DEFAULT_HEIGHT);
  const height = ref(0);
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  const style = computed<Record<string, unknown>>(() => {
    const style: Record<string, unknown> = {};
    setScrollerCssColorVar(style, "--q-scroller-border-color", props.borderColor, "#ccc");
    setScrollerCssColorVar(style, "--q-scroller-bar-color", props.barColor, "#ccc");
    setScrollerCssColorVar(style, "--q-scroller-color", props.textColor, "currentColor");
    setScrollerCssColorVar(style, "--q-scroller-background", props.color, "transparent");
    setScrollerCssColorVar(
      style,
      "--q-scroller-inner-color",
      props.innerTextColor ?? props.textColor,
      "currentColor",
    );
    setScrollerCssColorVar(style, "--q-scroller-inner-background", props.innerColor, "transparent");
    setScrollerCssColorVar(
      style,
      "--q-scroller-disabled-color",
      props.disabledTextColor,
      "currentColor",
    );
    return style;
  });

  function getRenderedHeight(element: HTMLElement | null, fallback: number) {
    const measuredHeight = element?.getBoundingClientRect().height;
    return measuredHeight !== void 0 && measuredHeight > 0 ? measuredHeight : fallback;
  }

  function adjustBodyHeight() {
    if (resizeTimer !== void 0) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      if (props.childHeight !== void 0) {
        bodyHeight.value =
          typeof props.childHeight === "string"
            ? parseInt(props.childHeight, 10) || DEFAULT_HEIGHT
            : props.childHeight;
        return;
      }

      headerHeight.value =
        props.noHeader === true
          ? 0
          : getRenderedHeight(
              headerRef.value,
              props.dense === true ? DEFAULT_HEADER_HEIGHT_DENSE : DEFAULT_HEADER_HEIGHT,
            );
      footerHeight.value =
        props.noFooter === true
          ? 0
          : getRenderedHeight(
              footerRef.value,
              props.dense === true ? DEFAULT_FOOTER_HEIGHT_DENSE : DEFAULT_FOOTER_HEIGHT,
            );

      height.value = shellRef.value?.getBoundingClientRect().height ?? 0;
      bodyHeight.value = height.value - headerHeight.value - footerHeight.value;

      if (props.noHeader !== true && props.noFooter !== true && props.noBorder !== true) {
        bodyHeight.value -= 2;
      }
    }, 200);
  }

  function renderCommon({ displayed, emitClose, renderScrollers, slotData, slots }: ShellOptions) {
    const headerSlot = slots.header?.(slotData.value);
    const footerSlot = slots.footer?.(slotData.value);

    return h(
      "div",
      setScrollerBothColors(props.textColor, props.color, {
        ref: shellRef,
        class: {
          "q-scroller": true,
          "q-scroller__disabled": props.disable === true,
          "rounded-borders": props.roundedBorders === true,
          "q-scroller__border": props.noBorder !== true,
          "q-scroller__overflow-hidden": true,
        },
        style: style.value as Record<string, string>,
      }),
      [
        h(QResizeObserver, {
          debounce: 0,
          onResize: adjustBodyHeight,
        }),
        props.noHeader === true
          ? null
          : h(
              "div",
              {
                ref: headerRef,
                class: [
                  props.dense === true ? "q-scroller__header--dense" : "q-scroller__header",
                  "flex justify-around items-center full-width q-pa-xs",
                  {
                    "shadow-20": props.noShadow === false,
                  },
                ],
              },
              headerSlot ?? [
                h(
                  "span",
                  {
                    class: "ellipsis",
                  },
                  displayed.value,
                ),
              ],
            ),
        h(
          "div",
          setScrollerBackgroundColor(props.innerColor, {
            class: [
              `q-scroller__body q-scroller__horizontal-bar${props.dense === true ? "--dense" : ""}`,
              "row full-width",
              {
                "q-scroller__overflow-hidden": $q.platform.is.mobile !== true,
              },
            ],
            style: {
              height:
                props.childHeight === void 0
                  ? `${bodyHeight.value}px`
                  : typeof props.childHeight === "number"
                    ? `${props.childHeight}px`
                    : props.childHeight,
            },
          }),
          [renderScrollers()],
        ),
        props.noFooter === true
          ? null
          : h(
              "div",
              {
                ref: footerRef,
                class: [
                  props.dense === true ? "q-scroller__footer--dense" : "q-scroller__footer",
                  "flex justify-around items-center full-width q-pa-xs",
                  {
                    "shadow-up-20": props.noShadow === false,
                  },
                ],
              },
              footerSlot ?? [
                h(QBtn, {
                  class: "q-scroller__cancel-btn q-ml-xs",
                  flat: true,
                  dense: true,
                  round: true,
                  icon: "close",
                  onClick: emitClose,
                }),
              ],
            ),
      ],
    );
  }

  watch(
    () => [props.noHeader, props.noFooter, props.childHeight, props.dense, props.noBorder],
    adjustBodyHeight,
  );

  onMounted(() => {
    adjustBodyHeight();
  });

  onBeforeUnmount(() => {
    if (resizeTimer !== void 0) {
      clearTimeout(resizeTimer);
    }
  });

  return {
    bodyHeight,
    adjustBodyHeight,
    renderCommon,
  };
}
