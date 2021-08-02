<template>
  <div>
    <span class="demonstration">默认Hover指示器触发</span>
    <el-carousel  height="200px" indicator-position="outside" type='card' style="text-align:center;">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <el-button @click="getList">点击获取user</el-button>
  <p>{{User}}</p>
  </div>
  
</template>

<script>
import {requestList} from '@/api/api'
export default {
  components:{},
  props:{},
  data(){
    return {
      User:[]
    }
  },
  watch:{},
  computed:{},
  methods:{
    getList(){
      requestList().then(data=>{
        this.User=data.users
      })
    }
  },
  created(){},
  mounted(){}
}
</script>
<style>
 .el-carousel__item h3 {
    color: #fff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>