<template>
  <div @click="handleChangeColor">
      <my-comp v-for="msg in msgs" :key="msg.id" :msg="msg"  ></my-comp>
      <div><span>你好</span></div>
  </div>
</template>

<script>
import MyComp from './components/child'
import bus from '@/api/eventbus' 
export default {
  name:'parents',
  provide(){
    return {
      colored:this.colored //依赖于data
    }
  },
  components:{
      MyComp
  },
  props:{},
  data(){
    return {
        msgs: [{
            id: 1, data: 'hello js'
            }, {
            id: 2, data: 'css world'
            }, {
            id: 3, data: 'animated style'
            }],
        colored: {
          value:false
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
        // handleClick(){
        //   this.$children.forEach(child=>{
        //        child.$data.colored = !child.$data.colored 
        //   })
        // }
        handleChangeColor () {
          this.colored.value = !this.colored.value
        }
        
  },
  created(){},
  mounted(){
    // bus.$on('change-color',(res)=>{
    //       console.log(res)
    //       this.colored = !this.colored
    // })
  }
}
</script>
<style  scoped>

</style>