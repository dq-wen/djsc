// export default (url) =>()=>import(`@/views/${url}`)

export const addRouterView = (view) => { // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)//可以解决
}
