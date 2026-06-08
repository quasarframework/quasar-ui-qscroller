import * as timestampCore from "@timestamp-js/core";

import type {
  AddToDateOptions,
  DisabledDay,
  DisabledDayConfig,
  DisabledDays,
  LocaleFormatter,
  MonthFormatter,
  Timestamp as CoreTimestamp,
  TimestampClass,
  TimestampStyle,
  TimeObject as CoreTimeObject,
  WeekdayFormatter,
} from "@timestamp-js/core";

type Mutable<T> = { -readonly [Key in keyof T]: T[Key] };

export type Timestamp = Mutable<CoreTimestamp>;
export type TimeObject = Mutable<CoreTimeObject>;
export type {
  AddToDateOptions,
  DisabledDay,
  DisabledDayConfig,
  DisabledDays,
  LocaleFormatter,
  MonthFormatter,
  TimestampClass,
  TimestampStyle,
  WeekdayFormatter,
};

export const PARSE_DATETIME = timestampCore.PARSE_DATETIME;
export const PARSE_DATE = timestampCore.PARSE_DATE;
export const PARSE_TIME = timestampCore.PARSE_TIME;
export const DAYS_IN_MONTH = timestampCore.DAYS_IN_MONTH;
export const DAYS_IN_MONTH_LEAP = timestampCore.DAYS_IN_MONTH_LEAP;
export const TIME_CONSTANTS = timestampCore.TIME_CONSTANTS;
export const DAYS_IN_MONTH_MIN = timestampCore.DAYS_IN_MONTH_MIN;
export const DAYS_IN_MONTH_MAX = timestampCore.DAYS_IN_MONTH_MAX;
export const MONTH_MAX = timestampCore.MONTH_MAX;
export const MONTH_MIN = timestampCore.MONTH_MIN;
export const DAY_MIN = timestampCore.DAY_MIN;
export const FIRST_HOUR = timestampCore.FIRST_HOUR;
export const DAYS_IN_WEEK = timestampCore.DAYS_IN_WEEK;
export const MINUTES_IN_HOUR = timestampCore.MINUTES_IN_HOUR;
export const HOURS_IN_DAY = timestampCore.HOURS_IN_DAY;
export const MILLISECONDS_IN_MINUTE = timestampCore.MILLISECONDS_IN_MINUTE;
export const MILLISECONDS_IN_HOUR = timestampCore.MILLISECONDS_IN_HOUR;
export const MILLISECONDS_IN_DAY = timestampCore.MILLISECONDS_IN_DAY;
export const MILLISECONDS_IN_WEEK = timestampCore.MILLISECONDS_IN_WEEK;

// QScroller previously exposed this alias from its copied Timestamp helper.
export const PARSE_REGEX = PARSE_DATETIME;

export const validateTimestamp = timestampCore.validateTimestamp;
export const padNumber = timestampCore.padNumber;
export const isLeapYear = timestampCore.isLeapYear;
export const daysInMonth = timestampCore.daysInMonth;
export const today = timestampCore.today;
export const isToday = timestampCore.isToday;
export const parseTime = timestampCore.parseTime;
export const compareTimestamps = timestampCore.compareTimestamps;
export const compareDate = timestampCore.compareDate;
export const compareTime = timestampCore.compareTime;
export const compareDateTime = timestampCore.compareDateTime;
export const getDayIdentifier = timestampCore.getDayIdentifier;
export const getTimeIdentifier = timestampCore.getTimeIdentifier;
export const getDayTimeIdentifier = timestampCore.getDayTimeIdentifier;
export const diffTimestamp = timestampCore.diffTimestamp;
export const getDayOfYear = timestampCore.getDayOfYear;
export const getWorkWeek = timestampCore.getWorkWeek;
export const getWeekday = timestampCore.getWeekday;
export const getDate = timestampCore.getDate;
export const getTime = timestampCore.getTime;
export const getDateTime = timestampCore.getDateTime;
export const createNativeLocaleFormatter = timestampCore.createNativeLocaleFormatter;
export const makeDate = timestampCore.makeDate;
export const makeDateTime = timestampCore.makeDateTime;
export const getDateObject = timestampCore.getDateObject;
export const validateNumber = timestampCore.validateNumber;
export const isBetweenDates = timestampCore.isBetweenDates;
export const isOverlappingDates = timestampCore.isOverlappingDates;
export const daysBetween = timestampCore.daysBetween;
export const weeksBetween = timestampCore.weeksBetween;
export const getWeekdayFormatter = timestampCore.getWeekdayFormatter;
export const getWeekdayNames = timestampCore.getWeekdayNames;
export const getMonthFormatter = timestampCore.getMonthFormatter;
export const getMonthNames = timestampCore.getMonthNames;

function toMutableTimestamp(timestamp: CoreTimestamp): Timestamp {
  return { ...timestamp };
}

function toMutableTimestampOrNull(timestamp: CoreTimestamp | null): Timestamp | null {
  return timestamp === null ? null : toMutableTimestamp(timestamp);
}

function toMutableTimestampList(timestamps: CoreTimestamp[]): Timestamp[] {
  return timestamps.map(toMutableTimestamp);
}

export const Timestamp: Timestamp = toMutableTimestamp(timestampCore.Timestamp);
export const TimeObject: TimeObject = { ...timestampCore.TimeObject };

export function copyTimestamp(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestamp);
}

export function parsed(input: string): Timestamp | null {
  return toMutableTimestampOrNull(timestampCore.parsed(input));
}

export function parseTimestamp(input: string, now: CoreTimestamp | null = null): Timestamp | null {
  return toMutableTimestampOrNull(timestampCore.parseTimestamp(input, now));
}

export function parseDate(date: Date, utc = false): Timestamp | null {
  return toMutableTimestampOrNull(timestampCore.parseDate(date, utc));
}

export function nextDay(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.nextDay(timestamp));
}

export function prevDay(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.prevDay(timestamp));
}

export function getStartOfWeek(
  timestamp: CoreTimestamp,
  weekdays: number[],
  today: CoreTimestamp,
): Timestamp {
  return toMutableTimestamp(timestampCore.getStartOfWeek(timestamp, weekdays, today));
}

export function getEndOfWeek(
  timestamp: CoreTimestamp,
  weekdays: number[],
  today: CoreTimestamp,
): Timestamp {
  return toMutableTimestamp(timestampCore.getEndOfWeek(timestamp, weekdays, today));
}

export function getStartOfMonth(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.getStartOfMonth(timestamp));
}

export function getEndOfMonth(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.getEndOfMonth(timestamp));
}

export function updateRelative(
  timestamp: CoreTimestamp,
  now: CoreTimestamp,
  time = false,
): Timestamp {
  return toMutableTimestamp(timestampCore.updateRelative(timestamp, now, time));
}

export function updateMinutes(
  timestamp: CoreTimestamp,
  minutes: number,
  now: CoreTimestamp | null = null,
): Timestamp {
  return toMutableTimestamp(timestampCore.updateMinutes(timestamp, minutes, now));
}

export function updateWeekday(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.updateWeekday(timestamp));
}

export function updateDayOfYear(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.updateDayOfYear(timestamp));
}

export function updateWorkWeek(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.updateWorkWeek(timestamp));
}

export function updateDisabled(
  timestamp: CoreTimestamp,
  disabledBefore?: string,
  disabledAfter?: string,
  disabledWeekdays?: number[],
  disabledDays?: DisabledDays,
): Timestamp {
  return toMutableTimestamp(
    timestampCore.updateDisabled(
      timestamp,
      disabledBefore,
      disabledAfter,
      disabledWeekdays,
      disabledDays,
    ),
  );
}

export function updateFormatted(timestamp: CoreTimestamp): Timestamp {
  return toMutableTimestamp(timestampCore.updateFormatted(timestamp));
}

export function moveRelativeDays(
  timestamp: CoreTimestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
): Timestamp {
  return toMutableTimestamp(
    timestampCore.moveRelativeDays(timestamp, mover, days, allowedWeekdays),
  );
}

export function relativeDays(
  timestamp: CoreTimestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
): Timestamp {
  return toMutableTimestamp(timestampCore.relativeDays(timestamp, mover, days, allowedWeekdays));
}

export function findWeekday(
  timestamp: CoreTimestamp,
  weekday: number,
  mover = nextDay,
  maxDays = 6,
): Timestamp {
  return toMutableTimestamp(timestampCore.findWeekday(timestamp, weekday, mover, maxDays));
}

export function createDayList(
  start: CoreTimestamp,
  end: CoreTimestamp,
  now: CoreTimestamp,
  weekdays: number[] = [0, 1, 2, 3, 4, 5, 6],
  disabledBefore: string | undefined = undefined,
  disabledAfter: string | undefined = undefined,
  disabledWeekdays: number[] = [],
  disabledDays: DisabledDays = [],
  max = 42,
  min = 0,
): Timestamp[] {
  return toMutableTimestampList(
    timestampCore.createDayList(
      start,
      end,
      now,
      weekdays,
      disabledBefore,
      disabledAfter,
      disabledWeekdays,
      disabledDays,
      max,
      min,
    ),
  );
}

export function createIntervalList(
  timestamp: CoreTimestamp,
  first: number,
  minutes: number,
  count: number,
  now: CoreTimestamp,
): Timestamp[] {
  return toMutableTimestampList(
    timestampCore.createIntervalList(timestamp, first, minutes, count, now),
  );
}

export function maxTimestamp(timestamps: CoreTimestamp[], useTime = false): Timestamp {
  return toMutableTimestamp(timestampCore.maxTimestamp(timestamps, useTime));
}

export function minTimestamp(timestamps: CoreTimestamp[], useTime = false): Timestamp {
  return toMutableTimestamp(timestampCore.minTimestamp(timestamps, useTime));
}

export function addToDate(timestamp: CoreTimestamp, options: AddToDateOptions): Timestamp {
  return toMutableTimestamp(timestampCore.addToDate(timestamp, options));
}

export default {
  PARSE_DATETIME,
  PARSE_REGEX,
  PARSE_DATE,
  PARSE_TIME,
  DAYS_IN_MONTH,
  DAYS_IN_MONTH_LEAP,
  DAYS_IN_MONTH_MIN,
  DAYS_IN_MONTH_MAX,
  MONTH_MAX,
  MONTH_MIN,
  DAY_MIN,
  TIME_CONSTANTS,
  DAYS_IN_WEEK,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  FIRST_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
  Timestamp,
  TimeObject,
  today,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  parseTime,
  validateTimestamp,
  parsed,
  parseTimestamp,
  parseDate,
  getDayIdentifier,
  getTimeIdentifier,
  getDayTimeIdentifier,
  diffTimestamp,
  updateRelative,
  updateMinutes,
  updateWeekday,
  updateDayOfYear,
  updateWorkWeek,
  updateDisabled,
  updateFormatted,
  getDayOfYear,
  getWorkWeek,
  getWeekday,
  getDate,
  getTime,
  getDateTime,
  nextDay,
  prevDay,
  moveRelativeDays,
  relativeDays,
  findWeekday,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  makeDate,
  makeDateTime,
  getDateObject,
  validateNumber,
  maxTimestamp,
  minTimestamp,
  isBetweenDates,
  isOverlappingDates,
  daysBetween,
  weeksBetween,
  addToDate,
  compareTimestamps,
  compareDate,
  compareTime,
  compareDateTime,
  padNumber,
  isLeapYear,
  daysInMonth,
  copyTimestamp,
  getWeekdayFormatter,
  getWeekdayNames,
  getMonthFormatter,
  getMonthNames,
};
