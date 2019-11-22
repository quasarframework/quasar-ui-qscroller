<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-years
      end-no-years
      style="max-width: 340px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-months
      end-no-months
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-days
      end-no-days
      style="max-width: 380px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-days
      end-no-days
      start-no-months
      end-no-months
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-days
      end-no-days
      start-no-years
      end-no-years
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      start-no-months
      end-no-months
      start-no-years
      end-no-years
      style="max-width: 120px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'DateIntervals',

  data () {
    return {
      value: ''
    }
  }
}
</script>
