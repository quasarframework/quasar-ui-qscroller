QScroller Components
===

> Please note, this is currently a work-in-progress (WIP) and not yet release to NPM as an installable package.

**QScroller** is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). There are many components avalable:
- QScroller
- QTimeScroller
- QTimeRangeScroller
- QDateScroller
- QDateRangeScroller
- QDateTimeScroller
- QDateTimeRangeScroller

# Features

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qscroller
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qscroller
```

# Describe
You can use:
- `quasar describe QScroller`
- `quasar describe QTimeScroller`
- `quasar describe QTimeRangeScroller`
- `quasar describe QDateScroller`
- `quasar describe QDateRangeScroller`
- `quasar describe QDateTimeScroller`
- `quasar describe QDateTimeRangeScroller`

# Demo Project
Can be found [here](https://github.com/quasarframework/app-extension-qscroller/tree/master/demo).

# Demo
Can be found [here](/app-extension-qscroller/#/demo).

---

# Working with QScroller

In order to get the best mileage from QScroller and all of its components it is important to understand all aspects which will be described below.

First and foremost, it should also be known that the native date format used internally, and with the v-model, is `YYYY-mm-dd` to avoid confusion with positioning of the day and month in other date formats. All incoming and outgoing dates will use this format.

The default locale of QDateTimeScroller is **en-us**. This can easily be changed via the `locale` property. Any area of each scroller that displays text and numbers is locale-aware.

## QScroller

![QScroller](statics/q-scroller.png =200x200)

The QScroller component is made to take any type of arbitray data and display it in a list-like manner so an item can be selected. All other scrollers have this base functionality. Some scrollers, will be based on multiple instances of this functionality.

Each row in a scroller instance is a **QBtn**. As a result of this, you have all of the properties available to you as you would for QBtn. However, this only applies to QScroller as the other scrollers generate data for selection (being based on dates and times).

The data pushed into the `items` propery of the QScroller component is an array of objects, that looks like the properties for QBtn. Only the `value` property is required if you pass in an array of objects. Alternatively, you can pass in an array of strings if you don't care about special handling and just want the default handling.

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

When this property is available, this is what will be displayed to the User, but when seleected, it's the `value` that will updated using the emit for the `input` event.

Then, your `v-model` variable should contain a `value` from your list for an initial selection. And, the `v-model` variable will be populated with  `value` data upon user selection.

## QTimeScroller

![QTimeScroller](statics/q-time-scroller.png =200x200) ![QTimeScroller-ampm](statics/q-time-scroller-ampm.png =200x200)

## QTimeRangeScroller

![QTimeRangeScroller](statics/q-time-range-scroller.png =200x200) ![QTimeRangeScroller-ampm](statics/q-time-range-scroller-ampm.png =200x200)

## QDateScroller

![QDateScroller](statics/q-date-scroller.png =200x200)

## QDateRangeScroller

## QDateTimeScroller

![QDateTimeScroller](statics/q-date-time-scroller.png =300x300) ![QDateTimeScroller-ampm](statics/q-date-time-scroller-ampm.png =300x300)

## Locale

## Colorizing

# API

## Common Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| border-color | String | #ccc | This is the color of outside border when `no-border` property is not `true`. This **has** to be a css color (not a Quasar color) or css color name (see note below) |
| bar-color | String | #ccc | This is the color of the middle bars. This **has** to be a css color (not a Quasar color) or css color name (see note below) |
| color | String | white | This is the color of the text. Applies to header and footer. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |
| background-color | String | primary | This is the color of the background. Applies to header and footer. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |
| inner-color | String | primary | This is the color of the scroller text. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |
| inner-background-color | String | white | This is the color of the scroller background. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |
| dense | Boolean | | If the component should be in dense mode |
| disable | Boolean | | If the component should be disabled |
| rounded-border | Boolean | | If the component should have rounded corners |
| no-border | Boolean | | If the component should not have a border |
| no-shadow | Boolean | | If the component should not display shadow when header/footer are displayed |
| no-header | Boolean | | If the component should not display the header |
| no-footer | Boolean | | If the component should not display the footer |

> Note: When `css color or from the Quasar color palette` is used, you cannot use css named colors (ex: ghostwhite) as it will be interpreted as a Quasar color.

## QScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | String | | (required) v-model |
| items | Array | | (required) The items to display in the scroller |
| disabled-items | Array | | Items in the list that are to be disabled |

### QScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |
| input |  | |  |
| close |  | | Occurs when the footer button is clicked, usually used to close the component (in dev land) when used in a `QPopupProxy` |

### QScroller Vue Methods

| Property | Arg | Description |
| :--- | :---: | --- |
| canMovePrevious |  |Returns true if can move to the previous item, otherwise returns false |
| canMoveNext |  |Returns true if can move to the next item, otherwise returns false |
| previous |  |Move to the previous item |
| next |  |Move to the next item |
| getItemIndex | value |Returns the index of the passed value, otherwise returns -1 on error or not found|
| getCurrentIndex | | Returns the index of the current selection, otherwise returns -1 on error or not found

### QScroller Vue Slots

| Property | Arg | Description |
| :--- | :---: | :---: | --- |
| header | value | Header scoped slot |
| footer | value | Footer scoped slot |

## QTimeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | String | | (required) v-model in the form of `hh:mm` |
| items | Array | | (required) The items to display in the scroller |
| disabled-items | Array | | Items in the list that are to be disabled |
| locale | String | en-us | The locale to use |
| hour24-format | Boolean | true | If time should be in 24 hour format |
| am-pm-labels | Array | ['AM', 'PM'] | If `hour24-format` is false, the labels to be used for AM and PM |
| minute-interval | String, Number | 1 | The minute interval step |
| hour-interval | String, Number | 1 | The hour interval step |
| short-time-label | Boolean |  | If displayed time in the header should be in a short format |
| disabled-hours | Array | [ ] | Hours that should be disabled (always use 0 through to 23) |
| disabled-minutes | Array | [ ] | Minutes that should be disabled (always use 0 through to 59) |
| no-hours | Boolean | | Do not show the Hours scroller |
| no-minutes | Boolean | | Do not show the Minutes scroller |
| hours | Array | | (TBD) Array of hours to be displayed |
| minutes | Array | | (TBD) Array of minutes to be displayed |
| min-time | String | '00:00' | (TBD) Any time before this time will be disabled |
| max-time | String | '24:00' | (TBD) Any time after this time will be disabled |

## QTimeRangeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | Array | | v-model in the form of `[hh:mm, hh:mm]` or `hh:mm<>hh:mm` where `<>` is the `display-separator` property |
| display-separator | String | ' - ' | Use to parse the two time values in `v-model` when a String is passed in. Used when displaying the time range in the header, and used in the emit of selected time range (when String v-model is used) |
| start-minute-interval | Number, String | 1 | |
| start-hour-interval | Number, String | 1 | TBD |
| start-short-time-label | Boolean | - | |
| start-disabled-minutes | Array | [ ] | |
| start-no-minutes | Boolean | - | |
| start-no-hours | Boolean | - | |
| start-hours | Array | - | TBD |
| start-minutes | Array | - | TBD |
| start-min-time | String | '00:00' | TBD |
| start-max-time | String | '24:00' | TBD |
| end-minute-interval | Number, String | 1 | |
| end-hour-interval | Number, String | 1 | TBD |
| end-short-time-label | Boolean | - | |
| end-disabled-minutes | Array | [ ] | |
| end-no-minutes | Boolean | - | |
| end-no-hours | Boolean | - | |
| end-hours | Array | - | TBD |
| end-minutes | Array | - | TBD |
| end-min-time | String | '00:00' | TBD |
| end-max-time | String | '24:00' | TBD |

## QDateScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | String | | v-model in the form of `YYYY-mm-dd` |
| min-date | String | | The minimum date to display in the form of `YYYY-mm-dd` |
| max-date | String | | The maximum date to display in the form of `YYYY-mm-dd` |
| disabled-years | Array | [ ] | Array of numbers or strings for years that should be disabled |
| disabled-months | Array | [ ] | Array of numbers or strings for months that should be disabled (note: this is 1-based) |
| disabled-days | Array | [ ] | Array of numbers or strings for days that should be disabled |
| short-year-label | Boolean | | If displayed year in the header should be in a short format |
| short-month-label | Boolean | | If displayed month in the header should be in a short format |
| short-day-label | Boolean | | If displayed day in the header should be in a short format |
| show-month-label | Boolean | | If displayed month should be displayed as a string in the locale format |
| short-month-label | Boolean | | If displayed weekday should be displayed in short format |
| show-weekday-label | Boolean | | If displayed weekday should be displayed as a string in the locale format |
| no-year | Boolean | | Do not show the Year scroller |
| no-month | Boolean | | Do not show the Month scroller |
| no-day | Boolean | | Do not show the Day scroller |


## QDateRangeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | Array | - | v-model in the form of `[YYYY-mm-dd, YYYY-mm-dd]` |

## QDateTimeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| value | String | | v-model in the form of `YYYY-mm-dd hh:mm` |

## QTimeScroller

### QTimeScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

## QTimeRangeScroller

### QScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeRangeScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeRangeScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QTimeRangeScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

## QDateScroller

### QDateScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

## QDateRangeScroller

### QDateRangeScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateRangeScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateRangeScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateRangeScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

## QDateTimeScroller

### QDateTimeScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

## QDateTimeRangeScroller

### QDateTimeRangeScroller Vue Properties

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeRangeScroller Vue Events

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeRangeScroller Vue Methods

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |

### QDateTimeRangeScroller Vue Slots

| Property | Type | Default | Description |
| :--- | :---: | :---: | --- |
