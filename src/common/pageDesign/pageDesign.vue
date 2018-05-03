<template>
  <div id="page-design" 
    ref="page-design">
    <div
      class="out-page"
      id="out-page"
      :style="{
        width: dPage.width * dZoom / 100 + 80 + 'px',
        height: dPage.height * dZoom / 100 + 80 + 'px',
        opacity: 1 - (dZoom < 100 ? dPage.tag : 0)
      }">
      <div 
        class="design-canvas"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          transformOrigin: (dZoom >= 100 ? 'center' : 'left') + ' top',
          backgroundColor: dPage.backgroundColor,
          opacity: dPage.opacity + (dZoom < 100 ? dPage.tag : 0)
        }">

        <component
          :is="layer.type"
          class="layer"
          :class="{'layer-active' : dUuid === layer.uuid}"
          :data-title="layer.type"
          v-for="layer in getlayers()"
          :key="layer.uuid"
          :params="layer"
          :data-type="layer.type"
          :data-uuid="layer.uuid">
          <component
            v-if="layer.isContainer"
            :is="widget.type"
            class="layer"
            :class="{'layer-active' : dUuid === widget.uuid}"
            :data-title="widget.type"
            v-for="widget in getChilds(layer.uuid)"
            :key="widget.uuid"
            :params="widget"
            :data-type="widget.type"
            :data-uuid="widget.uuid" />
        </component>

        <grid-size />
      </div>
    </div>
  </div>
</template>

<script>
import gridSize from 'COMMON/pageDesign/gridSize'
import wText from 'COMMON/pageDesign/widgets/wText/index'

import {
  mapGetters,
  mapActions
} from 'vuex'

// 页面设计组件
const NAME = 'page-design'

import { move } from 'MIXINS/move'

export default {
  name: NAME,
  components: {
    gridSize,
    wText
  },
  computed: {
    ...mapGetters([
      'dPage',
      'dZoom',
      'dScreen',
      'dWidgets',
      'dUuid'
    ])
  },
  mixins: [move],
  mounted () {
    this.getScreen()
    // 初始化激活的控件为page
    this.selectWidget({
      uuid: -1
    })
    // 采用事件代理的方式监听元件的选中操作
    document
      .getElementById('out-page')
      .addEventListener('mousedown', this.handleSelection, false)
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'updateScreen',
      'selectWidget'
    ]),
    getScreen () {
      let screen = this.$refs['page-design']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
    },
    handleSelection (e) {
      let target = e.target
      let type = target.getAttribute('data-type')

      if (type) {
        let uuid = target.getAttribute('data-uuid')

        // 设置选中元素
        this.selectWidget({
          uuid: uuid || -1
        })

        this.initmovement(e) // 参见 mixins
      } else {
        // 取消选中元素
        this.selectWidget({
          uuid: -1
        })
      }
    },
    getlayers () {
      return this.dWidgets.filter(
        item => item.parent === 'page'
      )
    },
    getChilds (uuid) {
      return this.dWidgets.filter(
        item => item.parent === uuid
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#page-design
  position: relative
  width: 100%
  height: 100%
  overflow: auto
  .out-page
    position: relative
    margin: 0 auto
    padding: 40px
    .design-canvas
      position: relative
      margin: 0 auto
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>


