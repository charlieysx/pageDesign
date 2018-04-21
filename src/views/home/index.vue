<template>
  <div id="home">
    <img src="~IMAGES/avatar.jpg">
    <el-button type="primary" @click="good">点我试试test<i class="iconfont icon-eye"></i></el-button>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      name: 'Good Lucky~'
    }
  },
  methods: {
    good () {
      this.$message({
        message: this.name,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#home
  position: relative
  width: 1170px
  min-height: calc(110vh - 110px)
  margin: 0 auto
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  img
    width: 100px
    height: 100px
    margin: 50px
</style>
