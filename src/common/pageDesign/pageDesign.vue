<template>
  <div id="page-design" ref="page-design">
    <div 
      class="design-canvas"
      :style="{
        width: dPage.width + 'px',
        height: dPage.height + 'px',
        transform: 'scale(' + dZoom / 100 + ')'
      }">

    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// 页面设计组件
const NAME = 'page-design'

export default {
  name: NAME,
  computed: {
    ...mapGetters([
      'dPage',
      'dZoom'
    ])
  },
  mounted () {
    this.getScreen()
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
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  overflow: auto
  .design-canvas
    width: 360px
    height: 640px
    margin: 40px
    transform-origin: center top
    background-color: $color-white
    box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>


