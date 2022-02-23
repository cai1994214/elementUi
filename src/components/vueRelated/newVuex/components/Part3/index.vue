<template>
  <div>
      <h1> counter1: {{count}}</h1>
      <button @click="setCount(4)">增加4</button>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'partOne',
    components:{},
    data(){
        return {
        }
    },
    watch:{},
    computed:{
        ...mapState({
            count: (state)=>state.counter1.count
        })
    },
    methods:{
        ...mapMutations('counter1',['setCount'])
    },
    created(){},
    mounted(){}
}
</script>
<style  scoped>

</style>
