<template>
  <div>
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
       <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-tree 
      :data="treeData" 
      :props="defaultProps"
       @node-click="handleNodeClick"
       node-key="id"
       ref="tree"
       default-expand-all
       show-checkbox
       ></el-tree>
      <p>{{lastChild}}</p>
  </div>
</template>

<script>
export default {
  components:{},
  props:['lastChild'],
  data(){
    return {
        treeData:[],
        defaultProps: {
          children: 'childrenList',
          label: 'name'
        }
    }
  },
  methods:{
      init(){
           this.$http.request({
                url:'/apis/sys/EnergyController/findListByCondition',
                params:{
                    'companyCode': 73,
                    'treeCode': 0
                },
                method:'post'
          }).then((res)=>{
              this.treeData=res.data
            }
          )
      },
       handleNodeClick(data) {
        console.log(data);
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      } 
  },
  mounted(){
      this.init()
  }
}
</script>
<style>
       
</style>