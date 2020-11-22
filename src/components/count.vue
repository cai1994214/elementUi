<template>
  <div >
        <p>count的值:{{this.$store.state.count}}</p>
        <button @click="addFun">+</button>
        <button @click="reductionFun">-</button>

        <div style="border:1px solid red;margin-top:50px;">
            {{count1}}
        </div>
        <p>{{count2}}</p>
        <h1 >{{lastChild}}</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components:{},
  computed:{
      ...mapState({
          count1:(state)=>state.count,
          count2:(state)=>state.count*20
      })
  },
  props:['lastChild'],
  data(){
    return {
        somedata:'子组件向父组件传的值'
    }
  },
  methods:{
    addFun(){
        this.$store.dispatch("addFun");
        this.$emit('child-say',this.somedata)
    //   this.$store.commit("add")
    },
    reductionFun(){
        this.$store.dispatch("reductionFun")
    //   this.$store.commit("reduction")
    }
  },
  mounted(){
    
  }
}
</script>
<style scoped>

</style>