<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QTimeRangeScroller</div>
    </div>


    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        minute-interval, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          start-minute-interval="5"
          end-minute-interval="5"
          style="max-width: 250px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        hour-interval, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          start-hour-interval="2"
          end-hour-interval="2"
          style="max-width: 250px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-minutes, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          start-no-minutes
          end-no-minutes
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-hours, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          start-no-hours
          end-no-hours
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
