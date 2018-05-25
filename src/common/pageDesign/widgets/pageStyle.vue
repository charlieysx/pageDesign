<template>
  <div id="page-style">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="位置大小" name="1">
        <div class="position-size">
          <number-input label="X" v-model="defaultValue" :editable="false"/>
          <number-input label="Y" v-model="defaultValue" :editable="false"/>
          <number-input label="宽" v-model="innerElement.width" @finish="(value) => finish('width', value)" />
          <number-input label="高" v-model="innerElement.height" @finish="(value) => finish('height', value)" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="样式设置" name="2">
        <color-select class="select-none" label="背景颜色" v-model="innerElement.backgroundColor" @finish="(value) => finish('backgroundColor', value)" />
        <!-- <bg-img-select :img="innerElement.backgroundImage"/> -->
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
// 画布组件样式
const NAME = 'page-style'
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
        'backgroundColor',
        'name',
        'width',
        'height'
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
      'updatePageData'
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
      for(let key in this.innerElement) {
        if (key !== 'setting' && key !== 'record' && this.innerElement[key] !== this.dActiveElement[key]) {
          if (this.ingoreKeys.indexOf(key) !== -1) {
            this.dActiveElement[key] = this.innerElement[key]
          } else {
            this.updatePageData({
              key: key,
              value: this.innerElement[key]
            })
          }
        }
      }
    },
    finish (key, value) {
      this.updatePageData({
        key: key,
        value: value,
        pushHistory: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#page-style
  width: 100%
  height: 100%

.position-size
  width: 100%
  display: flex
  justify-content: space-between
.select
  margin-bottom: 10px
</style>
