import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
const time = 5000// 前端设置token有效时间

// request interceptor
service.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    const currentTime = Date.now()// 获取当前时间戳
    const loginTime = localStorage.getItem('loginTime')
    if (currentTime - loginTime > time) {
      // 登录超时
      store.dispatch('user/login')
      router.push('/login')
      return Promise.reject(new Error('登录超时，请重新登录---前端设置token失效时间'))
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data// 对象解构
    if (success) {
    // 成功
      return data
    } else {
    // 失败
      Message.error(message)
      // 返回一个错误信息，这样结合async和await可以阻止页面跳转
      // Promise.reject返回一个错误状态的promise实例对象
      // 这个方法是es6提供的
      // new Error -- 原生js(es5)提供的方法，用于实例化一个错误对象
      // new Error结合Promise.reject使用，可以将错误信息的位置也输出到控制台中
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
      Message.error('登录超时，请重新登录')
    } else {
      Message.error(error.message)
    }
    // 网络层面失败 -- 触发这个函数
    // 比如：请求超时的时候，就会出现网络层面失败
    // console.log('网络层面失败', error)
    // console.dir(error)

    return Promise.reject(error)
  }
)

export default service
