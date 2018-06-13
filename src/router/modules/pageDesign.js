const pageDesign = r => require.ensure([], () => r(require('VIEWS/pageDesign/index.vue')), 'pageDesign')

export default [
  {
    path: '/',
    name: 'pageDesign',
    component: pageDesign
  }
]
