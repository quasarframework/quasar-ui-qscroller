<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">

    <q-input color="blue-8" filled v-model="value" label="Enter time" mask="##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller1" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time"
              no-header
              rounded-borders
              :style="scrollerPopupStyle120"
              @close="() => { showScroller1 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="value" label="Enter time" mask="##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller2" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time"
              rounded-borders
              text-color="yellow-7"
              color="blue-8"
              inner-text-color="yellow-7"
              inner-color="blue-8"
              :style="scrollerPopupStyle120"
              @close="() => { showScroller2 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="value" label="Enter time" mask="##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller3" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time"
              no-header
              no-footer
              show-vertical-bar
              :style="scrollerPopupStyle120"
              @close="() => { showScroller3 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="value" label="Enter time" mask="##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller4" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time"
              no-header
              show-vertical-bar
              bar-color="green"
              border-color="green"
              :style="scrollerPopupStyle120"
              @close="() => { showScroller4 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

  </div>
</template>

<script>
export default {
  name: 'TimeQInput',

  data () {
    return {
      showScroller1: false,
      showScroller2: false,
      showScroller3: false,
      showScroller4: false,
      value: ''
    }
  },

  computed: {
    scrollerPopupStyle200 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '90vw',
          height: '70vh'
        }
      } else {
        return {
          maxHeight: '200px',
          height: '200px',
          width: '200px'
        }
      }
    },
    scrollerPopupStyle120 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '90vw',
          height: '70vh'
        }
      } else {
        return {
          maxHeight: '200px',
          height: '200px',
          width: '120px'
        }
      }
    }
  }
}
</script>
