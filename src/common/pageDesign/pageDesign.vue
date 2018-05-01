<template>
  <div id="page-design" 
    ref="page-design">
    <div
      class="out-page"
      ref="out-page"
      :style="{
        width: dPage.width * 5 + 'px',
        height: dPage.height * 5 + 'px'
      }">
      <div 
        class="design-canvas"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          'background-color': dPage.backgroundColor
        }">
        <w-text />

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
      'dScreen'
    ])
  },
  mounted () {
    this.getScreen()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    dZoom (value) {
      this.updatePosition()
    }
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
    },
    updatePosition () {
      let x = (this.dPage.width * 5 - this.dScreen.width + 80) / 2
      this.$refs['page-design'].scrollTo(x, 0)
    },
    resize () {
      this.getScreen()
      this.updatePosition()
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
    display: flex
    justify-content: center
    margin: 40px
    .design-canvas
      position: relative
      transform-origin: center top
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>


