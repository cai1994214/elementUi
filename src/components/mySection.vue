<template>
  <div>
      <section class="el-container  index-container"> 
          <div  class="metal-parts-menu" style="left: 176px;"></div>
          <aside class="el-aside index-menu" style="width:auto;">
                <div class="el-radio-group" style="margin-bottom:20px;"></div>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 @open="handleOpen"
                  @close="handleClose" 
                  :collapse="isCollapse"
                   background-color="#0e1a31"
                    text-color="#fff"
                  >
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
          </aside>
          <div class="el-main index-main">

          </div>
      </section>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
         isCollapse: false
    }
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  mounted(){}
}
</script>
<style>
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 180px;
            background: #000;
            min-height: 400px;
        }
        .index-menu{
            border-right: 6px solid #323647;
            border-bottom: 1px solid #323647;
        }
        .el-menu{
            border:0;
        }
        .el-main{
            display: block;
            -ms-flex: 1;
            flex: 1;
            -ms-flex-preferred-size: auto;
            flex-basis: auto;
            padding: 20px;
            background: #000;
        }
       .index-container{
            position: relative;
            background-image: url(./../assets/image/header-top.png);
            background-position: 0 -62px;
            background-repeat: no-repeat;
            height: calc(100vh - 62px);
       }
       .metal-parts-menu{
            position: absolute;
            left: 176px;
            top: -4px;
            width: 14px;
            height: 120px;
            -webkit-transition: all 0.4s;
            transition: all 0.4s;
            background-image: url(./../assets/image/header-left.png);
            background-position: 0px -15px;
            z-index: 99;
       }
</style>