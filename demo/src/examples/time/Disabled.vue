<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time"
      no-footer
      disable
      style="max-width: 100px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time"
      no-footer
      dense
      disable
      style="max-width: 80px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time"
      no-footer
      :disabled-hours="[1,2,3,4,5,6]"
      style="max-width: 100px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="time"
      no-footer
      :disabled-minutes="[10,12,14,16,18,20]"
      style="max-width: 100px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'TimeDisabled',

  data () {
    return {
      value: ''
    }
  }
}
</script>
