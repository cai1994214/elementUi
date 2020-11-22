<template>
    <el-transfer 
    class="flex"
    v-model="value1"
    :data="data"
    filterable
    filter-placeholder:="请输入设备编码"
   
    ></el-transfer>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    const generateData=_=>{
        const data=[];
        for(let i=1;i<15;i++){
            data.push({
            key:i,
            label:'设备'+i
            })
        }
        return data
    }
    return {
        data:generateData(),
        value1:[1,4],
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style>
.flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>