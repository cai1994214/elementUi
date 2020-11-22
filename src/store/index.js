import Vue from 'vue'
import Vuex from 'vuex'
import counter1 from './counter1'
import counter2 from './counter2'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store= new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        counter1,
        counter2
    }
})

export default store