import Vue from 'vue'

// Styles
import './scroller.styl'

// Directives
import Resize from './directives/resize'

// Mixins
import Colorize from './mixins/colorize'

// Components
import ScrollerBase from './mixins/scroller-base'

// Util
import props from './utils/props'
import { QBtn } from 'quasar'

/* @vue/component */
export default Vue.extend({
  name: `q-scroller`,

  directives: { Resize },

  mixins: [Colorize],

  props: {
    ...props.base,
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      headerFooterHeight: 100,
      bodyHeight: 100
    }
  },

  mounted () {
    this.adjustBodyHeight()
  },

  computed: {
  },

  watch: {
    noHeader () {
      this.adjustBodyHeight()
    },

    noFooter () {
      this.adjustBodyHeight()
    },

    dense () {
      this.adjustBodyHeight()
    }
  },

  methods: {
    canMovePrevious () {
      if (this.$refs.scroller) {
        return this.$refs.scroller.canScroll(-1)
      }
      return false
    },

    canMoveNext () {
      if (this.$refs.scroller) {
        return this.$refs.scroller.canScroll(1)
      }
      return false
    },

    previous () {
      if (this.$refs.scroller) {
        return this.$refs.scroller.move(-1)
      }
      return false
    },

    next () {
      if (this.$refs.scroller) {
        return this.$refs.scroller.move(1)
      }
      return false
    },

    getItemIndex (value) {
      if (this.$refs.scroller) {
        return this.$refs.scroller.getItemIndex(value)
      }
      return -1
    },

    getCurrentIndex () {
      return this.getItemIndex(this.value)
    },

    onResize () {
      this.adjustBodyHeight()
    },

    adjustBodyHeight () {
      this.$nextTick(() => {
        let headerHeight = this.noHeader ? 0 : this.$refs.header ? this.$refs.header.clientHeight : 0
        let footerHeight = this.noFooter ? 0 : this.$refs.footer ? this.$refs.footer.clientHeight : 0
        this.headerFooterHeight = headerHeight + footerHeight
        const parentHeight = this.$refs.scroller ? window.getComputedStyle(this.$refs.scroller, null).getPropertyValue('height') : 0
        this.bodyHeight = parseInt(parentHeight) - this.headerFooterHeight
      })
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.header
      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' flex justify-around items-center full-width ellipsis q-pa-xs',
        class: {
          'shadow-20': this.noShadow === false
        }
      }, slot ? slot(this.value) : [
        this.value
      ])
    },

    // the cancel/ok buttons
    __renderFooterButton (h) {
      return [
        h(QBtn, {
          staticClass: 'q-scroller__cancel-btn q-ml-xs',
          props: {
            'flat': true,
            'dense': true,
            'round': true,
            'icon': 'close'
          },
          on: {
            'click': () => {
              this.$emit('close')
            }
          }
        })
      ]
    },

    __renderFooter (h) {
      if (this.noFooter) return ''
      const slot = this.$slots.footer
      return h('div', {
        ref: 'footer',
        staticClass: (this.dense ? 'q-scroller__footer--dense' : 'q-scroller__footer') + ' flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-up-20': this.noShadow === false
        }
      }, slot ? slot(this.value) : [
        this.__renderFooterButton(h)
      ])
    },

    __renderScroller (h) {
      return h(ScrollerBase, {
        ref: 'scroller',
        props: {
          value: this.value,
          items: this.items,
          height: this.bodyHeight,
          dense: this.dense,
          disable: this.disable,
          color: this.innerColor,
          backgroundColor: this.innerBackgroundColor
        },
        on: {
          // ...this.$listeners
          input: (val) => this.$emit('input', val)
        }
      })
    },

    __renderBody (h) {
      // container that wraps all the scroller in flex, unless noScroller is true
      return h('div', this.setBackgroundColor(this.innerBackgroundColor, {
        staticClass: `q-scroller__body q-scroller__horizontal-bar${this.dense ? '--dense' : ''} row full-width`,
        style: {
          height: `${this.bodyHeight}px`
        }
      }), [
        this.__renderScroller(h)
      ])
    }
  },

  render (h) {
    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      ref: 'scroller',
      staticClass: 'q-scroller flex',
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.onResize
      }],
      class: {
        'rounded-borders': this.roundedBorders === true,
        'q-scroller--border': this.noBorder !== true
      },
      style: {
        '--scroller-border-color': this.borderColor,
        '--scroller-bar-color': this.barColor
      }
    }), [
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ])
  }
})
