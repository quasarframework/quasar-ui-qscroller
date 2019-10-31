<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-years
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-months
      style="max-width: 200px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-days
      style="max-width: 220px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-days
      no-months
      style="max-width: 160px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-days
      no-years
      style="max-width: 160px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-time"
      no-footer
      no-months
      no-years
      style="max-width: 160px; height: 200px;"
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
