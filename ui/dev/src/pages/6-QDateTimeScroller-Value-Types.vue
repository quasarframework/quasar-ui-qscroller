<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QDateTimeScroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer, value as string
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="valueStr"
          view="date-time"
          no-footer
          style="max-width: 200px; height: 200px;"
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
          view="date-time"
          no-footer
          style="max-width: 200px; height: 200px;"
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
          view="date-time"
          no-footer
          style="max-width: 200px; height: 200px;"
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
          view="date-time"
          no-footer
          style="max-width: 200px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      valueStr: '2020-10-01 10:10',
      valueObj: { year: '2020', month: '11', day: 10, hour: 12, minute: 35 },
      valueArr: [ 2020, 12, '25', '08', '05'],
      valueDate: new Date()
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
