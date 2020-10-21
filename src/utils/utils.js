import  routerIndex  from '@/router/index';
import  routerJs from '@/router/router';
import Layout from '@/layout'
let utils = {};

//根据userId初始化路由
utils.initRouter = function(vm){
  let getRouterJs = [];
  let routerArr = [];
  const dj_userId = sessionStorage.getItem('dj_userId');
  if(!dj_userId)return

  
  getRouterJs = routerJs.filter(item=>item.meta.id==dj_userId);
  
  if(getRouterJs&&getRouterJs.length<=0){
    getRouterJs = routerJs;
  }

  routerArr = getRouterJs.map(item=>{
    return {
      path:'/',
      component:Layout,
      redirect:item.path,
      children:[item]
    }
  })

  const obj404 = {
    path:'/*',
    component: () => import('@/views/404'),
    hidden:true
  }

  routerArr.push(obj404)

  vm.$router.options.routes = [];
  vm.$router.options.routes = routerArr;
  routerIndex.addRoutes(routerArr)
};

export default utils
