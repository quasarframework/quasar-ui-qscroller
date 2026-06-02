import { computed, defineComponent, h, ref, watch } from "vue";
import { useScrollerShell } from "../composables/use-scroller-shell";
import QDateScroller from "./QDateScroller";
import props from "../utils/props";
import {
  getDayIdentifier,
  parseTimestamp,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  padNumber,
} from "../utils/Timestamp";
import { isValidDate } from "../utils/validation";

export default defineComponent({
  name: "QDateRangeScroller",

  props: {
    ...props.common,
    ...props.base,
    ...props.dateRange,
    ...props.verticalBar,
    ...props.locale,
  },

  emits: ["close", "input", "invalid-range"],

  setup(props, { emit, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props);
    const startDateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null);
    const endDateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null);
    const startDate = ref("");
    const endDate = ref("");
    const type = ref<string | null>(null);
    const syncing = ref(false);

    const slotData = computed(() => {
      if (startDateRef.value && endDateRef.value) {
        return { value: [startDateRef.value.getTimestamp(), endDateRef.value.getTimestamp()] };
      }
      return { value: [] };
    });

    const displayed = computed(() => displayDate.value);

    const rangeIsValid = computed(() => {
      if (props.disableValidation === true) {
        return true;
      }

      if (startDate.value && endDate.value) {
        const start = parseDate(new Date());
        const end = parseDate(new Date());
        const startParts = startDate.value.split("-");
        const endParts = endDate.value.split("-");
        start.year = parseInt(startParts[0], 10);
        start.month = parseInt(startParts[1], 10);
        start.day = parseInt(startParts[2], 10);
        end.year = parseInt(endParts[0], 10);
        end.month = parseInt(endParts[1], 10);
        end.day = parseInt(endParts[2], 10);
        return getDayIdentifier(end) >= getDayIdentifier(start);
      }

      return true;
    });

    const displayDate = computed(() => {
      if (startDate.value !== "" && endDate.value !== "") {
        if (startDateRef.value?.displayDate && endDateRef.value?.displayDate) {
          return `${startDateRef.value.displayDate}${props.displaySeparator}${endDateRef.value.displayDate}`;
        }
        return `${startDate.value}${props.displaySeparator}${endDate.value}`;
      }
      return `${props.displaySeparator}`;
    });

    function emitValue() {
      if (type.value === null || startDate.value === "" || endDate.value === "") {
        return;
      }

      let startParts;
      let endParts;
      let start;
      let end;

      switch (type.value) {
        case "date":
          start = parseDate(new Date());
          end = parseDate(new Date());
          startParts = startDate.value.split("-");
          endParts = endDate.value.split("-");
          start.year = parseInt(startParts[0], 10);
          start.month = parseInt(startParts[1], 10);
          start.day = parseInt(startParts[2], 10);
          end.year = parseInt(endParts[0], 10);
          end.month = parseInt(endParts[1], 10);
          end.day = parseInt(endParts[2], 10);
          emit("input", [getDateObject(start), getDateObject(end)]);
          return;
        case "array":
          startParts = startDate.value.split("-");
          endParts = endDate.value.split("-");
          emit("input", [
            [parseInt(startParts[0], 10), parseInt(startParts[1], 10), parseInt(startParts[2], 10)],
            [parseInt(endParts[0], 10), parseInt(endParts[1], 10), parseInt(endParts[2], 10)],
          ]);
          return;
        case "object":
          startParts = startDate.value.split("-");
          endParts = endDate.value.split("-");
          emit("input", [
            {
              year: parseInt(startParts[0], 10),
              month: parseInt(startParts[1], 10),
              day: parseInt(startParts[2], 10),
            },
            {
              year: parseInt(endParts[0], 10),
              month: parseInt(endParts[1], 10),
              day: parseInt(endParts[2], 10),
            },
          ]);
          return;
        case "string":
          emit("input", [startDate.value, endDate.value]);
      }
    }

    function splitDate() {
      syncing.value = true;

      let start;
      let end;
      let now;
      const valueType = Object.prototype.toString.call(props.value);

      if (valueType === "[object Undefined]" || props.value === null) {
        type.value = "string";
        now = parseDate(new Date());
        start = getDate(parseTimestamp(`${getDate(now)} ${getTime(now)}`));
        end = start;
        if (isValidDate(start) && isValidDate(end)) {
          startDate.value = start;
          endDate.value = end;
        } else {
          console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`);
        }
        syncing.value = false;
        return;
      }

      if (Array.isArray(props.value) !== true || props.value.length < 2) {
        syncing.value = false;
        console.error(`QDateRangeScroller: value needs to be an array of types (${props.value})`);
        return;
      }

      switch (Object.prototype.toString.call(props.value[0])) {
        case "[object Date]":
          type.value = "date";
          start = getDate(
            parseTimestamp(
              `${getDate(parseDate(props.value[0]))} ${getTime(parseDate(props.value[0]))}`,
            ),
          );
          end = getDate(
            parseTimestamp(
              `${getDate(parseDate(props.value[1]))} ${getTime(parseDate(props.value[1]))}`,
            ),
          );
          break;
        case "[object Array]":
          type.value = "array";
          start = `${padNumber(parseInt(props.value[0][0], 10), 2)}-${padNumber(parseInt(props.value[0][1], 10), 2)}-${padNumber(parseInt(props.value[0][2], 10), 2)}`;
          end = `${padNumber(parseInt(props.value[1][0], 10), 2)}-${padNumber(parseInt(props.value[1][1], 10), 2)}-${padNumber(parseInt(props.value[1][2], 10), 2)}`;
          break;
        case "[object Object]":
          type.value = "object";
          start = `${padNumber(parseInt(props.value[0].year, 10), 2)}-${padNumber(parseInt(props.value[0].month, 10), 2)}-${padNumber(parseInt(props.value[0].day, 10), 2)}`;
          end = `${padNumber(parseInt(props.value[1].year, 10), 2)}-${padNumber(parseInt(props.value[1].month, 10), 2)}-${padNumber(parseInt(props.value[1].day, 10), 2)}`;
          break;
        case "[object String]":
          type.value = "string";
          start = props.value[0];
          end = props.value[1];
          break;
        case "[object Undefined]":
          type.value = "string";
          now = parseDate(new Date());
          start = getDate(parseTimestamp(`${getDate(now)} ${getTime(now)}`));
          end = start;
          break;
        default:
          syncing.value = false;
          console.error(`QDateRangeScroller: value needs to be an array of types (${props.value})`);
          return;
      }

      if (isValidDate(start) && isValidDate(end)) {
        startDate.value = start;
        endDate.value = end;
      } else {
        console.error(`QDateRangeScroller: invalid start or end dates (${start} ${end})`);
      }

      syncing.value = false;
    }

    watch(() => props.value, splitDate);
    watch(startDate, () => {
      if (syncing.value !== true) {
        emitValue();
      }
    });
    watch(endDate, () => {
      if (syncing.value !== true) {
        emitValue();
      }
    });
    watch(rangeIsValid, (value) => {
      if (value === false) {
        emit("invalid-range", { startDate: startDate.value, endDate: endDate.value });
      }
    });

    splitDate();

    function renderStartDate() {
      return h(QDateScroller, {
        ref: startDateRef,
        class: [
          "col-6",
          {
            "q-scroller__vertical-bar": props.verticalBar === true,
          },
        ],
        value: startDate.value,
        locale: props.locale,
        barColor: props.barColor,
        textColor: props.textColor,
        color: props.color,
        innerTextColor: props.innerTextColor,
        innerColor: props.innerColor,
        disabledTextColor: props.disabledTextColor,
        dense: props.dense,
        disable: props.disable,
        noBorder: true,
        noHeader: true,
        noFooter: true,
        disabledYears: props.startDisabledYears,
        disabledMonths: props.startDisabledMonths,
        disabledDays: props.startDisabledDays,
        noDays: props.startNoDays,
        noMonths: props.startNoMonths,
        noYears: props.startNoYears,
        yearBegin: props.startYearBegin,
        yearStop: props.startYearStop,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          startDate.value = value;
        },
      });
    }

    function renderEndDate() {
      return h(QDateScroller, {
        ref: endDateRef,
        class: "col-6",
        value: endDate.value,
        locale: props.locale,
        barColor: props.barColor,
        textColor: props.textColor,
        color: props.color,
        innerTextColor: rangeIsValid.value ? props.innerTextColor : props.errorTextColor,
        innerColor: rangeIsValid.value ? props.innerColor : props.errorColor,
        disabledTextColor: props.disabledTextColor,
        dense: props.dense,
        disable: props.disable,
        noBorder: true,
        noHeader: true,
        noFooter: true,
        disabledYears: props.endDisabledYears,
        disabledMonths: props.endDisabledMonths,
        disabledDays: props.endDisabledDays,
        noDays: props.endNoDays,
        noMonths: props.endNoMonths,
        noYears: props.endNoYears,
        yearBegin: props.endYearBegin,
        yearStop: props.endYearStop,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          endDate.value = value;
        },
      });
    }

    function renderScrollers() {
      return [renderStartDate(), renderEndDate()];
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
