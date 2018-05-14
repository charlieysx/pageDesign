<template>
  <div id="shape-list-wrap">
    <img-water-fall 
      class="shape-list" 
      :listData="shapeList"
      sortBy="id"
      k="id"
      @select-img="selectShape" />
  </div>
</template>

<script>

// 形状列表
const NAME = 'shape-list-wrap'

import wCircle from 'COMMON/pageDesign/widgets/wCircle/wCircle'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      shapeList: [
        {
          id: 1,
          url: 'http://bearcarimg.codebear.cn/1d3c5119753230453d923efacecdc38d63LlspnxruQ9fYADV66CnO!gradual.show',
          ratio: 1
        },
        {
          id: 2,
          url: 'http://bearcarimg.codebear.cn/9c8f233c366bed5319aaeedb4aa13ef73u33zQlXvFNSjwCwhoJEDY!gradual.show',
          ratio: 1
        }
      ]
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'addWidget'
    ]),
    selectShape (item) {
      let setting = JSON.parse(JSON.stringify(wCircle.setting))
      if (item.value.id === 2) {
        setting.backgroundColor = 'rgba(0, 0, 0, 1)'
      }
      this.addWidget(setting)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#shape-list-wrap
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .shape-list
    width: 100%
    height: 100%
</style>
