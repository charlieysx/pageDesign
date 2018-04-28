<template>
  <div id="size-control">
    <ul class="size-selecter" v-show="show">
      <li 
        class="size-item" 
        :class="{'size-item-active' : activeSizeIndex === index}" 
        v-for="(item, index) in sizeList" 
        :key="index"
        @click.stop="selectItem(index)">
        <i class="iconfont" v-if="item.icon" :class="item.icon"></i>
        <span>{{ item.text }}</span>
        <i class="iconfont icon-selected" v-if="activeSizeIndex === index"></i>
      </li>
    </ul>
    <div class="size-control-wrap">
      <div 
        class="size-icon radius-left" 
        @click.stop="activeSizeIndex > 0 ? sub() : ''"
        :class="{'disable' : activeSizeIndex === 0}">
        <i class="iconfont icon-sub"></i>
      </div>
      <div class="size-text" :class="{'size-text-active' : show}" @click.stop="show = !show">
        {{ zoom.text }}
      </div>
      <div 
        class="size-icon radius-right" 
        @click.stop="otherIndex < otherList.length - 1 ? add() : ''"
        :class="{'disable' : otherIndex === otherList.length - 1}">
        <i class="iconfont icon-add"></i>
      </div>
    </div>
  </div>
</template>

<script>
// 组件大小控制器
const NAME = 'size-control'

export default {
  name: NAME,
  data () {
    return {
      activeSizeIndex: 0,
      sizeList: [
        {
          text: '25%',
          value: 25
        },
        {
          text: '50%',
          value: 50
        },
        {
          text: '75%',
          value: 75
        },
        {
          text: '100%',
          value: 100
        },
        {
          text: '125%',
          value: 125
        },
        {
          text: '150%',
          value: 150
        },
        {
          text: '200%',
          value: 200
        },
        {
          text: '满屏显示',
          value: -1,
          icon: 'icon-full-size'
        },
        {
          text: '最佳尺寸',
          value: -2,
          icon: 'icon-best-size'
        }
      ],
      show: false,
      zoom: {
        value: 0,
        text: 0
      },
      otherList: [
        {
          text: '250%',
          value: 250
        },
        {
          text: '300%',
          value: 300
        },
        {
          text: '350%',
          value: 350
        },
        {
          text: '400%',
          value: 400
        },
        {
          text: '450%',
          value: 450
        },
        {
          text: '500%',
          value: 500
        }
      ],
      otherIndex: -1
    }
  },
  mounted () {
    window.addEventListener('click', this.close)
    this.activeSizeIndex = 3
  },
  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  watch: {
    activeSizeIndex (value) {
      if (value < 0 || value > this.sizeList.length - 1) {
        return
      }
      this.zoom = this.sizeList[value]
    },
    otherIndex (value) {
      if (value < 0 || value > this.otherList.length - 1) {
        return
      }
      this.zoom = this.otherList[value]
    },
    zoom (value) {
      console.log(value)
    }
  },
  methods: {
    selectItem (index) {
      this.activeSizeIndex = index
      this.otherIndex = -1
      this.show = false
    },
    close (e) {
      this.show = false
    },
    add () {
      this.show = false
      if (this.activeSizeIndex === this.sizeList.length - 3 ||
        this.activeSizeIndex === this.sizeList.length - 2 ||
        this.activeSizeIndex === this.sizeList.length - 1) {
        this.activeSizeIndex = this.sizeList.length
        this.otherIndex += 1
        return
      }
      if (this.activeSizeIndex != this.sizeList.length) {
        this.activeSizeIndex++
        return
      }
      if (this.otherIndex < this.otherList.length - 1) {
        this.otherIndex++
      }
    },
    sub () {
      this.show = false
      if (this.otherIndex === 0) {
        this.otherIndex = -1
        this.activeSizeIndex = this.sizeList.length - 3
        return
      }
      if (this.otherIndex != -1) {
        this.otherIndex--
        return
      }
      if (this.activeSizeIndex != 0) {
        this.activeSizeIndex--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/mixin.styl'
@import '~STYLUS/color.styl'
#size-control
  position: fixed
  bottom: 50px
  right: 320px
  z-index: 10
  .size-control-wrap
    height: 40px
    display: flex
    flex-direction: row
    font-size: 14px
    .radius-left
      border-top-left-radius: 50%
      border-bottom-left-radius: 50%
    .radius-right
      border-top-right-radius: 50%
      border-bottom-right-radius: 50%
    .size-icon
      background-color: #3e4651
      color: #fff
      width: 40px
      cursor: pointer
      display: flex
      justify-content: center
      align-items: center
      &:hover
        color: $color-main
        background-color: #262c33
    .disable
      color: #808080
      &:hover
        color: #808080
        background-color: #3e4651
        cursor: not-allowed
    .size-text
      background-color: #3e4651
      color: #fff
      width: 60px
      cursor: pointer
      display: flex
      justify-content: center
      align-items: center
      &:hover
        color: $color-main
        background-color: #262c33
    .size-text-active
      color: $color-main
      background-color: #262c33
  .size-selecter
    position: absolute
    width: 100%
    top: -10px
    transform: translateY(-100%)
    background-color: #262c33
    color: #ffffff
    &:after
      content: ''
      position: absolute
      bottom: -8px
      left: 50%
      transform: translateX(-50%)
      triangle(bottom, 8px, #262c33)
    .size-item
      width: 100%
      height: 34px
      font-size: 14px
      padding: 10px
      display: flex
      align-items: center
      cursor: pointer
      i
        margin-right: 10px
        &:last-child
          margin-right: 0
      span
        flex: 1
      &:hover
        color: $color-main
        background-color: #50555b
    .size-item-active
      color: $color-main
      background-color: #50555b
</style>


