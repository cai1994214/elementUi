<template>
  <div>
      <el-menu :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      >
      <el-menu-item index="1">处理工作</el-menu-item>
      <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>  
          </el-submenu>  
      </el-submenu>
      <el-menu-item index="3" >消息中心</el-menu-item>
      <el-menu-item index="4"><a href="" >订单管理</a></el-menu-item>
      </el-menu>
      <el-menu default-active="2" 
      class="el-menu-vertical-demo" 
      :collapse="isCollapse">
      <div class="fix">
           <el-tooltip :content="isCollapse==false?'收缩':'展开'" placement="top">
            <el-switch
                v-model="isCollapse"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
            </el-tooltip>
      </div>
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" >
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
        </el-menu>
        <DialogDiv></DialogDiv>
  </div>
</template>

<script>
import DialogDiv from './MyDialog'
export default {
  components:{
      DialogDiv
  },
  props:{},
  data(){
    return {
        isCollapse:false,
        activeIndex: '1',//默认选中第一个
    }
  },
  methods:{
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  mounted(){}
}
</script>
<style>
    a{
        text-decoration:none; 
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .fix{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>