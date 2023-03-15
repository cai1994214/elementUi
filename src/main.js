// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import common from './assets/js/public'
import Mock from './mock/mock'
import store from './store'
import echarts from 'echarts'
import SuperFlow from 'vue-super-flow'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/css/converEle.css'
import '@/assets/iconfont.css'
import 'vue-super-flow/lib/index.css'

Mock.init();

Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.prototype.$echarts=echarts
Vue.use(ElementUI)
Vue.use(common)
Vue.use(SuperFlow)


Vue.filter('reverseStr',function(value,format){
  // console.log(format)
  return value.split('').reverse().join('')
})

Vue.filter('toUpperCaseStr',function(value,format){
  return value.toUpperCase()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

