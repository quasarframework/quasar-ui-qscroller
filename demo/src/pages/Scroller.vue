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
            :dense="dense"
            :disable="disable"
            :no-border="noBorder"
            :no-shadow="noShadow"
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
                    :dense="dense"
                    :disable="disable"
                    :no-border="noBorder"
                    :no-shadow="noShadow"
                    color="grey-3"
                    background-color="black"
                    inner-color="black"
                    inner-background-color="grey-3"
                    :style="scrollerPopupStyle200"
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
            :dense="dense"
            :disable="disable"
            :no-border="noBorder"
            :no-shadow="noShadow"
            :hour24-format="hour24Format"
            :no-hours="noHours"
            :no-minutes="noMinutes"
            :disabledMinutes="disabledMinutes"
            border-color="#FF0000"
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

          <q-input color="green-6" filled v-model="time2" label="Enter time" mask="##:##">
            <template v-slot:append>
              <q-icon name="far fa-clock" class="cursor-pointer">
                <q-popup-proxy v-model="showTimeScroller">
                  <q-time-scroller
                    v-model="time2"
                    :locale="locale"
                    :rounded-borders="roundedBorders"
                    :no-header="false"
                    :no-footer="false"
                    :disable="disable"
                    :hour24-format="hour24Format"
                    :no-hours="noHours"
                    :no-minutes="noMinutes"
                    :disabledMinutes="disabledMinutes"
                    border-color="#21ba45"
                    bar-color="#21ba45"
                    color="white"
                    background-color="green-6"
                    inner-color="green-6"
                    inner-background-color="white"
                    :style="scrollerPopupStyle120"
                    @close="() => { showTimeScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 240px;">
        <q-card-section>
          <div class="text-h6">QTimeRangeScroller</div>
          <div class="text-subtitle2">Time Range Selection</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-time-range-scroller
            v-model="timeRange"
            :locale="locale"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :dense="dense"
            :disable="disable"
            :no-border="noBorder"
            :no-shadow="noShadow"
            border-color="#3f51b5"
            bar-color="#FF0000"
            color="white"
            background-color="indigo-6"
            inner-color="indigo-6"
            inner-background-color="white"
            :hour24-format="hour24Format"
            :start-no-hours="noHours"
            :start-no-minutes="noMinutes"
            :end-no-hours="noHours"
            :end-no-minutes="noMinutes"
            style="height: 280px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 240px;">
        <q-card-section>
          <div class="text-h6">QTimeRangeScroller</div>
          <div class="text-subtitle2">Using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-input
            color="orange-6"
            filled
            v-model="timeRangeInput"
            label="Enter time ranges"
            mask="##:## - ##:##"
            :rules="[(value) => validateTime(value) || 'Invalid time format']"
          >
            <template v-slot:append>
              <q-icon name="far fa-clock" class="cursor-pointer">
                <q-popup-proxy v-model="showTimeRangeScroller">

                  <q-time-range-scroller
                    v-model="timeRangeInput"
                    :locale="locale"
                    :rounded-borders="roundedBorders"
                    :no-header="noHeader"
                    :no-footer="false"
                    :dense="dense"
                    :disable="disable"
                    :no-border="noBorder"
                    :no-shadow="noShadow"
                    border-color="#FF8C00"
                    bar-color="#FF8C00"
                    color="white"
                    background-color="orange-6"
                    inner-color="orange-6"
                    inner-background-color="white"
                    :hour24-format="hour24Format"
                    :start-no-hours="noHours"
                    :start-no-minutes="noMinutes"
                    :end-no-hours="noHours"
                    :end-no-minutes="noMinutes"
                    :style="scrollerPopupStyle200"
                    @close="() => { showTimeRangeScroller = false }"
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
            :short-year-label="shortYearLabel"
            :show-month-label="showMonthLabel"
            :short-month-label="shortMonthLabel"
            :short-day-label="shortDayLabel"
            :no-years="noYears"
            :no-months="noMonths"
            :no-days="noDays"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :dense="dense"
            :disable="disable"
            :no-border="noBorder"
            :no-shadow="noShadow"
            border-color="#607d8b"
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
                    :short-year-label="shortYearLabel"
                    :show-month-label="showMonthLabel"
                    :short-month-label="shortMonthLabel"
                    :short-day-label="shortDayLabel"
                    :no-years="noYears"
                    :no-months="noMonths"
                    :no-days="noDays"
                    :rounded-borders="roundedBorders"
                    :no-header="noHeader"
                    :no-footer="false"
                    :dense="dense"
                    :disable="disable"
                    :no-border="noBorder"
                    :no-shadow="noShadow"
                    border-color="#607d8b"
                    bar-color="grey"
                    color="grey-3"
                    background-color="grey-8"
                    inner-color="grey-8"
                    inner-background-color="grey-3"
                    :style="scrollerPopupStyle160"
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
          <div class="text-subtitle2">Date and Time Selection</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-date-time-scroller
            v-model="dateTime1"
            :locale="locale"
            :short-year-label="shortYearLabel"
            :show-month-label="showMonthLabel"
            :short-month-label="shortMonthLabel"
            :short-day-label="shortDayLabel"
            :no-years="noYears"
            :no-months="noMonths"
            :no-days="noDays"
            :hour24-format="hour24Format"
            :no-hours="noHours"
            :no-minutes="noMinutes"
            :rounded-borders="roundedBorders"
            :no-header="noHeader"
            :no-footer="noFooter"
            :dense="dense"
            :disable="disable"
            :no-border="noBorder"
            :no-shadow="noShadow"
            border-color="#009688"
            bar-color="#FFFF00"
            color="teal-6"
            background-color="white"
            inner-color="white"
            inner-background-color="teal-6"
            style="height: 280px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 340px;">
        <q-card-section>
          <div class="text-h6">QDateTimeScroller</div>
          <div class="text-subtitle2">Using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <q-input color="brown-8" filled v-model="dateTime1" label="Enter date and time" mask="####-##-## ##:##">
            <template v-slot:append>
              <q-icon name="far fa-calendar" class="cursor-pointer">
                <q-popup-proxy v-model="showDateTimeScroller">

                  <q-date-time-scroller
                    v-model="dateTime1"
                    :locale="locale"
                    :short-year-label="shortYearLabel"
                    :show-month-label="showMonthLabel"
                    :short-month-label="shortMonthLabel"
                    :short-day-label="shortDayLabel"
                    :no-years="noYears"
                    :no-months="noMonths"
                    :no-days="noDays"
                    :hour24-format="hour24Format"
                    :no-hours="noHours"
                    :no-minutes="noMinutes"
                    :rounded-borders="roundedBorders"
                    :no-header="noHeader"
                    :no-footer="false"
                    :dense="dense"
                    :disable="disable"
                    :no-border="noBorder"
                    :no-shadow="noShadow"
                    border-color="#795548"
                    bar-color="#FFFF00"
                    color="brown-6"
                    background-color="white"
                    inner-color="white"
                    inner-background-color="brown-6"
                    :style="scrollerPopupStyle280"
                    @close="() => { showDateTimeScroller = false }"
                  />

                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-card-section>
      </q-card>

      <!-- <q-card style="width: 100%; max-width: 240px;">
        <q-card-section>
          <div class="text-h6">QTime-Range-Scroller</div>
          <div class="text-subtitle2">Time Range Selection (TBD)</div>
        </q-card-section>
        <q-separator />
        <q-card-section>

          <div class="q-scroller--border row col-xl-2 col-sm-4 col-xs-12 q-pa-xs">
            <div class="col-6">
              <q-time-range-scroller
                v-model="timeRange"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                :no-shadow="noShadow"
                border-color="#FF0000"
                bar-color="#FF0000"
                color="white"
                background-color="red-6"
                inner-color="red"
                inner-background-color="white"
                :hour24-format="hour24Format"
                :no-hours="noHours"
                :no-minutes="noMinutes"
                start-min-time="05:00"
                end-max-time="24:00"
                style="height: 280px;"
              />
            </div>
            <div class="col-6">
              <q-time-scroller
                v-model="time4"
                :locale="locale"
                :no-header="true"
                :no-footer="true"
                :disable="disable"
                :no-border="true"
                :no-shadow="noShadow"
                border-color="#FF0000"
                bar-color="#FF0000"
                color="white"
                background-color="red-6"
                inner-color="red"
                inner-background-color="white"
                :hour24-format="hour24Format"
                :no-hours="noHours"
                :no-minutes="noMinutes"
                style="height: 280px;"
              />
            </div>
          </div>
        </q-card-section>
      </q-card> -->

      <!-- <q-card style="width: 100%; max-width: 320px; min-width: 320px;">
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
                :no-shadow="noShadow"
                border-color="#FFFF00"
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
                :no-shadow="noShadow"
                border-color="#FFFF00"
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
      </q-card> -->

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
      showTimeRangeScroller: false,
      showDateScroller: false,
      showDateTimeScroller: false,
      time1: '11:05',
      time2: '05:15',
      time3: '07:22',
      time4: '11:30',
      date1: '2019-04-03',
      date2: '2019-04-03',
      dateTime1: '2019-05-10 06:30',
      timeRange: ['09:05', '23:30'],
      timeRangeInput: '09:05 - 23:30',
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
      dense: 'scroller/dense',
      noBorder: 'scroller/noBorder',
      noShadow: 'scroller/noShadow',
      hour24Format: 'scroller/hour24Format',
      noHours: 'scroller/noHours',
      noMinutes: 'scroller/noMinutes',
      shortYearLabel: 'scroller/shortYearLabel',
      shortMonthLabel: 'scroller/shortMonthLabel',
      showMonthLabel: 'scroller/showMonthLabel',
      shortDayLabel: 'scroller/shortDayLabel',
      showWeekdayLabel: 'scroller/showWeekdayLabel',
      noYears: 'scroller/noYears',
      noMonths: 'scroller/noMonths',
      noDays: 'scroller/noDays'
    }),

    items () {
      return this.data
    },

    scrollerPopupStyle280 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '280px'
        }
      }
    },
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
    },
    scrollerPopupStyle160 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '160px'
        }
      }
    },
    scrollerPopupStyle120 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '120px'
        }
      }
    },
    scrollerPopupStyle100 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '100px'
        }
      }
    }
  },
  watch: {
    scrollerModel (val) {
      this.data = this.data.map(item => {
        item.iconRight = ''
        if (val === item.value) item.iconRight = 'check'
        return item
      })
    }
  },
  methods: {
    validateTime (timeString) {
      const parts = this.timeRangeInput.split('-')
      if (parts.length === 2) {
        const start = parts[0].trim()
        const end = parts[1].trim()
        if (this.isValidTime(start) && this.isValidTime(end)) {
          return true
        }
      }
      return false
    },
    isValidTime (time) {
      let parts = time.split(':')
      if (parts.length === 2) {
        let hour = parseInt(parts[0])
        let minute = parseInt(parts[1])
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
          return true
        }
      }
      return false
    }
  }
}
</script>
