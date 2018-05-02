<template>
  <div id="page-design" 
    ref="page-design">
    <div
      class="out-page"
      :style="{
        width: dPage.width * dZoom / 100 + 80 + 'px',
        height: dPage.height * dZoom / 100 + 80 + 'px'
      }">
      <div 
        class="design-canvas"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          transformOrigin: (dZoom >= 100 ? 'center' : 'left') + ' top',
          backgroundColor: dPage.backgroundColor
        }">
        <component
          :is="widget.type"
          :data-title="widget.type"
          v-for="widget in dWidgets"
          :key="widget.uuid"
          :params="widget"
          :data-type="widget.type"
          :data-uuid="widget.uuid" />

        <grid-size />
      </div>
    </div>
  </div>
</template>

<script>
import gridSize from 'COMMON/pageDesign/gridSize'
import wText from 'COMMON/pageDesign/widgets/wText'

import {
  mapGetters,
  mapActions
} from 'vuex'

// 页面设计组件
const NAME = 'page-design'

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
      'dWidgets'
    ])
  },
  mounted () {
    this.getScreen()
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'updateScreen'
    ]),
    getScreen () {
      let screen = this.$refs['page-design']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
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


