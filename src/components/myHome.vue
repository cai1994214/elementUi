<template>
  <section class="contMain">
      <el-header class="flex index-header">
        <img src="../assets/image/logo.png" style="margin:10px 35px 5px 15px;">
        <div class="hRight">
        <label class="hTitle">华侨城xxxx系统</label>
        <label class="msgs">
            <svg id="icon-xiaoxi"  width="26" height="26" viewBox="0 0 1024 1024">
            <path d="M104.982 756.557h67.261V450.428c0-175.741 134.17-321.246 306.125-338.252V62.13h68.033v50.046h-1.891c171.961 17.006 306.125 162.511 306.125 338.252v306.129h67.049v68.028H646.55c0 75.587-60.468 136.054-136.055 136.054s-136.054-60.467-136.054-136.054H104.982v-68.028z" fill="#92AAD2" opacity=".2"></path>
            <path d="M104.982 756.557h67.261V450.428c0-175.741 134.17-321.246 306.125-338.252V62.13h68.033v50.046h-1.891c171.961 17.006 306.125 162.511 306.125 338.252v306.129h67.049v68.028H646.55c0 75.587-60.468 136.054-136.055 136.054s-136.054-60.467-136.054-136.054H104.982v-68.028z m677.627 0V450.428c0-149.285-120.939-272.114-272.114-272.114-149.285 0-272.114 120.939-272.114 272.114v306.129h-68.027 612.255z m-204.087 66.137H442.468c0 37.796 30.236 68.027 68.027 68.027 37.796 0 68.027-30.231 68.027-68.027z m0 0" fill="#92AAD2">
            </path>
            </svg>
        </label>
        </div>
        <div  class="metal-parts-left" ref="hleft"></div>
        <div  class="metal-parts-right"></div>
        <div  class="metal-parts-line" ref="hline"></div>
        <div  class="metal-parts-bottom"></div>
      </el-header>
      <el-container class="index-container">
          <div  class="metal-parts-menu" ref="lmenu"></div>
          <el-aside class="index-menu" style="width:auto">
            <div class="menu-toggle" v-on:click="collapse1">
                <label ref="icons" class="iconfont">
                    <svg  version="1.1" role="presentation" width="22" height="22" viewBox="0 0 200 200" class="fa-icon" style="font-size: 1.2em;">
                    <path d="M25,41.667h150c2.3,0,4.264,0.814,5.892,2.442c1.628,1.627,2.442,3.592,2.442,5.892
                    s-0.814,4.264-2.442,5.892c-1.628,1.628-3.592,2.442-5.892,2.442H25c-2.3,0-4.264-0.814-5.892-2.442S16.667,52.3,16.667,50
                    s0.814-4.264,2.442-5.892C20.736,42.48,22.7,41.667,25,41.667z M25,141.666h150c2.3,0,4.264,0.814,5.892,2.442
                    s2.442,3.592,2.442,5.892s-0.814,4.264-2.442,5.892s-3.592,2.442-5.892,2.442H25c-2.3,0-4.264-0.814-5.892-2.442
                    S16.667,152.3,16.667,150s0.814-4.264,2.442-5.892S22.7,141.666,25,141.666z M25,91.667h150c2.3,0,4.264,0.814,5.892,2.442
                    s2.442,3.592,2.442,5.892s-0.814,4.264-2.442,5.892s-3.592,2.442-5.892,2.442H25c-2.3,0-4.264-0.814-5.892-2.442
                    S16.667,102.3,16.667,100s0.814-4.264,2.442-5.892C20.736,92.48,22.7,91.667,25,91.667z" style="fill: rgb(102, 115, 156);"></path>  <!----></svg>
                </label>
            </div>
            <el-menu
            router 
            :default-active="activeIndex" 
            class="el-menu-vertical-demo"
            @select="pathName"
            :collapse="isCollapse"
            >
            <el-submenu v-for="(item, i) in menuList" :key="`${i}`" :index="`${i}`">
                <template slot="title">
                    <i :class="item.iconClass"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item  v-for="(child, j) in item.children" 
                :key="`${i}-${j}`" 
                :index="`${i}-${j}`"
                :route="{name: child && child.path}"
                >{{child.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item :route="{name: 'login'}" index="-1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>退出</span>
                </template>
            </el-menu-item>
            </el-menu>
          </el-aside>
           <section class="right-main">
                <div class="path"><span>{{getMainPath}}</span><span>/</span><span>{{getVicePath}}</span></div>
                <router-view  :isCollapse="isCollapse" style="margin-top:20px;height:calc(100% - 40px)"></router-view>
          </section>
      </el-container>
  </section>
</template>

<script>
import { menuList } from '@/api/menu.js'
export default {
  data() {
      return {
        mainPath: '0',
        vicePath: '0-0',
        isCollapse: false,
        activeIndex: '0',
        menuList: menuList
      };
    },
    computed:{
        getMainPath() {
            if(!this.mainPath || this.mainPath == '-1'){
                return
            }
            return menuList[this.mainPath*1].title || menuList[0].title
        },
        getVicePath() {
            if(!this.vicePath || this.vicePath == "undefined"){
                return
            }
            let viceArr = this.vicePath.split('-');
            return menuList[viceArr[0]*1].children[viceArr[1]*1].title || menuList[0].children[0].title
        }
    },
    methods: {
      collapse1: function (){
        this.isCollapse=!this.isCollapse;
        if(this.isCollapse==false){
           this.$refs.hleft.style.left="195px";
           this.$refs.lmenu.style.left="195px";
           this.$refs.hline.style.width="calc(100% - 1178px)";
           this.$refs.icons.style.transform="rotate(0deg) scale(1)";
        }else{
           this.$refs.hleft.style.left="59px";
           this.$refs.lmenu.style.left="60px";
           this.$refs.hline.style.width="calc(100% - 1075px)";
           this.$refs.icons.style.transform="rotate(90deg) scale(.8)"
           
        }
      },
      pathName(key,keyPath){
          sessionStorage.setItem("mainPath", keyPath[0]); 
          sessionStorage.setItem("vicePath", keyPath[1]); 
          this.mainPath=keyPath[0];
          this.vicePath=keyPath[1];
      },
      getPath() {
            let mainPath = sessionStorage.getItem('mainPath');
            let vicePath = sessionStorage.getItem('vicePath');
            if(mainPath && vicePath && mainPath!== "-1" && vicePath !== "undefined"){
                this.mainPath = mainPath;
                this.vicePath = vicePath;
                this.activeIndex = vicePath
            }else{
                console.log(this.activeIndex,'activeIndex')
                this.$router.push({name:"formLink"});
            }
      }
    },
    mounted(){
    },
    created(){
        this.getPath();
    }
}

</script>
<style scoped>
    ::-webkit-scrollbar{
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-corner,::-webkit-scrollbar-thumb{
        border-radius: 12px;
        background-color: rgba(113,134,170,.3);
    }
    ::-webkit-scrollbar-track {
        border-radius: 12px;
        background-color: #22314b;
    }
    .index-menu::-webkit-scrollbar-track,.index-menu::-webkit-scrollbar-thumb {
        background: #323647;
    }
    .flex{
        display: flex;
    }
    .index-header{
        position: relative;
        height: 60px;
        padding: 0;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        background-color: #0e1a31;
        background: url("../assets/image/header-top.png") no-repeat top left;
    }
    .msgs{
        position: absolute;
        padding-top: 6px;
        right: 100px;
    }
    .metal-parts-left{
        position: absolute;
        top: 40px;
        left: 195px;
        width: 480px;
        height: 23px;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        background-image: url("../assets/image/header-left.png");
        z-index: 100;
    }
    .metal-parts-right{
        position: absolute;
        right: 0;
        top: -2px;
        width: 56px;
        height: 66px;
        background-image: url("../assets/image/header-right.png");
        background-position: 56px 0px;
        z-index: 100;
    }
    .metal-parts-bottom{
        position: absolute;
        right: 0;
        bottom: -3px;
        width: 456px;
        height: 20px;
        background-image: url("../assets/image/header-right.png");
        background-position: 456px 20px;
        z-index: 100;
    }
    .metal-parts-line{
        position: absolute;
        right: 456px;
        bottom: -3px;
        height: 8px;
        width: calc(100% - 1178px);
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        background-image: url("../assets/image/header-border.png");
        z-index: 100;
    }
    .index-container{
        position: relative;
        background-image: url("../assets/image/header-top.png");
        background-position: 0 -62px;
        background-repeat: no-repeat;
        width: 100vw;
        height: calc(100vh - 62px);
    }
    .index-menu{
        position: relative;
        overflow-y: scroll;
        padding-top: 20px;
    }
    .iconfont{  
        display: inline-block;
        padding-top:4px; 
        -webkit-transition: all 0.45s;
        transition: all 0.45s;
    }
    .metal-parts-menu{
        position: absolute;
        left: 195px;
        top: -5px;
        width: 10px;
        height: 120px;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        background-image: url("../assets/image/header-left.png");
        background-position: 0px -15px;
        z-index: 99;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        background-color:#0e1a31;
    }
    .hRight{
        position: relative;
        flex:1;
        display: flex;
        align-items: center;
        height: 58px;
        border-bottom-right-radius: 20px;
        border-bottom: 2px solid rgba(113,134,170,.3);
    }
    .hTitle{
        color:#00e8fe;
        font-size: 20px;
    }
    .body{
        height:calc(100% - 66px);
        display: flex;
        flex-flow:row;
    }
    .menu-toggle{
        color: #fff;
        height: 45px;
        width: 100%;
        line-height: 45px;
        text-align: center;
        transition: all .35s; 
        background:rgb(36,41,57);
    }
    .right-main{
        padding:20px 20px 0 20px;
        position: relative;
        overflow: auto;
        flex:1;
        background-color:#000d20 !important; 
        flex-basis: auto;
    }
    .right-main span{
        color: #92aad2;
        padding: 3px;
        margin-left: 10px;
        font-size: 13px;
        font-family: inherit;
    }
    .el-menu-item:focus, .el-menu-item:hover {
        position: relative;
        background: -webkit-gradient(linear, left top, right top, from(rgba(17, 208, 226, 0.3)), to(transparent));
    }
    .el-menu-item.is-active::before{
        display: block;
        content:"";
        position:absolute;
        left:0;
        top:11px;
        width:9px;
        height:34px;
        background: url("../assets/image/menu-active.png") no-repeat;
    }
    .el-menu-item.is-active {
        color: #62e8ffeb;
    }
</style>