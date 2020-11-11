export interface Timestamp {
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
  doy: number;
  workweek: number;
  hasDay: boolean;
  hasTime: boolean;
  past: boolean;
  current: boolean;
  future: boolean;
  disabled: boolean;
}
  
export type TimestampArray = Timestamp[]

export interface YearMonthDay {
  year: number
  month: number
  day: number
}

export interface HourMinute {
  hour: number
  minute: number
}

export type DateArray = Date[]
export type NumberArray = number[]
export type StringArray = string[]
export type StringOrNumber = string | number