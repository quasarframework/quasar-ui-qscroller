import { version } from '../package.json'
import Component from './component/QScroller'
import Api from './component/QScroller.json'

export {
  version,
  Component,
  Api
}

export default {
  version,
  Component,
  Api,

  install (Vue) {
    Vue.component(Component.name, Component)
  }
}
