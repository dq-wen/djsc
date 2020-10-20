import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   children: [{
  //     path: 'index',
  //     name: 'index',
  //     component: () => import('@/views/index/index'),
  //     meta: { title: '首页', icon: 'example' }
  //   }]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index2',
  //   children: [{
  //     path: 'index2',
  //     name: 'index2',
  //     component: () => import('@/views/index2/index'),
  //     meta: { title: '首页2', icon: 'example' }
  //   }]
  // },


  // 监管指标管理
  // {
  //   path: '/zhibiaoguanli',
  //   component: Layout,
  //   redirect: '/zhibiaoguanli/yuanshuju',
  //   name: 'zhibiaoguanli',
  //   meta: { title: '系统管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'yuanshuju',
  //       name: 'yuanshuju',
  //       component: () => import('../views/xi-tong-guan-li/yuan-shu-ju.vue'),
  //       meta: { title: '系统管理1', icon: 'table' }
  //     },
  //     {
  //       path: 'zhibiao',
  //       name: 'zhibiao',
  //       component: () => import('../views/xi-tong-guan-li/zhi-biao.vue'),
  //       meta: { title: '系统管理2', icon: 'tree' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
 
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
