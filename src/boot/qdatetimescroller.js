// import QDateTimeScroller from '@quasar/quasar-app-extension-qdatetimescroller/src/component/QDateTimeScroller'
import QScroller from '@quasar/quasar-app-extension-qdatetimescroller/src/component/QScroller'
import QTimeScroller from '@quasar/quasar-app-extension-qdatetimescroller/src/component/QTimeScroller'
import QDateScroller from '@quasar/quasar-app-extension-qdatetimescroller/src/component/QDateScroller'

export default ({ Vue }) => {
  // Vue.component('q-date-time-scroller', QDateTimeScroller)
  Vue.component('q-scroller', QScroller)
  Vue.component('q-time-scroller', QTimeScroller)
  Vue.component('q-date-scroller', QDateScroller)
}
