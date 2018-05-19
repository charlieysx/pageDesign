<template>
  <div 
    id="w-group"
    ref="widget"
    :style="{
      position: 'absolute',
      left: (params.left - parent.left) + 'px',
      top: (params.top - parent.top) + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      opacity: params.opacity
    }">
    <slot></slot>
  </div>
</template>

<script>
// 组合组件
const NAME = 'w-group'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  setting: {
    name: '组合',
    type: NAME,
    uuid: -1,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    opacity: 1,
    parent: '-1',
    isContainer: true,
    setting: [
    ],
    record: {
      width: 0,
      height: 0,
      minWidth: 0,
      minHeight: 0,
      dir: 'none'
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
#w-group
  outline: none
  cursor: pointer
</style>
