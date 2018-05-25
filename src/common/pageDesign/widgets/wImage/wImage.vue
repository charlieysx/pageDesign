<template>
  <img 
    id="w-image"
    ref="widget"
    :src="params.imgUrl" 
    :style="{
      position: 'absolute',
      left: (params.left - parent.left) + 'px',
      top: (params.top - parent.top) + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      opacity: params.opacity,
      borderTopLeftRadius: params.radiusTopLeft + 'px',
      borderTopRightRadius: params.radiusTopRight + 'px',
      borderBottomLeftRadius: params.radiusBottomLeft + 'px',
      borderBottomRightRadius: params.radiusBottomRight + 'px'
    }"/>
</template>

<script>
// 图片组件
const NAME = 'w-image'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  setting: {
    name: '图片',
    type: NAME,
    uuid: -1,
    width: 300,
    height: 300,
    left: 0,
    top: 0,
    radiusTopLeft: 0,
    radiusTopRight: 0,
    radiusBottomLeft: 0,
    radiusBottomRight: 0,
    opacity: 1,
    parent: '-1',
    imgUrl: '',
    setting: [
      {
        label: '图片',
        parentKey: 'imgUrl',
        value: true
      }
    ],
    record: {
      width: 0,
      height: 0,
      minWidth: 10,
      minHeight: 10,
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
#w-image
  outline: none
  cursor: pointer
</style>
