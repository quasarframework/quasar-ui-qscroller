export function validateView (view) {
  return [
    'string', 'time', 'date', 'date-time',
    'time-range', 'date-range', ''].includes(view)
}
