<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-scroller
      v-model="value"
      view="date"
      no-header
      no-footer
      style="max-width: 120px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      style="max-width: 120px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-shadow
      style="max-width: 120px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      no-border
      style="max-width: 120px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      rounded-borders
      style="max-width: 120px; height: 200px;"
    ></q-scroller>
    <q-scroller
      v-model="value"
      view="date"
      no-footer
      rounded-borders
      dense
      style="max-width: 100px; height: 200px;"
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
