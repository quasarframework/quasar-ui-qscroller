import { QBtn, QResizeObserver } from "quasar";
import { defineLegacyComponent, legacyH as h } from "../utils/vue-compat";

/* @vue/mixin */
export default defineLegacyComponent({
  name: "Common",

  computed: {
    style() {
      const style: Record<string, unknown> = {};
      this.setCssColorVar(style, "--q-scroller-border-color", this.borderColor, "#ccc");
      this.setCssColorVar(style, "--q-scroller-bar-color", this.barColor, "#ccc");
      this.setCssColorVar(style, "--q-scroller-color", this.textColor, "currentColor");
      this.setCssColorVar(style, "--q-scroller-background", this.color, "transparent");
      this.setCssColorVar(
        style,
        "--q-scroller-inner-color",
        this.innerTextColor ?? this.textColor,
        "currentColor",
      );
      this.setCssColorVar(style, "--q-scroller-inner-background", this.innerColor, "transparent");
      this.setCssColorVar(
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

    // -------------------------------
    // common render functions
    // -------------------------------

    __renderBody(render) {
      return render(
        "div",
        this.setBackgroundColor(this.innerColor, {
          staticClass: `q-scroller__body q-scroller__horizontal-bar${this.dense === true ? "--dense" : ""} row full-width`,
          class: {
            "q-scroller__overflow-hidden": this.$q.platform.is.mobile !== true,
          },
          style: {
            height: (this.childHeight === void 0 ? this.bodyHeight : this.childHeight) + "px",
          },
        }),
        [this.__renderScrollers(render)],
      );
    },

    __renderHeader(render) {
      if (this.noHeader) return "";
      const slot = this.$slots.header;
      return render(
        "div",
        {
          ref: "header",
          staticClass:
            (this.dense ? "q-scroller__header--dense" : "q-scroller__header") +
            " flex justify-around items-center full-width q-pa-xs",
          class: {
            "shadow-20": this.noShadow === false,
          },
        },
        slot
          ? slot(this.slotData)
          : [
              render(
                "span",
                {
                  staticClass: "ellipsis",
                },
                this.displayed,
              ),
            ],
      );
    },

    // the close button
    __renderFooterButton(render) {
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
              this.$emit("close");
            },
          },
        }),
      ];
    },

    __renderFooter(render) {
      if (this.noFooter) return "";
      const slot = this.$slots.footer;
      return render(
        "div",
        {
          ref: "footer",
          staticClass:
            (this.dense ? "q-scroller__footer--dense" : "q-scroller__footer") +
            " flex justify-around items-center full-width q-pa-xs",
          class: {
            "shadow-up-20": this.noShadow === false,
          },
        },
        slot ? slot(this.slotData) : [this.__renderFooterButton(render)],
      );
    },
  },

  render() {
    const resize = [
      h(QResizeObserver, {
        props: { debounce: 0 },
        on: { resize: this.onResize },
      }),
    ];

    return h(
      "div",
      this.setBothColors(this.textColor, this.color, {
        ref: "scroller",
        staticClass: "q-scroller",
        class: {
          "q-scroller__disabled": this.disable === true,
          "rounded-borders": this.roundedBorders === true,
          "q-scroller__border": this.noBorder !== true,
          "q-scroller__overflow-hidden": true,
        },
        style: this.style,
      }),
      resize.concat([this.__renderHeader(h), this.__renderBody(h), this.__renderFooter(h)]),
    );
  },
});
