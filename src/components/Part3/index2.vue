<template>
  <div>
      <h1> counter2: {{count}}</h1>
      <button @click="setCount(8)">增加4</button>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'partTw0',
    components:{},
    data(){
        return {
        }
    },
    watch:{},
    computed:{
        ...mapState('counter2',{
            count: (state)=>state.count
        })
    },
    methods:{
        ...mapMutations('counter2',['setCount'])
    },
    created(){},
    mounted(){}
}
</script>
<style  scoped>

</style>