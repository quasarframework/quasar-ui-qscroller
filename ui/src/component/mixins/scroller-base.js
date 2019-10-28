// Mixins
import { QColorizeMixin } from 'q-colorize-mixin'

// Utils
import props from '../utils/props'
import { debounce, QBtn, QResizeObserver, scroll } from 'quasar'

// tree shake other scroll functions
const { getScrollPosition, setScrollPosition, getScrollTarget } = scroll

/*
  The list of items should be an object that has this format:
  {
    // value emitted back when selected
    // also value used for 'key' in loops, so should be unique
    value: [Number, String]
    label: String (if used, displayed over value, but value is used for the emit)
    disabled: Boolean,
    icon: String
    iconRight: String,
    noCaps: Boolean,
    align: ['left', 'right', 'center', 'around, 'between', 'evenly']
  }

  Alternatively, it can be a list of strings
*/

// this needs to match scroller.styl values
const ITEM_HEIGHT = 26
const ITEM_HEIGHT_DENSE = 24

export default {
  name: 'ScrollerBase',

  mixins: [QColorizeMixin],

  props: {
    ...props.common,
    ...props.scroller
  },

  data () {
    return {
      scrollTimer: null,
      height: 0,
      columnPadding: {},
      padding: 0
    }
  },

  mounted () {
    this.adjustColumnPadding()
    // if there is nothing selected, select the first one
    this.$nextTick(() => {
      if (!this.value && this.items.length > 0) {
        this.$emit('input', this.items[0].value)
      }
    })
  },

  computed: {
    selectedArea () {
      const width = parseInt(window.getComputedStyle(this.$el, null).getPropertyValue('width'), 10)
      const height = parseInt(window.getComputedStyle(this.$el, null).getPropertyValue('height'), 10)
      const top = height / 2 + this.itemHeight / 2
      return {
        x: 0,
        y: top,
        width: width,
        height: this.itemHeight,
        top: top,
        bottom: top + this.itemHeight,
        right: width,
        left: 0
      }
    },

    itemHeight () {
      return this.dense ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT
    }
  },

  watch: {
    height () {
      this.adjustColumnPadding()
    },

    value (val) {
      this.updatePosition()
    },

    items () {
      this.adjustColumnPadding()
    },

    dense () {
      this.adjustColumnPadding()
    }
  },

  methods: {
    /**
     *
     * @param {Number} dir if 1, direction is down, otherwise -1 up
     */
    move (dir) {
      if (dir === 1 || dir === -1) {
        const elem = this.currentElement()
        if (elem) {
          let scrollToEl
          if (dir === -1) {
            scrollToEl = elem.previousElementSibling
          } else {
            scrollToEl = elem.nextElementSibling
          }
          if (scrollToEl && scrollToEl.nodeName === 'BUTTON' && scrollToEl.innerText.length > 0) {
            clearTimeout(this.scrollTimer)
            const klass = `.q-scroller__item--selected${this.dense ? '--dense' : ''}`
            let selected = this.$el.querySelector(klass)
            while (selected) {
              selected.classList.remove(klass.slice(1))
              selected = this.$el.querySelector(klass)
            }
            const pos = getScrollPosition(this.$el) + (this.itemHeight * dir)
            setScrollPosition(this.$el, pos, 10)
            this.scrollTimer = setTimeout(() => {
              scrollToEl.classList.add(klass.slice(1))
              const items = this.items.filter(v => v.value === scrollToEl.innerText)
              if (items.length > 0 && items[0].disabled !== true) {
                this.$emit('input', items[0].value)
              }
            }, 350)
            return true
          }
        }
      }
      return false
    },

    currentElement () {
      const area = this.selectedArea
      const children = this.$el.children[0].children
      for (let index = 1; index < children.length - 1; ++index) {
        const rect = this.getElementOffsets(children[index], this.$el.children[0])
        if (this.intersectRect(area, rect)) {
          return children[index]
        }
      }
      return null
    },

    getElementOffsets (childEl, parentEl) {
      const target = getScrollTarget(childEl)
      const scrollTop = getScrollPosition(target)
      const top = childEl.offsetTop - scrollTop
      let offset = {}
      offset.x = childEl.offsetLeft
      offset.y = top
      offset.left = childEl.offsetLeft
      offset.right = childEl.offsetLeft + childEl.offsetWidth
      offset.top = top
      offset.bottom = top + childEl.offsetHeight
      offset.width = childEl.offsetWidth
      offset.height = childEl.offsetHeight

      return offset
    },

    intersectRect (r1, r2) {
      return !(r2.left > r1.right ||
               r2.right < r1.left ||
               r2.top > r1.bottom ||
               r2.bottom < r1.top)
    },

    onResize () {
      this.adjustColumnPadding()
    },

    canScroll (dir) {
      // dir=1 (down), dir=-1 (up)
      // can't scroll if on the last or first items or just 1 item available
      if (this.items && this.items.length > 1) {
        if (dir === 1) return this.value !== this.items[this.items.length - 1].value
        else return this.value !== this.items[0].value
      }
      return false // nothing to scroll
    },

    adjustColumnPadding () {
      let self = this

      const setPadding = (padding) => {
        self.columnPadding = {
          height: `${padding}px`
        }
      }

      const getPadding = () => {
        self.height = parseInt(window.getComputedStyle(self.$el.parentElement, null).getPropertyValue('height'), 10)
        self.padding = self.height / 2 - self.itemHeight / 2
        if (!isNaN(self.padding) && self.padding > -1) {
          setPadding(self.padding)
        }
      }

      getPadding()
      setTimeout(() => {
        self.updatePosition()
      }, 100)
    },

    wheelEvent (event) {
      if (this.disable !== true) {
        const dir = event.wheelDeltaY < 0 ? 1 : -1
        this.move(dir)
      }
      // always prevent default so whole page doesn't scroll if at end of list
      event.preventDefault()
    },

    getItemIndex (value) {
      return this.items.findIndex((item) => item.value === value)
    },

    getItemIndexFromEvent (event) {
      const top = event.target.scrollTop
      return Math.floor(top / this.itemHeight)
    },

    scrollEvent: debounce(function (event) {
      if (this.disable !== true) {
        const index = this.getItemIndexFromEvent(event)
        if (index > -1 && index < this.items.length) {
          const item = this.items[index]
          if (this.disable !== true && item.disabled !== true) {
            this.$emit('input', this.value)
          }
          event.preventDefault()
        } else {
          console.error(`QScroller: index (${index}) is out of bounds (${this.items.length})`)
        }
      }
    }, 400),

    clickEvent (item) {
      if (this.disable !== true && item.disabled !== true) {
        const elem = this.currentElement()
        if (elem) {
          if (elem.innerText === item.value) {

          } else {
            const klass = `q-scroller__item--selected${this.dense ? '--dense' : ''}`
            elem.classList.remove(klass)
            this.$emit('input', item.value)
          }
        }
      }
    },

    updatePosition () {
      let self = this
      setTimeout(() => {
        const klass = `.q-scroller__item--selected${self.dense ? '--dense' : ''}`
        let found
        let selected = self.$el.querySelector(klass)
        while (selected) {
          if (selected.innerText === self.value) {
            found = selected
          }
          selected.classList.remove(klass.slice(1))
          selected = this.$el.querySelector(klass)
        }
        if (found) {
          found.classList.add(klass.slice(1))
          const pos = found.offsetTop - self.padding
          setScrollPosition(self.$el, pos, 10)
        }
      }, 100)
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderItem (h, item) {
      return h(QBtn, {
        staticClass: `q-scroller__item${this.dense ? '--dense' : ''} justify-center align-center`,
        class: {
          'q-scroller__item--selected': !this.dense && (item.value === this.value || item.label === this.value),
          'q-scroller__item--disabled': !this.dense && (this.disable === true || item.disabled === true),
          'q-scroller__item--selected--dense': this.dense && (item.value === this.value || item.label === this.value),
          'q-scroller__item--disabled--dense': this.dense && (this.disable === true || item.disabled === true)
        },
        key: item.item,
        props: {
          'flat': true,
          'dense': true,
          'no-wrap': true,
          'label': item.label !== void 0 ? item.label : (item.value !== void 0 ? item.value : void 0),
          'disable': this.disable === true || item.disabled === true,
          'icon': item.icon !== void 0 ? item.icon : void 0,
          'icon-right': item.iconRight !== void 0 ? item.iconRight : void 0,
          'no-caps': item.noCaps !== void 0 ? item.noCaps : void 0,
          'align': item.align !== void 0 ? item.align : void 0,
          'color': (this.disable === true || (item.disabled !== void 0 && item.disabled === true)) && this.disabledTextColor !== void 0 ? this.disabledTextColor : void 0
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
    },

    __renderContents (h) {
      return h('div', this.setBothColors(this.textColor, void 0, {
        staticClass: 'q-scroller__body',
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
  },

  render (h) {
    const resize = [
      h(QResizeObserver, {
        props: { debounce: 0 },
        on: { resize: this.onResize }
      })
    ]

    return h('div', {
      staticClass: 'q-scroller__content scroll',
      on: {
        ...this.$listeners
      }
    }, resize.concat([
      this.__renderContents(h)
    ]))
  }
}
