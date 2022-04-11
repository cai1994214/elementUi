import Vue from 'vue'
import Router from 'vue-router'

//首页
const Home = () => import( '@/components/index.vue')

// vue相关
import vueRelated from './routersLevel/vueRelated'

//图标相关
import chartRelated from './routersLevel/chartRelated'

//表格相关
import tableRelated from './routersLevel/tableRelated'


//其他
import otherRelated from './routersLevel/otherRelated'

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
          ...vueRelated,
          ...chartRelated,
          ...tableRelated,
          ...otherRelated,
        ]
      },
      {
        path:'*',
        component:NotFoundComponent
      }
  ],
  mode:'hash'
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
