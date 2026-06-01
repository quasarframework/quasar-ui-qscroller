// Mixins
import Common, { renderCommon } from "../mixins/common";

// Components
import ScrollerBase from "../mixins/scroller-base";

// Util
import props from "../utils/props";
import { defineLegacyComponent } from "../utils/vue-compat";

/* @vue/component */
export default defineLegacyComponent({
  name: "QStringScroller",

  mixins: [Common],

  render() {
    return renderCommon(this);
  },

  props: {
    ...props.common,
    ...props.base,
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0,
    };
  },

  mounted() {
    this.adjustBodyHeight();
  },

  computed: {
    slotData() {
      return { value: this.value };
    },

    displayed() {
      if (!this.value) {
        return "";
      }
      const item = this.items.find((item) => item.value === this.value);

      return item.label || item.value;
    },
  },

  methods: {
    canMovePrevious() {
      if (this.$refs.scroller) {
        return this.$refs.scroller.canScroll(-1);
      }
      return false;
    },

    canMoveNext() {
      if (this.$refs.scroller) {
        return this.$refs.scroller.canScroll(1);
      }
      return false;
    },

    previous() {
      if (this.$refs.scroller) {
        return this.$refs.scroller.move(-1);
      }
      return false;
    },

    next() {
      if (this.$refs.scroller) {
        return this.$refs.scroller.move(1);
      }
      return false;
    },

    getItemIndex(value) {
      if (this.$refs.scroller) {
        return this.$refs.scroller.getItemIndex(value);
      }
      return -1;
    },

    getCurrentIndex() {
      return this.getItemIndex(this.value);
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderScrollers(h) {
      return h(ScrollerBase, {
        ref: "scroller",
        props: {
          value: this.value,
          items: this.items,
          dense: this.dense,
          disable: this.disable,
          textColor: this.innerTextColor,
          color: this.innerColor,
          disabledTextColor: this.disabledTextColor,
          noCaps: this.noCaps,
        },
        attrs: {
          ...this.$attrs,
        },
      });
    },
  },
});
