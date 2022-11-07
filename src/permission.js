// 导航守卫 --- 实现页面访问权限
/**
 * 需求：
 *  用户必须登录之后，才能进入网站主页
 *  如果没有登录则只能访问登录页面和404页面
 * */
import router from './router/index'
import store from './store/index'

router.beforeEach(async(to, from, next) => {
  // to: 去哪里 跳转的目标路由对象
  // from: 从哪里来，当前的目标路由对象
  // next: 放行函数
  //   获取vuex模块中变量的语法：store.state.模块名.变量名
  const token = store.state.user.token
  if (token) {
    // 已登录 --- 判断跳转的页面是否为登录页，是则跳转到首页否则放行
    if (to.path === '/login') {
      next('/')
    } else {
      // 为了保证先获取到用户，再进入页面
      // 因此我们可以把调用actions函数的代码写在导航守卫中
      // 并且使用await 等待数据获取成功在进入页面
      if (!store.state.user.userInfo.userId) {
        // 判断只有用户信息不存在的时候才需要重新调用函数获取用户信息
        await store.dispatch('user/getUserInfo')
        // 调用获取动态路由数据的函数
        const menus = store.state.user.userInfo.roles.menus
        const routes = await store.dispatch('permission/filterRoutes', menus)
        // 获取筛选出来的具有访问权限的路由数组
        // store.state.permission.routes
        // console.log(32, store.state.permission.routes)
        // 把获取到具有访问权限的routes数组添加到路由规则中
        router.addRoutes(routes)
      }
      next()
    }
  } else {
    // 未登录 -- 404页面和登录页面 直接放行，否则跳转到登录页面
    const writeArr = ['/login', '/404'] // 添加白名单，所有在白名单中的路径都可以直接放行
    // 白名单的写法 更有利于扩展
    // indexOf方法：用于查找数组中是否存在某个元素并返回该元素对应在数组中的下标志，如果没有找到则返回-1
    if (writeArr.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
