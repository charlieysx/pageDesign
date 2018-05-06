<template>
  <div id="w-text-style">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="位置" name="1">
        <div class="position-size">
          <number-input label="X" v-model="innerElement.left" @finish="(value) => finish('left', value)" />
          <number-input label="Y" v-model="innerElement.top" @finish="(value) => finish('top', value)" />
          <number-input label="宽" v-model="innerElement.width" @finish="(value) => finish('width', value)" />
          <number-input label="高" v-model="innerElement.height" :editable="false" @finish="(value) => finish('height', value)" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="样式设置" name="2">
        <div>设置各种参数</div>
      </el-collapse-item>
      <el-collapse-item title="其他设置" name="3">
        <div>设置组件名称</div>
        <div>设置父容器</div>
      </el-collapse-item>
      <el-collapse-item title="客户端配置" name="4">
        <div>配置是否允许修改</div>
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
        'height'
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
      'updateWidgetData'
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
        } else {
          this.updateWidgetData({
            uuid: this.dActiveElement.uuid,
            key: key,
            value: this.innerElement[key]
          })
        }
      }
    },
    finish (key, value) {
      console.log(key, value)
      this.updateWidgetData({
        uuid: this.dActiveElement.uuid,
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
#w-text-style
  width: 100%
  height: 100%

.position-size
  width: 100%
  display: flex
  justify-content: space-between
</style>
