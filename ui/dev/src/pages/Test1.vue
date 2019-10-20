<template>
  <div class="q-pa-md row q-gutter-sm full-width">
    <div class="row full-width">
      <div class="text-h4">QStringScroller</div>
    </div>

    <q-card>
      <q-card-section class="q-pa-md row q-gutter-sm">
        <div>
          <p>no-footer, no-header</p>
          <q-scroller
            v-model="value"
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
            view="string"
            :items="items"
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
          <p>disable, no-footer</p>
          <q-scroller
            v-model="value"
            view="string"
            :items="items"
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
          <q-input color="blue-8" filled v-model="value" label="Enter a Zoo Animal">
            <template v-slot:append>
              <q-icon name="fas fa-paw" class="cursor-pointer">
                <q-popup-proxy v-model="showScroller">
                  <q-scroller
                    v-model="value"
                    :items="items"
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
      showScroller: false,
      items: [
        { value: 'Anteater', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Baboons', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Cheetah', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Chimpanzee', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Elephant', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Giant Pandas', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Gibbon', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Giraffe', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Gorilla', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Hippopotamus', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Jaguar', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Koala', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Komodo Dragon', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Lemurs', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Lion', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Meerkat', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Monkey', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Orangutan', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Penguin', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Polar Bear', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Red Panda', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Rhinoceros', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Ring-tailer Lemur', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Sea lion', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Sloth', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Tiger', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Wallaby (Kangaroo)', noCaps: true, iconRight: '', disabled: false, align: 'around' },
        { value: 'Zebra', noCaps: true, iconRight: '', disabled: false, align: 'around' }
      ]
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
