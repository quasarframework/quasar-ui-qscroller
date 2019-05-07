// import QDateTimeScroller from '@quasar/quasar-app-extension-qdatetimescroller/src/component/QDateTimeScroller'
import QScroller from '@quasar/quasar-app-extension-qscroller/src/component/QScroller'
import QTimeScroller from '@quasar/quasar-app-extension-qscroller/src/component/QTimeScroller'
import QTimeRangeScroller from '@quasar/quasar-app-extension-qscroller/src/component/QTimeRangeScroller'
import QDateScroller from '@quasar/quasar-app-extension-qscroller/src/component/QDateScroller'
import QDateRangeScroller from '@quasar/quasar-app-extension-qscroller/src/component/QDateRangeScroller'
import QDateTimeScroller from '@quasar/quasar-app-extension-qscroller/src/component/QDateTimeScroller'

export default ({ Vue }) => {
  // Vue.component('q-date-time-scroller', QDateTimeScroller)
  Vue.component('q-scroller', QScroller)
  Vue.component('q-time-scroller', QTimeScroller)
  Vue.component('q-time-range-scroller', QTimeRangeScroller)
  Vue.component('q-date-scroller', QDateScroller)
  Vue.component('q-date-range-scroller', QDateRangeScroller)
  Vue.component('q-date-time-scroller', QDateTimeScroller)
}
