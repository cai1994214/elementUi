<template>
  <div >
      <div :style="{color}">
          {{msg.id}} - {{msg.data}}
      </div>
  </div>
</template>

<script>
import bus from '../../api/eventbus'
export default {
  name:'child',
  components:{},
  props:['msg'],
  inject:['colored'],
  data(){
    return {
        // colored:false
    }
  },
  watch:{},
  computed:{
      color(){
          return this.colored.value ? 'red' : "blue";
      }
  },
  methods:{
    //   handleClick(){
    //     //   this.$emit('handle-change-color',this.color);
    //       bus.$emit('change-color','我是中央通信')
    //   }
  },
  created(){
  },
  mounted(){}
}
</script>
<style  scoped>

</style>