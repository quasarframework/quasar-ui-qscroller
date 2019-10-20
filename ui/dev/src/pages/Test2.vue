<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QTimeScroller</div>
    </div>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-footer, no-header</p>
          <q-scroller
            v-model="value"
            view="time"
            no-header
            no-footer
            style="max-width: 200px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            style="max-width: 200px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-shadow, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-shadow
            style="max-width: 200px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-border, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-border
            style="max-width: 200px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>rounded-borders, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            rounded-borders
            style="max-width: 200px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
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
            style="max-width: 200px; height: 200px;"
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
            style="max-width: 150px; height: 200px;"
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
            style="max-width: 200px; height: 200px;"
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
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>disabled, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            disable
            style="max-width: 150px; height: 200px;"
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

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>show-vertical-bar, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            show-vertical-bar
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>show-vertical-bar, hour12, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            show-vertical-bar
            hour12
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>hour12, am-pm-labels, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            :am-pm-labels="['a', 'p']"
            hour12
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>minute-interval, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            minute-interval="5"
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>hour-interval, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            hour-interval="2"
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-minutes, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-minutes
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-hours, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            no-hours
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>disabled-hours, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            :disabled-hours="[0,1,2,3,4,5,6]"
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>disabled-minutes, no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            :disabled-minutes="[0,1,2,3,4,5,6]"
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card>

    <!-- <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>local (he), no-footer</p>
          <q-scroller
            v-model="value"
            view="time"
            no-footer
            locale="kn"
            style="max-width: 150px; height: 200px;"
          ></q-scroller>
        </div>
      </q-card-section>
    </q-card> -->

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
          maxHeight: '200px',
          height: '200px',
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
