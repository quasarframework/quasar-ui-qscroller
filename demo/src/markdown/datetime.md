QScroller Components
===

QScroller is a [Quasar App Extension](https://v1.quasar-framework.org/app-extensions/introduction). There are many components avalable:
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

## QTimeScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | v-model in the form of `hh:mm` |

## QTimeRangeScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | Array | v-model in the form of `[hh:mm, hh:mm]` |

## QDateScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | v-model in the form of `YYYY-mm-dd` |

## QDateRangeScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | Array | v-model in the form of `[YYYY-mm-dd, YYYY-mm-dd]` |

## QDateTimeScroller Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | v-model in the form of `YYYY-mm-dd hh:mm` |

