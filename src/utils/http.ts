/*
 * @Description: 请求机制
 * @Autor: Dai YueLin
 * @Date: 2022-04-25 16:43:55
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-04-24 10:45:33
 */
import axios from 'axios'
import store from '@/store/'
import { setToken, removeToken, getToken } from '@/utils/system'
axios.defaults.baseURL = ''
axios.defaults.timeout = 15000

let pending = []
let cancelPending = (key, isRequest = false) => {
  // 每次发起请求的时候，判断之前有没有在pending的相同请求，如果有就取消在pending的请求
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }

  // 从队列里删除上一次的重复请求记录
  delete pending[key]
}

const getRequestIdentify = (config) => {
  return config.method === 'get' ? (config.url + (typeof (config.params) === 'object' ? JSON.stringify(config.params) : config.params)) : (config.url + (typeof (config.data) === 'object' ? JSON.stringify(config.data) : config.data))
}

// 拦截请求
axios.interceptors.request.use((config) => {
  let requestData = getRequestIdentify(config)
  // 拦截重复请求(即当前正在pending的相同请求)
  cancelPending(requestData, true)
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  let token = getToken()
  if (token) {
    config.headers['X-Token'] = token
  }else{
    config.headers['X-Token'] = "6e925a40144cfccd6fdd2b644fe79ff4c50838dfc82676e5f9b1c6c9e169a77e455fa431b108602cf1e43394cc794fdfe3e8082320fd88384529f597884757111336e9e84b17cfc4105ee16a429fdf1cc0cad04df085420a8a7b99607f9f318b205f3f18931896f4ed751e1b56b857cab22192a792353f79ac3f020cf597f97e90fddd953c7abda69a633b43862d29cc1e6ccf8310f9560a8a7ab10d8a5f183ca96fee7437fd57065025d6f5513d99703e45d7f31604cead03722bb0e486973cac5a58ca6a24a356774451b6cfdeeb75df87e76419351e37fa64376bae87bbe49fb72fd62c5fa33720fd84baca5bb1ad3c9244f8f28eb7eb481cb902b3f3b8f087c1f9f389a6b0ad8d9d1bd899173c8d0a7c225da156989867b9970f76551aa5138d120479ec4a1e84817dd62617f824";
  }
  // 数据格式
  config.headers.Accept = '*/*'
  config.headers["Content-Type"] = 'application/json'
  config.headers["Access-Control-Allow-origin"] = '*'
  config.withCredentials = false
  // 每一个请求new一个token，然后存在store里面
  config.cancelToken = new axios.CancelToken((cancel) => {
    store.dispatch('http/saveRequestQueue', cancel)
    // pending.push({ requestData: cancel })
    pending[requestData] = cancel
  })
  return config
})

// 拦截响应
axios.interceptors.response.use((response) => {
  // 把已经完成的请求从 pending 中移除；因为请求已经得到响应，所以不需要去取消请求)
  let requestData = getRequestIdentify(response.config)
  cancelPending(requestData)
  if (response.headers.newtoken) {
    removeToken()
    setToken(response.headers.newtoken)
    store.dispatch('user/loginByToken', response.headers.newtoken)
  }
  if (response.status === 200) {
    const data = response.data
    if (response.headers["content-disposition"] && response.headers["content-disposition"] !== '') {
      return Promise.resolve(response)
    }
    return Promise.resolve(data)
  } else {
    return Promise.reject(response)
  }
},
  (error) => {
    if (axios.isCancel(error)) {
      // 取消请求的情况下，终止Promise调用链
      return new Promise(() => { })
    } else {
      return Promise.reject(error)
    }
  })

export default class Http {
  static get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: {
          ...params
        }
      }, config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static post(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then(res => {
        resolve(res || {})
      }).catch((err) => {
        reject(err)
      })
    })
  }

  // 文件下载
  static getFile(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: url,
        params: {
          ...params
        },
        responseType: 'blob'
    }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
