/* public properties */
export default {
  // scroller has stand-alone properties
  scroller: {
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    height: {
      type: [Number, String],
      required: true
    },
    disabledItems: Array,
    disable: Boolean
  },
  base: {
    value: [String, Array],
    barColor: {
      type: String,
      default: '#ccc'
    },
    color: {
      type: String,
      default: 'white'
    },
    backgroundColor: {
      type: String,
      default: 'primary'
    },
    innerColor: {
      type: String,
      default: 'primary'
    },
    innerBackgroundColor: {
      type: String,
      default: 'white'
    },
    disable: Boolean,
    roundedBorders: Boolean,
    noBorder: Boolean,
    noHeader: Boolean,
    noFooter: Boolean,
    noShadow: Boolean
  },
  dateTimeBase: {
    locale: {
      type: String,
      default: 'en-us'
    }
  },
  date: {
    minDate: String,
    maxDate: String,
    dates: Array,
    disabledDates: Array,
    disabledYears: {
      type: Array,
      default: () => []
    },
    disabledMonths: {
      type: Array,
      default: () => []
    },
    disabledDays: {
      type: Array,
      default: () => []
    },
    shortYearLabel: Boolean,
    shortMonthLabel: Boolean,
    shortDayLabel: Boolean,
    showMonthLabel: Boolean,
    showWeekdayLabel: Boolean,
    noDays: Boolean,
    noMonth: Boolean,
    noYears: Boolean
  },
  time: {
    hour24Format: {
      type: Boolean,
      default: true
    },
    amPmLabels: {
      type: Array,
      default: () => ['AM', 'PM'],
      validator: v => Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'string'
    },
    minuteInterval: {
      type: [String, Number],
      default: 1
    },
    // TODO
    hourInterval: {
      type: [String, Number],
      default: 1
    },
    shortTimeLabel: Boolean,
    disabledHours: {
      type: Array,
      default: () => []
    },
    disabledMinutes: {
      type: Array,
      default: () => []
    },
    noMinutes: Boolean,
    noHours: Boolean,
    // TODO
    hours: Array,
    // TODO
    minutes: Array,
    // TODO
    // any time before this time will be disabled
    minTime: {
      type: String,
      default: '00:00'
    },
    // TODO
    // any time after this time will be disabled
    maxTime: {
      type: String,
      default: '24:00'
    }
  },
  timeRange: {

  }
}
