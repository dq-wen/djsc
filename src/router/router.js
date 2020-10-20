const routerArr = [{
  path: '/index',
  name: 'index',
  component: () => import('@/views/index/index'),
  meta: { id:1,title: '首页', icon: 'example'},
  hidden:false
},{
  path: '/index2',
  name: 'index2',
  component: () => import('@/views/index2/index'),
  meta: { id:2,title: '首页2', icon: 'example' },
  hidden:false
}]

export default routerArr