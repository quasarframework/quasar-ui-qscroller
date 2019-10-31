<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="valueStr"
      view="date"
      no-footer
      style="max-width: 130px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueObj"
      view="date"
      no-footer
      style="max-width: 130px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueArr"
      view="date"
      no-footer
      style="max-width: 130px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="valueDate"
      view="date"
      no-footer
      style="max-width: 130px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'StringBasic',

  data () {
    return {
      valueStr: '2020-10-01',
      valueObj: { year: '2020', month: '11', day: 10 },
      valueArr: [ 2020, 12, '25' ],
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
