<template>
  <div id="text-input">
    <p 
      class="input-label" 
      v-if="label">
      {{ label }}
    </p>
    <div class="input-wrap" :class="{active: inputBorder}">
      <input
        class="real-input"
        :class="{disable : !editable}"
        type="text"
        :value="value"
        :readonly="editable ? false : 'readonly'"
        @input="updateValue($event.target.value)"
        @focus="focusInput"
        @blur="blurInput"/>
    </div>
  </div>
</template>

<script>
// 文本输入组件
const NAME = 'text-input'

export default {
  name: NAME,
  props: {
    label: {
      default: ''
    },
    value: {
      default: ''
    },
    editable: {
      default: true
    }
  },
  data () {
    return {
      inputBorder: false,
      tagText: ''
    }
  },
  computed: {
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    focusInput () {
      this.inputBorder = true
      this.tagText = this.value
    },
    blurInput () {
      this.inputBorder = false
      if (this.value !== this.tagText) {
        this.$emit('finish', this.value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#text-input
  width: 100%
  font-size: 12px
  line-height: 12px
  display: flex
  flex-direction: row
  align-items: flex-start
  .input-label
    padding: 7px
    padding-left: 0px
  .input-wrap
    flex: 1
    padding: 5px
    border: 1px solid #e1e1e1
    border-radius: 3px
    &.active
      border: 1px solid rgba(59, 116, 241, .7)
      box-shadow: 1px 1px 5px 2px rgba(59, 116, 241, .1)
    .real-input
      width: 100%
      border: 0px
      outline: none
      border-radius: 3px
      &.disable
        color: #666666
        cursor: not-allowed

</style>
