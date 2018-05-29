<template>
  <div id="w-group-style">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="位置大小" name="1">
        <div class="position-size">
          <number-input label="X" v-model="innerElement.left" @finish="(value) => finish('left', value)" />
          <number-input label="Y" v-model="innerElement.top" @finish="(value) => finish('top', value)" />
          <number-input label="宽" v-model="defaultValue" :editable="false" />
          <number-input label="高" v-model="defaultValue" :editable="false" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="样式设置" name="2">
        <div class="ungroup style-item" @click="ungroup(innerElement.uuid)">取消组合</div>
        <icon-item-select class="style-item" label="图层层级" :data="layerIconList" @finish="layerAction"/>
        <icon-item-select label="组件对齐" :data="alignIconList" @finish="alignAction"/>
      </el-collapse-item>
      <el-collapse-item title="其他设置" name="3">
        <text-input label="名称" v-model="innerElement.name" @finish="(value) => finish('name', value)" />
      </el-collapse-item>
      <el-collapse-item title="客户端配置(设置客户端是否允许修改)" name="4">
        <setting-switch 
          v-for="item in dActiveElement.setting" 
          :key="item.key"
          :label="item.label"
          v-model="item.value" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// 组合组件样式
const NAME = 'w-group-style'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      defaultValue: 0,
      innerElement: {},
      tag: false,
      ingoreKeys: [
        'name',
        'width',
        'height'
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
      'dActiveElement'
    ])
  },
  created () {
    this.change()
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
  methods: {
    ...mapActions([
      'updateWidgetData',
      'updateAlign',
      'updateLayerIndex',
      'ungroup'
    ]),
    change () {
      this.tag = true
      this.innerElement = JSON.parse(JSON.stringify(this.dActiveElement))
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
        value: item.value,
        isGroup: true
      })
    },
    alignAction (item) {
      this.updateAlign({
        align: item.value,
        uuid: this.dActiveElement.uuid
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#w-group-style
  width: 100%
  height: 100%

.position-size
  width: 100%
  display: flex
  justify-content: space-between
.select
  margin-bottom: 10px
.ungroup
  text-align: center
  background-color: $color-main
  cursor: pointer
  padding: 5px
  color: $color-white
  margin: 10px
  &:hover
    background-color: lighten($color-main, 10%)
</style>
