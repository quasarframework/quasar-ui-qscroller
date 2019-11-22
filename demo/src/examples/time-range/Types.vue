<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="valueStr"
      view="time-range"
      no-footer
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueObj"
      view="time-range"
      no-footer
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueArr"
      view="time-range"
      no-footer
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueDate"
      view="time-range"
      no-footer
      style="max-width: 150px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeRangeTypes',

  data () {
    return {
      valueStr: ['09:00', '09:00'],
      valueObj: [{ hour: '09', minute: '10' }, { hour: '09', minute: '10' }],
      valueArr: [[ '09', '20' ], [ '09', '20' ]],
      valueDate: [new Date(), new Date()]
    }
  },

  watch: {
    valueStr (val) {
      /* eslint-disable-next-line */
      console.log('string:', val)
    },
    valueObj (val) {
      /* eslint-disable-next-line */
      console.log('object:', JSON.stringify(val))
    },
    valueArr (val) {
      /* eslint-disable-next-line */
      console.log('array:', JSON.stringify(val))
    },
    valueDate (val) {
      /* eslint-disable-next-line */
      console.log('date:', val)
    }
  }
}
</script>
