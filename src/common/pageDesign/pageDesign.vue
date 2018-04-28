<template>
  <div id="page-design">
    <div class="design-canvas">

    </div>
  </div>
</template>

<script>
// 页面设计组件
const NAME = 'page-design'

export default {
  name: NAME
}
</script>

<style lang="stylus" scoped>
#page-design
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  overflow: auto
  padding: 40px
  .design-canvas
    width: 360px
    height: 640px
    background-color: #ffffff
    box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>


