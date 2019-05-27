(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["011ca09e"],{"3e63":function(e,n,r){"use strict";var o=r("dd4f"),t=r.n(o);t.a},"8b24":function(e,n,r){"use strict";r.r(n);var o=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",[e._m(0),r("main",{staticClass:"flex flex-start justify-center inset-shadow"},[r("div",{staticClass:"q-pa-md col-12-sm col-8-md col-6-lg inset-shadow",staticStyle:{width:"100%",height:"3px"}}),r("div",{staticClass:"q-pa-md col-12-sm col-8-md col-6-lg bg-white shadow-1",staticStyle:{"max-width":"800px",width:"100%"}},[r("q-markdown",{attrs:{src:e.markdown,toc:""},on:{data:e.onToc}})],1)])])},t=[function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("section",{staticClass:"page-header"},[r("h1",{staticClass:"project-name"},[e._v("QScroller")]),r("h2",{staticClass:"project-tagline"}),r("a",{staticClass:"btn",attrs:{href:"https://github.com/quasarframework/app-extension-qscroller",target:"_blank"}},[e._v("View on GitHub")]),r("a",{staticClass:"btn",attrs:{href:"/app-extension-qscroller/#/demo",target:"_blank"}},[e._v("Demo")])])}],a="QScroller Components\n===\n\n> Please note, this is currently a work-in-progress (WIP) and not yet release to NPM as an installable package.\n\n**QScroller** is a [Quasar App Extension](https://v1.quasar.dev/app-extensions/introduction). There are many components avalable:\n- QScroller\n- QTimeScroller\n- QTimeRangeScroller\n- QDateScroller\n- QDateRangeScroller\n- QDateTimeScroller\n- QDateTimeRangeScroller\n\n# Features\n\n# Install\nTo add this App Extension to your Quasar application, run the following (in your Quasar app folder):\n```\nquasar ext add @quasar/qscroller\n```\n\n# Uninstall\nTo remove this App Extension from your Quasar application, run the following (in your Quasar app folder):\n```\nquasar ext remove @quasar/qscroller\n```\n\n# Describe\nYou can use:\n- `quasar describe QScroller`\n- `quasar describe QTimeScroller`\n- `quasar describe QTimeRangeScroller`\n- `quasar describe QDateScroller`\n- `quasar describe QDateRangeScroller`\n- `quasar describe QDateTimeScroller`\n- `quasar describe QDateTimeRangeScroller`\n\n# Demo Project\nCan be found [here](https://github.com/quasarframework/app-extension-qscroller/tree/master/demo).\n\n# Demo\nCan be found [here](/app-extension-qscroller/#/demo).\n\n---\n\n# Working with QScroller\n\nIn order to get the best mileage from QScroller and all of its components it is important to understand all aspects which will be described below.\n\nFirst and foremost, it should also be known that the native date format used internally, and with the v-model, is `YYYY-mm-dd` to avoid confusion with positioning of the day and month in other date formats. All incoming and outgoing dates will use this format.\n\nThe default locale of QDateTimeScroller is **en-us**. This can easily be changed via the `locale` property. Any area of each scroller that displays text and numbers is locale-aware.\n\n## QScroller\n\n![QScroller](statics/q-scroller.png =200x200)\n\nThe QScroller component is made to take any type of arbitray data and display it in a list-like manner so an item can be selected. All other scrollers have this base functionality. Some scrollers, will be based on multiple instances of this functionality.\n\nEach row in a scroller instance is a **QBtn**. As a result of this, you have all of the properties available to you as you would for QBtn. However, this only applies to QScroller as the other scrollers generate data for selection (being based on dates and times).\n\nThe data pushed into the `items` propery of the QScroller component is an array of objects, that looks like the properties for QBtn. Only the `value` property is required if you pass in an array of objects. Alternatively, you can pass in an array of strings if you don't care about special handling and just want the default handling.\n\nExample:\n\n```js\ndata: [\n  { value: 'Anteater', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },\n  { value: 'Baboons', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },\n  { value: 'Cheetah', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },\n  { value: 'Chimpanzee', noCaps: true, icon: '', iconRight: '', disabled: false, align: 'around' },\n  ...\n]\n```\n\nThen, your `v-model` variable should contain a `value` from your list for an initial selection. And, the `v-model` variable will be populated with  `value` data upon user selection.\n\n## QTimeScroller\n\n![QTimeScroller](statics/q-time-scroller.png =200x200) ![QTimeScroller-ampm](statics/q-time-scroller-ampm.png =200x200)\n\n## QTimeRangeScroller\n\n![QTimeRangeScroller](statics/q-time-range-scroller.png =200x200) ![QTimeRangeScroller-ampm](statics/q-time-range-scroller-ampm.png =200x200)\n\n## QDateScroller\n\n![QDateScroller](statics/q-date-scroller.png =200x200)\n\n## QDateRangeScroller\n\n## QDateTimeScroller\n\n![QDateTimeScroller](statics/q-date-time-scroller.png =300x300) ![QDateTimeScroller-ampm](statics/q-date-time-scroller-ampm.png =300x300)\n\n## Locale\n\n## Colorizing\n\n# API\n\n## Common Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| border-color | String | #ccc | This is the color of outside border when `no-border` property is not `true`. This **has** to be a css color (not a Quasar color) or css color name (see note below) |\n| bar-color | String | #ccc | This is the color of the middle bars. This **has** to be a css color (not a Quasar color) or css color name (see note below) |\n| color | String | white | This is the color of the text. Applies to header and footer. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |\n| background-color | String | primary | This is the color of the background. Applies to header and footer. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |\n| inner-color | String | primary | This is the color of the scroller text. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |\n| inner-background-color | String | white | This is the color of the scroller background. It can be a css color `(#|((rgb|hsl)a)` or from the Quasar color palette |\n| dense | Boolean | | If the component should be in dense mode |\n| disable | Boolean | | If the component should be disabled |\n| rounded-border | Boolean | | If the component should have rounded corners |\n| no-border | Boolean | | If the component should not have a border |\n| no-shadow | Boolean | | If the component should not display shadow when header/footer are displayed |\n| no-header | Boolean | | If the component should not display the header |\n| no-footer | Boolean | | If the component should not display the footer |\n\n> Note: When `css color or from the Quasar color palette` is used, you cannot use css named colors (ex: ghostwhite) as it will be interpreted as a Quasar color.\n\n## QScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | String | | (required) v-model |\n| items | Array | | (required) The items to display in the scroller |\n| disabled-items | Array | | Items in the list that are to be disabled |\n\n### QScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n| input |  | |  |\n| close |  | | Occurs when the footer button is clicked, usually used to close the component (in dev land) when used in a `QPopupProxy` |\n\n### QScroller Vue Methods\n\n| Property | Arg | Description |\n| :--- | :---: | --- |\n| canMovePrevious |  |Returns true if can move to the previous item, otherwise returns false |\n| canMoveNext |  |Returns true if can move to the next item, otherwise returns false |\n| previous |  |Move to the previous item |\n| next |  |Move to the next item |\n| getItemIndex | value |Returns the index of the passed value, otherwise returns -1 on error or not found|\n| getCurrentIndex | | Returns the index of the current selection, otherwise returns -1 on error or not found\n\n### QScroller Vue Slots\n\n| Property | Arg | Description |\n| :--- | :---: | :---: | --- |\n| header | value | Header scoped slot |\n| footer | value | Footer scoped slot |\n\n## QTimeScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | String | | (required) v-model in the form of `hh:mm` |\n| items | Array | | (required) The items to display in the scroller |\n| disabled-items | Array | | Items in the list that are to be disabled |\n| locale | String | en-us | The locale to use |\n| hour24-format | Boolean | true | If time should be in 24 hour format |\n| am-pm-labels | Array | ['AM', 'PM'] | If `hour24-format` is false, the labels to be used for AM and PM |\n| minute-interval | String, Number | 1 | The minute interval step |\n| hour-interval | String, Number | 1 | The hour interval step |\n| short-time-label | Boolean |  | If displayed time in the header should be in a short format |\n| disabled-hours | Array | [ ] | Hours that should be disabled (always use 0 through to 23) |\n| disabled-minutes | Array | [ ] | Minutes that should be disabled (always use 0 through to 59) |\n| no-hours | Boolean | | Do not show the Hours scroller |\n| no-minutes | Boolean | | Do not show the Minutes scroller |\n| hours | Array | | (TBD) Array of hours to be displayed |\n| minutes | Array | | (TBD) Array of minutes to be displayed |\n| min-time | String | '00:00' | (TBD) Any time before this time will be disabled |\n| max-time | String | '24:00' | (TBD) Any time after this time will be disabled |\n\n## QTimeRangeScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | Array | | v-model in the form of `[hh:mm, hh:mm]` or `hh:mm<>hh:mm` where `<>` is the `display-separator` property |\n| display-separator | String | ' - ' | Use to parse the two time values in `v-model` when a String is passed in. Used when displaying the time range in the header, and used in the emit of selected time range (when String v-model is used) |\n| start-minute-interval | Number, String | 1 | |\n| start-hour-interval | Number, String | 1 | TBD |\n| start-short-time-label | Boolean | - | |\n| start-disabled-minutes | Array | [ ] | |\n| start-no-minutes | Boolean | - | |\n| start-no-hours | Boolean | - | |\n| start-hours | Array | - | TBD |\n| start-minutes | Array | - | TBD |\n| start-min-time | String | '00:00' | TBD |\n| start-max-time | String | '24:00' | TBD |\n| end-minute-interval | Number, String | 1 | |\n| end-hour-interval | Number, String | 1 | TBD |\n| end-short-time-label | Boolean | - | |\n| end-disabled-minutes | Array | [ ] | |\n| end-no-minutes | Boolean | - | |\n| end-no-hours | Boolean | - | |\n| end-hours | Array | - | TBD |\n| end-minutes | Array | - | TBD |\n| end-min-time | String | '00:00' | TBD |\n| end-max-time | String | '24:00' | TBD |\n\n## QDateScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | String | | v-model in the form of `YYYY-mm-dd` |\n| min-date | String | | The minimum date to display in the form of `YYYY-mm-dd` |\n| max-date | String | | The maximum date to display in the form of `YYYY-mm-dd` |\n| disabled-years | Array | [ ] | Array of numbers or strings for years that should be disabled |\n| disabled-months | Array | [ ] | Array of numbers or strings for months that should be disabled (note: this is 1-based) |\n| disabled-days | Array | [ ] | Array of numbers or strings for days that should be disabled |\n| short-year-label | Boolean | | If displayed year in the header should be in a short format |\n| short-month-label | Boolean | | If displayed month in the header should be in a short format |\n| short-day-label | Boolean | | If displayed day in the header should be in a short format |\n| show-month-label | Boolean | | If displayed month should be displayed as a string in the locale format |\n| short-month-label | Boolean | | If displayed weekday should be displayed in short format |\n| show-weekday-label | Boolean | | If displayed weekday should be displayed as a string in the locale format |\n| no-year | Boolean | | Do not show the Year scroller |\n| no-month | Boolean | | Do not show the Month scroller |\n| no-day | Boolean | | Do not show the Day scroller |\n\n\n## QDateRangeScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | Array | - | v-model in the form of `[YYYY-mm-dd, YYYY-mm-dd]` |\n\n## QDateTimeScroller Vue Properties\n\n| Vue Property | Type | Default | Description |\n| --- | :---: | :---: | --- |\n| value | String | | v-model in the form of `YYYY-mm-dd hh:mm` |\n\n## QTimeScroller\n\n### QTimeScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n## QTimeRangeScroller\n\n### QScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeRangeScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeRangeScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QTimeRangeScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n## QDateScroller\n\n### QDateScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n## QDateRangeScroller\n\n### QDateRangeScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateRangeScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateRangeScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateRangeScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n## QDateTimeScroller\n\n### QDateTimeScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n## QDateTimeRangeScroller\n\n### QDateTimeRangeScroller Vue Properties\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeRangeScroller Vue Events\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeRangeScroller Vue Methods\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n\n### QDateTimeRangeScroller Vue Slots\n\n| Property | Type | Default | Description |\n| :--- | :---: | :---: | --- |\n",l={name:"PageIndex",data:function(){return{markdown:a}},computed:{toc:{get:function(){return this.$store.state.common.toc},set:function(e){this.$store.commit("common/toc",e)}}},methods:{onToc:function(e){this.toc=e}}},s=l,i=(r("3e63"),r("2877")),c=Object(i["a"])(s,o,t,!1,null,null,null);n["default"]=c.exports},dd4f:function(e,n,r){}}]);