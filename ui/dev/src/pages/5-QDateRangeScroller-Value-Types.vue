<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">'date-range' Scroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer, value as string
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="valueStr"
          view="date-range"
          no-footer
          style="max-width: 280px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer, value as object
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="valueObj"
          view="date-range"
          no-footer
          style="max-width: 280px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer, value as array
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="valueArr"
          view="date-range"
          no-footer
          style="max-width: 280px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer, value as Date
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="valueDate"
          view="date-range"
          no-footer
          style="max-width: 280px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      valueStr: [ '2020-10-01', '2020-10-01' ],
      valueObj: [{ year: '2020', month: '11', day: 10 }, { year: '2020', month: '11', day: 10 }],
      valueArr: [[ 2020, 12, '25' ], [ 2020, 12, '25' ]],
      valueDate: [new Date(), new Date()]
    }
  },

  watch: {
    valueStr (val) {
      console.log('string:', val)
    },
    valueObj (val) {
      console.log('object:', JSON.stringify(val))
    },
    valueArr (val) {
      console.log('array:', JSON.stringify(val))
    },
    valueDate (val) {
      console.log('date:', val)
    }
  }
}
</script>
