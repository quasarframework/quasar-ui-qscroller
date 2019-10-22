<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QTimeScroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, no-header
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter time" mask="##:##">
          <template v-slot:append>
            <q-icon name="far fa-clock" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller">
                <q-scroller
                  v-model="value"
                  view="time"
                  no-header
                  rounded-borders
                  text-color="grey-3"
                  color="black"
                  inner-text-color="black"
                  inner-color="grey-3"
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller = false }"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      showScroller: false
    }
  },

  computed: {
    scrollerPopupStyle150 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '90vw',
          height: '90vh'
        }
      } else {
        return {
          maxHeight: '200px',
          height: '200px',
          width: '150px'
        }
      }
    }
  }
}
</script>
