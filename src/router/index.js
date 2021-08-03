import Vue from 'vue'
import Router from 'vue-router'

//首页
import Home from '@/components/index.vue'


//vue相关
import tForm from '@/components/vueRelated/vueForm'
import Mmenu from '@/components/vueRelated/vueMenu'
import Xtest from '@/components/vueRelated/vueVuex'
import commParent from '@/components/vueRelated/vueCommunication'
import NVuex from '@/components/vueRelated/newVuex'

//图标相关
import Tscroll from '@/components/chartRelated/scrollDemo/scrolltest'
import Wheel from '@/components/chartRelated/wheel'
import Mechart from '@/components/chartRelated/echart'
import timeSel from '@/components/chartRelated/timeSel'
import screenData from '@/components/chartRelated/screenData'

//表格相关
import TableTree from '@/components/tableRelated/tableTree'
import Ttable from '@/components/tableRelated/commTable'

//其他
import DragonBubble from '@/components/otherRelated/dragonBubble'

//404
import NotFoundComponent from '@/components/404/notFound'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login/index.vue'], resolve)
 
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
          },
          {
            path:'/tableTree',
            name:"tableTreeLink",
            component:TableTree
          },
          {
            path:'/dragonBubble',
            name:"DragonBubbleLink",
            component:DragonBubble
          },
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