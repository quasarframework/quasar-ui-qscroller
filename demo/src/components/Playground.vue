<template>
  <div class="row justify-left" style="width: 100%;">
    <q-dialog v-model="displayLocale">
      <q-card style="min-width: 300px;">
        <q-toolbar class="bg-blue-8 text-grey-1">
          <q-toolbar-title>
            Current local: <strong>{{ displayedLocale }}</strong>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="text-caption">
          Enter a new locale:
        </q-card-section>
        <q-card-section>
          <q-input v-model="locale" autofocus label="Locale"></q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-toggle
      class="col-12"
      v-model="roundedBorders"
      label="Rounded borders"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noBorder"
      label="No border"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noShadow"
      label="No shadow"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="dense"
      label="Dense"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="disable"
      label="Disable"
    ></q-toggle>
    <q-btn
      dense
      label="Change locale"
      @click="displayLocale = true"
      class="col-12"
    ></q-btn>
    <q-toggle
      class="col-12"
      v-model="verticalBar"
      label="Vertical Bar"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noHeader"
      label="Hide header"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noFooter"
      label="Hide footer"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="hour24Format"
      label="24h format"
    ></q-toggle>
      <q-toggle
      class="col-12"
      v-model="noHours"
      label="No hours"
    ></q-toggle>
        <q-toggle
      class="col-12"
      v-model="noMinutes"
      label="No minutes"
    ></q-toggle>
    <!-- <q-toggle
      class="col-12"
      v-model="shortYearLabel"
      label="Short year label"
    ></q-toggle>
      <q-toggle
      class="col-12"
      v-model="shortMonthLabel"
      label="Short month label"
    ></q-toggle>
      <q-toggle
      class="col-12"
      v-model="shortDayLabel"
      label="Short day label"
    ></q-toggle>
      <q-toggle
      class="col-12"
      v-model="showWeekdayLabel"
      label="Show weekday label"
    ></q-toggle> -->
        <q-toggle
      class="col-12"
      v-model="noYears"
      label="No years"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noMonths"
      label="No months"
    ></q-toggle>
        <q-toggle
      class="col-12"
      v-model="noDays"
      label="No days"
    ></q-toggle>
  </div>
</template>

<script>
import { Platform } from 'quasar'

export default {
  name: 'Playground',
  data () {
    return {
      displayLocale: false
    }
  },
  mounted () {
    if (Platform.is.mobile) {
    }
  },
  computed: {
    displayedLocale () {
      if (this.locale === void 0 || this.locale === '') {
        return 'en-US'
      }
      return this.locale
    },
    view:
    {
      get () {
        return this.$store.state.scroller.view
      },
      set (view) {
        this.$store.commit('scroller/view', view)
      }
    },
    locale:
    {
      get () {
        return this.$store.state.scroller.locale
      },
      set (locale) {
        this.$store.commit('scroller/locale', locale)
      }
    },
    roundedBorders:
    {
      get () {
        return this.$store.state.scroller.roundedBorders
      },
      set (b) {
        this.$store.commit('scroller/roundedBorders', b)
      }
    },
    borderColor:
    {
      get () {
        return this.$store.state.scroller.borderColor
      },
      set (color) {
        this.$store.commit('scroller/borderColor', color)
      }
    },
    barColor:
    {
      get () {
        return this.$store.state.scroller.barColor
      },
      set (color) {
        this.$store.commit('scroller/barColor', color)
      }
    },
    color:
    {
      get () {
        return this.$store.state.scroller.color
      },
      set (color) {
        this.$store.commit('scroller/color', color)
      }
    },
    backgroundColor:
    {
      get () {
        return this.$store.state.scroller.backgroundColor
      },
      set (color) {
        this.$store.commit('scroller/backgroundColor', color)
      }
    },
    innerColor:
    {
      get () {
        return this.$store.state.scroller.innerColor
      },
      set (color) {
        this.$store.commit('scroller/innerColor', color)
      }
    },
    innerBackgroundColor:
    {
      get () {
        return this.$store.state.scroller.innerBackgroundColor
      },
      set (color) {
        this.$store.commit('scroller/innerBackgroundColor', color)
      }
    },
    verticalBar: {
      get () {
        return this.$store.state.scroller.verticalBar
      },
      set (b) {
        return this.$store.commit('scroller/verticalBar', b)
      }
    },
    noHeader:
    {
      get () {
        return this.$store.state.scroller.noHeader
      },
      set (b) {
        this.$store.commit('scroller/noHeader', b)
      }
    },
    noFooter:
    {
      get () {
        return this.$store.state.scroller.noFooter
      },
      set (b) {
        this.$store.commit('scroller/noFooter', b)
      }
    },
    dense: {
      get () {
        return this.$store.state.scroller.dense
      },
      set (b) {
        this.$store.commit('scroller/dense', b)
      }
    },
    disable: {
      get () {
        return this.$store.state.scroller.disable
      },
      set (b) {
        this.$store.commit('scroller/disable', b)
      }
    },
    noBorder:
    {
      get () {
        return this.$store.state.scroller.noBorder
      },
      set (b) {
        this.$store.commit('scroller/noBorder', b)
      }
    },
    noShadow:
    {
      get () {
        return this.$store.state.scroller.noShadow
      },
      set (b) {
        this.$store.commit('scroller/noShadow', b)
      }
    },
    // -----------
    selectedDate:
    {
      get () {
        return this.$store.state.scroller.selectedDate
      },
      set (date) {
        this.$store.commit('scroller/selectedDate', date)
      }
    },
    shortDayLabel: {
      get () {
        return this.$store.state.scroller.shortDayLabel
      },
      set (b) {
        this.$store.commit('scroller/shortDayLabel', b)
      }
    },
    shortMonthLabel: {
      get () {
        return this.$store.state.scroller.shortMonthLabel
      },
      set (b) {
        this.$store.commit('scroller/shortMonthLabel', b)
      }
    },
    showMonthLabel: {
      get () {
        return this.$store.state.scroller.showMonthLabel
      },
      set (b) {
        this.$store.commit('scroller/showMonthLabel', b)
      }
    },
    shortYearLabel: {
      get () {
        return this.$store.state.scroller.shortYearLabel
      },
      set (b) {
        this.$store.commit('scroller/shortYearLabel', b)
      }
    },
    showWeekdayLabel: {
      get () {
        return this.$store.state.scroller.showWeekdayLabel
      },
      set (b) {
        this.$store.commit('scroller/showWeekdayLabel', b)
      }
    },
    noDays: {
      get () {
        return this.$store.state.scroller.noDays
      },
      set (b) {
        this.$store.commit('scroller/noDays', b)
      }
    },
    noMonths: {
      get () {
        return this.$store.state.scroller.noMonths
      },
      set (b) {
        this.$store.commit('scroller/noMonths', b)
      }
    },
    noYears: {
      get () {
        return this.$store.state.scroller.noYears
      },
      set (b) {
        this.$store.commit('scroller/noYears', b)
      }
    },
    // -----------
    selectedTime:
    {
      get () {
        return this.$store.state.scroller.selectedTime
      },
      set (time) {
        this.$store.commit('scroller/selectedTime', time)
      }
    },
    hour24Format: {
      get () {
        return this.$store.state.scroller.hour24Format
      },
      set (b) {
        this.$store.commit('scroller/hour24Format', b)
      }
    },
    noMinutes: {
      get () {
        return this.$store.state.scroller.noMinutes
      },
      set (b) {
        this.$store.commit('scroller/noMinutes', b)
      }
    },
    noHours: {
      get () {
        return this.$store.state.scroller.noHours
      },
      set (b) {
        this.$store.commit('scroller/noHours', b)
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
