<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-years
      style="max-width: 160px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-months
      style="max-width: 140px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-days
      style="max-width: 180px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-days
      no-months
      style="max-width: 140px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-days
      no-years
      style="max-width: 160px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-months
      no-years
      style="max-width: 110px; height: 200px;"
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
