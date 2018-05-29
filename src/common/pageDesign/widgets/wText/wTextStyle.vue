<template>
  <div id="w-text-style">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="位置" name="1">
        <div class="line-layout">
          <number-input label="X" v-model="innerElement.left" @finish="(value) => finish('left', value)" />
          <number-input label="Y" v-model="innerElement.top" @finish="(value) => finish('top', value)" />
          <number-input label="宽" v-model="innerElement.width" @finish="(value) => finish('width', value)" />
          <number-input label="高" v-model="innerElement.height" :editable="false" @finish="(value) => finish('height', value)" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="样式设置" name="2">
        <div class="line-layout style-item">
          <value-select 
            label="大小" 
            suffix="px"
            :data="fontSizeList"
            :value="innerElement.fontSize" 
            @finish="(value) => finish('fontSize', value)" />
          <value-select 
            label="行距"
            suffix="倍"
            :data="lineHeightList"
            v-model="innerElement.lineHeight" 
            @finish="(value) => finish('lineHeight', value)" />
          <value-select 
            label="字距"
            suffix="%"
            :data="letterSpacingList"
            v-model="innerElement.letterSpacing" 
            @finish="(value) => finish('letterSpacing', value)" />
        </div>
        <div class="line-layout style-item">
          <color-select label="字体颜色" v-model="innerElement.textColor" @finish="(value) => finish('textColor', value)" />
          <color-select label="背景颜色" v-model="innerElement.backgroundColor" @finish="(value) => finish('backgroundColor', value)" />
        </div>
        <icon-item-select class="style-item" label="图层层级" :data="layerIconList" @finish="layerAction"/>
        <icon-item-select class="style-item" label="组件对齐" :data="alignIconList" @finish="alignAction"/>
        <icon-item-select class="style-item" label="文本样式" :data="styleIconList" @finish="textStyleAction"/>
        <text-input-area label="文本内容" v-model="innerElement.text" @finish="(value) => finish('text', value)" />
      </el-collapse-item>
      <el-collapse-item title="其他设置" name="3">
        <text-input label="名称" v-model="innerElement.name" @finish="(value) => finish('name', value)" />
      </el-collapse-item>
      <el-collapse-item title="客户端配置(设置客户端是否允许修改)" name="4">
        <div class="setting-list">
          <setting-switch
            class="style-item"
            v-for="item in dActiveElement.setting" 
            :key="item.key"
            :label="item.label"
            v-model="item.value" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// 文本组件样式
const NAME = 'w-text-style'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      innerElement: {},
      tag: false,
      ingoreKeys: [
        'left',
        'top',
        'name',
        'width',
        'height',
        'text',
        'textColor',
        'backgroundColor'
      ],
      fontSizeList: [
        '12',
        '24',
        '26',
        '28',
        '30',
        '34',
        '36',
        '40',
        '44',
        '46',
        '50',
        '60',
        '72',
        '96',
        '106',
        '120',
        '144'
      ],
      lineHeightList: [
        '1',
        '1.5',
        '2'
      ],
      letterSpacingList: [
        '0',
        '10',
        '25',
        '50',
        '75',
        '100',
        '200'
      ],
      layerIconList: [
        {
          key: 'zIndex',
          icon: 'icon-layer-up',
          tip: '上一层',
          value: 1
        },
        {
          key: 'zIndex',
          icon: 'icon-layer-down',
          tip: '下一层',
          value: -1
        }
      ],
      styleIconList: [
        {
          key: 'fontWeight',
          icon: 'icon-bold',
          tip: '加粗',
          value: [
            'normal',
            'bold'
          ],
          select: false
        },
        {
          key: 'fontStyle',
          icon: 'icon-italic',
          tip: '斜体',
          value: [
            'normal',
            'italic'
          ],
          select: false
        },
        {
          key: 'textDecoration',
          icon: 'icon-underline',
          tip: '下划线',
          value: [
            'none',
            'underline'
          ],
          select: false
        },
        {
          key: 'textAlign',
          icon: 'icon-align-left-inside',
          tip: '左对齐文本',
          value: 'left',
          select: false
        },
        {
          key: 'textAlign',
          icon: 'icon-align-center-inside',
          tip: '居中对齐文本',
          value: 'center',
          select: false
        },
        {
          key: 'textAlign',
          icon: 'icon-align-right-inside',
          tip: '右对齐文本',
          value: 'right',
          select: false
        }
      ],
      alignIconList: [
        {
          key: 'align',
          icon: 'icon-align-left',
          tip: '左对齐',
          value: 'left'
        },
        {
          key: 'align',
          icon: 'icon-align-center-horiz',
          tip: '水平居中对齐',
          value: 'ch'
        },
        {
          key: 'align',
          icon: 'icon-align-right',
          tip: '右对齐',
          value: 'right'
        },
        {
          key: 'align',
          icon: 'icon-align-top',
          tip: '上对齐',
          value: 'top'
        },
        {
          key: 'align',
          icon: 'icon-align-center-verti',
          tip: '垂直居中对齐',
          value: 'cv'
        },
        {
          key: 'align',
          icon: 'icon-align-bottom',
          tip: '下对齐',
          value: 'bottom'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'dActiveElement',
      'dMoving'
    ])
  },
  watch: {
    dActiveElement: {
      handler(newValue, oldValue) {
        this.change()
      },
      deep: true
    },
    innerElement: {
      handler(newValue, oldValue) {
        this.changeValue()
      },
      deep: true
    }
  },
  created () {
    this.change()
  },
  methods: {
    ...mapActions([
      'updateWidgetData',
      'updateAlign',
      'updateLayerIndex'
    ]),
    change () {
      this.tag = true
      this.innerElement = JSON.parse(JSON.stringify(this.dActiveElement))
      this.changeStyleIconList()
    },
    changeValue () {
      if (this.tag) {
        this.tag = false
        return
      }
      if (this.dMoving) {
        return
      }
      for(let key in this.innerElement) {
        if (this.ingoreKeys.indexOf(key) !== -1) {
          this.dActiveElement[key] = this.innerElement[key]
        } else if (key !== 'setting' && key !== 'record' && this.innerElement[key] !== this.dActiveElement[key]) {
          this.updateWidgetData({
            uuid: this.dActiveElement.uuid,
            key: key,
            value: this.innerElement[key]
          })
        }
      }
    },
    finish (key, value) {
      this.updateWidgetData({
        uuid: this.dActiveElement.uuid,
        key: key,
        value: value,
        pushHistory: true
      })
    },
    layerAction (item) {
      this.updateLayerIndex({
        uuid: this.dActiveElement.uuid,
        value: item.value
      })
    },
    textStyleAction (item) {
      let value = item.key === 'textAlign' ? item.value : item.value[item.select ? 1 : 0]
      this.innerElement[item.key] = value
    },
    alignAction (item) {
      this.updateAlign({
        align: item.value,
        uuid: this.dActiveElement.uuid
      })
    },
    changeStyleIconList () {
      for (let i = 0; i < this.styleIconList.length; ++i) {
        let key = this.styleIconList[i].key
        this.styleIconList[i].select = false
        if (key === 'textAlign' && this.innerElement[key] === this.styleIconList[i].value) {
          this.styleIconList[i].select = true
          continue
        }
        switch (key) {
          case 'fontWeight':
          case 'fontStyle':
            if (this.innerElement[key] !== 'normal') {
              this.styleIconList[i].select = true
            }
            break
          case 'textDecoration':
            if (this.innerElement[key] !== 'none') {
              this.styleIconList[i].select = true
            }
            break
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#w-text-style
  width: 100%
  height: 100%

.line-layout
  width: 100%
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-between
.style-item
  margin-bottom: 10px
.setting-list
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  flex-wrap: wrap
</style>
