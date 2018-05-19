<template>
  <div 
    id="w-line"
    ref="widget"
    :style="{
      position: 'absolute',
      left: (params.left - parent.left) + 'px',
      top: (params.top - parent.top) + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      backgroundColor: params.backgroundColor,
      opacity: params.opacity
    }">
    </div>
</template>

<script>
// 形状-线条组件
const NAME = 'w-line'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  setting: {
    name: '形状-线条',
    type: NAME,
    uuid: -1,
    width: 300,
    height: 2,
    left: 10,
    top: 10,
    opacity: 1,
    parent: '-1',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    setting: [
    ],
    record: {
      width: 0,
      height: 0,
      minWidth: 1,
      minHeight: 1,
      dir: 'all'
    }
  },
  props: ['params', 'parent'],
  data () {
    return {
    }
  },
  updated () {
    this.updateRecord()
  },
  mounted () {
    this.updateRecord()
  },
  computed: {
    ...mapGetters([
      'dActiveElement'
    ])
  },
  methods: {
    ...mapActions([
    ]),
    updateRecord () {
      if (this.dActiveElement.uuid === this.params.uuid) {
        let record = this.dActiveElement.record
        record.width = this.$refs.widget.offsetWidth
        record.height = this.$refs.widget.offsetHeight
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#w-line
  outline: none
  cursor: pointer
</style>
