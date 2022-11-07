// 筛选动态路由数据的模块
import { asyncRoutes, constantRoutes } from '@/router/index.js'
const state = {
  routes: [] // 保存筛选出来具有访问权限的路由对象数组
}
const mutations = {
  // 设置routes的值
  setRoutes(state, routes) {
    state.routes = [...constantRoutes, ...routes]
  }
}
const actions = {
  // 筛选逻辑 , 为什么要把筛选逻辑写在actions中呢？
  // 答：为了方便获取筛选后的数据
  // 在哪里调用filterRoutes函数比较好
  // 答：重点要考虑menus数据一定要请求回来了
  filterRoutes(store, menus) {
    // menus 就是接口返回的权限数据数组
    // asyncRoutes 所有的动态路由数据
    // 如何将动态路由对象和menus中的标识符匹配起来呢？
    // 答：我们可以给所有动态路由对象添加code属性并赋值为我们再权限管理页面
    // 设置好的权限标识符即可，这样我们就可以通过这个名字进行匹配了。
    // 匹配逻辑：当判断到路由对象中的code属性的值存在在menus数组中的时候，
    // 说明该路由对象是具有访问权限的路由。
    const routes = asyncRoutes.filter(item => {
      // 判断一个值是否存在在另一个数组中 用哪个方法？
    //   答：可以用indexOf方法或者includes方法等等
    //   return menus.indexOf(item.code) !== -1
    // includes方法：用于判断数组中是否存在某个元素，存在返回true，否则返回false
      return menus.includes(item.code)
    })
    // console.log(27, '具有访问权限的路由数据', routes)
    // 把筛选出来的数据保存到vuex中
    store.commit('setRoutes', routes)
    return routes // 返回筛选出来的数据, 调用函数的时候可以直接通过这个值获取到
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
