<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <div class="col">
      <q-select filled v-model="locale" :options="options" label="Filled" style="max-width: 200px;"/>
      <q-scroller
        v-model="value"
        view="date"
        no-footer
        :local="locale"
        style="max-width: 200px; height: 200px;"
      ></q-scroller>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DateLocale',

  data () {
    return {
      value: '',
      locale: 'en-us',
      options: [
        'en-us', 'fr', 'ro', 'se', 'ru', 'ar', 'ca'
      ]
    }
  }
}
</script>
