QScroller
===

> Please note, this is currently a very much work-in-progress (WIP). This component recently went through a very rigorous rewrite/refactor to improve on some issues. The documentation and examples will continuously be improved.

::: warning
If you were using a previous version, please read the information below for converting to the new version, in particular the `view` property. This may be the only change you need to make (hopefully). If you used the property `hour24-format` the default is now 24 hour format. If you want 12 hour format, use the new `hour12` property.
:::

**QScroller** is a powerful selection component that plugs right into your Quasar application.

# Features
There are many sub-views available within the component:
- string
- time
- time-range
- date
- date-range
- date-time

# Installation Types

## Quasar CLI

**App Extension**

:::
#### Install

To add as an App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qscroller
```

#### Uninstall

To remove as an App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qscroller
```

#### Describe
When installed as an App Extension, you can use `quasar describe QScroller`
:::

**OR**:

:::
Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'

Vue.use(Plugin)
```
:::

**OR**:

:::
```html
<style src="@quasar/quasar-ui-qscroller/dist/index.css"></style>

<script>
import { QScroller } from '@quasar/quasar-ui-qscroller'

export default {
  components: {
    QScroller
  }
}
</script>
```
:::

## Vue CLI project

:::
```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qscroller'
import '@quasar/quasar-ui-qscroller/dist/index.css'

Vue.use(Plugin)
```
:::

**OR**:

:::
```html
<style src="@quasar/quasar-ui-qscroller/dist/index.css"></style>

<script>
import { QScroller } from '@quasar/quasar-ui-qscroller'

export default {
  components: {
    QScroller
  }
}
</script>
```
:::

## UMD variant

Exports `window.QScroller`.

Add the following tag(s) after the Quasar ones:

:::
```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qscroller/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```
:::

[UMD Example on Codepen](https://codepen.io/Hawkeye64/pen/QWWaaqd)

# Information

## Docs
Can be found [here](https://quasarframework.github.io/quasar-ui-qscroller).

## Examples
Can be found [here](https://quasarframework.github.io/quasar-ui-qscroller/examples).

## Interactive Demo
Can be found [here](https://quasarframework.github.io/quasar-ui-qscroller/demo).

## Demo (source) Project
Can be found [here](https://github.com/quasarframework/quasar-ui-qscroller/tree/master/demo).

---

# Converting from previous version

From **v1.0.4** to **v1.0.5**:

You no longer need to do this:
```js
import { Component as QScroller } from '@quasar/quasar-ui-qscroller'
```
instead you can do this:
```js
import { QScroller } from '@quasar/quasar-ui-qscroller'
```
---

From **beta** to **v1.0.0**:

- `hour24-format` no longer exists. The default is now a 24-hour clock. If you wish to show a 12-hour clock, use the `hour12` property
- `color` has been renamed `text-color`
- `background-color` has been renamed `color`
- `inner-color` has been renamed `inner-text-color`
- `inner-background-color` has been renamed to `inner-color`
- some properties have been temporarily removed: `short-year-label`, `short-month-label`, `short-day-label`, and `show-weekday-label`. Other properties that were not programmed have also been removed (ie: min/max props)

---

# Working with QScroller

In order to get the best potential from QScroller it is important to understand all aspects which will be described below.

First and foremost, the native date format used internally for date-types, and with the v-model, is `YYYY-mm-dd`. This is to avoid confusion with positioning of the day and month in other date format locales as well as date separator. All incoming and outgoing dates will use this format.

The internal time format used internally for time-types is 24-hour clock (`HH:mm`) or also known as military time.

The default locale of QScroller is **en-us**. This can easily be changed via the `locale` property. Any area of each scroller that displays text and numbers is locale-aware.

The external div of the Scroller is set to take 100% width and height. Therefore, it is very important to either wrap it with a width/height controlling div, or set the height and width via the `style` attribute:

```html
    <q-scroller
      v-model="value"
      view="date"
      style="max-width: 280px; height: 200px;"
    ></q-scroller>
```

QScroller can also be customized with any sort of color. Whether it be from the [Quasar Color Pallete](https://quasar.dev/style/color-palette), CSS named color (ie: `ghostwhite`), any rgb(a), hls(a) or # color (`#ccc`).

# QScroller views

QScroller has a property `view` which can take one of the following:
- string
- time
- time-range
- date
- date-range
- date-time


## string view

![QScroller](statics/q-scroller.png =200x200)


The `string` view can take any type of arbitray data and display it in a list-like manner so an item can be selected. All other scrollers have this base functionality. Some scrollers, will be based on multiple instances of this functionality.

Each row in a scroller instance is a **QBtn**. As a result of this, you have all of the properties available to you as you would for QBtn. However, this only applies to `string` view as the other scrollers generate data for selection (being based on dates and times).

The data pushed into the `items` propery of the `string` view is an array of objects, that looks like the properties for **QBtn**. Only the `value` property is required when you pass in an array of objects.

Example:

```js
data: [
  { value: 'Anteater', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },
  { value: 'Baboons', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },
  { value: 'Cheetah', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },
  { value: 'Chimpanzee', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },
  ...
]
```

Additionally, there is one other property that can be added to the array of objects and this is the `display` property.

For example:
```js
{ value: '1', display: 'Anteater', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },
```

When this property is available, this is what will be displayed to the User, but when selected, it's the `value` that will updated using the emit for the `input` event.

Then, your `v-model` variable should contain a `value` from your list for an initial selection. And, the `v-model` variable will be populated with `value` data upon user selection. If your `v-model` does not contain a proper match, the first item in the list will automatically be selected.

## time view

![Time view](statics/q-time-scroller.png =200x200) ![Time view-ampm](statics/q-time-scroller-ampm.png =200x200)

When `view="time"` the scroller will show the current time clock. If the `v-model` contains an empty string, the current time will be selected. And, the emit for `input` will be a string.

Using the `hour12` property will show the ante meridiem (AM) and post meridiem (PM) periods. To change the values of `AM` or `PM`, use the `am-pm-labels` property.

The `v-model` can take types containing String, Array, Object, or Date. See the `v-model` section below on usage.

## time-range view

![time-range view](statics/q-time-range-scroller.png =200x200) ![time-range view-ampm](statics/q-time-range-scroller-ampm.png =200x200)

When `view="time-range"` the scroller will show the current time clock in a start and an end section. If the `v-model` contains an empty string, the current time will be selected. And, the emit for `input` will be a string.

Using the `hour12` property will show the ante meridiem (AM) and post meridiem (PM) periods. To change the values of `AM` or `PM`, use the `am-pm-labels` property.

If the end section becomes less than the start section, a color indicator will be used. You can change the color using the `error-color` and `error-text-color` properties. Should this occur, the `invalid-range` event will be emitted. It contains an object with keys `startDate` and `endDate` which contains the string representation of the times.

The `v-model` can take an array of types containing String, Array, Object, or Date. See the `v-model` section below on usage.

## date view

![date view](statics/q-date-scroller.png =200x200)

When `view="date"` the scroller will show dates. If the `v-model` contains an empty string, the current date will be selected. And, the emit for `input` will be a string. The default is 5 years before and after the current date. You can control this with the `year-begin` and `year-stop` properties.

The `v-model` can take types containing String, Array, Object, or Date. See the `v-model` section below on usage.

## date-range view

![date-range view](statics/q-date-range-scroller.png =300x300)

When `view="date-range"` the scroller will show the dates in a start and end section. If the `v-model` contains an empty string, the current date will be selected for both. And, the emit for `input` will be a string. The default is 5 years before and after the current date. You can control this with the `start-year-begin`, `start-year-stop`, `end-year-begin` and `end-year-stop` properties for the respective start and end sections.

If the end section becomes less than the start section, a color indicator will be used. You can change the color using the `error-color` and `error-text-color` properties. Should this occur, the `invalid-range` event will be emitted. It contains an object with keys `startDate` and `endDate` which contains the string representation of the currently selected dates.

The `v-model` can take an array of types containing String, Array, Object, or Date. See the `v-model` section below on usage.


## date-time view

![date-time view](statics/q-date-time-scroller.png =300x300) ![date-time view-ampm](statics/q-date-time-scroller-ampm.png =300x300)

When `view="date-time"` the scroller will show date and time selection. If the `v-model` contains an empty string, the current date and time will be selected. And the emit for `input` will be a string. The default is 5 years before and after the current date. You can control this with the `year-begin` and `year-stop` properties.

Using the `hour12` property will show the ante meridiem (AM) and post meridiem (PM) periods. To change the values of `AM` or `PM`, use the `am-pm-labels` property.

The `v-model` can take types containing String, Array, Object, or Date. See the `v-model` section below on usage.

# Locale

The default locale is `en-us`. To change it, use the `locale` property and pass an appropriate locale.

# Colorizing

Anywhere you see a `color`-type property, this refers to the background. `text-color` refers to the foreground, or text, color.

For any color property, you can use any color from the [Quasar Color Pallete](https://quasar.dev/style/color-palette), CSS named color, any rgb(a), hls(a) or # color.

# Error indicator

Whenever a date or time range is used, the sections are known as `start` and `end`. If the `end` section is less than the `start` section, the `color` and `text-color` will change to indicate an error. The defaults are variants of red. You can change this to your own color by setting the `error-color` and `error-text-color` respectively.

Also, when this occurs, the the `invalid-range` will be emitted with an object containing the data from the start and end sections.

You can turn off the error checking by setting the `disable-validation` property.

# Disable

When the property `disable` is used, you may find that the default disable color of `grey-7` makes it difficult to see the text, based on your selected background color. In situations like this, you can use the `disabled-text-color` property to change it to something more visible.

# v-model
For all view types, except `string`, you can pass `v-model` data as a `String`, `Object`, `Array` or `Date`. Whatever is passed in will be the same as passed out in the `input` event. If `v-model` is an empty string, then the `String` type will be used.

All numbers can be `Number` or `String` (quoted) values; examples below of mixed values.

Where `view="time"` you can use one of the following for `v-model`:

```js
  data () {
    return {
      valueStr: '09:00',
      valueObj: { hour: '09', minute: '10' },
      valueArr: [ '09', '20'],
      valueDate: new Date()
    }
  },
```

Where `view="date"` you can use one of the following for `v-model`:

```js
  data () {
    return {
      valueStr: '2020-10-01',
      valueObj: { year: '2020', month: '11', day: 10 },
      valueArr: [ 2020, 12, '25'],
      valueDate: new Date()
    }
  },
```

Where `view="time-range"` you can use one of the following for `v-model`:

```js
  data () {
    return {
      valueStr: ['09:00','09:00'],
      valueObj: [{ hour: '09', minute: '10' },{ hour: '09', minute: '10' }],
      valueArr: [[ '09', '20'],[ '09', '20']],
      valueDate: [new Date(), new Date()]
    }
  },
```

Where `view="date-range"` you can use one of the following for `v-model`:

```js
  data () {
    return {
      valueStr: [ '2020-10-01', '2020-10-01' ],
      valueObj: [{ year: '2020', month: '11', day: 10 }, { year: '2020', month: '11', day: 10 }],
      valueArr: [[ 2020, 12, '25' ], [ 2020, 12, '25' ]],
      valueDate: [new Date(), new Date()]
    }
  },
```

And finally, where `view="date-time"` you can use one of the following for `v-model`:

```js
  data () {
    return {
      valueStr: '2020-10-01 10:10',
      valueObj: { year: '2020', month: '11', day: 10, hour: 12, minute: 35 },
      valueArr: [ 2020, 12, '25', '08', '05'],
      valueDate: new Date()
    }
  },
```

::: info
Whatever format is used for the `v-model` will be the same format returned via the `input` emit.
:::
