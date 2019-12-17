import axios from 'axios'
import errorHandler from './statusHandler'
const CancelToken = axios.CancelToken
const sources = CancelToken.source()
const stringify = (data) => {
  let dataStr = ''
  if (data) {
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`
    })
    if (dataStr.length) {
      dataStr = dataStr.substr(0, dataStr.length - 1)
    }
  }
  return dataStr
}
const requestList = []
const Axios = axios.create({
  timeout: 10000
})
Axios.interceptors.request.use((config) => {
  const request = config.url + stringify(config.data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })
  if (requestList.includes(request)) {
    sources[request]('cancel:已拦截重复请求')
  } else {
    requestList.push(request)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
Axios.interceptors.response.use((response) => {
  const request = response.url + stringify(response.data)
  requestList.splice(requestList.findIndex(item => item === request), 1)
  const status = response.data.status
  if (errorHandler[status]) {
    errorHandler[status](response)
  } else {
    errorHandler['error'](response)
  }
  return response
}, (error) => {
  const errorMsg = error.message
  if (errorMsg.includes('cancel')) {
    console.log(requestList)
    console.log('取消重复请求')
    // throw new axios.Cancel('cancel request')
  } else if (errorMsg.includes('timeout')) {
    errorHandler['timeout']()
  } else {
    errorHandler['network']()
  }
  return Promise.reject(error)
})

export default async (url = '', data = {}, method = 'GET', headers) => {
  method = method.toUpperCase()
  const options = {
    method,
    url,
    mode: 'cors',
    cache: 'force-cache',
    credentials: 'include'
  }
  const dataStr = stringify(data)
  switch (method) {
    case 'POST':
      options.headers = Object.assign({}, {
        'Content-Type': 'application/json;charset=utf-8',
        // 'enctype': 'multipart/form-data',
        'Accept': 'application/json'
      }, headers)
      options.data = data
      break
    default:
      options.headers = Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }, headers)
      options.url = dataStr.length ? (url + '?' + dataStr) : url
  }
  const response = await Axios(options)
  return response.data
}
