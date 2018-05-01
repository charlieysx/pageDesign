<template>
  <div 
    id="w-text"
    v-html="text"
    :contenteditable="editable"
    @dblclick="(e) => dblclickText(e)"
    @blur="(e) => updateText(e)"
    :class="{'edit-text': editable}"
    :style="{
      position: 'absolute',
      left: '0',
      top: '0',
      width: '750px',
      minHeight: 96 * lineHeight + 'px',
      lineHeight: 96 * lineHeight + 'px',
      letterSpacing: 96 * 0 / 100 + 'px',
      fontSize: '96px',
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold'
    }">
  </div>
</template>

<script>
// 文本组件
const NAME = 'w-text'

export default {
  name: NAME,
  data () {
    return {
      editable: false,
      text: '大标题',
      lineHeight: 1
    }
  },
  methods: {
    updateText (e) {
      console.log(e.target.innerText)
      this.editable = false
    },
    dblclickText (e) {
      this.editable = true
      let text = document.getElementById('w-text')
      if (document.body.createTextRange) {
        var range = document.body.createTextRange()
        range.moveToElementText(text)
        range.select()
      } else if (window.getSelection) {
        var selection = window.getSelection()
        var range = document.createRange()
        range.selectNodeContents(text)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#w-text
  outline: none
  cursor: pointer
  &.edit-text
    cursor: text
    border: 1px solid #000000
</style>
