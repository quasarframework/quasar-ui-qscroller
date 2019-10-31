<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      disable
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      dense
      disable
      style="max-width: 200px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'DateDisabled',

  data () {
    return {
      value: ''
    }
  }
}
</script>
