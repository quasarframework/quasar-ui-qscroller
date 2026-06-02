import { computed, defineComponent, h, ref, watch } from "vue";
import { useScrollerShell } from "../composables/use-scroller-shell";
import QDateScroller from "./QDateScroller";
import QTimeScroller from "./QTimeScroller";
import props from "../utils/props";
import {
  Timestamp,
  parseTimestamp,
  parseDate,
  getDateObject,
  getDate,
  getTime,
  copyTimestamp,
  compareTimestamps,
  padNumber,
} from "../utils/Timestamp";

export default defineComponent({
  name: "QDateTimeScroller",

  props: {
    ...props.common,
    ...props.base,
    ...props.time,
    ...props.date,
    ...props.verticalBar,
    ...props.locale,
    hour12: Boolean,
    amPmLabels: {
      type: Array,
      default: () => ["AM", "PM"],
      validator: (value) =>
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === "string" &&
        typeof value[1] === "string",
    },
  },

  emits: ["close", "input"],

  setup(props, { emit, expose, slots }) {
    const { bodyHeight, renderCommon } = useScrollerShell(props);
    const dateRef = ref<{ displayDate?: string; getTimestamp: () => unknown } | null>(null);
    const timeRef = ref<{ displayTime?: string; getTimestamp: () => unknown } | null>(null);
    const timestamp = ref(copyTimestamp(Timestamp));
    const type = ref<string | null>(null);
    const date = ref("");
    const time = ref("");
    const syncing = ref(false);

    const slotData = computed(() => ({ value: timestamp.value }));
    const displayed = computed(() => displayDateTime.value);

    const displayDateTime = computed(() => {
      if (props.locale === "") return "";
      if (date.value !== "" && time.value !== "") {
        if (dateRef.value?.displayDate && timeRef.value?.displayTime) {
          return `${dateRef.value.displayDate} ${timeRef.value.displayTime}`;
        }
        return `${date.value} ${time.value}`;
      }
      return "";
    });

    function emitValue() {
      switch (type.value) {
        case "date":
          emit("input", getDateObject(timestamp.value));
          return;
        case "array":
          emit("input", [
            padNumber(timestamp.value.year, 2),
            padNumber(timestamp.value.month, 2),
            padNumber(timestamp.value.day, 2),
            padNumber(timestamp.value.hour, 2),
            padNumber(timestamp.value.minute, 2),
          ]);
          return;
        case "object":
          emit("input", {
            year: padNumber(timestamp.value.year, 2),
            month: padNumber(timestamp.value.month, 2),
            day: padNumber(timestamp.value.day, 2),
            hour: padNumber(timestamp.value.hour, 2),
            minute: padNumber(timestamp.value.minute, 2),
          });
          return;
        case "string":
          emit(
            "input",
            [
              padNumber(timestamp.value.year, 2),
              padNumber(timestamp.value.month, 2),
              padNumber(timestamp.value.day, 2),
            ].join("-") +
              " " +
              [padNumber(timestamp.value.hour, 2), padNumber(timestamp.value.minute, 2)].join(":"),
          );
      }
    }

    function fromTimestamp() {
      date.value = getDate(timestamp.value);
      time.value = getTime(timestamp.value);
    }

    function splitDateTime() {
      syncing.value = true;

      const valueType = Object.prototype.toString.call(props.value);
      let now;
      let value;

      switch (valueType) {
        case "[object Date]":
          type.value = "date";
          now = parseDate(props.value);
          value = `${getDate(now)} ${getTime(now)}`;
          timestamp.value = parseTimestamp(value);
          fromTimestamp();
          syncing.value = false;
          return;
        case "[object Array]":
          type.value = "array";
          now = parseDate(new Date());
          now.year = parseInt(props.value[0], 10);
          now.month = parseInt(props.value[1], 10);
          now.day = parseInt(props.value[2], 10);
          now.hour = parseInt(props.value[3], 10);
          now.minute = parseInt(props.value[4], 10);
          value = `${getDate(now)} ${getTime(now)}`;
          timestamp.value = parseTimestamp(value);
          fromTimestamp();
          syncing.value = false;
          return;
        case "[object Object]":
          type.value = "object";
          now = parseDate(new Date());
          now.year = parseInt(props.value.year, 10);
          now.month = parseInt(props.value.month, 10);
          now.day = parseInt(props.value.day, 10);
          now.hour = parseInt(props.value.hour, 10);
          now.minute = parseInt(props.value.minute, 10);
          value = `${getDate(now)} ${getTime(now)}`;
          timestamp.value = parseTimestamp(value);
          fromTimestamp();
          syncing.value = false;
          return;
        case "[object String]":
          type.value = "string";
          now = parseDate(new Date());
          if (props.value) {
            const parsed = parseTimestamp(props.value);
            if (parsed.year !== void 0) now.year = parsed.year;
            if (parsed.month !== void 0) now.month = parsed.month;
            if (parsed.day !== void 0) now.day = parsed.day;
            if (parsed.hour !== void 0) now.hour = parsed.hour;
            if (parsed.minute !== void 0) now.minute = parsed.minute;
          }
          value = `${getDate(now)} ${getTime(now)}`;
          timestamp.value = parseTimestamp(value);
          fromTimestamp();
          syncing.value = false;
          return;
      }

      syncing.value = false;

      if (props.value !== "") {
        console.error(`QDateTimeScroller: invalid time format - '${props.value}'`);
      }
    }

    watch(() => props.value, splitDateTime);

    watch(date, () => {
      if (syncing.value === true) {
        return;
      }

      const previous = copyTimestamp(timestamp.value);
      timestamp.value = parseTimestamp(`${date.value} ${time.value}`);
      if (compareTimestamps(previous, timestamp.value) !== true) {
        emitValue();
      }
    });

    watch(time, () => {
      if (syncing.value === true) {
        return;
      }

      const previous = copyTimestamp(timestamp.value);
      timestamp.value = parseTimestamp(`${date.value} ${time.value}`);
      if (compareTimestamps(previous, timestamp.value) !== true) {
        emitValue();
      }
    });

    splitDateTime();

    expose({
      displayDateTime,
      getTimestamp: () => timestamp.value,
    });

    function renderDate() {
      return h(QDateScroller, {
        ref: dateRef,
        class: [
          props.hour12 === true ? "col-7" : "col-8",
          {
            "q-scroller__vertical-bar": props.verticalBar === true,
          },
        ],
        value: date.value,
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
        disabledYears: props.disabledYears,
        disabledMonths: props.disabledMonths,
        disabledDays: props.disabledDays,
        shortYearLabel: props.shortYearLabel,
        shortMonthLabel: props.shortMonthLabel,
        shortDayLabel: props.shortDayLabel,
        showMonthLabel: props.showMonthLabel,
        showWeekdayLabel: props.showWeekdayLabel,
        noDays: props.noDays,
        noMonths: props.noMonths,
        noYears: props.noYears,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          date.value = value;
        },
      });
    }

    function renderTime() {
      return h(QTimeScroller, {
        ref: timeRef,
        class: props.hour12 === true ? "col-5" : "col-4",
        value: time.value,
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
        amPmLabels: props.amPmLabels,
        minuteInterval: props.minuteInterval,
        hourInterval: props.hourInterval,
        shortTimeLabel: props.shortTimeLabel,
        disabledHours: props.disabledHours,
        disabledMinutes: props.disabledMinutes,
        noMinutes: props.noMinutes,
        noHours: props.noHours,
        childHeight: bodyHeight.value,
        onInput: (value) => {
          time.value = value;
        },
      });
    }

    function renderScrollers() {
      return [renderDate(), renderTime()];
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
