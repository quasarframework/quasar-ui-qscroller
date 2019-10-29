<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      text-color="yellow-7"
      color="blue-8"
      inner-text-color="yellow-7"
      inner-color="blue-8"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      bar-color="orange-8"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      show-vertical-bar
      bar-color="purple-8"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      border-color="purple-8"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      dense
      text-color="lightgreen"
      inner-text-color="orange"
      bar-color="purple"
      style="max-width: 200px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'DateColors',

  data () {
    return {
      value: ''
    }
  }
}
</script>
