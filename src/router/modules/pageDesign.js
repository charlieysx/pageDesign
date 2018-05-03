const pageDesign = r => require.ensure([], () => r(require('VIEWS/pageDesign/index.vue')), 'pageDesign')

export default [
  {
    path: '/pageDesign',
    name: 'pageDesign',
    component: pageDesign
  }
]
