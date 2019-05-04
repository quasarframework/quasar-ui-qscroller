<template>
  <q-page>
    <div class="row q-pa-md q-gutter-sm">

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QScroller</div>
          <div class="text-subtitle2">Arbitrary Data Selection</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-scroller
            v-model="scrollerModel"
            :items="items"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :disable="disable"
            :no-border="noBorder"
            color="blue-8"
            background-color="white"
            inner-color="white"
            inner-background-color="blue-8"
            style="height: 280px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QScroller</div>
          <div class="text-subtitle2">Using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-input color="blue-8" filled v-model="scrollerModel" label="Enter a Zoo Animal">
            <template v-slot:append>
              <q-icon name="fas fa-paw" class="cursor-pointer">
                <q-popup-proxy v-model="showScroller">
                  <q-scroller
                    v-model="scrollerModel"
                    :items="items"
                    :noHeader="true"
                    :rounded-borders="roundedBorders"
                    :disable="disable"
                    :no-border="noBorder"
                    color="grey-3"
                    background-color="black"
                    inner-color="black"
                    inner-background-color="grey-3"
                    style="height: 280px; width: 220px;"
                    @close="() => { showScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QTimeScroller</div>
          <div class="text-subtitle2">Hour and Minute Selection</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-time-scroller
            v-model="time1"
            :locale="locale"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :disable="disable"
            :no-border="noBorder"
            :showAmPmToggle="showAmPmToggle"
            :disabledMinutes="disabledMinutes"
            bar-color="#FF0000"
            color="white"
            background-color="red-6"
            inner-color="red"
            inner-background-color="white"
            style="height: 280px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QTimeScroller</div>
          <div class="text-subtitle2">Using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-input color="green-6" filled v-model="time1" label="Enter time" mask="##:##">
            <template v-slot:append>
              <q-icon name="far fa-clock" class="cursor-pointer">
                <q-popup-proxy v-model="showTimeScroller">
                  <q-time-scroller
                    v-model="time1"
                    :locale="locale"
                    :rounded-borders="roundedBorders"
                    :no-header="false"
                    :no-footer="false"
                    :disable="disable"
                    :showAmPmToggle="showAmPmToggle"
                    :disabledMinutes="disabledMinutes"
                    bar-color="#21ba45"
                    color="white"
                    background-color="green-6"
                    inner-color="green-6"
                    inner-background-color="white"
                    style="height: 280px; width: 180px;"
                    @close="() => { showTimeScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QDateScroller</div>
          <div class="text-subtitle2">Year, Month and Day Selection</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-date-scroller
            v-model="date1"
            :locale="locale"
            :showMonthLabel="true"
            :shortMonthLabel="true"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :disable="disable"
            :no-border="noBorder"
            bar-color="#FFFF00"
            color="blue-grey-6"
            background-color="white"
            inner-color="white"
            inner-background-color="blue-grey-6"
            style="height: 280px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 232px;">
        <q-card-section>
          <div class="text-h6">QDateScroller</div>
          <div class="text-subtitle2">Using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-input color="grey-8" filled v-model="date1" label="Enter date" mask="####-##-##">
            <template v-slot:append>
              <q-icon name="far fa-calendar" class="cursor-pointer">
                <q-popup-proxy v-model="showDateScroller">
                  <q-date-scroller
                    v-model="date1"
                    :locale="locale"
                    :rounded-borders="roundedBorders"
                    :no-header="noHeader"
                    :no-footer="false"
                    :disable="disable"
                    :no-border="noBorder"
                    bar-color="grey"
                    color="grey-3"
                    background-color="grey-8"
                    inner-color="grey-8"
                    inner-background-color="grey-3"
                    style="height: 280px; width: 280px;"
                    @close="() => { showDateScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 340px;">
        <q-card-section>
          <div class="text-h6">QDateTimeScroller</div>
          <div class="text-subtitle2">Date and Time Selection (TBD)</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <div class="q-scroller--border row col-xl-2 col-sm-4 col-xs-12 q-pa-xs">
            <div class="col-8">
              <q-date-scroller
                v-model="date1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FFFF00"
                color="indigo-6"
                background-color="white"
                inner-color="white"
                inner-background-color="indigo-6"
                style="height: 280px;"
              />
            </div>
            <div class="col-4">
              <q-time-scroller
                v-model="time1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FFFF00"
                color="indigo-6"
                background-color="white"
                inner-color="white"
                inner-background-color="indigo-6"
                style="height: 280px;"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 240px;">
        <q-card-section>
          <div class="text-h6">QTimeRangeScroller</div>
          <div class="text-subtitle2">Time Range Selection (TBD)</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <div class="q-scroller--border row col-xl-2 col-sm-4 col-xs-12 q-pa-xs">
            <div class="col-6">
              <q-time-scroller
                v-model="time1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FF0000"
                color="white"
                background-color="red-6"
                inner-color="red"
                inner-background-color="white"
                style="height: 280px;"
              />
            </div>
            <div class="col-6">
              <q-time-scroller
                v-model="time1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FF0000"
                color="white"
                background-color="red-6"
                inner-color="red"
                inner-background-color="white"
                style="height: 280px;"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 320px; min-width: 320px;">
        <q-card-section>
          <div class="text-h6">QDateRangeScroller</div>
          <div class="text-subtitle2">Date Range Selection (TBD)</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <div class="q-scroller--border row col-xl-2 col-sm-4 col-xs-12 q-pa-xs">
            <div class="col-6">
              <q-date-scroller
                v-model="date1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FFFF00"
                color="teal-6"
                background-color="white"
                inner-color="white"
                inner-background-color="teal-6"
                style="height: 280px;"
              />
            </div>
            <div class="col-6">
              <q-date-scroller
                v-model="date1"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                bar-color="#FFFF00"
                color="teal-6"
                background-color="white"
                inner-color="white"
                inner-background-color="teal-6"
                style="height: 280px;"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Scroller',
  data () {
    return {
      scrollerModel: 'Elephant',
      showScroller: false,
      showTimeScroller: false,
      showDateScroller: false,
      time1: '11:05',
      time2: '11:05',
      time3: '',
      time4: '11:30',
      date1: '2019-04-03',
      date2: '2019-04-03',
      disabledMinutes: [1, 2, 5, 6, 7, 8, 9],
      data: [
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
    ...mapGetters({
      locale: 'scroller/locale',
      titlebarHeight: 'common/titlebarHeight',
      roundedBorders: 'scroller/roundedBorders',
      noHeader: 'scroller/noHeader',
      noFooter: 'scroller/noFooter',
      disable: 'scroller/disable',
      noBorder: 'scroller/noBorder',
      showAmPmToggle: 'scroller/showAmPmToggle'
    }),

    items () {
      return this.data
    }
  },
  watch: {
    time () {
      console.log('time changed:', this.time)
    },
    noHeader (val) {
      console.log('noHeader', val)
    },
    noFooter (val) {
      console.log('noFooter', val)
    },
    scrollerModel (val) {
      this.data = this.data.map(item => {
        item.iconRight = ''
        if (val === item.value) item.iconRight = 'check'
        return item
      })
    }
  }
}
</script>
