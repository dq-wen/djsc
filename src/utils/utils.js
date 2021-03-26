import  routerIndex  from '@/router/index';
// import  routerJs from '@/router/router'; //模拟路由表数据
import {addRouterView} from './lazyLoading.js'
import Layout from '@/layout'
import axios from 'axios';
let utils = {};

//根据userId初始化路由
utils.initRouter = function(vm){
  let getRouterJs = [];
  const dj_userId = sessionStorage.getItem('dj_userId'); //获取用户Id
  if(!dj_userId)return

  const djRouterLists = sessionStorage.getItem('dj-routerLists'); //获取路由表数据

  let filterArr = []; //过滤重复数据
  if(!djRouterLists){
    axios.get(process.env.VUE_APP_BASE_API + '/ftp/module-list?userId=' + dj_userId).then(res=>{
      if(res.data.code==200){
        let data = res.data.data;
        data.map(item=>{
          if(filterArr.indexOf(item.plateName)==-1){
            filterArr.push(item.plateName);
            getRouterJs.push(item);
          }
        })
        sessionStorage.setItem('dj-routerLists',JSON.stringify(getRouterJs));
        utils.initMenuData(vm,getRouterJs)
      }
    })
  }else{
    getRouterJs = JSON.parse(sessionStorage.getItem('dj-routerLists'));
    utils.initMenuData(vm,getRouterJs);
  }

};

// 生成菜单格式数据
utils.initMenuData = function(vm,getRouterJs){
  let routerArr = [];
  routerArr = getRouterJs.map(item=>{
    item.component = addRouterView(item.iconPathTwo);
    item.path = item.iconPathOne;
    item.name = item.iconPathOne;
    item.meta = {
      id:item.userId,
      title:item.plateName,
      icon:item.iconName,
      ...item
    };
    item.hidden = false
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
