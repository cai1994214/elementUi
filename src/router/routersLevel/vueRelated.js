//vue相关
const tForm = () => import( '@/components/vueRelated/vueForm');
const Mmenu = () => import( '@/components/vueRelated/vueMenu');
const Xtest = () => import( '@/components/vueRelated/vueVuex');
const commParent = () => import( '@/components/vueRelated/vueCommunication');
const NVuex = () => import( '@/components/vueRelated/newVuex');
const AttrListen = () => import( '@/components/vueRelated/attrListen');

export default [
  {
    path: '/Form',
    name: 'formLink',
    component: tForm
  },
  {
    path: '/Menu',
    name: 'menuLink',
    component: Mmenu
  },
  {
    path: '/Vuex',
    name: 'vuexLink',
    component: Xtest
  },
  {
    path: '/CommParent',
    name: 'commParentLink',
    component: commParent
  },
  {
    path:'/NVuex',
    name:'NVuexLink',
    component:NVuex
  },
  {
    path: '/attrListen',
    name: 'attrListenLink',
    component: AttrListen
  }
]
