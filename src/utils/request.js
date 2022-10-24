import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use((res) => {
  const { success, message } = res.data
  if (success) {
    // 成功
  } else {
    // error
    Message.error(message)
    return Promise.reject(message)
  }
  console.log(21, res)
  return res
})

export default service
