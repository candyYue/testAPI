
export default {
  0: response => response,
  // 企业过期
  101018: (response) => {
    // messageTip.$warning({
    //   content: response.data.info
    // })
  },
  'error': (response) => { // 其他错误
    // messageTip.$info({
    //   content: response.data.info
    // })
  },
  'timeout': () => {
    // messageTip.$info({
    //   content: '请求超时'
    // })
  },
  'network': () => { // 服务器异常
    // messageTip.$info({
    //   content: '网络请求异常'
    // })
  }
}
