<template>
  <div id="home">
    <img src="~IMAGES/avatar.jpg">
    <el-button type="primary" @click="good">test</el-button>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      name: 'Good Lucky~'
    }
  },
  computed: {
    ...mapGetters([
      'dWidgets'
    ])
  },
  watch: {
    dWidgets (value) {
      console.log(value)
    }
  },
  methods: {
    ...mapActions([
      'test',
      'setLoginMaskStatus'
    ]),
    good () {
      this.$router.push({
        name: 'pageDesign'
      })
    },
    login () {
      this.setLoginMaskStatus({ show: true, view: 'login' })
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
