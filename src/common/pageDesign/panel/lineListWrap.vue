<template>
  <div id="line-list-wrap">
    <ul class="basic-line-wrap">
      <li
        class="basic-line-item"
        v-for="(item, index) in basicLineList"
        :key="index"
        @click="selectBasicLine(item)">
        {{ item.text }}
      </li>
    </ul>
    <div class="other-line-wrap">

    </div>
  </div>
</template>

<script>

// 线条组件列表
const NAME = 'line-list-wrap'

import wLine from 'COMMON/pageDesign/widgets/wLine/wLine'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      basicLineList: [
        {
          text: '横线',
          width: 300,
          height: 2
        },
        {
          text: '竖线',
          width: 2,
          height: 300
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'addWidget'
    ]),
    selectBasicLine (item) {
      let setting = JSON.parse(JSON.stringify(wLine.setting))
      setting.width = item.width
      setting.height = item.height
      setting.top = 10
      setting.left = 10
      this.addWidget(setting)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#line-list-wrap
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .basic-line-wrap
    width: 100%
    border-bottom: 1px solid #092625
    padding: 10px 0
    .basic-line-item
      width: 100%
      text-align: center
      font-size: 18px
      padding: 5px 0
      color: $white
      border-top: 1px solid $color-transparent
      border-bottom: 1px solid $color-transparent
      cursor: pointer
      &:hover
        border-top: 1px solid $color-main
        border-bottom: 1px solid $color-main
        background-color: $color-dark-gray
  .other-line-wrap
    width: 100%
    flex: 1
    overflow: auto
</style>
