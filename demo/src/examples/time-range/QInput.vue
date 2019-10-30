<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">

    <q-input color="blue-8" filled v-model="inputValue" label="Enter times" mask="##:## - ##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller1" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time-range"
              no-header
              rounded-borders
              :style="scrollerPopupStyle150"
              @close="() => { showScroller1 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="inputValue" label="Enter times" mask="##:## - ##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller2" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time-range"
              rounded-borders
              no-border
              text-color="yellow-7"
              color="blue-8"
              inner-text-color="yellow-7"
              inner-color="blue-8"
              :style="scrollerPopupStyle150"
              @close="() => { showScroller2 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="inputValue" label="Enter times" mask="##:## - ##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller3" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time-range"
              no-header
              no-footer
              vertical-bar
              :style="scrollerPopupStyle150"
              @close="() => { showScroller3 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="inputValue" label="Enter times" mask="##:## - ##:##">
      <template v-slot:append>
        <q-icon name="far fa-clock" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller4" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              view="time-range"
              no-header
              vertical-bar
              bar-color="green"
              border-color="green"
              :style="scrollerPopupStyle150"
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
  name: 'TimeRangeQInput',

  data () {
    return {
      showScroller1: false,
      showScroller2: false,
      showScroller3: false,
      showScroller4: false,
      value: '',
      inputValue: ''
    }
  },

  computed: {
    scrollerPopupStyle150 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '90vw',
          height: '70vh'
        }
      } else {
        return {
          maxHeight: '200px',
          height: '200px',
          width: '150px'
        }
      }
    }
  },

  watch: {
    value (val) {
      let type = Object.prototype.toString.call(this.value)
      if (type === '[object Array]') {
        this.inputValue = `${val[0]} - ${val[1]}`
      }
    },
    inputValue (val) {
      const parts = val.split(' - ')
      if (parts[0] !== this.value[0] || parts[1] !== this.value[1]) {
        this.value[0] = parts[0]
        this.value[1] = parts[1]
      }
    }
  }
}
</script>
