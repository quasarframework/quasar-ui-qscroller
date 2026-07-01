<template>
  <div class="q-pa-md calendar-adapters">
    <section class="calendar-adapters__intro">
      <div>
        <div class="text-overline text-primary">Timestamp calendar adapters</div>
        <h3>{{ activeCalendar.label }}</h3>
        <p>
          Use string scrollers for native calendar parts, then let the Timestamp adapter convert the
          selected date for storage, comparison, or Gregorian interop.
        </p>
      </div>

      <div class="calendar-adapters__selector" role="group" aria-label="Calendar system">
        <button
          v-for="calendar in calendarExamples"
          :key="calendar.id"
          class="calendar-adapters__choice"
          :class="{ 'calendar-adapters__choice--active': calendar.id === calendarId }"
          type="button"
          :aria-pressed="calendar.id === calendarId"
          @click="setCalendar(calendar.id)"
        >
          <span class="calendar-adapters__choice-kicker">{{ calendar.shortLabel }}</span>
          <span class="calendar-adapters__choice-label">{{ calendar.label }}</span>
        </button>
      </div>
    </section>

    <section class="calendar-adapters__workspace">
      <div class="calendar-adapters__scrollers">
        <q-string-scroller
          v-bind="scrollerTheme"
          :key="`year-${calendarId}`"
          :value="yearValue"
          :items="yearItems"
          class="calendar-adapters__scroller"
          dense
          no-caps
          no-footer
          @input="setYear"
        >
          <template #header>
            <div class="calendar-adapters__scroller-label">Year</div>
          </template>
        </q-string-scroller>

        <q-string-scroller
          v-bind="scrollerTheme"
          :key="`month-${calendarId}`"
          :value="monthValue"
          :items="monthItems"
          class="calendar-adapters__scroller"
          dense
          no-caps
          no-footer
          @input="setMonth"
        >
          <template #header>
            <div class="calendar-adapters__scroller-label">Month</div>
          </template>
        </q-string-scroller>

        <q-string-scroller
          v-bind="scrollerTheme"
          :key="`day-${calendarId}`"
          :value="dayValue"
          :items="dayItems"
          class="calendar-adapters__scroller"
          dense
          no-caps
          no-footer
          @input="setDay"
        >
          <template #header>
            <div class="calendar-adapters__scroller-label">Day</div>
          </template>
        </q-string-scroller>
      </div>

      <q-list bordered separator class="calendar-adapters__summary rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Native calendar date</q-item-label>
            <q-item-label>{{ nativeDateLabel }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Gregorian equivalent</q-item-label>
            <q-item-label>{{ gregorianDateLabel }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected month length</q-item-label>
            <q-item-label>{{ daysInSelectedMonth }} days</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Selected month name</q-item-label>
            <q-item-label>{{ selectedMonthLabel }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Adapter package</q-item-label>
            <q-item-label>{{ activeCalendar.packageName }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </section>

    <section class="calendar-adapters__preview">
      <h4>Month preview</h4>
      <div class="calendar-adapters__days">
        <button
          v-for="day in daysInMonth"
          :key="day"
          class="calendar-adapters__day"
          :class="{ 'calendar-adapters__day--active': day === activeSelection.day }"
          type="button"
          @click="setDay(day)"
        >
          {{ day }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { QStringScroller } from '@quasar/quasar-ui-qscroller'
import {
  formatCalendarDate,
  getCalendarMonthNames,
  gregorianCalendar,
  type CalendarDateParts,
  type CalendarSystem,
} from '@timestamp-js/core'
import { hebrewCalendar } from '@timestamp-js/calendar-hebrew'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'
import '@quasar/quasar-ui-qscroller/src/index.scss'

type CalendarId = 'hebrew' | 'islamic-civil' | 'saka'

interface CalendarExample {
  id: CalendarId
  label: string
  shortLabel: string
  packageName: string
  calendar: CalendarSystem
  locale: string
}

interface CalendarSelection {
  year: number
  month: number
  day: number
}

const calendarExamples: CalendarExample[] = [
  {
    id: 'islamic-civil',
    label: 'Islamic Civil (Hijri)',
    shortLabel: 'Hijri',
    packageName: '@timestamp-js/calendar-islamic',
    calendar: islamicCivilCalendar,
    locale: 'en-US',
  },
  {
    id: 'saka',
    label: 'Indian National (Saka)',
    shortLabel: 'Saka',
    packageName: '@timestamp-js/calendar-saka',
    calendar: indianNationalCalendar,
    locale: 'en-US',
  },
  {
    id: 'hebrew',
    label: 'Hebrew',
    shortLabel: 'Hebrew',
    packageName: '@timestamp-js/calendar-hebrew',
    calendar: hebrewCalendar,
    locale: 'en-US',
  },
]

const calendarId = ref<CalendarId>('islamic-civil')
const yearRangeRadius = 30
const scrollerTheme = {
  barColor: 'color-mix(in srgb, var(--q-primary) 42%, transparent)',
  borderColor: 'color-mix(in srgb, currentColor 30%, transparent)',
  color: 'color-mix(in srgb, var(--q-primary) 28%, transparent)',
  innerColor: 'color-mix(in srgb, currentColor 5%, transparent)',
  innerTextColor: 'currentColor',
  textColor: 'currentColor',
}
const selections = reactive<Record<CalendarId, CalendarSelection>>({
  'islamic-civil': {
    year: 1445,
    month: 9,
    day: 15,
  },
  saka: {
    year: 1946,
    month: 1,
    day: 15,
  },
  hebrew: {
    year: 5785,
    month: 1,
    day: 15,
  },
})
const yearAnchors: Record<CalendarId, number> = {
  'islamic-civil': selections['islamic-civil'].year,
  saka: selections.saka.year,
  hebrew: selections.hebrew.year,
}

const activeCalendar = computed(
  () => calendarExamples.find((entry) => entry.id === calendarId.value) ?? calendarExamples[0],
)
const activeSelection = computed(() => selections[calendarId.value])
const yearValue = computed(() => String(activeSelection.value.year))
const daysInSelectedMonth = computed(() =>
  activeCalendar.value.calendar.daysInMonth(
    activeSelection.value.year,
    activeSelection.value.month,
  ),
)
const daysInMonth = computed(() =>
  Array.from({ length: daysInSelectedMonth.value }, (_, index) => index + 1),
)
const nativeDate = computed<CalendarDateParts>(() => ({
  year: activeSelection.value.year,
  month: activeSelection.value.month,
  day: activeSelection.value.day,
}))
const gregorianDate = computed(() =>
  gregorianCalendar.fromEpochDay(activeCalendar.value.calendar.toEpochDay(nativeDate.value)),
)
const nativeDateLabel = computed(() => formatCalendarDate(nativeDate.value))
const gregorianDateLabel = computed(() => formatCalendarDate(gregorianDate.value))
const yearItems = computed(() =>
  Array.from(
    { length: yearRangeRadius * 2 + 1 },
    (_, index) => yearAnchors[calendarId.value] - yearRangeRadius + index,
  ).map((year) => ({
    label: String(year),
    value: String(year),
  })),
)
const monthLabels = computed(() =>
  getCalendarMonthNames(
    activeCalendar.value.calendar,
    'long',
    activeCalendar.value.locale,
    activeSelection.value.year,
  ),
)
const monthItems = computed(() =>
  monthLabels.value.map((month, index) => {
    const monthNumber = index + 1
    const label = String(monthNumber).padStart(2, '0')

    return {
      label,
      value: label,
    }
  }),
)
const dayItems = computed(() =>
  daysInMonth.value.map((day) => {
    const label = String(day).padStart(2, '0')

    return {
      label,
      value: label,
    }
  }),
)
const monthValue = computed(() => monthItems.value[activeSelection.value.month - 1]?.value ?? '')
const dayValue = computed(() => dayItems.value[activeSelection.value.day - 1]?.value ?? '')
const selectedMonthLabel = computed(
  () => monthLabels.value[activeSelection.value.month - 1] ?? 'Unknown month',
)

function setCalendar(value: CalendarId) {
  calendarId.value = value
}

function setYear(value: unknown) {
  activeSelection.value.year = Number(value)
  clampSelection()
}

function setMonth(value: unknown) {
  activeSelection.value.month = parseNumericPrefix(value)
  clampDay()
}

function setDay(value: unknown) {
  activeSelection.value.day = parseNumericPrefix(value)
}

function parseNumericPrefix(value: unknown) {
  return parseInt(String(value), 10)
}

function clampSelection() {
  const monthsInYear = activeCalendar.value.calendar.monthsInYear(activeSelection.value.year)
  if (activeSelection.value.month > monthsInYear) {
    activeSelection.value.month = monthsInYear
  }
  clampDay()
}

function clampDay() {
  if (activeSelection.value.day > daysInSelectedMonth.value) {
    activeSelection.value.day = daysInSelectedMonth.value
  }
}
</script>

<style scoped lang="scss">
.calendar-adapters {
  display: grid;
  gap: 24px;
}

.calendar-adapters__intro,
.calendar-adapters__workspace {
  display: grid;
  gap: 20px;
}

.calendar-adapters__intro {
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  align-items: end;
}

.calendar-adapters__intro h3,
.calendar-adapters__preview h4 {
  margin: 0;
}

.calendar-adapters__intro p {
  margin: 8px 0 0;
  max-width: 68ch;
}

.calendar-adapters__selector {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.calendar-adapters__choice {
  background: color-mix(in srgb, currentColor 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--q-primary) 55%, currentColor 18%);
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  display: grid;
  gap: 2px;
  min-height: 64px;
  padding: 10px 12px;
  text-align: left;
}

.calendar-adapters__choice:hover,
.calendar-adapters__choice:focus-visible {
  border-color: var(--q-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--q-primary) 22%, transparent);
  outline: none;
}

.calendar-adapters__choice--active {
  background: color-mix(in srgb, var(--q-primary) 18%, transparent);
  border-color: var(--q-primary);
}

.calendar-adapters__choice-kicker {
  color: var(--q-primary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calendar-adapters__choice-label {
  font-size: 0.86rem;
  line-height: 1.25;
}

.calendar-adapters__workspace {
  grid-template-columns: minmax(280px, 1fr) minmax(240px, 340px);
  align-items: stretch;
}

.calendar-adapters__scrollers {
  display: grid;
  grid-template-columns: repeat(3, minmax(96px, 1fr));
  gap: 12px;
}

.calendar-adapters__scroller {
  height: 260px;
  min-width: 0;
}

.calendar-adapters__scroller-label {
  color: var(--q-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
}

.calendar-adapters__summary {
  align-self: center;
}

.calendar-adapters__preview {
  display: grid;
  gap: 12px;
}

.calendar-adapters__days {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(44px, 1fr));
  gap: 8px;
}

.calendar-adapters__day {
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  min-height: 36px;
}

.calendar-adapters__day--active {
  background: var(--q-primary);
  border-color: var(--q-primary);
  color: white;
  font-weight: 700;
}

@media (max-width: 780px) {
  .calendar-adapters__intro,
  .calendar-adapters__workspace {
    grid-template-columns: 1fr;
  }
}
</style>
