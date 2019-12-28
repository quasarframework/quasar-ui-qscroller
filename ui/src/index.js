import { version } from '../package.json'
import QScroller from './components/QScroller'

export {
  version,
  QScroller
}

export default {
  version,
  QScroller,

  install (Vue) {
    Vue.component(QScroller.name, QScroller)
  }
}
