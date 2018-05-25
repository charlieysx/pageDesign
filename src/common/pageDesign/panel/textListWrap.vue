<template>
  <div id="text-list-wrap">
    <ul class="basic-text-wrap">
      <li
        class="basic-text-item"
        v-for="(item, index) in basicTextList"
        :key="index"
        :style="{
          fontSize: item.fontSize / 2 + 'px',
          fontWeight: item.fontWeight
        }"
        @click="selectBasicText(item)">
        {{ item.text }}
      </li>
    </ul>
    <div class="other-text-wrap">

    </div>
  </div>
</template>

<script>

// 文本组件列表
const NAME = 'text-list-wrap'

import wText from 'COMMON/pageDesign/widgets/wText/wText'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      basicTextList: [
        {
          text: '大标题',
          fontSize: 96,
          fontWeight: 'bold'
        },
        {
          text: '标题',
          fontSize: 60,
          fontWeight: 'bold'
        },
        {
          text: '副标题',
          fontSize: 40,
          fontWeight: 'normal'
        },
        {
          text: '小标题',
          fontSize: 36,
          fontWeight: 'normal'
        },
        {
          text: '正文内容',
          fontSize: 28,
          fontWeight: 'normal'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'addWidget'
    ]),
    selectBasicText (item) {
      let setting = JSON.parse(JSON.stringify(wText.setting))
      setting.text = item.text
      setting.fontSize = item.fontSize
      setting.fontWeight = item.fontWeight
      this.addWidget(setting)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#text-list-wrap
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .basic-text-wrap
    width: 100%
    border-bottom: 1px solid #092625
    padding: 10px 0
    .basic-text-item
      width: 100%
      text-align: center
      padding: 5px 0
      color: $white
      border-top: 1px solid $color-transparent
      border-bottom: 1px solid $color-transparent
      cursor: pointer
      &:hover
        border-top: 1px solid $color-main
        border-bottom: 1px solid $color-main
        background-color: $color-dark-gray
  .other-text-wrap
    width: 100%
    flex: 1
    overflow: auto
</style>
