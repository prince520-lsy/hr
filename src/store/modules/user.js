import { getUserInfo, login } from '@/api/user'
import router from '@/router'
import { setToken, getToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }

  },
  actions: {
    async login(store, loginForm) {
      const res = await login(loginForm)
      store.commit('setToken', res)
      console.log(res)
      router.push('/dashboard')
    },
    async getUserInfo(store) {
      const res = await getUserInfo()
      console.log(29, res)
      store.commit('setUserInfo', res)
    }
  }
}

