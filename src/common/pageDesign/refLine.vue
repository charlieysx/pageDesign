<template>
  <div id="ref-line" v-show="dMoving || dResizeing">
    
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
      'dActiveWH',
      'dMoving',
      'dResizeing',
      'dWidgets',
      'dPage'
    ])
  },
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#ref-line
  position: absolute
  .vertical
    position: absolute
    width: 1px
    height: 100%
    background-color: $color-main
  .horizontal
    position: absolute
    height: 1px
    width: 100%
    background-color: $color-main
</style>


