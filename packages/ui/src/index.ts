import type { App, Component } from 'vue'

import QDateRangeScroller from './components/QDateRangeScroller'
import QDateScroller from './components/QDateScroller'
import QDateTimeScroller from './components/QDateTimeScroller'
import QScroller from './components/QScroller'
import QStringScroller from './components/QStringScroller'
import QTimeRangeScroller from './components/QTimeRangeScroller'
import QTimeScroller from './components/QTimeScroller'
import { version } from './version'

const components = [
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
] as Component[]

function install(app: App): void {
  components.forEach((component) => {
    app.component(String(component.name), component)
  })
}

export {
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
  install,
  version,
}

export default {
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
  install,
  version,
}
