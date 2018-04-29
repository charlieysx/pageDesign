<template>
  <div id="page-design-index">
    <div class="top-nav" :style="style">
      <div class="top-nav-wrap">
        <div class="top-back">
          <i class="iconfont icon-arrow-left"></i>
        </div>
        <div class="top-title">
          艺笺卡片
        </div>
        <div class="top-icon-wrap">
          <div class="top-icon">
            <i class="iconfont icon-save"></i>
            保存
          </div>
          <div class="top-icon">
            <i class="iconfont icon-publish"></i>
            发布
          </div>
        </div>
      </div>
    </div>
    <div class="page-design-index-wrap">
      <widget-panel></widget-panel>
      <page-design class="page-design-wrap"></page-design>
      <style-panel></style-panel>
    </div>
    <div class="operation">
      <ul class="operation-wrap">
        <li class="operation-item">
          <i class="iconfont icon-undo"></i>
          <p>撤销</p>
        </li>
        <li class="operation-item">
          <i class="iconfont icon-redo"></i>
          <p>重做</p>
        </li>
      </ul>
      <ul class="operation-wrap">
        <li class="operation-item">
          <i class="iconfont icon-ref-grid"></i>
          <p>网格</p>
        </li>
      </ul>
    </div>
    <size-control/>
  </div>
</template>

<script>
import pageDesign from 'COMMON/pageDesign/pageDesign'
import widgetPanel from 'COMMON/pageDesign/panel/widgetPanel'
import stylePanel from 'COMMON/pageDesign/panel/stylePanel'
import sizeControl from 'COMMON/pageDesign/sizeControl'

export default {
  name: 'page-design-index',
  components: {
    pageDesign,
    widgetPanel,
    stylePanel,
    sizeControl
  },
  data () {
    return {
      style: {
        left: '0px'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.fixTopBarScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixTopBarScroll)
  },
  methods: {
    fixTopBarScroll () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#page-design-index
  width: 100%
  min-width: 1180px
  height: 100%
  min-height: 500px
  position: absolute
  background-color: #efefef
  display: flex
  flex-direction: column
  .top-nav
    position: relative
    width: 100%
    min-width: 1180px
    height: 45px
    .top-nav-wrap
      position: fixed
      width: 100%
      height: 45px
      min-width: 1180px
      background-color: $color-main
      display: flex
      align-items: center
      .top-back
        width: 60px
        height: 45px
        cursor: pointer
        color: $color-white
        display: flex
        justify-content: center
        align-items: center
        box-shadow: 1px 0px 10px 3px rgba(0, 0, 0, .1) inset
        i
          font-size: 28px
      .top-title
        flex: 1
        text-align: center
        color: $color-white
        font-weight: bold
        cursor: pointer
      .top-icon-wrap
        height: 45px
        display: flex
        .top-icon
          color: $color-white
          margin: 8px
          border-radius: 5px
          padding: 5px 8px
          font-weight: bold
          cursor: pointer
          background-color: rgba(0, 0, 0, .4)
          &:hover
            background-color: rgba(0, 0, 0, .5)
  .page-design-index-wrap
    width: 100%
    height: 100%
    flex: 1
    display: flex
    overflow: hidden
    flex-direction: row
    .page-design-wrap
      flex: 1
.operation
  z-index: 10
  width: 45px
  position: fixed
  top: 200px
  right: 320px
  .operation-wrap
    box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0px
    .operation-item-margin
      margin-top: 10px
    .operation-item
      border-bottom: 1px solid $color-dark-gray
      background-color: $color-light-gray
      color: $color-white
      width: 100%
      height: 45px
      font-size: 10px
      cursor: pointer
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      p
        margin-top: 5px
      &:hover
        color: $color-main
        background-color: $color-dark-gray
      &:last-child
        border-bottom: 0px

</style>
