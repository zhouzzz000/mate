import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import Index from './../components/pages/index'
import Login from './../components/comm/login'
import Register from './../components/comm/register'
import MainPage from '../components/pages/mainpage'
import $ from 'jquery'
Vue.use(Router)
Vue.use(VueResource)
Vue.use($)
Vue.use(VueCookie)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/mateweb',
      redirect:'/mateweb/index'
    },
    {
      path: '/',
      name: 'index',
      redirect:'/mateweb/index'
    },
    {
      path: '/mateweb/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        ]
    },
    {
      path: '/mateweb/main',
      name: 'main',
      component:MainPage
    },
  ]
})
