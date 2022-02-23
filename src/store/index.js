import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const fileList = require.context('./modules', true, /\.js$/);
let modules = {};
fileList.keys().forEach(key => {
  let item = {};
  let filterKey = key.substring('./'.length, key.lastIndexOf('.js'));
  item[filterKey] = fileList(key).default;
  Object.assign(modules, item);
})

const store= new Vuex.Store({
    getters,
    modules
})

export default store
