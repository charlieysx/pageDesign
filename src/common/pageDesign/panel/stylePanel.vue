<template>
  <div id="style-panel">
    <div class="style-tab">
      <span class="tab" :class="{'active-tab' : activeTab === 0}" @click="activeTab = 0">设置</span>
      <span class="tab" :class="{'active-tab' : activeTab === 1}" @click="activeTab = 1">图层</span>
    </div>
    <div class="style-wrap" v-show="activeTab === 0">
      <component
        v-if="dActiveElement.type"
        :is="dActiveElement.type + '-style'" />
    </div>
    <div class="layer-wrap" v-show="activeTab === 1">
      <ul class="widget-list">
        <li
          class="widget"
          :class="{active : dActiveElement.uuid === dPage.uuid}"
          @click="selectLayer(dPage)"
          @mouseover="hoverLayer('-1')" 
          @mouseout="hoverLayer('-1')">
          <span class="widget-type"></span>
          <span class="widget-name">{{ dPage.name }}</span>
        </li>
        <li
          class="widget"
          :class="[
            {
              active : dActiveElement.uuid === widget.uuid
            },
            widget.parent === '-1' ? 'item-one' : 'item-two'
          ]"
          v-for="widget in getWidgets"
          :key="widget.uuid"
          @click="selectLayer(widget)"
          @mouseover="hoverLayer(widget.uuid)" 
          @mouseout="hoverLayer('-1')">
          <span class="widget-type"></span>
          <span class="widget-name">{{ widget.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 样式设置面板
const NAME = 'style-panel'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: NAME,
  data () {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters([
      'dActiveElement',
      'dWidgets',
      'dPage'
    ]),
    getWidgets () {
      let widgets = JSON.parse(JSON.stringify(this.dWidgets))

      widgets.sort((a, b) => a.zIndex <= b.zIndex)

      return widgets
    }
  },
  methods: {
    ...mapActions([
      'selectWidget',
      'updateHoverUuid'
    ]),
    selectLayer (widget) {
      this.selectWidget({
        uuid: widget.uuid
      })
    },
    hoverLayer (uuid) {
      this.updateHoverUuid(uuid)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#style-panel
  position: relative
  width: 300px
  height: 100%
  background-color: #ffffff
  border-left: 1px solid #d7d7d7
  display: flex
  flex-direction: column
  .style-tab
    width: 100%
    display: flex
    flex-direction: row
    text-align: center
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, .1)
    z-index: 10
    .tab
      flex: 1
      padding: 10px
      background-color: $color-white
      color: $color-black
      cursor: pointer
      &.active-tab
        background-color: $color-light-gray
        color: $color-white
  .style-wrap
    flex: 1
    width: 100%
    overflow: auto
  .layer-wrap
    flex: 1
    width: 100%
    overflow: auto
    .widget-list
      width: 100%
      .widget
        width: 100%
        display: flex
        padding: 10px
        align-items: center
        border-bottom: 1px solid #d7d7d7
        cursor: pointer
        background-color: #efefef
        color: $color-black
        &.active
          background-color: $color-dark-gray
          color: $color-white
        .widget-type
          width: 20px
          height: 20px
          margin-right: 10px
          display: flex
          justify-content: center
          align-items: center
          background-color: $color-white
          color: $color-black
        .widget-name
          flex: 1
          font-size: 14px
          single-text-ellipsis()
      .item-one
        padding-left: 25px
      .item-two
        padding-left: 40px

</style>
