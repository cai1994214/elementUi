<template>
 <div>
     <el-row>
         <el-col :span="4" style="border-right: 3px solid;">
             <h2>上下滑动</h2>
             <div class="wrapper" ref="wrapper">
                 <ul>
                    <li v-for="item in 8">{{item}}</li>
                </ul>
             </div>
         </el-col>
         <el-col :span="20">
             <h2>左右滑动</h2>
             <div class="tab" ref="tab">
                 <ul class="tab_content" ref="tabWrapper">
                    <li class="tab_item" v-for="item in itemList" ref="tabitem">
                        {{item.title}}
                    </li>
                </ul>
             </div>
         </el-col>
     </el-row>
   
 </div>
</template>
<script>
 import BScroll from 'better-scroll';
  export default {
    data(){
        return{
            itemList:[
            {
            'title':'关注'
            },
            {
            'title':'推荐'
            },
            {
            'title':'深圳'
            },
            {
            'title':'视频'
            },
            {
            'title':'音乐'
            },
            {
            'title':'热点'
            },
            {
            'title':'新时代'
            },
            {
            'title':'娱乐'
            },
            {
            'title':'头条号'
            },
            {
            'title':'问答'
            },
            {
            'title':'图片'
            },
            {
            'title':'科技'
            },
            {
            'title':'体育'
            },
            {
            'title':'财经'
            },
            {
            'title':'军事'
            },
            {
            'title':'国际'
            }
            ]
        }
      },
      mounted(){
        this.$nextTick(()=>{
            this.InitTabScroll();
            this.scroll = new BScroll(this.$refs.wrapper);
        });
      },
      methods:{
          InitTabScroll(){
              let width=0
                for (let i = 0; i <this.itemList.length; i++) {
                width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
                }
              this.$refs.tabWrapper.style.width=width+'px'
              this.$nextTick(()=>{
                  if(this.scroll){
                      this.scroll=new BScroll(this.$refs.tab,{
                          startX:100,
                          click:true,
                          scrollX:true,
                          scrollY:false,
                          eventPassthrough:'vertical'
                      })
                  }else{
                      this.scroll.refresh()
                  }
              })
          }
      }
   }
  
</script>
<style type="text/css" scoped>
*{
    padding: 0;
    margin: 0;
}
ul li{
    list-style: none;
}
/* 减去head的高度*/
 .wrapper{
  overflow:hidden;
  height:calc(100vh - 92px);
 }
 ul li{
  height:50vh;
  border: 1px solid #ccc;
  padding: 50px;
  margin: 50px;
 }
.tab{
  overflow: hidden;
 } 
 .tab_content{
   line-height: 2rem;
   display: flex;
  }
  .tab_item{
    flex: 0 0 200px;
    width:200px;
    border: 1px solid #ccc;
    text-align: center;
     padding: 50px;
     margin: 50px;
   } 
</style>