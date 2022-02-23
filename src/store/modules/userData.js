export default{
  namespaced:'userData',
  state: {
    count:1,
    curIdx:0,
    name:'菜菜',
    age:'13'
  },
  mutations: {
    setCount(state,num){
        state.count = num
    }
  }
}
