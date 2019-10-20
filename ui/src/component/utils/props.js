import { validateView } from './views'

/* public properties */
export default {
  // string scroller has stand-alone properties
  scroller: {
    value: String,
    items: Array,
    disabledItems: Array,
    disable: Boolean,
    textColor: {
      type: String,
      default: 'white'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  common: {
    dense: Boolean,
    disable: Boolean,
    roundedBorders: Boolean,
    noBorder: Boolean,
    noHeader: Boolean,
    noFooter: Boolean,
    noShadow: Boolean,
    disabledTextColor: {
      type: String,
      default: 'grey-7'
    },
  },
  base: {
    value: [String, Array],
    borderColor: {
      type: String,
      default: '#ccc'
    },
    barColor: {
      type: String,
      default: '#ccc'
    },
    textColor: {
      type: String,
      default: 'white'
    },
    color: {
      type: String,
      default: 'primary'
    },
    innerTextColor: {
      type: String,
      default: 'primary'
    },
    innerColor: {
      type: String,
      default: 'white'
    }
  },
  locale: {
    locale: {
      type: String,
      default: 'en-us'
    }
  },
  view: {
    view: {
      type: String,
      default: 'string',
      validator: validateView
    }
  },
  verticalBar: {
    showVerticalBar: Boolean
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
    noMonths: Boolean,
    noYears: Boolean
  },
  time: {
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
    // show only these hours
    hours: Array,
    // TODO
    // show only these minutes
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
    displaySeparator: {
      type: String,
      default: ' - '
    },
    // --------------------------------
    // start time
    // --------------------------------
    startMinuteInterval: {
      type: [String, Number],
      default: 1
    },
    // TODO
    startHourInterval: {
      type: [String, Number],
      default: 1
    },
    startShortTimeLabel: Boolean,
    startDisabledHours: {
      type: Array,
      default: () => []
    },
    startDisabledMinutes: {
      type: Array,
      default: () => []
    },
    startNoMinutes: Boolean,
    startNoHours: Boolean,
    // TODO
    // show only these hours
    startHours: Array,
    // TODO
    // show only these minutes
    startMinutes: Array,
    // TODO
    // any time before this time will be disabled
    startMinTime: {
      type: String,
      default: '00:00'
    },
    // TODO
    // any time after this time will be disabled
    startMaxTime: {
      type: String,
      default: '24:00'
    },
    // --------------------------------
    // end time
    // --------------------------------
    endMinuteInterval: {
      type: [String, Number],
      default: 1
    },
    // TODO
    endHourInterval: {
      type: [String, Number],
      default: 1
    },
    endShortTimeLabel: Boolean,
    endDisabledHours: {
      type: Array,
      default: () => []
    },
    endDisabledMinutes: {
      type: Array,
      default: () => []
    },
    endNoMinutes: Boolean,
    endNoHours: Boolean,
    // TODO
    // show only these hours
    endHours: Array,
    // TODO
    // show only these minutes
    endMinutes: Array,
    // TODO
    // any time before this time will be disabled
    endMinTime: {
      type: String,
      default: '00:00'
    },
    // TODO
    // any time after this time will be disabled
    endMaxTime: {
      type: String,
      default: '24:00'
    }
  },
  dateRange: {
    displaySeparator: {
      type: String,
      default: ' - '
    },
    // --------------------------------
    // start date
    // --------------------------------
    startMinDate: String,
    startMaxDate: String,
    startDates: Array,
    startDisabledDates: Array,
    startDisabledYears: {
      type: Array,
      default: () => []
    },
    startDisabledMonths: {
      type: Array,
      default: () => []
    },
    startDisabledDays: {
      type: Array,
      default: () => []
    },
    startShortYearLabel: Boolean,
    startShortMonthLabel: Boolean,
    startShortDayLabel: Boolean,
    startShowMonthLabel: Boolean,
    startShowWeekdayLabel: Boolean,
    startNoDays: Boolean,
    startNoMonth: Boolean,
    startNoYears: Boolean,
    // --------------------------------
    // end date
    // --------------------------------
    endMinDate: String,
    endMaxDate: String,
    endDates: Array,
    endDisabledDates: Array,
    endDisabledYears: {
      type: Array,
      default: () => []
    },
    endDisabledMonths: {
      type: Array,
      default: () => []
    },
    endDisabledDays: {
      type: Array,
      default: () => []
    },
    endShortYearLabel: Boolean,
    endShortMonthLabel: Boolean,
    endShortDayLabel: Boolean,
    endShowMonthLabel: Boolean,
    endShowWeekdayLabel: Boolean,
    endNoDays: Boolean,
    endNoMonth: Boolean,
    endNoYears: Boolean
  }
}
