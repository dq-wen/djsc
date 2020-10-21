import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'
import api from './api/api'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
// 路由守卫文件
import '@/router/permission'
import uploadefilelist from './components/uploadFilelist'

Vue.use(ElementUI, { locale })
Vue.component('uploadefilelist',uploadefilelist)

import com_conent from './components/com_conent'
Vue.component('comConent',com_conent)

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
