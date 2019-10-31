<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      disable
      style="max-width: 130px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      dense
      disable
      style="max-width: 100px; height: 200px;"
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
