
export default{
  namespaced:'counter2',
  state:{
    count:2
  },
  mutations: {
    setCount(state,num){
        state.count+=num
    }
  }
}
