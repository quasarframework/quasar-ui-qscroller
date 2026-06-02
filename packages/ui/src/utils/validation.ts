import { daysInMonth } from "./Timestamp";

export function isValidTime(value: string) {
  const parts = value.split(":");
  if (parts.length === 2) {
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);
    if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
      return true;
    }
  }

  return false;
}

export function isValidDate(value: string) {
  const parts = value.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    const daysInM = daysInMonth(year, month);

    if (year !== 0 && month > 0 && month <= 12 && day > 0 && day <= daysInM) {
      return true;
    }
  }

  return false;
}
