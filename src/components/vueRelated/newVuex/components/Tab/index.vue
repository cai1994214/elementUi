<template>
  <div>
      <a href="javascript:;"
        :class="[ { current : curIdx === 1} ]"
        @click="changeTab(1,'选项1')"
      >选项1</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 2} ]"
        @click="changeTab(2,'选项2')"
      >选项2</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 3} ]"
        @click="changeTab(3,'选项3')"
      >选项3</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 4} ]"
        @click="changeTab(4,'选项4')"
      >选项4</a>

      <span>stote的值{{count}}</span>
      <input type="text" v-model="price">
      <h4>{{price | reverseStr(12) | toUpperCaseStr}}</h4>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'Tab',
  components:{},
  props:{
  },
  data(){
    return {
      price:'asdad',
       curIdx: 1
    }
  },
  watch:{
  },
  computed:{
      ...mapState({
         count: (state)=>state.userData.count
      })
  },
  methods:{
      ...mapMutations('userData',{
        setCount: "setCount"
      }),
      changeTab(index,text){
        this.curIdx = index;
       this.setCount(index+1);
      }
  },
  created(){

  },
  mounted(){}
}
</script>
<style  scoped>
    a{
        margin-right: 10px;
        color:red;
    }
    .current{
        text-decoration: none;
        color:#fff;
    }
</style>
