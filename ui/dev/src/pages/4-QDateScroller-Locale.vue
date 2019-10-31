<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">'date' Scroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        locale, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-select filled v-model="locale" :options="options" label="Filled" style="max-width: 200px;"/>
        <q-scroller
          v-model="value"
          view="date"
          no-footer
          :locale="locale"
          style="max-width: 200px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
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
