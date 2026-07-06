/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { defineIndexScript } from '#q-app'

export default defineIndexScript((api) => {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app-vite', '>=3.0.0')

  api.registerDescribeApi('QScroller', '~@quasar/quasar-ui-qscroller/dist/api/QScroller.json')
  api.registerDescribeApi(
    'QStringScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QStringScroller.json',
  )
  api.registerDescribeApi(
    'QTimeScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QTimeScroller.json',
  )
  api.registerDescribeApi(
    'QTimeRangeScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QTimeRangeScroller.json',
  )
  api.registerDescribeApi(
    'QDateScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QDateScroller.json',
  )
  api.registerDescribeApi(
    'QDateRangeScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QDateRangeScroller.json',
  )
  api.registerDescribeApi(
    'QDateTimeScroller',
    '~@quasar/quasar-ui-qscroller/dist/api/QDateTimeScroller.json',
  )

  api.extendQuasarConf(() => ({
    boot: ['~@quasar/quasar-app-extension-qscroller/dist/boot/vite-register.js'],
    css: ['~@quasar/quasar-ui-qscroller/src/index.scss'],
  }))
})
