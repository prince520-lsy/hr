
import router from './router/index'
import store from './store/index'

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 未登录
    const whiteNameList = ['/login', '/404']
    if (whiteNameList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
