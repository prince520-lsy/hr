import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
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
    // 网络层面失败 -- 触发这个函数
    // 比如：请求超时的时候，就会出现网络层面失败
    // console.log('网络层面失败', error)
    // console.dir(error)
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
