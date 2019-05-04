QScroller Components
===

> Please note, this is currently a work-in-progress (WIP) and not yet release to NPM as an installable package.

**QScroller** is a [Quasar App Extension](https://v1.quasar-framework.org/app-extensions/introduction). There are many components avalable:
- QScroller
- QTimeScroller
- QTimeRangeScroller
- QDateScroller
- QDateRangeScroller
- QDateTimeScroller

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

# Demo Project
Can be found [here](https://github.com/quasarframework/app-extension-qscroller/tree/master/demo).

# Demo
Can be found [here](/#/demo).

** Everything below is to be rewritten **
---

# Working with QScroller

In order to get the best mileage from QScroller it is important to understand all aspects which will be described below.

First and foremost, it should also be known that the native date format used internally, and with the v-model, is `YYYY-mm-dd` to avoid confusion with positioning of the day and month in other date formats. All incoming and outgoing dates will use this format.

The default locale of QDateTimeScroller is **en-us**. This can easily be changed via the `locale` property. Any area of QDateTimeScroller that displays text and numbers is locale-aware.

## QScroller

## QTimeScroller

## QTimeRangeScroller

## QDateScroller

## QDateRangeScroller

## QDateTimeScroller

## Locale

## Colorizing

# API

## Common Vue Properties

| Vue Property | Type | Default | Description |
| --- | --- | --- | --- |
| bar-color | String | #ccc | This is the color of the middle bars. This **has** to be a css color (not a Quasar color) or css color name |
| color | String | white | This is the color of the text. Applies to header and footer. It can be a css color or from the Quasar color palette |
| background-color | String | primary | This is the color of the background. Applies to header and footer. It can be a css color or from the Quasar color palette |
| inner-color | String | primary | This is the color of the scroller text. It can be a css color or from the Quasar color palette |
| inner-background-color | String | white | This is the color of the scroller background. It can be a css color or from the Quasar color palette |
| disable | Boolean | | If the component should be disabled |
| rounded-border | Boolean | | If the component should have rounded corners |
| no-border | Boolean | | If the component should not have a border |
| no-header | Boolean | | If the component should not display the header |
| no-footer | Boolean | | If the component should not display the footer |

> Note: When `css color or from the Quasar color palette` is used, you cannot use css named colors (ex: ghostwhite) as it will be interpreted as a Quasar color.

## QScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | (required) v-model |
| items | Array | (required) The items to display in the scroller |
| disabled-items | Array | Items in the list that are to be disabled |

## QTimeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | --- | --- | --- |
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
| hours | Array | | Array of hours to be displayed |
| minutes | Array | | Array of minutes to be displayed |
| min-time | String | '00:00' | Any time before this time will be disabled |
| max-time | String | '24:00' | Any time after this time will be disabled |

## QTimeRangeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | --- | --- | --- |
| value | Array | | v-model in the form of `[hh:mm, hh:mm]` |

## QDateScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | --- | --- | --- |
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
| --- | --- | --- | --- |
| value | Array | | v-model in the form of `[YYYY-mm-dd, YYYY-mm-dd]` |

## QDateTimeScroller Vue Properties

| Vue Property | Type | Default | Description |
| --- | --- | --- | --- |
| value | String | | v-model in the form of `YYYY-mm-dd hh:mm` |

