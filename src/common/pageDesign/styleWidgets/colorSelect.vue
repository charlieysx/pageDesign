<template>
  <div id="color-select">
    <span class="label">{{ label }}</span>
    <el-color-picker
      v-model="innerColor"
      show-alpha
      size="medium"
      @active-change="activeChange"
      :predefine="dColorHistory">
    </el-color-picker>
  </div>
</template>

<script>
// 颜色选择组件
const NAME = 'color-select'
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
    value: {
      default: ''
    }
  },
  data() {
    return {
      innerColor: '#000000',
      first: true
    }
  },
  created () {
    this.first = true
    this.innerColor = this.value
  },
  watch: {
    innerColor (value) {
      if (this.first) {
        this.first = false
        return
      }
      this.$emit('finish', value)
      this.pushColorToHistory(value)
    }
  },
  computed: {
    ...mapGetters([
      'dColorHistory'
    ])
  },
  methods: {
    ...mapActions([
      'pushColorToHistory'
    ]),
    updateValue (value) {
      this.$emit('input', value)
    },
    activeChange (value) {
      this.updateValue(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
#color-select
  display: flex
  align-items: center
  .label
    margin-right: 10px
</style>
