import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from '@/store'
import {
  timeStamp,
  duration
} from '@/utils/filter.js'
import {
  deepCopy
} from '@/utils/utils.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
const utils = function (Vue) {
  Vue.prototype.timeStamp = timeStamp
  Vue.prototype.duration = duration
  Vue.prototype.deepCopy = deepCopy
  Vue.filter('timeStamp', timeStamp)
  Vue.filter('duration', duration)
  Vue.filter('formatSecond', (value) => duration(value)('hh:mm:ss'))
  Vue.filter('formatTime', (value) => timeStamp(value)('YY-MM-DD hh:mm:ss'))
}

Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
