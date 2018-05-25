<template>
  <div id="ref-line" v-show="dShowRefLine">
    <!-- 横线 -->
    <div 
      class="horizontal" 
      :key="item.id" 
      v-for="item in horizontal"
      :style="{
        left: '0px',
        top: item.value + 'px',
        width: dPage.width + 'px'
      }"
      v-show="attachHoriz(item.value)">
    </div>

    <!-- 竖线 -->
    <div 
      class="vertical" 
      :key="item.id" 
      v-for="item in vertical"
      :style="{
        left: item.value + 'px',
        top: '0px',
        height: dPage.height + 'px'
      }"
      v-show="attachVerti(item.value)"></div>
  </div>
</template>

<script>
// 组件移动参考线
const NAME = 'ref-line'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'dActiveElement',
      'dShowRefLine',
      'dWidgets',
      'dPage'
    ]),
    widgets () {
      // 记录可以参与计算参考线的组件
      let widgetsList = []

      if (this.dActiveElement.parent === '-1') {
        // 如果父容器是page，则先记录一下page
        widgetsList.push({
          uuid: this.dPage.uuid,
          width: this.dPage.width,
          height: this.dPage.height,
          top: 0,
          left: 0
        })
      }

      this.dWidgets.forEach(item => {
        if (item.uuid === this.dActiveElement.uuid || item.parent !== this.dActiveElement.parent) {
          // 排除当前选中的组件和父容器不一样的组件
          return
        }

        // 记录组件宽高以及位置
        widgetsList.push({
          uuid: item.uuid,
          width: item.record.width,
          height: item.record.height,
          top: item.top,
          left: item.left
        })
      })

      return widgetsList
    },
    /**
     * 获取水平方向的参考线
     *
     * 取父容器中线以及每个组件上中下的y坐标
     * 排除当前选中的组件
     * 排除重复坐标
     */
    horizontal () {
      let widgets = this.widgets
      let lines = []
      let yList = []

      widgets.forEach(item => {
        // 保存组件的上中下的y坐标
        let ys = [item.top, item.top + item.height, item.top + item.height / 2]

        for (let i = 0; i < ys.length; ++i) {
          if (yList.indexOf(ys[i]) === -1) {
            yList.push(ys[i])
            lines.push({
              id: `horizontal-${item.uuid}-${i}`,
              value: ys[i]
            })
          }
        }
      })

      return lines
    },
    /**
     * 获取垂直方向的参考线
     *
     * 取父容器中线以及每个组件左中右的x坐标
     * 排除当前选中的组件
     * 排除重复坐标
     */
    vertical () {
      let widgets = this.widgets
      let lines = []
      let xList = []

      widgets.forEach(item => {
        // 保存组件的左中右的x坐标
        let xs = [item.left, item.left + item.width, item.left + item.width / 2]

        for (let i = 0; i < xs.length; ++i) {
          if (xList.indexOf(xs[i]) === -1) {
            xList.push(xs[i])
            lines.push({
              id: `vertical-${item.uuid}-${i}`,
              value: xs[i]
            })
          }
        }
      })

      return lines
    },
    // 当前组件的上中下y坐标
    activeHoriz () {
      if (this.dActiveElement) {
        let top = this.dActiveElement.top
        let height = this.dActiveElement.record.height
        return [top, top + height / 2, top + height]
      } else {
        return []
      }
    },
    // 当前组件的左中右x坐标
    activeVerti () {
      if (this.dActiveElement) {
        let left = this.dActiveElement.left
        let width = this.dActiveElement.record.width
        return [left, left + width / 2, left + width]
      } else {
        return []
      }
    }
  },
  methods: {
    attachHoriz (value) {
      return this.activeHoriz.some(y => Math.abs(y - value) <= 1)
    },
    attachVerti (value) {
      return this.activeVerti.some(x => Math.abs(x - value) <= 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#ref-line
  position: absolute
  .vertical
    position: absolute
    width: 1px
    z-index: 999
    background-color: $color-main
  .horizontal
    position: absolute
    height: 1px
    z-index: 999
    background-color: $color-main
</style>


