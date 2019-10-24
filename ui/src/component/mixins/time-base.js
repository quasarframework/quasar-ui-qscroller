import props from '../utils/props'

export default {
  name: 'TimeBase',

  props: {
    ...props.common,
    ...props.base,
    ...props.locale,
    // height: [Number, String],
    hour12: Boolean,
    amPmLabels: {
      type: Array,
      default: () => ['AM', 'PM'],
      validator: v => Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'string'
    }
  },

  methods: {
    isValidTime (time) {
      let parts = time.split(':')
      if (parts.length === 2) {
        let hour = parseInt(parts[0])
        let minute = parseInt(parts[1])
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
          return true
        }
      }
      return false
    }
  }
}
