<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      disable
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      dense
      disable
      style="max-width: 100px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      :start-disabled-hours="[1,2,3,4,5,6]"
      :end-disabled-hours="[1,2,3,4,5,6]"
      style="max-width: 150px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time-range"
      no-footer
      :start-disabled-minutes="[10,12,14,16,18,20]"
      :end-disabled-minutes="[10,12,14,16,18,20]"
      style="max-width: 150px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeRangeDisabled',

  data () {
    return {
      value: ''
    }
  }
}
</script>
