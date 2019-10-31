<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date-range"
      no-header
      no-footer
      style="max-width: 240px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      no-shadow
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      no-border
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      rounded-borders
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date-range"
      no-footer
      rounded-borders
      dense
      style="max-width: 200px; height: 200px;"
    ></q-scroller>

  </div>
</template>

<script>
export default {
  name: 'DateBasic',

  data () {
    return {
      value: ''
    }
  }
}
</script>
