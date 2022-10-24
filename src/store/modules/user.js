import { login } from '@/api/user'
import router from '@/router'
import { setToken, getToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async login(store, loginForm) {
      const res = await login(loginForm)
      store.commit('setToken', res.data.data)
      console.log(res)
      router.push('/dashboard')
    }
  }
}

