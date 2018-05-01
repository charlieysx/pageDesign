<template>
  <div id="text-list-wrap">
    <ul class="normal-text-wrap">
      <li
        class="normal-text-item"
        v-for="(item, index) in normalTextList"
        :key="index"
        :style="{
          'font-size': item.size / 2 + 'px',
          'font-weight': item.weight
        }">
        {{ item.name }}
      </li>
    </ul>
    <div class="other-text-wrap">

    </div>
  </div>
</template>

<script>

// 文本组件列表
const NAME = 'text-list-wrap'

export default {
  name: NAME,
  data () {
    return {
      normalTextList: [
        {
          name: '大标题',
          size: 96,
          weight: 'bold'
        },
        {
          name: '标题',
          size: 60,
          weight: 'bold'
        },
        {
          name: '副标题',
          size: 40,
          weight: 'normal'
        },
        {
          name: '小标题',
          size: 36,
          weight: 'normal'
        },
        {
          name: '正文内容',
          size: 28,
          weight: 'normal'
        }
      ]
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
  .normal-text-wrap
    width: 100%
    border-bottom: 1px solid #092625
    padding: 10px 0
    .normal-text-item
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
