<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      start-minute-interval="5"
      end-minute-interval="5"
      style="max-width: 140px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      start-hour-interval="2"
      end-hour-interval="2"
      style="max-width: 140px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      start-no-minutes
      end-no-minutes
      style="max-width: 140px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      start-no-hours
      end-no-hours
      style="max-width: 140px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeRangeIntervals',

  data () {
    return {
      value: ''
    }
  }
}
</script>
