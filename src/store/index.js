import Vue from 'vue'
import Vuex from 'vuex'
import API from '../API'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    allApi: API,
    apiResponse: {}
  },
  getters: {
    allApi: state => state.allApi || {},
    apiResponse: state => state.apiResponse || []
  },
  mutations: {
    getAPI (state, payload) {
      if (payload.state.params) {
        state.allApi.forEach((item, index) => {
          item.children.forEach((v, i) => {
            if (v.key === payload.state.key) {
              state.allApi[index].children[i].params = payload.state.params
            }
          })
        })
      }
    },
    getResponse (state, payload) {
      state.apiResponse[payload.key] = payload[payload.key]
    }
  },
  actions: {
    getAPI (context, payload) {
      context.commit({
        type: 'getAPI',
        state: payload
      })
    }
  }
})
