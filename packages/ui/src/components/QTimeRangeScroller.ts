import { computed, defineComponent, h, ref, watch } from "vue";
import { useScrollerShell } from "../composables/use-scroller-shell";
import QTimeScroller from "./QTimeScroller";
import props from "../utils/props";
import {
  getTimeIdentifier,
  parseTimestamp,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  padNumber,
} from "../utils/Timestamp";
import { isValidTime } from "../utils/validation";

export default defineComponent({
  name: "QTimeRangeScroller",

  props: {
    ...props.common,
    ...props.base,
    ...props.timeRange,
    ...props.verticalBar,
    ...props.locale,
    hour12: Boolean,
  },

  emits: ["close", "input", "invalid-range"],

  setup(props, { emit, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props);
    const startTimeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null);
    const endTimeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null);
    const startTime = ref("");
    const endTime = ref("");
    const type = ref<string | null>(null);
    const syncing = ref(false);

    const slotData = computed(() => {
      if (startTimeRef.value && endTimeRef.value) {
        return { value: [startTimeRef.value.getTimestamp(), endTimeRef.value.getTimestamp()] };
      }
      return { value: [] };
    });

    const displayed = computed(() => displayTime.value);

    const rangeIsValid = computed(() => {
      if (props.disableValidation === true) {
        return true;
      }

      if (startTime.value && endTime.value) {
        const start = parseDate(new Date());
        const end = parseDate(new Date());
        const startParts = startTime.value.split(":");
        const endParts = endTime.value.split(":");
        start.hour = parseInt(startParts[0], 10);
        start.minute = parseInt(startParts[1], 10);
        end.hour = parseInt(endParts[0], 10);
        end.minute = parseInt(endParts[1], 10);
        return getTimeIdentifier(end) >= getTimeIdentifier(start);
      }

      return true;
    });

    const displayTime = computed(() => {
      if (startTime.value !== "" && endTime.value !== "") {
        if (startTimeRef.value?.displayTime && endTimeRef.value?.displayTime) {
          return `${startTimeRef.value.displayTime}${props.displaySeparator}${endTimeRef.value.displayTime}`;
        }
        return `${startTime.value}${props.displaySeparator}${endTime.value}`;
      }
      return `${props.displaySeparator}`;
    });

    function emitValue() {
      if (type.value === null || startTime.value === "" || endTime.value === "") {
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
          startParts = startTime.value.split(":");
          endParts = endTime.value.split(":");
          start.hour = parseInt(startParts[0], 10);
          start.minute = parseInt(startParts[1], 10);
          end.hour = parseInt(endParts[0], 10);
          end.minute = parseInt(endParts[1], 10);
          emit("input", [getDateObject(start), getDateObject(end)]);
          return;
        case "array":
          startParts = startTime.value.split(":");
          endParts = endTime.value.split(":");
          emit("input", [
            [parseInt(startParts[0], 10), parseInt(startParts[1], 10)],
            [parseInt(endParts[0], 10), parseInt(endParts[1], 10)],
          ]);
          return;
        case "object":
          startParts = startTime.value.split(":");
          endParts = endTime.value.split(":");
          emit("input", [
            { hour: parseInt(startParts[0], 10), minute: parseInt(startParts[1], 10) },
            { hour: parseInt(endParts[0], 10), minute: parseInt(endParts[1], 10) },
          ]);
          return;
        case "string":
          emit("input", [startTime.value, endTime.value]);
      }
    }

    function splitTime() {
      syncing.value = true;

      let start;
      let end;
      let now;
      const valueType = Object.prototype.toString.call(props.value);

      if (valueType === "[object Undefined]" || props.value === null) {
        type.value = "string";
        now = parseDate(new Date());
        start = getTime(parseTimestamp(`${getDate(now)} ${getTime(now)}`));
        end = start;
        if (isValidTime(start) && isValidTime(end)) {
          startTime.value = start;
          endTime.value = end;
        } else {
          console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`);
        }
        syncing.value = false;
        return;
      }

      if (Array.isArray(props.value) !== true || props.value.length < 2) {
        syncing.value = false;
        console.error(`QTimeRangeScroller: value needs to be an array of types (${props.value})`);
        return;
      }

      switch (Object.prototype.toString.call(props.value[0])) {
        case "[object Date]":
          type.value = "date";
          start = getTime(parseTimestamp(`${getDate(parseDate(props.value[0]))} ${getTime(parseDate(props.value[0]))}`));
          end = getTime(parseTimestamp(`${getDate(parseDate(props.value[1]))} ${getTime(parseDate(props.value[1]))}`));
          break;
        case "[object Array]":
          type.value = "array";
          start =
            `${padNumber(parseInt(props.value[0][0], 10), 2)}:${padNumber(parseInt(props.value[0][1], 10), 2)}`;
          end =
            `${padNumber(parseInt(props.value[1][0], 10), 2)}:${padNumber(parseInt(props.value[1][1], 10), 2)}`;
          break;
        case "[object Object]":
          type.value = "object";
          start =
            `${padNumber(parseInt(props.value[0].hour, 10), 2)}:${padNumber(parseInt(props.value[0].minute, 10), 2)}`;
          end =
            `${padNumber(parseInt(props.value[1].hour, 10), 2)}:${padNumber(parseInt(props.value[1].minute, 10), 2)}`;
          break;
        case "[object String]":
          type.value = "string";
          start = props.value[0];
          end = props.value[1];
          break;
        case "[object Undefined]":
          type.value = "string";
          now = parseDate(new Date());
          start = getTime(parseTimestamp(`${getDate(now)} ${getTime(now)}`));
          end = start;
          break;
        default:
          syncing.value = false;
          console.error(`QTimeRangeScroller: value needs to be an array of types (${props.value})`);
          return;
      }

      if (isValidTime(start) && isValidTime(end)) {
        startTime.value = start;
        endTime.value = end;
      } else {
        console.error(`QTimeRangeScroller: invalid start or end times (${start} ${end})`);
      }

      syncing.value = false;
    }

    watch(() => props.value, splitTime);
    watch(startTime, () => {
      if (syncing.value !== true) {
        emitValue();
      }
    });
    watch(endTime, () => {
      if (syncing.value !== true) {
        emitValue();
      }
    });
    watch(rangeIsValid, (value) => {
      if (value === false) {
        emit("invalid-range", { startTime: startTime.value, endTime: endTime.value });
      }
    });

    splitTime();

    function renderStartTime() {
      return h(QTimeScroller, {
        ref: startTimeRef,
        class: [
          "col-6",
          {
            "q-scroller__vertical-bar": props.verticalBar === true,
          },
        ],
        value: startTime.value,
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
        hour12: props.hour12,
        amPmLabels: props.startAmPmLabels,
        minuteInterval: props.startMinuteInterval,
        hourInterval: props.startHourInterval,
        shortTimeLabel: props.startShortTimeLabel,
        disabledHours: props.startDisabledHours,
        disabledMinutes: props.startDisabledMinutes,
        noMinutes: props.startNoMinutes,
        noHours: props.startNoHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          startTime.value = value;
        },
      });
    }

    function renderEndTime() {
      return h(QTimeScroller, {
        ref: endTimeRef,
        class: "col-6",
        value: endTime.value,
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
        hour12: props.hour12,
        amPmLabels: props.endAmPmLabels,
        minuteInterval: props.endMinuteInterval,
        hourInterval: props.endHourInterval,
        shortTimeLabel: props.endShortTimeLabel,
        disabledHours: props.endDisabledHours,
        disabledMinutes: props.endDisabledMinutes,
        noMinutes: props.endNoMinutes,
        noHours: props.endNoHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          endTime.value = value;
        },
      });
    }

    function renderScrollers() {
      return [renderStartTime(), renderEndTime()];
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
