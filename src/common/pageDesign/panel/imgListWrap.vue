<template>
  <div id="img-list-wrap">
    <div class="style-tab">
      <span class="tab" :class="{'active-tab' : activeTab === 0}" @click="activeTab = 0">我的</span>
      <span class="tab" :class="{'active-tab' : activeTab === 1}" @click="activeTab = 1">推荐</span>
    </div>
    <div class="tab-content" v-if="hadShowMyImg" :style="getStyle(0)">
      <img-water-fall 
        class="img-list"
        :listData="myImgList" 
        sortBy="id"
        k="id"
        @delete-img="deleteImg"
        @select-img="selectImg" />
      <div class="upload-btn-wrap">
        <div class="upload-btn" @click="uploadImg">
          <i class="iconfont icon-upload"></i>
          <span>上传图片</span>
        </div>
      </div>
    </div>
    <div class="tab-content" v-if="hadShowRecommendImg" :style="getStyle(1)">
      <img-water-fall 
        class="img-list" 
        :listData="recommendImgList"
        sortBy="id"
        k="id"
        @delete-img="deleteImg"
        @select-img="selectImg" />
    </div>
  </div>
</template>

<script>

// 图片列表
const NAME = 'img-list-wrap'

import wImage from 'COMMON/pageDesign/widgets/wImage/wImage'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      activeTab: -1,
      myImgList: [],
      recommendImgList: [
        {
          id: 1,
          url: 'http://bearcarimg.codebear.cn/7456f975fccea2d5cce19a82e08912ec3ilFkUx56xsHRcFttsqK2Q!gradual.show',
          ratio: 98 / 131
        },
        {
          id: 2,
          url: 'http://bearcarimg.codebear.cn/be123aa0b72465ee503c7ba5c368863bXC6Yu6FwQMPiYF1yk3F2q!gradual.show',
          ratio: 98 / 131
        },
        {
          id: 3,
          url: 'http://bearcarimg.codebear.cn/ce6f9ec8a0d9f077930c15b91b82252b7j9z2sowAjxQQjNJ7eMJwO!gradual.show',
          ratio: 98 / 55
        },
        {
          id: 4,
          url: 'http://bearcarimg.codebear.cn/e8b71e7857b96c7b0c091b1f7592fea536hoikc99bOmERWGriRQDU!gradual.show',
          ratio: 98 / 55
        },
        {
          id: 5,
          url: 'http://bearcarimg.codebear.cn/5de18d7dd61a4c9b055efdabb9f09c836WgCbYTpXrQq9eWgeTXU1s!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 6,
          url: 'http://bearcarimg.codebear.cn/ca6b942ea3f0d7e0ae7f107fe9779d287EeRHrnU6Gjhz639uv6PMY!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 7,
          url: 'http://bearcarimg.codebear.cn/8ead687106ad6d380394a39bebb8eef86wCsJmaJbG07HGEDU8H7S0!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 8,
          url: 'http://bearcarimg.codebear.cn/02596325952cb88e2e63fe9cf2c952bc1SwWxKfeNvZRulKQLgukpM!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 9,
          url: 'http://bearcarimg.codebear.cn/349f6dc27e66f787d93169cad6da732bH9TbSIQgtiC5PIhraGZ9k!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 10,
          url: 'http://bearcarimg.codebear.cn/a87c39432206952ade30d742da64fceb4D6uzMD5EeaKULYsZq7qVe!gradual.show',
          ratio: 98 / 147
        },
        {
          id: 11,
          url: 'http://bearcarimg.codebear.cn/8bdc77316c2f60c84cd84060c4c345af1Z27Iuz4RudcbNBa0Djehi!gradual.show',
          ratio: 98 / 100
        },
        {
          id: 12,
          url: 'http://bearcarimg.codebear.cn/d74e089543afe11a3945c6cd06130b463skAwou9VRH4DpDcMKfEuo!gradual.show',
          ratio: 98 / 98
        },
        {
          id: 13,
          url: 'http://bearcarimg.codebear.cn/f67d9d38e280544cd9dbd3ee6c520b904MtiiViAgAH7HYywyZdNIG!gradual.show',
          ratio: 98 / 73
        },
        {
          id: 14,
          url: 'http://bearcarimg.codebear.cn/25ffb31f5adf7e837540f8da695bc28aHQuHhBZ93Nw7JAMYFJC4U!gradual.show',
          ratio: 98 / 65
        },
        {
          id: 15,
          url: 'http://bearcarimg.codebear.cn/8a61e2e098c59d13bc28b8a4eb667cce3sSvE6gBueFAqFrduNAxS4!gradual.show',
          ratio: 850 / 563
        },
        {
          id: 16,
          url: 'http://bearcarimg.codebear.cn/95a06eee907b49c1e095211323df40f54dnhpdyuf7WLhl6MZxtaPE!gradual.show',
          ratio: 8 / 12
        },
        {
          id: 17,
          url: 'http://bearcarimg.codebear.cn/e386feed6faea239d4e628ae334343c76TKhqAPxh84mKixcFD2jDg!gradual.show',
          ratio: 1
        },
        {
          id: 18,
          url: 'http://bearcarimg.codebear.cn/d876071258082127cebb0de42f5270b9rxJbFGS4jObsgrikYBq9c!gradual.show',
          ratio: 1
        },
        {
          id: 19,
          url: 'http://bearcarimg.codebear.cn/4bba98b9b2d3ebc7c41da23cba70f9eb5ZVz5X4NceKe3ioi54a8tu!gradual.show',
          ratio: 108 / 192
        },
        {
          id: 20,
          url: 'http://bearcarimg.codebear.cn/b159e9d856d5bb82a73d92103674134817Ih6um8QgB3fmMUDdAtT4!gradual.show',
          ratio: 2120 / 2661
        }
      ],
      hadShowMyImg: false,
      hadShowRecommendImg: false,
      pos: 0
    }
  },
  mounted () {
    this.activeTab = 0
  },
  watch: {
    activeTab (value) {
      if (value === 0) {
        this.hadShowMyImg = true
      } else if (value === 1) {
        this.hadShowRecommendImg = true
      }
    }
  },
  methods: {
    ...mapActions([
      'addWidget'
    ]),
    getStyle (index) {
      return {
        display: (this.activeTab === index ? '' : 'none')
      }
    },
    selectImg (item) {
      let setting = JSON.parse(JSON.stringify(wImage.setting))
      setting.width = 100
      setting.height = parseInt(100 / item.value.ratio)
      setting.imgUrl = item.value.url
      this.addWidget(setting)
    },
    deleteImg (item) {
      //
    },
    uploadImg () {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#img-list-wrap
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .style-tab
    width: 100%
    display: flex
    border-bottom: 1px solid $color-dark-gray
    .tab
      flex: 1
      padding: 10px
      color: $color-white
      cursor: pointer
      border-bottom: 2px solid $color-transparent
      text-align: center
      &.active-tab
        color: $color-main
        border-bottom: 2px solid $color-main
  .tab-content
    width: 100%
    flex: 1
    display: flex
    flex-direction: column
    .img-list
      width: 100%
      flex: 1
      .img-item
        width: 33.33%
        height: auto
        padding: 6px
        cursor: pointer
        &:hover
          outline: 1px solid $color-main
        .img
          width: 100%

    .upload-btn-wrap
      width: 100%
      display: flex
      justify-content: center
      .upload-btn
        cursor: pointer
        width: 80%
        padding: 10px
        margin: 15px
        text-align: center
        border-radius: 5px
        color: $color-white
        background-color: $color-main
        &:hover
          background-color: lighten($color-main, 10%)
</style>
