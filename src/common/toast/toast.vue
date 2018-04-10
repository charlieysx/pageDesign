<style lang="stylus">
  @import '~STYLUS/color.styl'
  .toast
    position fixed
    border-radius 4px
    background rgba(0, 0, 0, .6)
    color $color-white
    box-sizing border-box
    text-align center
    z-index 1000
    transition opacity .5s linear
    padding 20px
    max-width 250px
    font-size 16px
    .toast-icon
      display block
      text-align center
      font-size 56px
    .toast-text
      font-size 14px
      display block
      text-align center
  .place-top
    left 50%
    top 10px
    transform translate(-50%, 0)

  .place-middle
    left 50%
    top 50%
    transform translate(-50%, -50%)

  .place-bottom
    left 50%
    bottom 10px
    transform translate(-50%, 0)

  .toast-pop-enter,
  .toast-pop-leave
    opacity 0
</style>

<template>
  <transition name="toast-pop">
    <div class="toast" :class="[`place-${position}`]" flex="main:center cross:center" v-show="visible">
      <span class="toast-text">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

