import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import API from './API'
Vue.use(Router)
const Main = r => require.ensure([], () => r(require('./components/Main.vue')), 'Main')

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/develop',
      name: 'App',
      redirect: `/develop/${API[0].children[0].key}`,
      component: () => import('./index.vue'),
      children: [
        {
          path: ':key',
          name: 'API',
          component: Main
        }
      ]
    },
    {
      path: '*',
      redirect: '/develop'
    }
  ]
})

export default router
