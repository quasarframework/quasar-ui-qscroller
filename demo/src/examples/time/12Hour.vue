<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="time"
      no-footer
      hour12
      style="max-width: 120px; height: 200px;"
    ></q-scroller>

    <q-scroller
      v-model="value"
      view="time"
      no-footer
      hour12
      :am-pm-labels="['a', 'p']"
      style="max-width: 120px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'Time12Hour',

  data () {
    return {
      value: ''
    }
  }
}
</script>
