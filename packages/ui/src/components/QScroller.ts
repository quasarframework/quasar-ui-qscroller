// Scrollers
import ScrollerBase from "../mixins/scroller-base";
import QStringScroller from "./QStringScroller";
import QDateScroller from "./QDateScroller";
import QTimeScroller from "./QTimeScroller";
import QDateTimeScroller from "./QDateTimeScroller";
import QTimeRangeScroller from "./QTimeRangeScroller";
import QDateRangeScroller from "./QDateRangeScroller";

import props from "../utils/props";
import { defineLegacyComponent, legacyH as h } from "../utils/vue-compat";

/* @vue/component */
export default defineLegacyComponent({
  name: "QScroller",

  props: {
    ...props.common,
    ...props.view,
    ...props.scroller,
    ...props.base,
    ...props.locale,
    ...props.date,
    ...props.time,
    ...props.timeRange,
    ...props.dateRange,
    ...props.verticalBar,
    ...props.locale,
    hour12: Boolean,
    amPmLabels: Array,
  },

  computed: {
    __renderProps() {
      let component: unknown = "div";
      switch (this.view) {
        case "string":
          component = QStringScroller;
          if (!this.items || !Array.isArray(this.items)) {
            throw new Error(
              'QScroller: items [array] prop is required when view="string" (default)',
            );
          }
          break;
        case "time":
          component = QTimeScroller;
          break;
        case "date":
          component = QDateScroller;
          break;
        case "date-time":
          component = QDateTimeScroller;
          break;
        case "time-range":
          component = QTimeRangeScroller;
          break;
        case "date-range":
          component = QDateRangeScroller;
          break;
        default:
          component = ScrollerBase;
          break;
      }

      return { component };
    },
  },

  methods: {
    __renderComponent(render, component, data) {
      return render(component, data);
    },
  },

  render() {
    const { component } = this.__renderProps;

    const data = {
      props: {
        ...this.$props,
      },
      attrs: {
        ...this.$attrs,
      },
      scopedSlots: this.$slots,
    };

    return this.__renderComponent(h, component, data);
  },
});
