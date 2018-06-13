<template>
  <div id="page-design-index" ref="pageDesignIndex">
    <div class="top-nav" :style="style">
      <div class="top-nav-wrap">
        <div class="top-back">
          <i class="iconfont icon-arrow-left"></i>
        </div>
        <div class="top-title">
          pageDesign
        </div>
        <div class="top-icon-wrap">
          <div class="top-icon" @click="save">
            <i class="iconfont icon-save"></i>
            保存
          </div>
          <div class="top-icon" @click="save" v-if="false">
            <i class="iconfont icon-publish"></i>
            发布
          </div>
        </div>
      </div>
    </div>
    <div class="page-design-index-wrap">
      <widget-panel></widget-panel>
      <page-design class="page-design-wrap" pageDesignCanvasId="page-design-canvas"></page-design>
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
    <div class="fill-info-wrap" v-if="fillInfoing">
      <div class="fill-info-content" v-loading="publishing">
        <el-steps :active="active[fillStep]" finish-status="success" align-center>
          <el-step :title="message['1']"></el-step>
          <!-- <el-step :title="message['2']"></el-step>
          <el-step :title="message['3']"></el-step> -->
        </el-steps>
        <div class="fill-info-step" v-if="fillStep === 1" v-loading="true">
        </div>
        <!-- <div class="fill-info-step" v-show="fillStep === 2 || fillStep === 3">
          <div id="cover-wrap">
            <img id="cover" />
          </div>
          <text-input label="名称" v-model="title" />
          <div class="publish-btn" @click="publish">
            <span v-show="!publishing">确认发布</span>
            <i class="el-icon-loading" v-show="publishing"></i>
          </div>
          <div class="close-publish" @click="closePublish">
            关闭
          </div>
        </div> -->
        <div class="fill-info-step" v-show="fillStep === 2 || fillStep === 3">
          <div id="cover-wrap">
            <img id="cover" />
          </div>
          <div class="publish-btn" @click="saveImg">
            <span v-show="!publishing">保存图片</span>
            <i class="el-icon-loading" v-show="publishing"></i>
          </div>
          <div class="close-publish" @click="closePublish">
            关闭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'COMMON/pageDesign/index'
import wGroup from 'COMMON/pageDesign/widgets/wGroup/wGroup'
import { shortcuts } from 'MIXINS/shortcuts'
import html2canvas from 'html2canvas'

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
      ],
      fillInfoing: false,
      message: {
        '1': '生成封面图',
        '2': '填写模板信息',
        '3': '发布模板'
      },
      active: {
        '1': 0,
        '2': 1,
        '3': 2
      },
      fillStep: 1,
      formParams: {},
      title: '',
      publishing: false
    }
  },
  mixins: [shortcuts],
  computed: {
    ...mapGetters([
      'dHistoryParams',
      'dActiveElement',
      'dShowRefLine',
      'dCopyElement',
      'dPage',
      'dAltDown',
      'dWidgets',
      'dZoom'
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
    this.initGroupJson(JSON.stringify(wGroup.setting))
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
      'getWidgetJsonData',
      'initGroupJson',
      'updateLayerIndex',
      'ungroup',
      'updateZoom'
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

        if (uuid !== '-1' && !this.dAltDown) {
          let widget = this.dWidgets.find(item => item.uuid === uuid)
          if (widget.parent !== '-1' && widget.parent !== this.dActiveElement.uuid && widget.parent !== this.dActiveElement.parent) {
            uuid = widget.parent
          }
        }
        this.selectWidget({
          uuid: uuid || '-1'
        })
        this.showMenu(e)
      }
    },
    showMenu (e) {
      let isPage = this.dActiveElement.uuid === '-1'
      this.menuList.list = isPage ? this.pageMenu : this.widgetMenu
      if (this.dActiveElement.isContainer) {
        let ungroup = [{
          type: 'ungroup',
          text: '取消组合'
        }]
        this.menuList.list = ungroup.concat(this.menuList.list)
      }
      this.showMenuBg = true
      document.getElementById('menu-bg').addEventListener('click', this.closeMenu, false)
      let mx = e.pageX
      let my = e.pageY
      let listWidth = 120
      if (mx + listWidth > window.innerWidth) {
        mx -= listWidth
      }
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
          this.updateLayerIndex({
            uuid: this.dActiveElement.uuid,
            value: 1,
            isGroup: this.dActiveElement.isContainer
          })
          break
        case 'index-down':
          this.updateLayerIndex({
            uuid: this.dActiveElement.uuid,
            value: -1,
            isGroup: this.dActiveElement.isContainer
          })
          break
        case 'del':
          this.deleteWidget()
          break
        case 'ungroup':
        this.ungroup(this.dActiveElement.uuid)
          break
      }
    },
    // save () {
    //   this.fillStep = 1
    //   this.fillInfoing = true
    //   let nowGrideSizeIndex = this.gridSizeIndex
    //   let nowZoom = this.dZoom
    //   // 取消选中元素
    //   this.selectWidget({
    //     uuid: '-1'
    //   })
    //   this.gridSizeIndex = 0
    //   this.updateZoom(100)
    //   this.getQiniuToken().then((data) => {
    //     let opts = {
    //       useCORS: true, // 跨域图片
    //     }
    //     html2canvas(document.getElementById('page-design-canvas'), opts).then((canvas) => {
    //       canvas.toBlob((blob) => {
    //         this.blobToImage(blob, data => {
    //           document.getElementById('cover').src = data
    //         })

    //         this.fillStep = 2
    //         this.gridSizeIndex = nowGrideSizeIndex
    //         this.updateZoom(nowZoom)

    //         this.formParams = new FormData()
    //         this.formParams.append('token', data.token)
    //         this.formParams.append('file', blob, 'canvas.png')
    //       }, 'image/png')
    //     })
    //   }).catch(err => this.saveError(err.msg))
    // },
    publish () {
      if (this.publishing) {
        return
      }
      if (!this.title) {
        this.$message({
          showClose: true,
          message: '请输入名称',
          type: 'error'
        })
        return
      }
      this.publishing = true
      this.uploadToQiniu(this.formParams).then((qiniuData) => {
        this.getWidgetJsonData().then((json) => {
          let templateData = {
            title: this.title,
            template: JSON.stringify(json),
            cover: qiniuData.imgUrl
          }
          this.fillStep = 3
          this.createDesignTemplate(templateData).then(data => {
            this.fillStep = 4
            this.publishing = false
            this.fillInfoing = false
            this.$message({
              showClose: true,
              message: '发布完成',
              type: 'success'
            })
          }).catch(err => {
            this.publishing = false
            if (!err.code === -2) {
              this.saveError(err.msg)
            }
          })
        })
      }).catch(err => this.saveError(err.msg))
    },
    closePublish () {
      this.publishing = false
      this.fillInfoing = false
      this.fillStep = 1
    },
    saveError (message) {
      this.publishing = false
      this.fillInfoing = false
      this.fillStep = 1
      this.$message({
        showClose: true,
        message: message,
        type: 'error'
      })
    },
    fileOrBlobToDataURL (obj, cb) {
      let a = new FileReader()
      a.readAsDataURL(obj)
      a.onload = e => {
        cb(e.target.result)
      }
    },
    blobToImage (blob, cb){
      this.fileOrBlobToDataURL(blob, dataurl => {
        cb(dataurl)
      })
    },
    save () {
      this.fillStep = 1
      this.fillInfoing = true
      let nowGrideSizeIndex = this.gridSizeIndex
      let nowZoom = this.dZoom
      // 取消选中元素
      this.selectWidget({
        uuid: '-1'
      })
      this.gridSizeIndex = 0
      this.updateZoom(100)
      let opts = {
        useCORS: true, // 跨域图片
      }
      let _this = this
      setTimeout(function() {
        html2canvas(document.getElementById('page-design-canvas'), opts).then((canvas) => {
          canvas.toBlob((blob) => {
            _this.blobToImage(blob, data => {
              document.getElementById('cover').src = data
            })

            _this.fillStep = 2
            _this.gridSizeIndex = nowGrideSizeIndex
            _this.updateZoom(nowZoom)

          }, 'image/png')
        })
      }, 500)
    },
    saveImg () {
      if (this.publishing) {
        return
      }
      this.publishing = true
      let image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          let context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          let url = canvas.toDataURL('image/png')

          let a = document.createElement('a')
          let event = new MouseEvent('click')

          // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
          a.download = name || 'pageDesign'
          a.href = url

          // 触发a的单击事件
          a.dispatchEvent(event)
      }

      image.src = document.getElementById('cover').src
      this.publishing = false
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

.fill-info-wrap
  position: absolute
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.8)
  z-index: 2000
  padding: 50px
  .fill-info-content
    border-radius: 10px
    width: 600px
    min-height: 600px
    max-height: 861px
    margin: 0 auto
    padding: 20px
    background-color: #fff
    display: flex
    flex-direction: column
    .fill-info-step
      width: 100%
      flex: 1
      #cover-wrap
        margin: 20px auto
        width: 400px
        height: 400px
        display: flex
        justify-content: center
        align-items: center
        #cover
          max-width: 400px
          max-height: 400px
          box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
      .publish-btn
        margin: 20px auto
        padding: 10px
        text-align: center
        border-radius: 5px
        color: $color-white
        background-color: $color-main
        cursor: pointer
        &:hover
          background-color: lighten($color-main, 10%)
      .close-publish
        margin: 20px auto
        margin-bottom: 0px
        padding: 10px
        text-align: center
        border-radius: 5px
        color: $color-main
        background-color: $color-white
        outline: 1px solid $color-main
        cursor: pointer
        &:hover
          color: $color-white
          background-color: lighten($color-main, 10%)

</style>
