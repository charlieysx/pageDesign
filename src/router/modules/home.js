const home = r => require.ensure([], () => r(require('VIEWS/home/index.vue')), 'home')

export default [
  {
    path: '/',
    name: 'home',
    component: home
  }
]
