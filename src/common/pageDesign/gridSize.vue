<template>
  <div id="grid-size" v-show="gridSize.width != 0 && gridSize.height != 0">
    <!-- 横线 -->
    <div
      class="horizontal" 
      :key="item + 'h'" 
      v-for="item in horizontalLineCount"
      :style="{top: gridSize.height * (item - 1) + 'px'}">
    </div>

    <!-- 竖线 -->
    <div 
      class="vertical" 
      :key="item + 'v'" 
      v-for="item in verticalLineCount"
      :style="{left: gridSize.width * (item - 1) + 'px'}">
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// 网格显示
const NAME = 'grid-size'

export default {
  name: NAME,
  data () {
    return {
      horizontalLineCount: 0,
      verticalLineCount: 0,
    }
  },
  computed: {
    ...mapGetters([
      'gridSize',
      'dPage'
    ])
  },
  watch: {
    gridSize: {
      handler(newValue, oldValue) {
        this.calc()
      },
      deep: true
    }
  },
  methods: {
    calc () {
      if (this.gridSize.width === 0 || this.gridSize.height === 0) {
        return
      }
      let width = this.dPage.width - 2
      let height = this.dPage.height - 2
      this.verticalLineCount = (width - (width % this.gridSize.width)) / this.gridSize.width + 1
      this.horizontalLineCount = (height - (height % this.gridSize.height)) / this.gridSize.height + 1
    }
  }
}
</script>

<style lang="stylus" scoped>
#grid-size
  width: 100%
  height: 100%
  position: fixed
  z-index: 0
  top: 0
  left: 0
  .vertical
    position: absolute
    height: 100%
    border-right: 1px dotted #d6d6d6
  .horizontal
    position: absolute
    width: 100%
    border-bottom: 1px dotted #d6d6d6
</style>
