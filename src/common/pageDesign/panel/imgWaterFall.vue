<template>
  <div id="img-water-fall" ref="imgWaterFall">
    <div 
      class="img-box"
      v-for="(item, index) in innerListData"
      :key="index"
      :style="{
        width: boxWidth + 'px',
        height: item.height + 'px',
        top: item.top + 'px',
        left: item.left + 'px'
      }"
      @click.stop="selectImg(item.value, index)">
      <img 
        :src="item.value.url"
        :style="{
          width: boxWidth - 10 + 'px',
          height: item.height - 10 + 'px'
        }" />
      <div class="delete" v-if="item.value.canDel" @click.stop="deleteImg(item.value, index)">
        <div class="bg"></div>
        <i class="delete-icon iconfont icon-delete-x"></i>
      </div>
    </div>
  </div>
</template>

<script>
// 图片素材-瀑布流组件
const NAME = 'img-water-fall'

export default {
  name: NAME,
  props: {
    calc: {
      default: false
    },
    listData: {
      type: Array,
      required: true
    },
    sortBy: {
      default: ''
    }
  },
  data () {
    return {
      innerListData: [],
      parentWidth: 0
    }
  },
  mounted () {
    this.preLoadImg()
  },
  computed: {
    boxWidth () {
      return (this.parentWidth - 20) / 3
    }
  },
  watch: {
    listData (value) {
      this.preLoadImg()
    },
    parentWidth (value) {
      this.parentWidth = this.$refs.imgWaterFall.clientWidth
      this.reCalc()
    },
    calc (value) {
      if (value) {
        this.parentWidth = this.$refs.imgWaterFall.clientWidth
      }
    }
  },
  methods: {
    preLoadImg () {
      this.listData.forEach((item, index) => {
        let img = new Image()
        img.addEventListener('load', (e) => {
          if (e.type === 'load') {
            this.loadFinish({
              imgWidth: img.width,
              imgHeight: img.height,
              item: item
            })
          }
        }, false)
        img.src = item.url
      })
    },
    loadFinish ({imgWidth, imgHeight, item}) {
      if (this.parentWidth > 0) {
        this.innerListData.push({
          width: this.boxWidth,
          height: this.boxWidth * imgHeight / imgWidth,
          imgWidth: imgWidth,
          imgHeight: imgHeight,
          value: item
        })
        this.waterfall()
      } else {
        this.innerListData.push({
          imgWidth: imgWidth,
          imgHeight: imgHeight,
          value: item
        })
      }
    },
    reCalc () {
      this.innerListData.forEach((item, index) => {
        item.width = this.boxWidth
        item.height = this.boxWidth * item.imgHeight / item.imgWidth
      })
      this.waterfall()
    },
    waterfall () {
      if (this.sortBy !== '') {
        this.innerListData.sort((a, b) => a.value[this.sortBy] < b.value[this.sortBy] ? -1 : 1)
      }
      let heightList = [1, 1, 1]
      let len = this.innerListData.length
      for (let index = 0; index < len; ++index) {
        let item = this.innerListData[index]
        let col = index % 3
        item.top = heightList[col]
        item.left = this.boxWidth * col + 1
        heightList[col] += item.height
      }
    },
    selectImg (value, index) {
      this.$emit('select-img', value)
    },
    deleteImg (value, index) {
      this.innerListData.splice(index, 1)
      this.waterfall()
      this.$emit('delete-img', value)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#img-water-fall
  position: relative
  width: 100%
  .img-box
    position: absolute
    cursor: pointer
    padding: 5px
    &:hover
      outline: 1px solid $color-main
      .delete
        width: 40px
        height: 40px
        .bg
          border-top: 40px solid $color-light-gray
          border-right: 40px solid $color-transparent
        .delete-icon
          left: 5px
          top: 5px
          display: block
          position: absolute
    .delete
      position: absolute
      left: 0
      top: 0
      .delete-icon
        font-size: 12px
        color: $color-white
        display: none

</style>
