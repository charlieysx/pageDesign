<template>
  <div id="appindex">
    <!-- header -->
    <!-- <Header></Header> -->
    <!-- header 结束 -->
    <!-- content -->
    <div class="viewWrap">
      <router-view></router-view>
    </div>
    <!-- content 结束 -->
    <!-- footer -->
    <!-- <Footer></Footer> -->
    <!-- footer 结束 -->
    <!-- 登录注册 -->
    <transition name="fade">
      <auth-layout v-show="loginMaskShow"></auth-layout>
    </transition>
    <!-- 登录注册 结束 -->
  </div>
</template>

<script>
import authLayout from 'VIEWS/auth/layout'

import {
  SHOW_TOKEN_ERROR
} from 'STORE/mutation-types'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    authLayout
  },
  computed: {
    ...mapGetters([
      'loginMaskShow',
      'tokenError'
    ])
  },
  watch: {
    tokenError (value) {
      if (value) {
        this.$store.commit(SHOW_TOKEN_ERROR, false)
        this.message = this.$message({
          showClose: true,
          message: '账号过期，请重新登录',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
#appindex
  min-width: 1180px
  .viewWrap
    background-color: $color-white
    min-height: calc(110vh - 110px)
    min-width: 1170px
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
