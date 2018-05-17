<template>
  <div id="page-design-index" ref="pageDesignIndex">
    <div class="top-nav" :style="style">
      <div class="top-nav-wrap">
        <div class="top-back">
          <i class="iconfont icon-arrow-left"></i>
        </div>
        <div class="top-title">
          艺笺卡片
        </div>
        <div class="top-icon-wrap">
          <div class="top-icon" @click="save">
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
        <li 
          class="operation-item" 
          :class="{'disable' : !undoable}"
          @click="undoable ? handle('undo') : ''">
          <i class="iconfont icon-undo"></i>
          <p>撤销</p>
        </li>
        <li 
          class="operation-item" 
          :class="{'disable' : !redoable}"
          @click="redoable ? handle('redo') : ''">
          <i class="iconfont icon-redo"></i>
          <p>重做</p>
        </li>
      </ul>
      <ul class="operation-wrap">
        <li 
          class="operation-item" 
          :class="{'disable' : dActiveElement.uuid === '-1'}"
          @click="dActiveElement.uuid !== '-1' ? handle('copy') : ''">
          <i class="iconfont icon-copy"></i>
          <p>复制</p>
        </li>
        <li 
          class="operation-item" 
          :class="{'disable' : dCopyElement.length === 0}"
          @click="dCopyElement.length !== 0 ? handle('paste') : ''">
          <i class="iconfont icon-paste"></i>
          <p>粘贴</p>
        </li>
        <li 
          class="operation-item" 
          :class="{'disable' : dActiveElement.uuid === '-1'}"
          @click="dActiveElement.uuid !== '-1' ? handle('delete') : ''">
          <i class="iconfont icon-delete"></i>
          <p>删除</p>
        </li>
      </ul>
      <ul class="operation-wrap">
        <li 
          class="operation-item" 
          @click.stop="showGridSizeList = !showGridSizeList"
          :class="{'operation-item-active' : showGridSizeList}">
          <i class="iconfont icon-ref-grid"></i>
          <p>网格</p>
          <ul class="grid-selecter" v-show="showGridSizeList">
            <li
              v-for="(item, index) in gridSizeList"
              :key="index"
              class="grid-item"
              :class="{'grid-item-active' : gridSizeIndex === index}"
              @click="gridSizeIndex = index">
              <span>{{ item.value }}</span>
              <i class="iconfont icon-selected" v-if="gridSizeIndex === index"></i>
            </li>
          </ul>
        </li>
        <li 
          class="operation-item" 
          @click.stop="showRefLine(!dShowRefLine)"
          :class="{'operation-item-active' : dShowRefLine}">
          <i class="iconfont icon-ref-line"></i>
          <p>吸附</p>
        </li>
      </ul>
    </div>
    <zoom-control/>
    <div class="menu-bg" id="menu-bg" v-show="showMenuBg">
      <ul 
        class="menu-list"
        ref="menuList"
        :style="{
          left: menuList.left + 'px',
          top: menuList.top + 'px'
        }">
        <li
          class="menu-item"
          :class="{'disable-menu': dCopyElement.length === 0 && item.type === 'paste'}"
          v-for="(item, index) in menuList.list"
          :key="index"
          @click="selectMenu(item.type)">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'COMMON/pageDesign/index'
import { shortcuts } from 'MIXINS/shortcuts'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'page-design-index',
  data () {
    return {
      style: {
        left: '0px'
      },
      gridSizeList: [
        {
          width: 0,
          height: 0,
          value: '无'
        },
        {
          width: 10,
          height: 10,
          value: '10x10'
        },
        {
          width: 20,
          height: 20,
          value: '20x20'
        },
        {
          width: 50,
          height: 50,
          value: '50x50'
        },
        {
          width: 75,
          height: 75,
          value: '75x75'
        },
        {
          width: 100,
          height: 100,
          value: '100x100'
        }
      ],
      gridSizeIndex: 0,
      showGridSizeList: false,
      showMenuBg: false,
      menuList: {
        left: 0,
        top: 0,
        list: []
      },
      widgetMenu: [
        {
          type: 'copy',
          text: '复制'
        },
        {
          type: 'paste',
          text: '粘贴'
        },
        {
          type: 'index-up',
          text: '上移一层'
        },
        {
          type: 'index-down',
          text: '下移一层'
        },
        {
          type: 'del',
          text: '删除'
        }
      ],
      pageMenu: [
        {
          type: 'paste',
          text: '粘贴'
        }
      ]
    }
  },
  mixins: [shortcuts],
  computed: {
    ...mapGetters([
      'dHistoryParams',
      'dActiveElement',
      'dShowRefLine',
      'dCopyElement',
      'dPage'
    ]),
    undoable() {
      return !(this.dHistoryParams.index === -1 || (this.dHistoryParams === 0 && this.dHistoryParams.length === 10))
    },
    redoable() {
      return !(this.dHistoryParams.index === this.dHistoryParams.length - 1)
    }
  },
  mounted () {
    // 初始化激活的控件为page
    this.selectWidget({
      uuid: '-1'
    })
    window.addEventListener('scroll', this.fixTopBarScroll)
    window.addEventListener('click', this.clickListener)
    document.addEventListener('keydown', this.handleKeydowm, false)
    document.addEventListener('keyup', this.handleKeyup, false)
    document.oncontextmenu = this.mouseRightClick
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixTopBarScroll)
    window.removeEventListener('click', this.clickListener)
    document.removeEventListener('keydown', this.handleKeydowm, false)
    document.removeEventListener('keyup', this.handleKeyup, false)
    document.oncontextmenu = null
  },
  watch: {
    gridSizeIndex (index) {
      this.updateGridSize({
        width: this.gridSizeList[index].width,
        height: this.gridSizeList[index].height
      })
    }
  },
  methods: {
    ...mapActions([
      'updateGridSize',
      'handleHistory',
      'selectWidget',
      'deleteWidget',
      'copyWidget',
      'showRefLine',
      'pasteWidget',
      'updateWidgetData',
      'getWidgetJsonData'
    ]),
    fixTopBarScroll () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
    },
    clickListener (e) {
      this.showGridSizeList = false
    },
    handle (action) {
      switch (action) {
        case 'undo':
        case 'redo':
          this.handleHistory(action)
          break
        case 'delete':
          this.deleteWidget()
          break
        case 'copy':
          this.copyWidget()
          break
        case 'paste':
          this.pasteWidget()
          break
      }
    },
    mouseRightClick (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.showMenuBg) {
        this.showMenuBg = false
        return
      }
      let target = e.target
      let type = target.getAttribute('data-type')
      if (type) {
        let uuid = target.getAttribute('data-uuid')// 设置选中元素
        this.selectWidget({
          uuid: uuid || '-1'
        })
        this.showMenu(e)
      }
    },
    showMenu (e) {
      let isPage = this.dActiveElement.uuid === '-1'
      this.menuList.list = isPage ? this.pageMenu : this.widgetMenu
      this.showMenuBg = true
      document.getElementById('menu-bg').addEventListener('click', this.closeMenu, false)
      let mx = e.pageX
      let my = e.pageY
      let listHeight = (14 + 10) * this.menuList.list.length + 10
      if (my + listHeight > window.innerHeight) {
        my -= listHeight
      }
      this.menuList.left = mx
      this.menuList.top = my
    },
    closeMenu () {
      this.showMenuBg = false
      document.getElementById('menu-bg').removeEventListener('click', this.closeMenu, false)
    },
    selectMenu (type) {
      switch (type) {
        case 'copy':
          this.copyWidget()
          break
        case 'paste':
          if (this.dCopyElement.length === 0) {
            return
          }
          this.pasteWidget()
          break
        case 'index-up':
          this.updateWidgetData({
            uuid: this.dActiveElement.uuid,
            key: 'zIndex',
            value: this.dActiveElement.zIndex + 1
          })
          break
        case 'index-down':
          this.updateWidgetData({
            uuid: this.dActiveElement.uuid,
            key: 'zIndex',
            value: this.dActiveElement.zIndex - 1
          })
          break
        case 'del':
          this.deleteWidget()
          break
      }
    },
    save () {
      this.getWidgetJsonData()
      .then((json) => {
        console.log(JSON.stringify(json))
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~STYLUS/page-design-element-ui.styl'
</style>

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
  .menu-bg
    position: absolute
    width: 100%
    height: 100%
    z-index: 9999
    .menu-list
      position: absolute
      width: 120px
      background-color: $color-white
      box-shadow: 1px 0px 10px 3px rgba(0, 0, 0, .1)
      padding: 5px
      .menu-item
        width: 100%
        padding: 5px 15px
        cursor: pointer
        font-size: 14px
        line-height: 1
        &:hover
          background-color: #ececec
        &.disable-menu
          background-color: $color-white
          cursor: not-allowed
          color: #aaaaaa
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
  z-index: 1000
  width: 45px
  position: absolute
  top: 200px
  right: 320px
  .operation-wrap
    box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0px
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
      .grid-selecter
        position: absolute
        width: 120px
        left: -8px
        transform: translateX(-100%)
        background-color: $color-dark-gray
        color: $color-white
        z-index: 1000
        &:after
          content: ''
          position: absolute
          top: 50%
          right: -8px
          transform: translateY(-50%)
          triangle(right, 8px, $color-dark-gray)
        .grid-item
          width: 100%
          height: 34px
          font-size: 14px
          padding: 10px
          display: flex
          align-items: center
          cursor: pointer
          span
            flex: 1
          &:hover
            color: $color-main
            background-color: #50555b
        .grid-item-active
          color: $color-main
          background-color: #50555b
    .operation-item-active
      color: $color-main
      background-color: $color-dark-gray
    .disable
      color: #808080
      &:hover
        color: #808080
        background-color: $color-light-gray
        cursor: not-allowed

</style>
