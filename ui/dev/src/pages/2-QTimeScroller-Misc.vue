<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">'time' Scroller</div>
    </div>


    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        hour12, am-pm-labels, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time"
          no-footer
          :am-pm-labels="['a', 'p']"
          hour12
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        disabled-hours, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time"
          no-footer
          :disabled-hours="[0,1,2,3,4,5,6]"
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        disabled-minutes, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time"
          no-footer
          :disabled-minutes="[0,1,2,3,4,5,6]"
          style="max-width: 150px; height: 200px;"
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
