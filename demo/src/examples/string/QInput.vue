<template>
  <div class="q-pa-md row justify-evenly q-gutter-sm">
    <q-input color="blue-8" filled v-model="value" label="Enter a Zoo Animal">
      <template v-slot:append>
        <q-icon name="fas fa-paw" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller1" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              :items="items"
              no-header
              rounded-borders
              :style="scrollerPopupStyle200"
              @close="() => { showScroller1 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input color="blue-8" filled v-model="value" label="Enter a Zoo Animal">
      <template v-slot:append>
        <q-icon name="fas fa-paw" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller2" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              :items="items"
              rounded-borders
              text-color="grey-3"
              color="black"
              inner-text-color="black"
              inner-color="grey-3"
              bar-color="accent"
              :style="scrollerPopupStyle200"
              @close="() => { showScroller2 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input color="blue-8" filled v-model="value" label="Enter a Zoo Animal">
      <template v-slot:append>
        <q-icon name="fas fa-paw" class="cursor-pointer">
          <q-popup-proxy v-model="showScroller3" anchor="top right" self="bottom middle">
            <q-scroller
              v-model="value"
              :items="items"
              dense
              rounded-borders
              text-color="grey-3"
              color="black"
              inner-text-color="black"
              inner-color="grey-3"
              bar-color="accent"
              :style="scrollerPopupStyle120"
              @close="() => { showScroller3 = false }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

  </div>
</template>

<script>
export default {
  name: 'StringQInput',

  data () {
    return {
      showScroller1: false,
      showScroller2: false,
      showScroller3: false,
      value: '',
      items: [
        { value: 'Anteater', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Baboons', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Cheetah', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Chimpanzee', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Elephant', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Giant Pandas', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Gibbon', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Giraffe', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Gorilla', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Hippopotamus', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Jaguar', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Koala', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Komodo Dragon', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Lemurs', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Lion', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Meerkat', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Monkey', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Orangutan', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Penguin', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Polar Bear', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Red Panda', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Rhinoceros', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Ring-tailed Lemur', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Sea lion', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Sloth', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Tiger', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Wallaby (Kangaroo)', noCaps: true, iconRight: void 0, disabled: false, align: 'around' },
        { value: 'Zebra', noCaps: true, iconRight: void 0, disabled: false, align: 'around' }
      ]
    }
  },

  computed: {
    scrollerPopupStyle200 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '90vw',
          height: '70vh'
        }
      }
      else {
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
      }
      else {
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
