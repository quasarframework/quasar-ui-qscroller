/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (conf) {
  // make sure qscroller boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qscroller/src/boot/qscroller.js')
  console.log(` App Extension (qdatetimescroller) Info: 'Adding qscroller boot reference to your quasar.conf.js'`)

  // make sure qscroller css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qscroller/src/component/scroller-all.styl')
  console.log(` App Extension (qscroller) Info: 'Adding scroller-all.styl css reference to your quasar.conf.js'`)

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-qscroller[\\/]src/)
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0-beta.19')

  // register JSON api
  // api.registerDescribeApi('QDateTimeScroller', './component/QDateTimeScroller.json')
  // api.registerDescribeApi('QDateScroller', './component/QDateScroller.json')
  // api.registerDescribeApi('QTimeScroller', './component/QTimeScroller.json')

  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)
}
