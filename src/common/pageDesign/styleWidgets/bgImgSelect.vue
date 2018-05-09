<template>
  <div id="bg-img-select">
    <span class="label">背景图片</span>
    <div class="img" @click="selectImg">
      <i class="iconfont icon-add-img" v-if="!img" />
      <img v-if="img" :src="img"/>
    </div>
  </div>
</template>

<script>
// 颜色选择组件
const NAME = 'bg-img-select'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  props: {
    img: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'dActiveElement'
    ])
  },
  methods: {
    ...mapActions([
      'updatePageData',
      'updateWidgetData',
      'getQiniuToken'
    ]),
    selectImg () {
      // let url = 'http://img.zcool.cn/community/010a245aedd801a801219b7f1400b8.jpg@1280w_1l_2o_100sh.jpg'
      // let uuid = this.dActiveElement.uuid
      // if (uuid === '-1') {
      //   this.updatePageData({
      //     key: 'backgroundImage',
      //     value: url
      //   })
      // } else {
      //   this.updateWidgetData({
      //     uuid: uuid,
      //     key: 'backgroundImage',
      //     value: url
      //   })
      // }
      this.getQiniuToken()
        .then((token) => {
          console.log(token)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
#bg-img-select
  width: 100%
  display: flex
  align-items: center
  .label
    margin-right: 10px
  .img
    max-width: 50px
    max-height: 50px
    cursor: pointer
    .icon-add-img
      line-height: 1
      font-size: 40px
    img
      max-width: 50px
      max-height: 50px
</style>
