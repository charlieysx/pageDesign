<template>
  <div 
    id="w-text"
    v-html="params.text"
    :contenteditable="editable"
    @dblclick="(e) => dblclickText(e)"
    @blur="(e) => updateText(e)"
    :class="[{'edit-text': editable}, params.uuid]"
    :style="{
      position: 'absolute',
      left: params.left + 'px',
      top: params.top + 'px',
      width: Math.max(params.fontSize, params.width) + 'px',
      minWidth: params.fontSize + 'px',
      minHeight: params.fontSize * params.lineHeight + 'px',
      lineHeight: params.fontSize * params.lineHeight + 'px',
      letterSpacing: params.fontSize * params.letterSpacing / 100 + 'px',
      fontSize: params.fontSize + 'px',
      color: params.color,
      textAlign: params.textAlign,
      fontWeight: params.fontWeight,
      fontStyle: params.fontStyle,
      textDecoration: params.textDecoration,
      opacity: params.opacity,
      backgroundColor: params.backgroundColor,
      zIndex: params.zIndex
    }">
  </div>
</template>

<script>
// 文本组件
const NAME = 'w-text'

import {
  mapActions
} from 'vuex'

export default {
  name: NAME,
  setting: {
    name: '文本',
    type: NAME,
    uuid: -1,
    editable: true,
    width: 600,
    left: 0,
    top: 0,
    zIndex: 0,
    lineHeight: 1.5,
    letterSpacing: 0,
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#000000',
    textAlign: 'left',
    text: '文本',
    opacity: 1,
    backgroundColor: '#ffffff00',
    parent: '-1'
  },
  props: ['params'],
  data () {
    return {
      editable: false
    }
  },
  methods: {
    ...mapActions([
      'updateWidgetData'
    ]),
    updateText (e) {
      // this.editable = false
      // this.updateWidgetData({
      //   uuid: this.params.uuid,
      //   key: 'text',
      //   value: e.target.innerText
      // })
    },
    dblclickText (e) {
      // this.editable = true
      // let text = document.getElementsByClassName(this.params.uuid)
      // if (text.length > 0) {
      //   text = text[0]
      // }
      // if (document.body.createTextRange) {
      //   var range = document.body.createTextRange()
      //   range.moveToElementText(text)
      //   range.select()
      // } else if (window.getSelection) {
      //   var selection = window.getSelection()
      //   var range = document.createRange()
      //   range.selectNodeContents(text)
      //   selection.removeAllRanges()
      //   selection.addRange(range)
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#w-text
  outline: none
  cursor: pointer
  word-break: break-all
  &.edit-text
    cursor: text
    outline: 1px solid $color-black !important
</style>
