import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/myHome'
import tForm from '@/components//tform'
import Ttable from '@/components/myTable'
import Mmenu from '@/components/myMenu'
// import Mdialog from '@/components/myDialog'
import Wheel from '@/components/Wheel'
import timeSel from '@/components/timeSel'
import Tscroll from '@/components/scrollDemo/scrolltest'
import Mechart from '@/components/echart'
import screenData from '@/components/screenData'
import NotFoundComponent from '@/components/notFound'
import Xtest from '@/components/vuexTest'
import commParent from '@/components/parents'
import NVuex from '@/components/Vuex'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
 
Vue.use(Router)
 
let router= new Router({
    routes: [
      {
        path: '/Login',
        name: 'login',
        component: Login
      },
      {
        path: '/home',
        name: 'homeLink',
        component: Home,
        children:[
          {
            path: '/Form',
            name: 'formLink',
            component: tForm
          },
          {
            path: '/Table',
            name: 'tableLink',
            component: Ttable
          },
          {
            path: '/Menu',
            name: 'menuLink',
            component: Mmenu
          },
          {
            path: '/Wheel',
            name: 'wheelLink',
            component: Wheel
          },
          {
            path:'/echart',
            name:'echartLink',
            component:Mechart,
          },
          {
            path:'/Tscroll',
            name:'scrollLink',
            component:Tscroll
          },
          {
            path:"/timeSel",
            name:"timeSelLink",
            component:timeSel
          },
          {
            path: '/Vuex',
            name: 'vuexLink',
            component: Xtest
          },
          {
            path:'/NVuex',
            name:'NVuexLink',
            component:NVuex
          },
          {
            path: '/CommParent',
            name: 'commParentLink',
            component: commParent
          },
          {
            path:'/screenData',
            name:"screenLink",
            component:screenData
          }
        ]
      },
      {
        path:'*',
        component:NotFoundComponent 
      }
  ],
  mode:'history'
  })

  router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
      sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  })

  export default router