<template>
  <div id="size-control" v-if="dActiveElement.record && dActiveElement.uuid !== '-1'">
    <!-- 上左 -->
    <div class="square" v-if="dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'left-top')"
      :style="{
        left: left + 'px',
        top: top + 'px',
        cursor: 'nw-resize',
      }">
    </div>
    <!-- 上中 -->
    <div class="square" v-if="dActiveElement.record.dir === 'vertical' || dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'top')"
      :style="{
        left: left + width / 2 + 'px',
        top: top + 'px',
        cursor: 'n-resize'
      }">
    </div>
    <!-- 上右 -->
    <div class="square" v-if="dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'right-top')"
      :style="{
        left: left + width + 'px',
        top: top + 'px',
        cursor: 'ne-resize'
      }">
    </div>
    <!-- 中左 -->
    <div class="square" v-if="dActiveElement.record.dir === 'horizontal' || dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'left')"
      :style="{
        left: left + 'px',
        top: top + height / 2 + 'px',
        cursor: 'w-resize'
      }">
    </div>
    <!-- 中右 -->
    <div class="square" v-if="dActiveElement.record.dir === 'horizontal' || dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'right')"
      :style="{
        left: left + width + 'px',
        top: top + height / 2 + 'px',
        cursor: 'e-resize'
      }">
    </div>
    <!-- 下左 -->
    <div class="square" v-if="dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'left-bottom')"
      :style="{
        left: left + 'px',
        top: top + height + 'px',
        cursor: 'sw-resize'
      }">
    </div>
    <!-- 下中 -->
    <div class="square" v-if="dActiveElement.record.dir === 'vertical' || dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'bottom')"
      :style="{
        left: left + width / 2 + 'px',
        top: top + height + 'px',
        cursor: 's-resize'
      }">
    </div>
    <!-- 下右 -->
    <div class="square" v-if="dActiveElement.record.dir === 'all'"
	  	@mousedown="handlemousedown($event, 'right-bottom')"
      :style="{
        left: left + width + 'px',
        top: top + height + 'px',
        cursor: 'se-resize'
      }">
    </div>
    
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// 组件大小控制器
const NAME = 'size-control'

export default {
  name: NAME,
  data () {
    return {
      dirs: []
    }
  },
  computed: {
    ...mapGetters([
      'dActiveElement',
      'dWidgets'
    ]),
    left () {
      return parseInt(this.dActiveElement.left)
    },
    top () {
      return parseInt(this.dActiveElement.top)
    },
    width () {
      return parseInt(this.dActiveElement.record.width)
    },
    height () {
      return parseInt(this.dActiveElement.record.height)
    }
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'dResize',
      'initDResize',
      'dResize',
      'stopDResize'
    ]),
    handlemousedown (e, dirs) {
      e.stopPropagation()
      this.dirs = dirs.split('-')
      this.initDResize({
        startX: e.pageX,
        startY: e.pageY,
        originX: this.dActiveElement.left,
        originY: this.dActiveElement.top,
        width: this.width,
        height: this.height
      })

      document.addEventListener('mousemove', this.handlemousemove, true)
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.dResize({
        x: e.pageX,
        y: e.pageY,
        dirs: this.dirs
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.stopDResize()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#size-control
  position: absolute
  .square
    position: absolute
    width: 10px
    height: 10px
    z-index: 999
    background-color: $color-white
    outline: 1px solid $color-main
    transform: translateX(-50%) translateY(-50%)
</style>
