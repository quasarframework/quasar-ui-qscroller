import props from '../utils/props'

export default {
  name: 'DateBase',

  props: {
    ...props.common,
    ...props.base,
    ...props.locale
  },

  methods: {
    isValidDate (date) {
      const parts = date.split('-')
      if (parts.length === 3) {
        const year = parseInt(parts[0])
        const month = parseInt(parts[1])
        const day = parseInt(parts[2])
        const daysInM = daysInMonth(year, month)
        if (year !== 0 && month > 0 && month <= 12 && day > 0 && day <= daysInM) {
          return true
        }
      }
      return false
    }
  }
}
