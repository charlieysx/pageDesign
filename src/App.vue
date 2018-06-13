<template>
  <div id="appindex">
    <div class="viewWrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
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
