const ignoreNode = [
  'INPUT',
  'TEXTAREA'
]

// 系统组合键
const systemKeyCode = [
  {
    // ctrl+r刷新
    key: ['ctrlKey', 'metaKey'],
    code: 82
  },
  {
    // ctrl+alt+i打开开发者
    key: ['ctrlKey', 'metaKey'],
    key2: ['altKey'],
    code: 73
  }
]

let hadDown = false

let shortcuts = {
  methods: {
    handleKeydowm (e) {
      let nodeName = e.target.nodeName
      if (ignoreNode.indexOf(nodeName) !== -1 || (nodeName === 'DIV' && e.target.contentEditable === 'true')) {
        return
      }
      if (hadDown || this.showMenuBg) {
        e.stopPropagation()
        e.preventDefault()
        return
      }
      hadDown = true
      let ctrl = e.key === 'Control' || e.key === 'Meta'
      let alt = e.key === 'Alt'
      let shift = e.key === 'Shift'
      let dir = e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40
      let specialKey = ctrl || alt || shift || dir
      if (specialKey || e.metaKey) {
        hadDown = false
      }
      if (alt) {
        this.$store.dispatch('updateAltDown', true)
      }
      let systemKey = systemKeyCode.find(item => {
        let f = false
        let f2 = false
        for (let i = 0; i < item.key.length; ++i) {
          f = e[item.key[i]]
          if (f) {
            break
          }
        }
        if (item.key2) {
          for (let i = 0; i < item.key2.length; ++i) {
            f2 = e[item.key2[i]]
            if (f2) {
              break
            }
          }
        }
        return f && f2 && e.keyCode === item.code
      })
      if (systemKey) {
        return
      }

      let withCtrl = e.ctrlKey || e.metaKey
      if (withCtrl && !specialKey) {
        this.dealCtrl(e)
        return
      }
      let withAlt = e.altKey
      if (withAlt && !specialKey) {
        return
      }
      let withShift = e.shiftKey
      if (withShift && !specialKey) {
        return
      }
      if (this.dActiveElement.uuid === '-1') {
        return
      }
      e.stopPropagation()
      e.preventDefault()

      let f = withShift ? 10 : 1
      switch (e.keyCode) {
        case 38:
          this.udlr('top', -1 * f)
          break
        case 40:
          this.udlr('top', 1 * f)
          break
        case 37:
          this.udlr('left', -1 * f)
          break
        case 39:
          this.udlr('left', 1 * f)
          break
        case 46:
        case 8:
          this.$store.dispatch('deleteWidget')
          break
      }
    },
    handleKeyup (e) {
      console.log(e)
      hadDown = false
      if (e.key === 'Alt') {
        this.$store.dispatch('updateAltDown', false)
      }
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
        case 83: // s
          // this.save()
          break
      }
    }
  }
}

export { shortcuts }
