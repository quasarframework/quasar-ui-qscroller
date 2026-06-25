import { validateView } from './views'

/* public properties */
// string scroller has stand-alone properties
export const scrollerProps = {
  /**
   * Current selected value. The emitted shape depends on the active `view`.
   *
   * @category model
   * @applicable All
   * @required true
   * @type String | Array | Object | Date
   * @example v-model="model"
   */
  value: String,
  /**
   * Items to display when using the string scroller.
   *
   * @category content
   * @applicable string
   * @type Array
   * @example :items="items"
   */
  items: Array,
  /**
   * Disables the scroller.
   *
   * @category state
   * @applicable All
   */
  disable: Boolean,
  /**
   * Text color for the header and footer areas.
   *
   * @category style
   * @applicable All
   * @default white
   * @example text-color="blue-8"
   * @example text-color="#ccc"
   * @example text-color="var(--my-text)"
   */
  textColor: {
    type: String,
    default: 'white',
  },
  /**
   * Background color for the header and footer areas.
   *
   * @category style
   * @applicable All
   * @default primary
   * @example color="blue-8"
   * @example color="#ccc"
   * @example color="var(--my-panel)"
   */
  color: {
    type: String,
    default: 'primary',
  },
}

export const commonProps = {
  /**
   * Uses a denser vertical rhythm.
   *
   * @category style
   * @applicable All
   */
  dense: Boolean,
  /**
   * Disables the scroller.
   *
   * @category state
   * @applicable All
   */
  disable: Boolean,
  /**
   * Applies rounded corners to the scroller container.
   *
   * @category style
   * @applicable All
   */
  roundedBorders: Boolean,
  /**
   * Removes the outer border.
   *
   * @category style
   * @applicable All
   */
  noBorder: Boolean,
  /**
   * Hides the header area.
   *
   * @category behavior
   * @applicable All
   */
  noHeader: Boolean,
  /**
   * Hides the footer area.
   *
   * @category behavior
   * @applicable All
   */
  noFooter: Boolean,
  /**
   * Removes the header/footer shadow.
   *
   * @category style
   * @applicable All
   */
  noShadow: Boolean,
  /**
   * Text color used for disabled items.
   *
   * @category style
   * @applicable All
   * @default grey-7
   * @example disabled-text-color="yellow-2"
   * @example disabled-text-color="#dadada"
   * @example disabled-text-color="var(--my-muted-text)"
   */
  disabledTextColor: {
    type: String,
    default: 'grey-7',
  },
  /**
   * Height of each child row in CSS units or pixels.
   *
   * @category style
   * @applicable All
   * @example child-height="32px"
   * @example :child-height="30"
   */
  childHeight: [Number, String],
  /**
   * Prevents string item labels from being transformed to uppercase.
   *
   * @category style
   * @applicable string
   */
  noCaps: Boolean,
}

export const baseProps = {
  /**
   * Current selected value. The accepted and emitted shape depends on the scroller type.
   *
   * @category model
   * @applicable All
   * @required true
   * @type String | Array | Object | Date
   * @example v-model="model"
   */
  value: null, // [Number, String, Object, Array, Date, Function],
  /**
   * Outer border color. Accepts CSS colors, CSS variables, and Quasar brand colors such as `primary`.
   *
   * @category style
   * @applicable All
   * @default #ccc
   * @example border-color="primary"
   * @example border-color="#ccc"
   * @example border-color="var(--my-border)"
   */
  borderColor: {
    type: String,
    default: '#ccc',
  },
  /**
   * Color of the selected middle bars. Accepts CSS colors, CSS variables, and Quasar brand colors such as `primary`.
   *
   * @category style
   * @applicable All
   * @default #ccc
   * @example bar-color="primary"
   * @example bar-color="#ccc"
   * @example bar-color="var(--my-border)"
   */
  barColor: {
    type: String,
    default: '#ccc',
  },
  /**
   * Text color for the header and footer areas.
   *
   * @category style
   * @applicable All
   * @default white
   * @example text-color="blue-8"
   * @example text-color="#ccc"
   * @example text-color="var(--my-text)"
   */
  textColor: {
    type: String,
    default: 'white',
  },
  /**
   * Background color for the header and footer areas.
   *
   * @category style
   * @applicable All
   * @default primary
   * @example color="blue-8"
   * @example color="#ccc"
   * @example color="var(--my-panel)"
   */
  color: {
    type: String,
    default: 'primary',
  },
  /**
   * Text color for the inner scroller area.
   *
   * @category style
   * @applicable string, time, date, date-time
   * @default primary
   * @example inner-text-color="blue-8"
   * @example inner-text-color="#ccc"
   * @example inner-text-color="var(--my-text)"
   */
  innerTextColor: {
    type: String,
    default: 'primary',
  },
  /**
   * Background color for the inner scroller area.
   *
   * @category style
   * @applicable string, time, date, date-time
   * @default white
   * @example inner-color="blue-8"
   * @example inner-color="#ccc"
   * @example inner-color="var(--my-panel)"
   */
  innerColor: {
    type: String,
    default: 'white',
  },
}

export const localeProps = {
  /**
   * Locale used for generated date labels.
   *
   * @category state
   * @applicable date, date-range, date-time
   * @default en-us
   * @example locale="ca"
   */
  locale: {
    type: String,
    default: 'en-us',
  },
}

export const viewProps = {
  /**
   * Determines which scroller view the generic QScroller wrapper renders.
   *
   * @category behavior
   * @applicable string, time, date, time-range, date-range, date-time
   * @required true
   * @values string | time | date | time-range | date-range | date-time
   * @default string
   * @example view="string"
   * @example view="time-range"
   * @example view="date-time"
   */
  view: {
    type: String,
    default: 'string',
    validator: validateView,
  },
}

export const verticalBarProps = {
  /**
   * Shows a vertical selected-value bar.
   *
   * @category style
   * @applicable All
   */
  verticalBar: Boolean,
}

export const dateProps = {
  /**
   * Explicit date values to display.
   *
   * @category content
   * @applicable date, date-time
   */
  dates: Array,
  /**
   * Date values that should be disabled.
   *
   * @category content
   * @applicable date, date-time
   */
  disabledDates: Array,
  /**
   * Years that should be disabled.
   *
   * @category content
   * @applicable date, date-time
   * @tsType NumberArray
   * @example :disabled-years="[2015, 2016, 2017, 2018, 2019]"
   */
  disabledYears: {
    type: Array,
    default: () => [],
  },
  /**
   * Months that should be disabled.
   *
   * @category content
   * @applicable date, date-time
   * @tsType NumberArray
   * @example :disabled-months="[10, 11, 12]"
   */
  disabledMonths: {
    type: Array,
    default: () => [],
  },
  /**
   * Days that should be disabled.
   *
   * @category content
   * @applicable date, date-time
   * @tsType NumberArray
   * @example :disabled-days="[1, 2, 3]"
   */
  disabledDays: {
    type: Array,
    default: () => [],
  },
  /**
   * Uses short year labels.
   *
   * @category content
   * @applicable date, date-time
   */
  shortYearLabel: Boolean,
  /**
   * Uses short month labels.
   *
   * @category content
   * @applicable date, date-time
   */
  shortMonthLabel: Boolean,
  /**
   * Uses short day labels.
   *
   * @category content
   * @applicable date, date-time
   */
  shortDayLabel: Boolean,
  /**
   * Shows month labels in the date scroller.
   *
   * @category content
   * @applicable date, date-time
   */
  showMonthLabel: Boolean,
  /**
   * Shows weekday labels in the date scroller.
   *
   * @category content
   * @applicable date, date-time
   */
  showWeekdayLabel: Boolean,
  /**
   * Hides the days section.
   *
   * @category content
   * @applicable date, date-time
   */
  noDays: Boolean,
  /**
   * Hides the months section.
   *
   * @category content
   * @applicable date, date-time
   */
  noMonths: Boolean,
  /**
   * Hides the years section.
   *
   * @category content
   * @applicable date, date-time
   */
  noYears: Boolean,
  /**
   * Starting year to display.
   *
   * @category content
   * @applicable date, date-time
   * @default 5 years before current year
   * @example year-begin="2000"
   */
  yearBegin: [Number, String],
  /**
   * Ending year to display.
   *
   * @category content
   * @applicable date, date-time
   * @default 5 years after current year
   * @example year-stop="2025"
   */
  yearStop: [Number, String],
}

export const timeProps = {
  /**
   * Minute interval to display.
   *
   * @category content
   * @applicable time, date-time
   * @default 1
   * @example :minute-interval="2"
   */
  minuteInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Hour interval to display.
   *
   * @category content
   * @applicable time, date-time
   * @default 1
   * @example :hour-interval="2"
   */
  hourInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Uses shorter time labels.
   *
   * @category content
   * @applicable time, date-time
   */
  shortTimeLabel: Boolean,
  /**
   * Hours that should be disabled.
   *
   * @category content
   * @applicable time, date-time
   * @tsType NumberArray
   * @example :disabled-hours="[17, 18, 19, 20, 21, 22, 23]"
   */
  disabledHours: {
    type: Array,
    default: () => [],
  },
  /**
   * Minutes that should be disabled.
   *
   * @category content
   * @applicable time, date-time
   * @tsType NumberArray
   * @example :disabled-minutes="[0, 1, 2, 3, 4, 5]"
   */
  disabledMinutes: {
    type: Array,
    default: () => [],
  },
  /**
   * Hides the minutes section.
   *
   * @category content
   * @applicable time, date-time
   */
  noMinutes: Boolean,
  /**
   * Hides the hours section.
   *
   * @category content
   * @applicable time, date-time
   */
  noHours: Boolean,
}

export const timeRangeProps = {
  /**
   * Separator used when displaying a range value.
   *
   * @category style
   * @applicable time-range, date-range
   * @default ' - '
   * @example display-separator=" : "
   * @example display-separator=" & "
   */
  displaySeparator: {
    type: String,
    default: ' - ',
  },
  /**
   * Disables range checking validation, allowing the end value to be less than the start value.
   *
   * @category behavior
   * @applicable time-range, date-range
   * @since v1.0.0
   */
  disableValidation: Boolean,
  /**
   * Background color used when the end section is less than the start section.
   *
   * @category style
   * @applicable time-range, date-range
   * @default red-1
   * @example error-color="blue-8"
   * @example error-color="#ccc"
   * @example error-color="var(--my-error)"
   */
  errorColor: {
    type: String,
    default: 'red-1',
  },
  /**
   * Text color used when the end section is less than the start section.
   *
   * @category style
   * @applicable time-range, date-range
   * @default red-10
   * @example error-text-color="blue-8"
   * @example error-text-color="#ccc"
   * @example error-text-color="var(--my-error-text)"
   */
  errorTextColor: {
    type: String,
    default: 'red-10',
  },
  // --------------------------------
  // start time
  // --------------------------------
  /**
   * Minute interval for the start time scroller.
   *
   * @category content
   * @applicable time-range
   * @default 1
   * @example :start-minute-interval="2"
   */
  startMinuteInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Hour interval for the start time scroller.
   *
   * @category content
   * @applicable time-range
   * @default 1
   * @example :start-hour-interval="2"
   */
  startHourInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Uses shorter start time labels.
   *
   * @category content
   * @applicable time-range
   */
  startShortTimeLabel: Boolean,
  /**
   * Start hours that should be disabled.
   *
   * @category content
   * @applicable time-range
   * @tsType NumberArray
   * @example :start-disabled-hours="[17, 18, 19, 20, 21, 22, 23]"
   */
  startDisabledHours: {
    type: Array,
    default: () => [],
  },
  /**
   * Start minutes that should be disabled.
   *
   * @category content
   * @applicable time-range
   * @tsType NumberArray
   * @example :start-disabled-minutes="[0, 1, 2, 3, 4, 5]"
   */
  startDisabledMinutes: {
    type: Array,
    default: () => [],
  },
  /**
   * Hides the start minutes section.
   *
   * @category content
   * @applicable time-range
   */
  startNoMinutes: Boolean,
  /**
   * Hides the start hours section.
   *
   * @category content
   * @applicable time-range
   */
  startNoHours: Boolean,
  /**
   * Labels for start AM/PM values.
   *
   * @category content
   * @applicable time-range
   * @tsType StringArray
   * @default ['AM', 'PM']
   * @example :start-am-pm-labels="['a', 'p']"
   */
  startAmPmLabels: {
    type: Array,
    default: () => ['AM', 'PM'],
    validator: (v) =>
      Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'string',
  },

  // --------------------------------
  // end time
  // --------------------------------
  /**
   * Minute interval for the end time scroller.
   *
   * @category content
   * @applicable time-range
   * @default 1
   * @example :end-minute-interval="2"
   */
  endMinuteInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Hour interval for the end time scroller.
   *
   * @category content
   * @applicable time-range
   * @default 1
   * @example :end-hour-interval="2"
   */
  endHourInterval: {
    type: [String, Number],
    default: 1,
  },
  /**
   * Uses shorter end time labels.
   *
   * @category content
   * @applicable time-range
   */
  endShortTimeLabel: Boolean,
  /**
   * End hours that should be disabled.
   *
   * @category content
   * @applicable time-range
   * @tsType NumberArray
   * @example :end-disabled-hours="[17, 18, 19, 20, 21, 22, 23]"
   */
  endDisabledHours: {
    type: Array,
    default: () => [],
  },
  /**
   * End minutes that should be disabled.
   *
   * @category content
   * @applicable time-range
   * @tsType NumberArray
   * @example :end-disabled-minutes="[0, 1, 2, 3, 4, 5]"
   */
  endDisabledMinutes: {
    type: Array,
    default: () => [],
  },
  /**
   * Hides the end minutes section.
   *
   * @category content
   * @applicable time-range
   */
  endNoMinutes: Boolean,
  /**
   * Hides the end hours section.
   *
   * @category content
   * @applicable time-range
   */
  endNoHours: Boolean,
  /**
   * Labels for end AM/PM values.
   *
   * @category content
   * @applicable time-range
   * @tsType StringArray
   * @default ['AM', 'PM']
   * @example :end-am-pm-labels="['a', 'p']"
   */
  endAmPmLabels: {
    type: Array,
    default: () => ['AM', 'PM'],
    validator: (v) =>
      Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'string',
  },
}

export const dateRangeProps = {
  /**
   * Separator used when displaying a range value.
   *
   * @category style
   * @applicable time-range, date-range
   * @default ' - '
   * @example display-separator=" : "
   * @example display-separator=" & "
   */
  displaySeparator: {
    type: String,
    default: ' - ',
  },
  /**
   * Disables range checking validation, allowing the end value to be less than the start value.
   *
   * @category behavior
   * @applicable time-range, date-range
   * @since v1.0.0
   */
  disableValidation: Boolean,
  /**
   * Background color used when the end section is less than the start section.
   *
   * @category style
   * @applicable time-range, date-range
   * @default red-1
   * @example error-color="blue-8"
   * @example error-color="#ccc"
   * @example error-color="var(--my-error)"
   */
  errorColor: {
    type: String,
    default: 'red-1',
  },
  /**
   * Text color used when the end section is less than the start section.
   *
   * @category style
   * @applicable time-range, date-range
   * @default red-10
   * @example error-text-color="blue-8"
   * @example error-text-color="#ccc"
   * @example error-text-color="var(--my-error-text)"
   */
  errorTextColor: {
    type: String,
    default: 'red-10',
  },
  // --------------------------------
  // start date
  // --------------------------------
  /**
   * Start years that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :start-disabled-years="[2015, 2016, 2017, 2018, 2019]"
   */
  startDisabledYears: {
    type: Array,
    default: () => [],
  },
  /**
   * Start months that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :start-disabled-months="[10, 11, 12]"
   */
  startDisabledMonths: {
    type: Array,
    default: () => [],
  },
  /**
   * Start days that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :start-disabled-days="[1, 2, 3]"
   */
  startDisabledDays: {
    type: Array,
    default: () => [],
  },
  /**
   * Uses short start year labels.
   *
   * @category content
   * @applicable date-range
   */
  startShortYearLabel: Boolean,
  /**
   * Uses short start month labels.
   *
   * @category content
   * @applicable date-range
   */
  startShortMonthLabel: Boolean,
  /**
   * Uses short start day labels.
   *
   * @category content
   * @applicable date-range
   */
  startShortDayLabel: Boolean,
  /**
   * Shows start month labels.
   *
   * @category content
   * @applicable date-range
   */
  startShowMonthLabel: Boolean,
  /**
   * Shows start weekday labels.
   *
   * @category content
   * @applicable date-range
   */
  startShowWeekdayLabel: Boolean,
  /**
   * Hides the start days section.
   *
   * @category content
   * @applicable date-range
   */
  startNoDays: Boolean,
  /**
   * Hides the start months section.
   *
   * @category content
   * @applicable date-range
   */
  startNoMonths: Boolean,
  /**
   * Hides the start years section.
   *
   * @category content
   * @applicable date-range
   */
  startNoYears: Boolean,
  /**
   * Starting year for the start date section.
   *
   * @category content
   * @applicable date-range
   * @default 5 years before current year
   * @example start-year-begin="2000"
   */
  startYearBegin: [Number, String],
  /**
   * Ending year for the start date section.
   *
   * @category content
   * @applicable date-range
   * @default 5 years after current year
   * @example start-year-stop="2025"
   */
  startYearStop: [Number, String],
  // --------------------------------
  // end date
  // --------------------------------
  /**
   * End years that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :end-disabled-years="[2015, 2016, 2017, 2018, 2019]"
   */
  endDisabledYears: {
    type: Array,
    default: () => [],
  },
  /**
   * End months that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :end-disabled-months="[10, 11, 12]"
   */
  endDisabledMonths: {
    type: Array,
    default: () => [],
  },
  /**
   * End days that should be disabled.
   *
   * @category content
   * @applicable date-range
   * @tsType NumberArray
   * @example :end-disabled-days="[1, 2, 3]"
   */
  endDisabledDays: {
    type: Array,
    default: () => [],
  },
  /**
   * Uses short end year labels.
   *
   * @category content
   * @applicable date-range
   */
  endShortYearLabel: Boolean,
  /**
   * Uses short end month labels.
   *
   * @category content
   * @applicable date-range
   */
  endShortMonthLabel: Boolean,
  /**
   * Uses short end day labels.
   *
   * @category content
   * @applicable date-range
   */
  endShortDayLabel: Boolean,
  /**
   * Shows end month labels.
   *
   * @category content
   * @applicable date-range
   */
  endShowMonthLabel: Boolean,
  /**
   * Shows end weekday labels.
   *
   * @category content
   * @applicable date-range
   */
  endShowWeekdayLabel: Boolean,
  /**
   * Hides the end days section.
   *
   * @category content
   * @applicable date-range
   */
  endNoDays: Boolean,
  /**
   * Hides the end months section.
   *
   * @category content
   * @applicable date-range
   */
  endNoMonths: Boolean,
  /**
   * Hides the end years section.
   *
   * @category content
   * @applicable date-range
   */
  endNoYears: Boolean,
  /**
   * Starting year for the end date section.
   *
   * @category content
   * @applicable date-range
   * @default 5 years before current year
   * @example end-year-begin="2000"
   */
  endYearBegin: [Number, String],
  /**
   * Ending year for the end date section.
   *
   * @category content
   * @applicable date-range
   * @default 5 years after current year
   * @example end-year-stop="2025"
   */
  endYearStop: [Number, String],
}

export default {
  base: baseProps,
  common: commonProps,
  date: dateProps,
  dateRange: dateRangeProps,
  locale: localeProps,
  scroller: scrollerProps,
  time: timeProps,
  timeRange: timeRangeProps,
  verticalBar: verticalBarProps,
  view: viewProps,
}
