const ignoreNode = [
  'INPUT',
  'TEXTAREA'
]

var shortcuts = {
  methods: {
    handleKeydowm (e) {
      let nodeName = e.target.nodeName
      if (ignoreNode.indexOf(nodeName) !== -1 || (nodeName === 'DIV' && e.target.contentEditable === 'true')) {
        return
      }
      if (this.dActiveElement.uuid === '-1') {
        return
      }
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.deleteWidget()
      }
    }
  }
}

export { shortcuts }
