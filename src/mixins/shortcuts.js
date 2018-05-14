const ignoreNode = [
  'INPUT',
  'TEXTAREA'
]

const ignoreKeyCode = [
  {
    key: ['ctrlKey', 'metaKey'],
    keyCode: 82
  }
]

let hadDown = false

let shortcuts = {
  methods: {
    handleKeydowm (e) {
      if (hadDown || this.showMenuBg) {
        return
      }
      hadDown = true
      let ctrl = e.metaKey || e.ctrlKey
      if (ctrl) {
        hadDown = false
      }
      let nodeName = e.target.nodeName
      if (ignoreNode.indexOf(nodeName) !== -1 || (nodeName === 'DIV' && e.target.contentEditable === 'true')) {
        return
      }
      let ele = ignoreKeyCode.find(item => {
        let f = false
        for (let i = 0; i < item.key.length; ++i) {
          f = e[item.key[i]]
          if (f) {
            break
          }
        }
        return f && e.keyCode === item.keyCode
      })
      if (!ele) {
        e.stopPropagation()
        e.preventDefault()
      }
      if (ctrl) {
        this.dealCtrl(e)
        return
      }
      if (this.dActiveElement.uuid === '-1') {
        return
      }
      switch (e.keyCode) {
        case 38:
          this.udlr('top', -1)
          break
        case 40:
          this.udlr('top', 1)
          break
        case 37:
          this.udlr('left', -1)
          break
        case 39:
          this.udlr('left', 1)
          break
        case 46:
        case 8:
          this.$store.dispatch('deleteWidget')
          break
      }
    },
    handleKeyup (e) {
      hadDown = false
    },
    /**
     * 键盘操作上下左右移动组件
     */
    udlr (type, value) {
      let result = this.dActiveElement[type] + value
      if (type === 'left') {
        result = Math.max(0, Math.min(this.dPage.width - this.dActiveElement.record.width, result))
      } else {
        result = Math.max(0, Math.min(this.dPage.height - this.dActiveElement.record.height, result))
      }
      this.$store.dispatch('updateWidgetData', {
        uuid: this.dActiveElement.uuid,
        key: type,
        value: result
      })
    },
    dealCtrl (e) {
      console.log(e.key, e.keyCode)
      switch (e.keyCode) {
        case 67: // c
          if (this.dActiveElement.uuid === '-1') {
            return
          }
          this.copyWidget()
          break
        case 86: // v
          if (this.dCopyElement.length === 0) {
            return
          }
          this.pasteWidget()
          break
        case 90: // z
          if (e.shiftKey) {
            if (!(this.dHistoryParams.index === this.dHistoryParams.length - 1)) {
              this.handleHistory('redo')
            }
          } else if (!(this.dHistoryParams.index === -1 || (this.dHistoryParams === 0 && this.dHistoryParams.length === 10))) {
            this.handleHistory('undo')
          }
          break
      }
    }
  }
}

export { shortcuts }
