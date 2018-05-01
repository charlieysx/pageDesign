const state = {
  dTop: 0, // 添加组件的初始纵坐标
  dZoom: 100, // 画布缩放百分比
  dType: 'page', // 选中元素类型
  dIndex: -1, // 选中元素索引
  dUuid: null, // 选中元素uuid
  dScreen: {
    width: 0, // 记录编辑界面的宽度
    height: 0 // 记录编辑界面的高度
  },
  gridSize: {
    width: 0, // 网格小格子的宽度
    height: 0 // 网格小格子的高度
  },

  dActiveWidgetXY: {
    x: 0, // 选中组件的横向初始值
    y: 0 // 选中组件的纵向初始值
  },
  dMouseXY: {
    x: 0, // 鼠标按下时的横坐标
    y: 0 // 鼠标按下时的纵坐标
  },
  dMoving: false, // 是否正在移动组件

  dActiveElement: {}, // 选中对象，组件或页面
  dPage: {
    width: 750, // 画布宽度
    height: 1334, // 画布高度
    backgroundColor: '#fff', // 画布背景颜色
    backgroundImage: '' // 画布背景图片
  },
  dWidgets: [], // 已使用的组件
  history: [] // 记录历史操作（直接保存整个画布的json数据）
}

const getters = {
  dTop (state) {
    return state.dTop
  },
  dZoom (state) {
    return state.dZoom
  },
  dType (state) {
    return state.dType
  },
  dIndex (state) {
    return state.dIndex
  },
  dUuid (state) {
    return state.dUuid
  },
  dScreen (state) {
    return state.dScreen
  },
  gridSize (state) {
    return state.gridSize
  },
  dActiveWidgetXY (state) {
    return state.dActiveWidgetXY
  },
  dMouseXY (state) {
    return state.dMouseXY
  },
  dMoving (state) {
    return state.dMoving
  },
  dActiveElement (state) {
    return state.dActiveElement
  },
  dPage (state) {
    return state.dPage
  },
  dWidgets (state) {
    return state.dWidgets
  }
}

const actions = {
  updateTop (store, top) {
    store.state.dTop = top
  },
  updateZoom (store, zoom) {
    store.state.dZoom = zoom
  },
  updateScreen (store, {width, height}) {
    store.state.dScreen.width = width
    store.state.dScreen.height = height
  },
  updateGridSize (store, {width, height}) {
    store.state.gridSize.width = width
    store.state.gridSize.height = height
  },
  updateWidgetData (store, {dUuid, key, value}) {
    let widget = store.state.dWidgets.find(item => item.dUuid === dUuid)
    if (widget) {
      widget[key] = value
    }
  }
}

export default {
  state,
  actions,
  getters
}
