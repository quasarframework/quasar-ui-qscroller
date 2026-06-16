import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

import Plugin, {
  install,
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
  version,
} from '../src'

function installSsrQuasarStub(app: ReturnType<typeof createSSRApp>): void {
  const $q = {
    config: {
      iconMapFn: () => undefined,
    },
    dark: { isActive: false },
    iconMapFn: null,
    platform: { has: { touch: false }, is: { desktop: true, ios: false, mobile: false } },
    screen: { height: 800, width: 1280 },
  }

  app.provide('_q_', $q)
  app.config.globalProperties.$q = $q
}

describe('QScroller exports', () => {
  it('exports installable scroller components', () => {
    expect(QScroller.name).toBe('QScroller')
    expect(QStringScroller.name).toBe('QStringScroller')
    expect(QTimeScroller.name).toBe('QTimeScroller')
    expect(QTimeRangeScroller.name).toBe('QTimeRangeScroller')
    expect(QDateScroller.name).toBe('QDateScroller')
    expect(QDateRangeScroller.name).toBe('QDateRangeScroller')
    expect(QDateTimeScroller.name).toBe('QDateTimeScroller')
    expect(Plugin.install).toBe(install)
    expect(Plugin.version).toBe(version)
  })

  it('renders on the server without browser globals', async () => {
    const app = createSSRApp({
      render: () =>
        h(QScroller, {
          items: [
            { label: 'First option', value: 'first' },
            { label: 'Second option', value: 'second' },
          ],
          value: 'first',
          view: 'string',
        }),
    })

    installSsrQuasarStub(app)

    const html = await renderToString(app)

    expect(html).toContain('q-scroller')
    expect(html).toContain('First option')
  })
})
