<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      hour12
      style="max-width: 220px; height: 200px;"
    ></q-scroller>

    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      hour12
      :start-am-pm-labels="['a', 'p']"
      :end-am-pm-labels="['a', 'p']"
      style="max-width: 220px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeRange12Hour',

  data () {
    return {
      value: ''
    }
  }
}
</script>
