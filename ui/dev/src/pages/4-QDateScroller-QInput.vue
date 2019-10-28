<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">'date' Scroller</div>
    </div>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, rounded-borders, no-header
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter date" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="far fa-calendar" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller1" anchor="top right" self="bottom middle">
                <q-scroller
                  v-model="value"
                  view="date"
                  no-header
                  rounded-borders
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller1 = false }"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, show-vertical-bar, no-header
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter date" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="far fa-calendar" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller2" anchor="top right" self="bottom middle">
                <q-scroller
                  v-model="value"
                  view="date"
                  no-header
                  show-vertical-bar
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller2 = false }"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, border colors, no-header
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter date" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="far fa-calendar" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller3" anchor="top right" self="bottom middle">
                <q-scroller
                  v-model="value"
                  view="date"
                  no-header
                  show-vertical-bar
                  bar-color="green"
                  border-color="green"
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller3 = false }"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, colors, rounded-borders, no-border, show-vertical-bar
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter date" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="far fa-calendar" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller4" anchor="top right" self="bottom middle">
                <q-scroller
                  v-model="value"
                  view="date"
                  rounded-borders
                  no-border
                  text-color="grey-3"
                  color="black"
                  inner-text-color="black"
                  inner-color="grey-3"
                  bar-color="#000"
                  show-vertical-bar
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller4 = false }"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md">
      <q-card-section class="col-12">
        with QInput, rounded-borders, show-vertical-bar, dense
      </q-card-section>
      <q-card-section class="col-12">
        <q-input color="blue-8" filled v-model="value" label="Enter date" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="far fa-calendar" class="cursor-pointer">
              <q-popup-proxy v-model="showScroller5" anchor="top right" self="bottom middle">
                <q-scroller
                  v-model="value"
                  view="date"
                  rounded-borders
                  show-vertical-bar
                  dense
                  :style="scrollerPopupStyle150"
                  @close="() => { showScroller5 = false }"
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
      showScroller1: false,
      showScroller2: false,
      showScroller3: false,
      showScroller4: false,
      showScroller5: false
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
