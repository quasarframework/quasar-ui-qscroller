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
