import Vue from 'vue'

// Styles
import '../scroller.styl'

// Directives
import Resize from '../directives/resize'

// Mixins
import Colorize from '../mixins/colorize'

// Utils
import props from '../utils/props'
import { debounce, QBtn, scroll } from 'quasar'

// tree shake other scroll functions
const { getScrollPosition, setScrollPosition } = scroll

/*
  The list of items should be an object that has this format:
  {
    // value emitted back when selected
    // also value used for 'key' in loops
    value: [Number, String]
    display: String (if used, displayed over value, but vakue is used for the emit)
    disabled: Boolean,
    icon: String
    iconRight: String,
    noCaps: Boolean,
    align: ['left', 'right', 'center', 'around, 'between']
  }

  Alternatively, it can be a list of strings
*/

const ITEM_HEIGHT = 26

export default Vue.extend({
  name: 'scroller-base',

  directives: { Resize },

  mixins: [Colorize],

  props: {
    ...props.scroller
  },

  data () {
    return {
      noScrollEvent: false, // prevent scrolling when updating position
      columnPadding: {},
      padding: 0
    }
  },

  mounted () {
    this.adjustColumnPadding()
    this.updatePosition()
  },

  computed: {
    //
  },

  watch: {
    height () {
      this.adjustColumnPadding()
    },

    value () {
      this.updatePosition()
    },

    items () {
      this.adjustColumnPadding()
      this.updatePosition()
    }
  },

  methods: {
    /**
     *
     * @param {Number} dir if 1, direction is down, otherwise -1 up
     */
    move (dir) {
      if (this.noScrollEvent === false && (dir === 1 || dir === -1)) {
        if (this.disable !== true && this.canScroll(dir)) {
          const selected = this.$el.querySelector('.q-scroller__item--active')
          if (selected) {
            selected.classList.remove('q-scroller__item--active')
          }
          const pos = getScrollPosition(this.$el) + (ITEM_HEIGHT * dir)
          setScrollPosition(this.$el, pos, 50)
          return true
        }
      }
      return false
    },

    onResize () {
      this.adjustColumnPadding()
    },

    canScroll (dir) {
      // dir=1, down
      // dir=-1, up
      // can't scroll if on the last or first items or just 1 item available
      if (this.items && this.items.length > 1) {
        if (dir === 1) return this.value !== this.items[this.items.length - 1].value
        else return this.value !== this.items[0].value
      }
      return false // nothing to scroll
    },

    adjustColumnPadding () {
      const run = (padding) => {
        this.columnPadding = {
          height: `${padding}px`
        }
      }
      this.$nextTick(() => {
        let height = this.height
        if (height === void 0) {
          height = this.$parent.$el.clientHeight
        }
        this.padding = this.height / 2 - (ITEM_HEIGHT / 2)
        if (!isNaN(this.padding) && this.padding > 0) {
          run(this.padding)
        }
      })
    },

    wheelEvent (event) {
      if (this.move(event.wheelDeltaY < 0 ? 1 : -1)) {
        this.$emit(this.value)
      }
      // always prevent default so whole page doesn't scroll if at end of list
      event.preventDefault()
    },

    getItemIndex (value) {
      return this.items.findIndex((item) => item.value === value)
    },

    getItemIndexFromEvent (event) {
      const top = event.target.scrollTop
      return Math.floor(top / ITEM_HEIGHT)
    },

    scrollEvent: debounce(function (event) {
      if (!this.noScrollEvent) {
        const index = this.getItemIndexFromEvent(event)
        const value = this.items[index].value
        if (this.isDisabled(value)) return
        this.$emit('input', value)
      }
    }, 250),

    clickEvent (item) {
      if (this.disable !== true && item.disabled === false) {
        this.$emit('input', item.value)
      }
    },

    isDisabled (value) {
      // value is guaranteed to be in the list (it's where it came from)
      return this.disable === true || this.items.find(item => item.value === value).disabled
    },

    updatePosition () {
      this.noScrollEvent = true
      setTimeout(() => {
        const selected = this.$el.querySelector('.q-scroller__item--active')
        if (selected) {
          const selectedOffsetTop = selected.offsetTop - this.padding + ITEM_HEIGHT
          const clientHeight = selected.clientHeight
          const pos = selectedOffsetTop - (clientHeight / 2) - (ITEM_HEIGHT / 2)
          setScrollPosition(this.$el, pos, 150)
        }
        this.noScrollEvent = false
      }, 0)
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderItem (h, item) {
      // let data = item
      // if (typeof item !== 'object' && typeof item === 'string') {
      //   data = { value: item, disable: false }
      // }
      return h(QBtn, {
        staticClass: 'q-scroller__item justify-center align-center',
        class: {
          'q-scroller__item--active': item.value === this.value || item.display === this.value,
          'q-scroller__item--disabled': this.disable === true || item.disabled === true
        },
        key: item.item,
        props: {
          'flat': true,
          'dense': true,
          'no-wrap': true,
          'label': item.display !== void 0 ? item.display : (item.value !== void 0 ? item.value : void 0),
          'disable': this.disable === true || item.disabled === true,
          'icon': item.icon !== void 0 ? item.icon : void 0,
          'icon-right': item.iconRight !== void 0 ? item.iconRight : void 0,
          'no-caps': item.noCaps !== void 0 ? item.noCaps : void 0,
          'align': item.align !== void 0 ? item.align : void 0
        },
        on: {
          'click': () => this.clickEvent(item)
        }
      })
    },
    __renderPadding (h) {
      return h('div', {
        staticClass: 'q-scroller__padding',
        style: this.columnPadding
      })
    }
  },

  render (h) {
    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      staticClass: 'q-scroller-base text-center col scroll no-scrollbars',
      style: {
        height: `${this.height}px`
      },
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.onResize
      }],
      on: {
        mousewheel: (event) => this.wheelEvent(event),
        scroll: (event) => this.scrollEvent(event)
      }
    }), [
      this.__renderPadding(h),
      this.items.map(item => this.__renderItem(h, item)),
      this.__renderPadding(h)
    ])
  }
})
