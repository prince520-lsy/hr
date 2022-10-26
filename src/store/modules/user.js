import { getUserInfo, login, getUserAvatarById } from '@/api/user'
import router from '@/router'
import { setToken, getToken, removeToken } from '@/utils/auth'
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
      localStorage.setItem('loginTime', Date.now())
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    removeUserInfo(state) {
      state.userInfo = {}
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
      const result = await getUserAvatarById(res.userId)
      console.log(30, result)
      console.log(29, res)
      store.commit('setUserInfo', { ...res, ...result })
    },
    logout(store) {
      store.commit('removeToken')
      store.commit('removeUserInfo')
    }

  }
}

