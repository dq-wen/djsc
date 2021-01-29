
// 用户登录，根据user_id和这里的路由id对应上，动态添加
const routerArr = [
  {
    path: '/csdd',
    name: 'csdd',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:2,title: '城市调度', icon: 'example' },
    hidden:false
  },
  {
    path: '/yshj',
    name: 'yshj',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:3,title: '营商环境', icon: 'example' },
    hidden:false
  },
  {
    path: '/jtyx',
    name: 'jtyx',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:5,title: '交通出行', icon: 'example' },
    hidden:false
  },
  {
    path: '/zwfw',
    name: 'zwfw',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:9,title: '政务服务', icon: 'example' },
    hidden:false
  },
  {
    path: '/jjyx',
    name: 'jjyx',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:10,title: '经济运行', icon: 'example'},
    hidden:false
  },
  {
    path: '/sthj',
    name: 'sthj',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:11,title: '生态环境', icon: 'example' },
    hidden:false
  },
  {
    path: '/yjgl',
    name: 'yjgl',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:12,title: '应急管理', icon: 'example' },
    hidden:false
  },
  {
    path: '/zhdj',
    name: 'zhdj',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:13,title: '智慧党建', icon: 'example' },
    hidden:false
  },
  {
    path: '/ylws',
    name: 'ylws',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:14,title: '医疗卫生', icon: 'example' },
    hidden:false
  },
  {
    path: '/zhsw',
    name: 'zhsw',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:15,title: '智慧水务', icon: 'example' },
    hidden:false
  },
  {
    path: '/csgl',
    name: 'csgl',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:16,title: '城市管理', icon: 'example' },
    hidden:false
  },
  {
    path: '/msfw',
    name: 'msfw',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:17,title: '民生服务', icon: 'example' },
    hidden:false
  },
  {
    path: '/hlwjg',
    name: 'hlwjg',
    url:'index/index',
    // component: () => import('@/views/index/index'),
    meta: { id:18,title: '互联网+监管', icon: 'example' },
    hidden:false
  },






// {
//   path: '/ggaq',
//   name: 'ggaq',
  // component: () => import('@/views/index/index'),
//   meta: { id:12,title: '公共安全', icon: 'example' },
//   hidden:false
// },{
//   path: '/csjs',
//   name: 'csjs',
//   component: () => import('@/views/index/index'),
//   meta: { id:14,title: '城市建设', icon: 'example' },
//   hidden:false
// },{
//   path: '/ghzrzy',
//   name: 'ghzrzy',
//   component: () => import('@/views/index/index'),
//   meta: { id:16,title: '规划和自然资源', icon: 'example' },
//   hidden:false
// },{
//   path: '/zhqx',
//   name: 'zhqx',
//   component: () => import('@/views/index/index'),
//   meta: { id:17,title: '智慧气象', icon: 'example' },
//   hidden:false
// },{
//   path: '/zhka',
//   name: 'zhka',
//   component: () => import('@/views/index/index'),
//   meta: { id:18,title: '智慧口岸', icon: 'example' },
//   hidden:false
// },
// {
//   path: '/jcsjdz',
//   name: 'jcsjdz',
//   component: () => import('@/views/index/index'),
//   meta: { id:19,title: '基础数据底座', icon: 'example' },
//   hidden:false
// },
// {
//   path: '/zszhdd',
//   name: 'zszhdd',
//   component: () => import('@/views/index/index'),
//   meta: { id:20,title: '战时指挥调度', icon: 'example' },
//   hidden:false
// }
]

export default routerArr