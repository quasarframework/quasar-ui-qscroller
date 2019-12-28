<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="valueStr"
      view="date-time"
      no-footer
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueObj"
      view="date-time"
      no-footer
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueArr"
      view="date-time"
      no-footer
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueDate"
      view="date-time"
      no-footer
      style="max-width: 200px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'StringBasic',

  data () {
    return {
      valueStr: '2020-10-01 10:10',
      valueObj: { year: '2020', month: '11', day: 10, hour: 12, minute: 35 },
      valueArr: [2020, 12, '25', '08', '05'],
      valueDate: new Date()
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
