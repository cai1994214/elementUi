
export default{
  namespaced:'counter1',
  state:{
    count:1
  },
  mutations: {
    setCount(state,num){
        state.count+=num
    }
  }
}
