// Mixins
import { QColorizeMixin } from 'q-colorize-mixin'

// Components
import ScrollerBase from './mixins/scroller-base'

// Util
import props from './utils/props'
import { QBtn, QResizeObserver } from 'quasar'

/* @vue/component */
export default {
  name: `QStringScroller`,

  mixins: [QColorizeMixin],

  props: {
    ...props.common,
    ...props.base,
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      headerHeight: 50,
      footerHeight: 50,
      bodyHeight: 100,
      height: 0
    }
  },

  mounted () {
    this.adjustBodyHeight()
  },

  computed: {
    style () {
      let style = {}
      style['--scroller-border-color'] = this.calculateColor(this.borderColor)
      style['--scroller-bar-color'] = this.calculateColor(this.barColor)
      return style
    }
  },

  watch: {
    noHeader () {
      this.adjustBodyHeight()
    },

    noFooter () {
      this.adjustBodyHeight()
    },

    height () {
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
      let self = this
      this.$nextTick(() => {
        this.headerHeight = this.noHeader === true ? 0 : this.$refs.header ? parseInt(window.getComputedStyle(this.$refs.header, null).getPropertyValue('height')) : 0
        this.footerHeight = this.noFooter === true ? 0 : this.$refs.footer ? parseInt(window.getComputedStyle(this.$refs.footer, null).getPropertyValue('height')) : 0
        this.height = parseInt(window.getComputedStyle(self.$el, null).getPropertyValue('height'))
        this.bodyHeight = this.height - this.headerHeight - this.footerHeight
      })
    },

    // -------------------------------
    // render functions
    // -------------------------------
    __renderScroller (h) {
      return h(ScrollerBase, {
        ref: 'scroller',
        props: {
          value: this.value,
          items: this.items,
          dense: this.dense,
          disable: this.disable,
          textColor: this.innerTextColor,
          color: this.innerColor,
          disabledTextColor: this.disabledTextColor,
          noCaps: this.noCaps
        },
        on: {
          ...this.$listeners
        }
      })
    },

    __renderBody (h) {
      return h('div', this.setBackgroundColor(this.innerColor, {
        staticClass: `q-scroller__horizontal-bar${this.dense ? '--dense' : ''} col full-width`,
        style: {
          height: `${this.bodyHeight}px`
        }
      }), [
        this.__renderScroller(h)
      ])
    },

    __renderHeader (h) {
      if (this.noHeader) return ''
      const slot = this.$scopedSlots.header
      return h('div', {
        ref: 'header',
        staticClass: (this.dense ? 'q-scroller__header--dense' : 'q-scroller__header') + ' justify-around items-center full-width q-pa-sm',
        class: {
          'shadow-20': this.noShadow === false
        },
        style: {
          maxHeight: this.dense ? '30px' : '50px',
          minHeight: this.dense ? '30px' : '50px'
        }
      }, slot ? slot(this.value) : [
        h('span', {
          staticClass: 'ellipsis'
        }, this.value)
      ])
    },

    // the close button
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
      const slot = this.$scopedSlots.footer
      return h('div', {
        ref: 'footer',
        staticClass: (this.dense ? 'q-scroller__footer--dense' : 'q-scroller__footer') + ' flex justify-around items-center full-width q-pa-xs',
        class: {
          'shadow-up-20': this.noShadow === false
        },
        style: {
          maxHeight: this.dense ? '30px' : '50px',
          minHeight: this.dense ? '30px' : '50px'
        }
      }, slot ? slot(this.value) : [
        this.__renderFooterButton(h)
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

    return h('div', this.setBothColors(this.textColor, this.color, {
      ref: 'scroller',
      staticClass: 'q-scroller',
      class: {
        'q-scroller__disabled': this.disable === true,
        'rounded-borders': this.roundedBorders === true,
        'q-scroller__border': this.noBorder !== true
      },
      style: this.style
    }), resize.concat([
      this.__renderHeader(h),
      this.__renderBody(h),
      this.__renderFooter(h)
    ]))
  }
}
