<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QTimeRangeScroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-header, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-header
          no-footer
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-shadow, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          no-shadow
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        no-border, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          no-border
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        rounded-borders, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          rounded-borders
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        dense, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          dense
          style="max-width: 120px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          hour12
          style="max-width: 220px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        dense, hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          dense
          hour12
          style="max-width: 190px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        disabled, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          disable
          style="max-width: 150px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        dense, disabled, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          dense
          disable
          style="max-width: 120px; height: 200px;"
        ></q-scroller>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        dense, disabled, hour12, no-footer
      </q-card-section>
      <q-card-section class="col-12">
        <q-scroller
          v-model="value"
          view="time-range"
          no-footer
          dense
          disabled
          hour12
          style="max-width: 180px; height: 200px;"
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
