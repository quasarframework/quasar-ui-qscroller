import { computed, defineComponent, h, ref } from "vue";
import ScrollerBase from "./private/ScrollerBase";
import QDateRangeScroller from "./QDateRangeScroller";
import QDateScroller from "./QDateScroller";
import QDateTimeScroller from "./QDateTimeScroller";
import QStringScroller from "./QStringScroller";
import QTimeRangeScroller from "./QTimeRangeScroller";
import QTimeScroller from "./QTimeScroller";
import props from "../utils/props";

export default defineComponent({
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

  setup(props, { attrs, slots }) {
    const componentRef = ref();

    const component = computed(() => {
      switch (props.view) {
        case "string":
          if (!props.items || Array.isArray(props.items) !== true) {
            throw new Error(
              'QScroller: items [array] prop is required when view="string" (default)',
            );
          }
          return QStringScroller;
        case "time":
          return QTimeScroller;
        case "date":
          return QDateScroller;
        case "date-time":
          return QDateTimeScroller;
        case "time-range":
          return QTimeRangeScroller;
        case "date-range":
          return QDateRangeScroller;
        default:
          return ScrollerBase;
      }
    });

    return () =>
      h(
        component.value,
        {
          ref: componentRef,
          ...props,
          ...attrs,
        },
        slots,
      );
  },
});
