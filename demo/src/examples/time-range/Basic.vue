<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time-range"
      no-header
      no-footer
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      no-shadow
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      no-border
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      rounded-borders
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      rounded-borders
      dense
      style="max-width: 100px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeRangeBasic',

  data () {
    return {
      value: ''
    }
  }
}
</script>
