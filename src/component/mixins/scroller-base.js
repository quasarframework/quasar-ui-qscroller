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

// this needs to match scroller.styl values
const ITEM_HEIGHT = 26
const ITEM_HEIGHT_DENSE = 21

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
  },

  watch: {
    height () {
      this.adjustColumnPadding(true)
    },

    value () {
      this.updatePosition()
    },

    items () {
      this.adjustColumnPadding(true)
      this.updatePosition()
    },

    dense () {
      this.adjustColumnPadding(true)
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
          const klass = `.q-scroller__item--selected${this.dense ? '--dense' : ''}`
          const selected = this.$el.querySelector(klass)
          if (selected) {
            selected.classList.remove(klass)
          }
          const itemHeight = selected ? selected.clientHeight : this.dense ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT
          const pos = getScrollPosition(this.$el) + (itemHeight * dir)
          setScrollPosition(this.$el, pos, 50)
          return true
        }
      }
      return false
    },

    onResize () {
      this.adjustColumnPadding(true)
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

    adjustColumnPadding (immediate = false) {
      let self = this
      const setPadding = (padding) => {
        self.columnPadding = {
          height: `${padding}px`
        }
      }

      const getPadding = () => {
        const itemHeight = self.dense ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT
        const height = self.height || self.$el.clientHeight
        self.padding = (height / 2) - (itemHeight / 2)
        if (!isNaN(self.padding) && self.padding > 0) {
          setPadding(self.padding)
        }
      }

      if (immediate) {
        getPadding()
      } else {
        this.$nextTick(() => {
          getPadding()
        })
      }
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
      const itemHeight = this.dense ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT
      return Math.round(top / itemHeight)
    },

    scrollEvent: debounce(function (event) {
      if (!this.noScrollEvent) {
        const index = this.getItemIndexFromEvent(event)
        if (index < this.items.length) {
          const value = this.items[index].value
          if (this.isDisabled(value)) return
          this.$emit('input', value)
        } else {
          console.error(`QScroller: index (${index}) is out of bounds (${this.items.length})`)
        }
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
      let self = this
      this.noScrollEvent = true
      setTimeout(() => {
        const klass = `.q-scroller__item--selected${self.dense ? '--dense' : ''}`
        const selected = self.$el.querySelector(klass)
        if (selected) {
          const pos = selected.offsetTop - self.padding
          setScrollPosition(self.$el, pos, 150)
          setTimeout(() => {
            self.noScrollEvent = false
          }, 250)
        }
      }, 10)
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderItem (h, item) {
      return h(QBtn, {
        staticClass: `q-scroller__item${this.dense ? '--dense' : ''} justify-center align-center`,
        class: {
          'q-scroller__item--selected': !this.dense && (item.value === this.value || item.display === this.value),
          'q-scroller__item--disabled': !this.dense && (this.disable === true || item.disabled === true),
          'q-scroller__item--selected--dense': this.dense && (item.value === this.value || item.display === this.value),
          'q-scroller__item--disabled--dense': this.dense && (this.disable === true || item.disabled === true)
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
