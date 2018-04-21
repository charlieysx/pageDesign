import Vue from 'vue'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
  // 找到components文件夹下以.vue命名的文件
  '.', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = capitalizeFirstLetter(
    // 因为得到的filename格式是: './baseButton/baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
    fileName.replace(/^\..*\//, '').replace(/\.\w+$/, '')
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
