import {
  Timestamp as EmptyTimestamp,
  formatCalendarDate,
  getCalendarDayIdentifier,
  getDateObject,
  getTime,
  gregorianCalendar,
  padNumber,
  parseCalendarTimestampSafe,
  parseDate,
  toCalendarTimestamp,
  toGregorianTimestamp,
  today,
  type CalendarSystem,
  type Timestamp,
} from '@timestamp-js/core'

export function getResolvedCalendarSystem(calendarSystem?: CalendarSystem): CalendarSystem {
  return calendarSystem ?? gregorianCalendar
}

export function getCalendarTimestampDate(timestamp: Timestamp): string {
  return timestamp.date || formatCalendarDate(timestamp)
}

export function getCalendarTimestampDateObject(
  timestamp: Timestamp,
  calendarSystem?: CalendarSystem,
): Date {
  return getDateObject(toGregorianTimestamp(timestamp, getResolvedCalendarSystem(calendarSystem)))
}

export function getCurrentCalendarTimestamp(calendarSystem?: CalendarSystem): Timestamp {
  const calendar = getResolvedCalendarSystem(calendarSystem)
  return parseCalendarTimestampSafe(today(calendar), calendar) ?? EmptyTimestamp
}

export function getCalendarTimestampFromDate(
  value: Date,
  calendarSystem?: CalendarSystem,
): Timestamp {
  const parsed = parseDate(value)
  if (parsed === null) {
    return getCurrentCalendarTimestamp(calendarSystem)
  }

  return toCalendarTimestamp(parsed, getResolvedCalendarSystem(calendarSystem))
}

export function parseCalendarDateTimeSafe(
  value: string | undefined,
  calendarSystem?: CalendarSystem,
  fallback: Timestamp | null = null,
): Timestamp | null {
  return parseCalendarTimestampSafe(value, getResolvedCalendarSystem(calendarSystem), fallback)
}

export function createCalendarTimestampFromParts(
  base: Timestamp,
  year: number,
  month: number,
  day: number,
  calendarSystem?: CalendarSystem,
): Timestamp {
  return (
    parseCalendarDateTimeSafe(
      `${padNumber(year, 4)}-${padNumber(month, 2)}-${padNumber(day, 2)} ${getTime(base)}`,
      calendarSystem,
      base,
    ) ?? base
  )
}

export function getCalendarDateIdentifierFromString(
  value: string,
  calendarSystem?: CalendarSystem,
): number | null {
  const timestamp = parseCalendarDateTimeSafe(`${value} 00:00`, calendarSystem)
  return timestamp === null
    ? null
    : getCalendarDayIdentifier(timestamp, getResolvedCalendarSystem(calendarSystem))
}

export function isValidCalendarDateString(value: string, calendarSystem?: CalendarSystem): boolean {
  return getCalendarDateIdentifierFromString(value, calendarSystem) !== null
}

export function getCalendarDaysInMonth(
  year: number,
  month: number,
  calendarSystem?: CalendarSystem,
  fallback = 31,
): number {
  try {
    const calendar = getResolvedCalendarSystem(calendarSystem)
    return calendar.daysInMonth(year, month) || fallback
  } catch {
    return fallback
  }
}

export function getCalendarMonthsInYear(
  year: number,
  calendarSystem?: CalendarSystem,
  fallback = 12,
): number {
  try {
    const calendar = getResolvedCalendarSystem(calendarSystem)
    return calendar.monthsInYear(year) || fallback
  } catch {
    return fallback
  }
}
