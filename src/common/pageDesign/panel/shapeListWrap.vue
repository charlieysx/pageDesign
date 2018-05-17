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
import wLine from 'COMMON/pageDesign/widgets/wLine/wLine'
import wRectangle from 'COMMON/pageDesign/widgets/wRectangle/wRectangle'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      shapeList: [],
      list: [
        {
          id: 1,
          url: 'http://bearcarimg.codebear.cn/981ece4443dee0bcb2c8cc2c3a83a1463yQocPJBFuufMQPRTMVffM!gradual.show',
          ratio: 100 / 60,
          setting: ''
        },
        {
          id: 2,
          url: 'http://bearcarimg.codebear.cn/fef0936c6d2f180e6e177a3fc56667bf6P7xvZPoKiDV2hfpMnOMUg!gradual.show',
          ratio: 80 / 100,
          setting: ''
        },
        {
          id: 3,
          url: 'http://bearcarimg.codebear.cn/1d3c5119753230453d923efacecdc38d63LlspnxruQ9fYADV66CnO!gradual.show',
          ratio: 1,
          setting: ''
        },
        {
          id: 4,
          url: 'http://bearcarimg.codebear.cn/9c8f233c366bed5319aaeedb4aa13ef73u33zQlXvFNSjwCwhoJEDY!gradual.show',
          ratio: 1,
          setting: ''
        },
        {
          id: 5,
          url: 'http://bearcarimg.codebear.cn/68d1c9cc707a0420e9249f82fb11091477CzSOwR5gdeN9FLB2iDo2!gradual.show',
          ratio: 1,
          setting: ''
        },
        {
          id: 6,
          url: 'http://bearcarimg.codebear.cn/6963f9e14a24a568874b3789d96b18246jxGBDdR4rBjjzt7uZe1YY!gradual.show',
          ratio: 1,
          setting: ''
        }
      ]
    }
  },
  created () {
    let line = JSON.parse(JSON.stringify(wLine.setting))
    this.list[0].setting = line
    let line2 = JSON.parse(JSON.stringify(wLine.setting))
    line2.width = 2
    line2.height = 300
    this.list[1].setting = line2
    let circle = JSON.parse(JSON.stringify(wCircle.setting))
    this.list[2].setting = circle
    let circle2 = JSON.parse(JSON.stringify(wCircle.setting))
    circle2.backgroundColor = 'rgba(0, 0, 0, 1)'
    this.list[3].setting = circle2
    let rectangle = JSON.parse(JSON.stringify(wRectangle.setting))
    this.list[4].setting = rectangle
    let rectangle2 = JSON.parse(JSON.stringify(wRectangle.setting))
    rectangle2.backgroundColor = 'rgba(0, 0, 0, 1)'
    this.list[5].setting = rectangle2
    this.shapeList = this.list
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
      this.addWidget(JSON.parse(JSON.stringify(item.value.setting)))
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
