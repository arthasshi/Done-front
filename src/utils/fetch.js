import axios from 'axios'
import bus from '../utils/EventBus'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true,
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  console.log(config)
  config.headers.Authorization = localStorage.token;
  config.headers.timeout = 50000
  bus.$emit('handleLoading', true)
  return config
}, error => {
  console.log(error) // for debug
})
// respone拦截器
service.interceptors.response.use(
  response => {
    bus.$emit('handleLoading', false)

    /*
      
     */
    if (response.status == 200) {
      if (response.data.code != 200) {
        console.log("在错误中")
        console.log(response)
        bus.$emit("requestErr", response.data)
        return Promise.reject(response.data)
      } else {
        return Promise.resolve(response.data)
      }
    } else {
      return Promise.reject(response.data)
    }
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */

  error => {
    bus.$emit('requestNetErr', error)

    return Promise.reject(error)
  }
)
// const toLogin = () => {
//   // store.commit('REMOVE_ALL_COOKIES')
//   bus.$emit('mainMsg')
// }

export default service
