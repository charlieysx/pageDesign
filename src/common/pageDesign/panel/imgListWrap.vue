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
          url: 'http://bearcarimg.codebear.cn/4fc91086d687d5c7b184b03cd4d33c933U3NidLCAmir8INKUa4peY!gradual.show'
        },
        {
          id: 2,
          url: 'http://bearcarimg.codebear.cn/3d7f532f3d4b0d34d4e3caccc318aff37cEo7VT8yGt6esXWxSkGkU!gradual.show'
        },
        {
          id: 3,
          url: 'http://bearcarimg.codebear.cn/4829bad02d11fb109ba096558b3a2bbd2XBlyVo3Kl4qprWpACZIgQ!gradual.show'
        },
        {
          id: 4,
          url: 'http://img1.imgtn.bdimg.com/it/u=888901725,4248147476&fm=27&gp=0.jpg'
        },
        {
          id: 5,
          url: 'http://bearcarimg.codebear.cn/e794cee9463b2994407e05492f392bb6Hp7qDuUN532stcMf1tErE!gradual.show'
        },
        {
          id: 6,
          url: 'http://bearcarimg.codebear.cn/dd8abd44eb4c0bb4c2e1805399ff54971uii7AVO84F4OnYlMYYF8M!gradual.show'
        },
        {
          id: 7,
          url: 'http://img2.imgtn.bdimg.com/it/u=177128117,3397391403&fm=27&gp=0.jpg'
        },
        {
          id: 8,
          url: 'http://img3.imgtn.bdimg.com/it/u=1060387669,1498970204&fm=27&gp=0.jpg'
        },
        {
          id: 9,
          url: 'http://bearcarimg.codebear.cn/4fc91086d687d5c7b184b03cd4d33c933U3NidLCAmir8INKUa4peY!gradual.show'
        },
        {
          id: 10,
          url: 'http://bearcarimg.codebear.cn/3d7f532f3d4b0d34d4e3caccc318aff37cEo7VT8yGt6esXWxSkGkU!gradual.show'
        },
        {
          id: 11,
          url: 'http://bearcarimg.codebear.cn/4829bad02d11fb109ba096558b3a2bbd2XBlyVo3Kl4qprWpACZIgQ!gradual.show'
        },
        {
          id: 12,
          url: 'http://img1.imgtn.bdimg.com/it/u=888901725,4248147476&fm=27&gp=0.jpg'
        },
        {
          id: 13,
          url: 'http://bearcarimg.codebear.cn/e794cee9463b2994407e05492f392bb6Hp7qDuUN532stcMf1tErE!gradual.show'
        },
        {
          id: 14,
          url: 'http://bearcarimg.codebear.cn/dd8abd44eb4c0bb4c2e1805399ff54971uii7AVO84F4OnYlMYYF8M!gradual.show'
        },
        {
          id: 15,
          url: 'http://img2.imgtn.bdimg.com/it/u=177128117,3397391403&fm=27&gp=0.jpg'
        },
        {
          id: 16,
          url: 'http://img3.imgtn.bdimg.com/it/u=1060387669,1498970204&fm=27&gp=0.jpg'
        },
        {
          id: 17,
          url: 'http://bearcarimg.codebear.cn/4fc91086d687d5c7b184b03cd4d33c933U3NidLCAmir8INKUa4peY!gradual.show'
        },
        {
          id: 18,
          url: 'http://bearcarimg.codebear.cn/3d7f532f3d4b0d34d4e3caccc318aff37cEo7VT8yGt6esXWxSkGkU!gradual.show'
        },
        {
          id: 20,
          url: 'http://bearcarimg.codebear.cn/4829bad02d11fb109ba096558b3a2bbd2XBlyVo3Kl4qprWpACZIgQ!gradual.show'
        },
        {
          id: 21,
          url: 'http://img1.imgtn.bdimg.com/it/u=888901725,4248147476&fm=27&gp=0.jpg'
        },
        {
          id: 22,
          url: 'http://bearcarimg.codebear.cn/e794cee9463b2994407e05492f392bb6Hp7qDuUN532stcMf1tErE!gradual.show'
        },
        {
          id: 23,
          url: 'http://bearcarimg.codebear.cn/dd8abd44eb4c0bb4c2e1805399ff54971uii7AVO84F4OnYlMYYF8M!gradual.show'
        },
        {
          id: 24,
          url: 'http://img2.imgtn.bdimg.com/it/u=177128117,3397391403&fm=27&gp=0.jpg'
        },
        {
          id: 25,
          url: 'http://img3.imgtn.bdimg.com/it/u=1060387669,1498970204&fm=27&gp=0.jpg'
        },
        {
          id: 26,
          url: 'http://bearcarimg.codebear.cn/4fc91086d687d5c7b184b03cd4d33c933U3NidLCAmir8INKUa4peY!gradual.show'
        },
        {
          id: 27,
          url: 'http://bearcarimg.codebear.cn/3d7f532f3d4b0d34d4e3caccc318aff37cEo7VT8yGt6esXWxSkGkU!gradual.show'
        },
        {
          id: 28,
          url: 'http://bearcarimg.codebear.cn/4829bad02d11fb109ba096558b3a2bbd2XBlyVo3Kl4qprWpACZIgQ!gradual.show'
        },
        {
          id: 29,
          url: 'http://img1.imgtn.bdimg.com/it/u=888901725,4248147476&fm=27&gp=0.jpg'
        },
        {
          id: 30,
          url: 'http://bearcarimg.codebear.cn/e794cee9463b2994407e05492f392bb6Hp7qDuUN532stcMf1tErE!gradual.show'
        },
        {
          id: 31,
          url: 'http://bearcarimg.codebear.cn/dd8abd44eb4c0bb4c2e1805399ff54971uii7AVO84F4OnYlMYYF8M!gradual.show'
        },
        {
          id: 32,
          url: 'http://img2.imgtn.bdimg.com/it/u=177128117,3397391403&fm=27&gp=0.jpg'
        },
        {
          id: 33,
          url: 'http://img3.imgtn.bdimg.com/it/u=1060387669,1498970204&fm=27&gp=0.jpg'
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
    selectBasicText (item) {
      // let setting = JSON.parse(JSON.stringify(wText.setting))
      // setting.text = item.text
      // setting.fontSize = item.fontSize
      // setting.fontWeight = item.fontWeight
      // this.addWidget(setting)
    },
    selectImg (item) {
      console.log(item.id)
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
