export default{
    add(state){
        state.count++
    },
    reduction(state){
        state.count--
    },
    setCurIdx(state,obj){
        const {index , text } = obj;
        console.log(text)
        state.curIdx = index
    },
    getName(state){
        return state.name+state.age
    }
}