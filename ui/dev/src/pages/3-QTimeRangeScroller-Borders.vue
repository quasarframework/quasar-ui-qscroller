<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">'time-range' Scroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        show-vertical-bar, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          show-vertical-bar
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        show-vertical-bar, hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          show-vertical-bar
          hour12
          style="max-width: 220px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        show-vertical-bar, bar-color, hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          show-vertical-bar
          bar-color="primary"
          hour12
          style="max-width: 250px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        show-vertical-bar, bar-color, border-color, hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          show-vertical-bar
          bar-color="primary"
          border-color="primary"
          hour12
          style="max-width: 250px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
