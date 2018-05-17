<template>
  <div 
    id="w-circle"
    ref="widget"
    :style="{
      position: 'absolute',
      left: params.left + 'px',
      top: params.top + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      border: params.size + 'px solid ' + params.color,
      backgroundColor: params.backgroundColor,
      borderRadius: '50%',
      opacity: params.opacity,
      zIndex: params.zIndex
    }">
    </div>
</template>

<script>
// 形状-圆形组件
const NAME = 'w-circle'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  setting: {
    name: '形状-圆形',
    type: NAME,
    uuid: -1,
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    zIndex: 0,
    opacity: 1,
    parent: '-1',
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: '',
    size: 5,
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
  props: ['params'],
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
        record.minWidth = this.params.size * 2
        record.minHeight = this.params.size * 2
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#w-circle
  outline: none
  cursor: pointer
</style>
