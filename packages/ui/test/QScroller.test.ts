import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { gregorianCalendar, type CalendarDateParts, type CalendarSystem } from '@timestamp-js/core'

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

const shiftedCalendar: CalendarSystem = Object.freeze({
  id: 'shifted-test',
  label: 'Shifted Test',
  defaultLocale: 'en-US',
  defaultDirection: 'ltr',
  defaultWeekdays: Object.freeze([0, 1, 2, 3, 4, 5, 6]),

  monthsInYear() {
    return 12
  },

  isLeapYear(year: number) {
    return gregorianCalendar.isLeapYear(year - 1000)
  },

  daysInMonth(year: number, month: number) {
    return gregorianCalendar.daysInMonth(year - 1000, month)
  },

  toEpochDay(date: CalendarDateParts) {
    return gregorianCalendar.toEpochDay({
      year: date.year - 1000,
      month: date.month,
      day: date.day,
    })
  },

  fromEpochDay(epochDay: number) {
    const date = gregorianCalendar.fromEpochDay(epochDay)

    return {
      year: date.year + 1000,
      month: date.month,
      day: date.day,
    }
  },

  addDays(date: CalendarDateParts, amount: number) {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },

  nextDay(date: CalendarDateParts) {
    return this.addDays(date, 1)
  },

  prevDay(date: CalendarDateParts) {
    return this.addDays(date, -1)
  },

  getDayOfYear(date: CalendarDateParts) {
    const yearStart = this.toEpochDay({ year: date.year, month: 1, day: 1 })

    return this.toEpochDay(date) - yearStart + 1
  },

  getWeekday(date: CalendarDateParts) {
    const gregorianDate = gregorianCalendar.fromEpochDay(this.toEpochDay(date))

    return gregorianCalendar.getWeekday(gregorianDate)
  },
})

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

  it('renders all dedicated scrollers on the server without browser globals', async () => {
    const app = createSSRApp({
      render: () =>
        h('div', [
          h(QStringScroller, {
            items: [
              { label: 'Alpha', value: 'alpha' },
              { label: 'Beta', value: 'beta' },
            ],
            value: 'alpha',
          }),
          h(QTimeScroller, {
            value: '09:30',
          }),
          h(QTimeRangeScroller, {
            value: ['09:30', '11:00'],
          }),
          h(QDateScroller, {
            value: '2026-07-04',
            yearBegin: 2026,
            yearStop: 2026,
          }),
          h(QDateRangeScroller, {
            value: ['2026-07-04', '2026-07-06'],
            startYearBegin: 2026,
            startYearStop: 2026,
            endYearBegin: 2026,
            endYearStop: 2026,
          }),
          h(QDateTimeScroller, {
            value: '2026-07-04 09:30',
            yearBegin: 2026,
            yearStop: 2026,
          }),
        ]),
    })

    installSsrQuasarStub(app)

    const html = await renderToString(app)

    expect(html).toContain('Alpha')
    expect(html).toContain('09:30')
    expect(html).toContain('2026')
  })

  it('renders adapter-native date scrollers on the server', async () => {
    const app = createSSRApp({
      render: () =>
        h('div', [
          h(QDateScroller, {
            value: '3026-07-04',
            calendarSystem: shiftedCalendar,
            yearBegin: 3026,
            yearStop: 3026,
          }),
          h(QDateRangeScroller, {
            value: ['3026-07-04', '3026-07-06'],
            calendarSystem: shiftedCalendar,
            startYearBegin: 3026,
            startYearStop: 3026,
            endYearBegin: 3026,
            endYearStop: 3026,
          }),
          h(QDateTimeScroller, {
            value: '3026-07-04 09:30',
            calendarSystem: shiftedCalendar,
            yearBegin: 3026,
            yearStop: 3026,
          }),
        ]),
    })

    installSsrQuasarStub(app)

    const html = await renderToString(app)

    expect(html).toContain('q-scroller')
    expect(html).toContain('3026')
  })
})
