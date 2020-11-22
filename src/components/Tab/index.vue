<template>
  <div>
      <a href="javascript:;"
        :class="[ { current : curIdx === 0} ]"
        @click="changeTab(0,'选项1')"
      >选项1</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 1} ]"
        @click="changeTab(1,'选项2')"
      >选项2</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 2} ]"
        @click="changeTab(2,'选项3')"
      >选项3</a>
      <a href="javascript:;"
        :class="[ { current : curIdx === 3} ]"
        @click="changeTab(3,'选项4')"
      >选项4</a>


      <input type="text" v-model="price">
      <h4>{{price | reverseStr(12) | toUpperCaseStr}}</h4>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'Tab',
  components:{},
//   props:{
//       curIdx:Number
//   },
  data(){
    return {
      price:'asdad'
    }
  },
  watch:{},
  computed:{
      ...mapState(['curIdx'])
  },
  methods:{
    //   ...mapMutations(['getName']),
      changeTab(index,text){
        //   this.$emit('changeTab',index);
        this.$store.commit('setCurIdx',{
            index,
            text
        })
      }
  },
  created(){},
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