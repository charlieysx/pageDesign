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
      <transition name="fade">
        <img
          v-if="item.imgWidth !== 0 && item.imgHeight !== 0"
          :src="item.value.url"
          :style="{
            width: boxWidth - 10 + 'px',
            height: item.height - 10 + 'px'
          }" />
      </transition>
      <transition name="fade">
        <div
          v-if="item.imgWidth === 0 || item.imgHeight === 0"
          :style="{
            width: boxWidth - 10 + 'px',
            height: item.height - 10 + 'px',
            backgroundColor: '#ffffff'
          }">
        </div>
      </transition>
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
    listData: {
      type: Array,
      required: true
    },
    sortBy: {
      default: ''
    },
    k: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      innerListData: [],
      parentWidth: 0
    }
  },
  mounted () {
    this.parentWidth = this.$refs.imgWaterFall.clientWidth
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
    }
  },
  methods: {
    preLoadImg () {
      this.listData.forEach((item, index) => {
        this.innerListData.push({
          width: this.boxWidth,
          height: this.boxWidth,
          imgWidth: 0,
          imgHeight: 0,
          value: item
        })
      })
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
      let img = this.innerListData.find(v => v.value[this.k] === item[this.k])
      img.width = this.boxWidth
      img.height = this.boxWidth * imgHeight / imgWidth
      img.imgWidth = imgWidth
      img.imgHeight = imgHeight
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
  flex: 1
  overflow-y: auto
  .img-box
    position: absolute
    cursor: pointer
    padding: 5px
    &:hover
      outline: 1px solid $color-white
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
.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
