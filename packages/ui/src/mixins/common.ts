import { QBtn, QResizeObserver } from "quasar";
import { useScrollerColors } from "../composables/use-scroller-colors";
import { callLegacyMethod, defineLegacyComponent, legacyH as h } from "../utils/vue-compat";

const { setScrollerBackgroundColor, setScrollerBothColors, setScrollerCssColorVar } =
  useScrollerColors();

function renderCommonBody(vm, render) {
  return render(
    "div",
    setScrollerBackgroundColor(vm.innerColor, {
      staticClass: `q-scroller__body q-scroller__horizontal-bar${vm.dense === true ? "--dense" : ""} row full-width`,
      class: {
        "q-scroller__overflow-hidden": vm.$q.platform.is.mobile !== true,
      },
      style: {
        height: (vm.childHeight === void 0 ? vm.bodyHeight : vm.childHeight) + "px",
      },
    }),
    [callLegacyMethod(vm, "__renderScrollers", render)],
  );
}

function renderCommonHeader(vm, render) {
  if (vm.noHeader) return "";

  const slot = vm.$slots.header;

  return render(
    "div",
    {
      ref: "header",
      staticClass:
        (vm.dense ? "q-scroller__header--dense" : "q-scroller__header") +
        " flex justify-around items-center full-width q-pa-xs",
      class: {
        "shadow-20": vm.noShadow === false,
      },
    },
    slot
      ? slot(vm.slotData)
      : [
          render(
            "span",
            {
              staticClass: "ellipsis",
            },
            vm.displayed,
          ),
        ],
  );
}

function renderCommonFooterButton(vm, render) {
  return [
    render(QBtn, {
      staticClass: "q-scroller__cancel-btn q-ml-xs",
      props: {
        flat: true,
        dense: true,
        round: true,
        icon: "close",
      },
      on: {
        click: () => {
          vm.$emit("close");
        },
      },
    }),
  ];
}

function renderCommonFooter(vm, render) {
  if (vm.noFooter) return "";

  const slot = vm.$slots.footer;

  return render(
    "div",
    {
      ref: "footer",
      staticClass:
        (vm.dense ? "q-scroller__footer--dense" : "q-scroller__footer") +
        " flex justify-around items-center full-width q-pa-xs",
      class: {
        "shadow-up-20": vm.noShadow === false,
      },
    },
    slot ? slot(vm.slotData) : [renderCommonFooterButton(vm, render)],
  );
}

export function renderCommon(vm) {
  const resize = [
    h(QResizeObserver, {
      props: { debounce: 0 },
      on: { resize: vm.onResize },
    }),
  ];

  return h(
    "div",
    setScrollerBothColors(vm.textColor, vm.color, {
      ref: "scroller",
      staticClass: "q-scroller",
      class: {
        "q-scroller__disabled": vm.disable === true,
        "rounded-borders": vm.roundedBorders === true,
        "q-scroller__border": vm.noBorder !== true,
        "q-scroller__overflow-hidden": true,
      },
      style: vm.style,
    }),
    resize.concat([
      renderCommonHeader(vm, h),
      renderCommonBody(vm, h),
      renderCommonFooter(vm, h),
    ]),
  );
}

/* @vue/mixin */
export default defineLegacyComponent({
  name: "Common",

  computed: {
    style() {
      const style: Record<string, unknown> = {};
      setScrollerCssColorVar(style, "--q-scroller-border-color", this.borderColor, "#ccc");
      setScrollerCssColorVar(style, "--q-scroller-bar-color", this.barColor, "#ccc");
      setScrollerCssColorVar(style, "--q-scroller-color", this.textColor, "currentColor");
      setScrollerCssColorVar(style, "--q-scroller-background", this.color, "transparent");
      setScrollerCssColorVar(
        style,
        "--q-scroller-inner-color",
        this.innerTextColor ?? this.textColor,
        "currentColor",
      );
      setScrollerCssColorVar(
        style,
        "--q-scroller-inner-background",
        this.innerColor,
        "transparent",
      );
      setScrollerCssColorVar(
        style,
        "--q-scroller-disabled-color",
        this.disabledTextColor,
        "currentColor",
      );
      style.height = this.bodyHeight;
      return style;
    },
  },

  watch: {
    noHeader() {
      this.adjustBodyHeight();
    },

    noFooter() {
      this.adjustBodyHeight();
    },

    height() {
      this.adjustBodyHeight();
    },

    bodyHeight() {
      this.adjustBodyHeight();
    },

    dense() {
      this.adjustBodyHeight();
    },
  },

  methods: {
    getRenderedHeight(refName: "header" | "footer", fallback: number) {
      const element = this.$refs[refName] as HTMLElement | undefined;
      const height = element?.getBoundingClientRect().height;

      return height !== void 0 && height > 0 ? height : fallback;
    },

    onResize() {
      this.adjustBodyHeight();
    },

    adjustBodyHeight() {
      const self = this;
      setTimeout(() => {
        if (this.childHeight === void 0) {
          self.headerHeight =
            self.noHeader === true ? 0 : self.getRenderedHeight("header", self.dense ? 30 : 50);
          self.footerHeight =
            self.noFooter === true ? 0 : self.getRenderedHeight("footer", self.dense ? 30 : 50);
          self.height = self.$el.getBoundingClientRect().height;
          self.bodyHeight = self.height - self.headerHeight - self.footerHeight;
          if (self.noHeader !== true && self.noFooter !== true && self.noBorder !== true) {
            self.bodyHeight -= 2;
          }
        } else {
          self.bodyHeight = this.childHeight;
        }
      }, 200);
    },

  },

  render() {
    return renderCommon(this);
  },
});
