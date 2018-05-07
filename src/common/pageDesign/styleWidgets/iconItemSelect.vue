<template>
  <div id="icon-item-select">
    <span class="label">{{ label }}</span>
    <ul class="list">
      <el-tooltip 
        class="item" 
        effect="dark" 
        v-for="(item, index) in data"
        :key="index"
        :content="item.tip"
        placement="bottom">
        <li 
          class="list-item"
          :class="{'active': item.select}"
          @click="selectItem(item)">
          <i class="iconfont" :class="item.icon"></i>
        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script>
// 图标按钮选择组件
const NAME = 'icon-item-select'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  props: {
    label: {
      default: ''
    },
    data: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    selectItem (item) {
      item.select = !item.select
      this.$emit('finish', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#icon-item-select
  width: 100%
  display: flex
  align-items: center
  .label
    margin-right: 10px
  .list
    flex: 1
    display: flex
    flex-direction: row
    justify-content: flex-start
    line-height: 1
    .list-item
      color: $color-black
      padding: 5px
      cursor: pointer
      i
        font-size: 18px
      &:hover
        background-color: #d1d1d1
      &.active
        color: $color-white
        background-color: $color-main
</style>
