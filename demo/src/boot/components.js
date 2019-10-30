import StringBasic from '../examples/string/Basic'
import StringColors from '../examples/string/Colors'
import StringQInput from '../examples/string/QInput'
import StringDisabled from '../examples/string/Disabled'

import TimeBasic from '../examples/time/Basic'
import TimeColors from '../examples/time/Colors'
import TimeQInput from '../examples/time/QInput'
import TimeDisabled from '../examples/time/Disabled'
import TimeIntervals from '../examples/time/Intervals'
import Time12Hour from '../examples/time/12Hour'
import TimeTypes from '../examples/time/Types'
import TimeSlots from '../examples/time/Slots'

import TimeRangeBasic from '../examples/time-range/Basic'
import TimeRangeColors from '../examples/time-range/Colors'
import TimeRangeQInput from '../examples/time-range/QInput'
import TimeRangeDisabled from '../examples/time-range/Disabled'
import TimeRangeIntervals from '../examples/time-range/Intervals'
import TimeRange12Hour from '../examples/time-range/12Hour'
import TimeRangeTypes from '../examples/time-range/Types'
import TimeRangeSlots from '../examples/time-range/Slots'

import DateBasic from '../examples/date/Basic'
import DateColors from '../examples/date/Colors'
import DateQInput from '../examples/date/QInput'
import DateDisabled from '../examples/date/Disabled'
import DateIntervals from '../examples/date/Intervals'
import DateTypes from '../examples/date/Types'
import DateLocale from '../examples/date/Locale'
import DateSlots from '../examples/date/Slots'

import DateRangeBasic from '../examples/date-range/Basic'
import DateRangeColors from '../examples/date-range/Colors'
import DateRangeQInput from '../examples/date-range/QInput'
import DateRangeDisabled from '../examples/date-range/Disabled'
import DateRangeIntervals from '../examples/date-range/Intervals'
import DateRangeTypes from '../examples/date-range/Types'
import DateRangeLocale from '../examples/date-range/Locale'
import DateRangeSlots from '../examples/date-range/Slots'

import DateTimeBasic from '../examples/date-time/Basic'
import DateTimeColors from '../examples/date-time/Colors'
import DateTimeQInput from '../examples/date-time/QInput'
import DateTimeDisabled from '../examples/date-time/Disabled'
import DateTimeIntervals from '../examples/date-time/Intervals'
import DateTimeTypes from '../examples/date-time/Types'
import DateTimeLocale from '../examples/date-time/Locale'
import DateTimeSlots from '../examples/date-time/Slots'

export default ({ Vue }) => {
  Vue.component('StringBasic', StringBasic)
  Vue.component('StringColors', StringColors)
  Vue.component('StringQInput', StringQInput)
  Vue.component('StringDisabled', StringDisabled)

  Vue.component('TimeBasic', TimeBasic)
  Vue.component('TimeColors', TimeColors)
  Vue.component('TimeQInput', TimeQInput)
  Vue.component('TimeDisabled', TimeDisabled)
  Vue.component('TimeIntervals', TimeIntervals)
  Vue.component('Time12Hour', Time12Hour)
  Vue.component('TimeTypes', TimeTypes)
  Vue.component('TimeSlots', TimeSlots)

  Vue.component('TimeRangeBasic', TimeRangeBasic)
  Vue.component('TimeRangeColors', TimeRangeColors)
  Vue.component('TimeRangeQInput', TimeRangeQInput)
  Vue.component('TimeRangeDisabled', TimeRangeDisabled)
  Vue.component('TimeRangeIntervals', TimeRangeIntervals)
  Vue.component('TimeRange12Hour', TimeRange12Hour)
  Vue.component('TimeRangeTypes', TimeRangeTypes)
  Vue.component('TimeRangeSlots', TimeRangeSlots)

  Vue.component('DateBasic', DateBasic)
  Vue.component('DateColors', DateColors)
  Vue.component('DateQInput', DateQInput)
  Vue.component('DateDisabled', DateDisabled)
  Vue.component('DateIntervals', DateIntervals)
  Vue.component('DateTypes', DateTypes)
  Vue.component('DateLocale', DateLocale)
  Vue.component('DateSlots', DateSlots)

  Vue.component('DateRangeBasic', DateRangeBasic)
  Vue.component('DateRangeColors', DateRangeColors)
  Vue.component('DateRangeQInput', DateRangeQInput)
  Vue.component('DateRangeDisabled', DateRangeDisabled)
  Vue.component('DateRangeIntervals', DateRangeIntervals)
  Vue.component('DateRangeTypes', DateRangeTypes)
  Vue.component('DateRangeLocale', DateRangeLocale)
  Vue.component('DateRangeSlots', DateRangeSlots)

  Vue.component('DateTimeBasic', DateTimeBasic)
  Vue.component('DateTimeColors', DateTimeColors)
  Vue.component('DateTimeQInput', DateTimeQInput)
  Vue.component('DateTimeDisabled', DateTimeDisabled)
  Vue.component('DateTimeIntervals', DateTimeIntervals)
  Vue.component('DateTimeTypes', DateTimeTypes)
  Vue.component('DateTimeLocale', DateTimeLocale)
  Vue.component('DateTimeSlots', DateTimeSlots)
}
