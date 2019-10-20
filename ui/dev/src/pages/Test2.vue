<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm full-width">
        <div>
          <p>no-footer, no-header</p>
          <q-scroller
            v-model="value"
            view="time"
            no-header
            no-footer
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>

        <div>
          <p>no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>

        <div>
          <p>no-shadow, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-shadow
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>

        <div>
          <p>no-border, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-border
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>

        <div>
          <p>rounded-borders, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            rounded-borders
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>

        <div>
          <p>colored, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            text-color="yellow"
            color="primary"
            inner-text-color="yellow"
            inner-color="primary"
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>dense, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            dense
            style="max-width: 150px; height: 400px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>hour12, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            hour12
            style="max-width: 200px; height: 400px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>dense, hour12, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            dense
            hour12
            style="max-width: 150px; height: 400px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>disbaled, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            disable
            style="max-width: 150px; height: 400px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>with QInput, no-header</p>
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
                    :style="scrollerPopupStyle200"
                    @close="() => { showScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
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
    scrollerPopupStyle200 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '200px'
        }
      }
    }
  },

  watch: {
    value (val, oldVal) {
      console.log('value changed: ', val, oldVal)
    }
  }
}
</script>
