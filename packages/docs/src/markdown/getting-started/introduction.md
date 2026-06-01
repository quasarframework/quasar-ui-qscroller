---
title: Introduction
desc: What is QScroller
keys: Getting Started
related:
  - /getting-started/installation-types
  - /developing/qscroller
---

## What is QScroller

QScroller is a Quasar component package for building compact wheel-style inputs. It includes
string, time, date, date-time, and range scrollers that feel at home inside forms, dialogs, and
dense control panels.

Use it when a native select, date picker, or time input is too blunt for the interaction you want.
The scrollers keep the current value centered, make nearby values visible, and support keyboard-like
previous/next controls without requiring a full calendar or menu overlay.

## Components

- `QScroller` chooses the right scroller from its `view` prop.
- `QStringScroller` scrolls through a fixed list of string options.
- `QTimeScroller` and `QTimeRangeScroller` handle time values and time ranges.
- `QDateScroller`, `QDateTimeScroller`, and `QDateRangeScroller` handle date-focused values.

Each component can be styled with Quasar palette colors, dense mode, disabled items, intervals, and
range validation options.
