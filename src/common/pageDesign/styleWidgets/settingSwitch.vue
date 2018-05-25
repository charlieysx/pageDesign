<template>
  <div id="setting-switch">
    <span class="label">{{ label }}</span>
    <el-switch
      v-model="innerValue"
      active-color="#3B74F1">
    </el-switch>
  </div>
</template>

<script>
// 设置开关组件
const NAME = 'setting-switch'

export default {
  name: NAME,
  props: {
    label: {
      default: ''
    },
    value: {
      default: ''
    }
  },
  data() {
    return {
      innerValue: false,
      first: false
    }
  },
  created () {
    if (this.innerValue != this.value) {
      this.first = true
    }
    this.innerValue = this.value
  },
  watch: {
    innerValue (value) {
      if (this.first) {
        this.first = false
        return
      }
      this.updateValue(value)
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="stylus" scoped>
#setting-switch
  display: flex
  align-items: center
  .label
    margin-right: 10px
</style>
