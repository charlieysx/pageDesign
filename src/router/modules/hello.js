const hello = r => require.ensure([], () => r(require('VIEWS/hello/HelloWorld.vue')), 'hello')

export default [
  {
    path: '/',
    name: 'hello',
    component: hello
  }
]
