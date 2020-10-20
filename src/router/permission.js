import router from './index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '../utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (!sessionStorage.getItem('isLogin') || !sessionStorage.getItem('djwjsc_token')) {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
