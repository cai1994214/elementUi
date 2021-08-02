<template>
  <el-container class="contMain">
    <el-header>
      <span>经营概况</span>
      <div class="hearder-img1"></div>
      <div class="hearder-img2"></div>
    </el-header>
    <el-main style="padding:0;">
      <el-row :gutter="20" class="data-row">
        <el-col :span="7">
            <div class="left-group">
                <div class="left-item">
                    <div  class="item-header hright1"></div>
                </div>
                <div class="left-item">
                    <div  class="item-header hright1"></div>
                    <div id="echarts" class="itme-content">
                    </div>
                </div>
                <div class="left-item">
                    <div  class="item-header hright2"></div>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
          <div class="border-div"></div>
        </el-col>
        <el-col :span="7">
            <div class="right-group">
                <div class="right-item">
                    <div  class="item-header hleft1"></div>
                </div>
                <div class="right-item">
                    <div  class="item-header hleft1"></div>
                </div>
                <div class="right-item">
                    <div  class="item-header hleft2"></div>
                </div>
            </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  mounted(){
    this.drawLine()
  },
  methods: {
    drawLine(){
      var myChart=this.$echarts.init(document.getElementById("echarts"));
      var colorArr = ['#9692ff','#a6b5ff', '#a6b5ff',  '#33cef2'];
      // 绘制图表
      myChart.setOption({    
          tooltip: {},
          xAxis: {
            axisTick:{
              show:false
            },
            axisLabel:{
                textStyle:{
                  color:'#fff'
                }
            },
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          grid:{
              top:'30',
              bottom:'30'
          },
          yAxis: {
            splitLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
                textStyle:{
                  color:'#fff'
                }
            }
          },
          color:colorArr, //设置线条颜色
          series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [120, 132, 191, 134, 90, 230, 210],
            smooth: true,
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
                  offset: 0,
                  color: colorArr[0] //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
                }, {
                  offset: 0.8,
                  color: '#fff'
                }])
              }
            }
          }, {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [100, 182, 111, 84, 90, 120, 250],
            smooth: true,
            itemStyle:{
              normal:{
                lineStyle:{
                  width:2,
                  type:'dotted'
                }
              }
            }
          }]
      });
    }
  }
}

</script>
<style scoped>
.contMain{
    min-height: 700px;
}
.el-row{
    width: 100%;
}
 .el-container {
    background: url('~@/assets/image/screenData/bodyBg.jpg') no-repeat;
}

.el-header {
    height:75px !important;
    line-height: 75px;
    text-align:center;
    position: relative;    
    background: url('~@/assets/image/screenData/headerBg.png') no-repeat;
    background-size: 100%;
}
.hearder-img1{
    width:300px;
    height:32px;
    position: absolute;
    left: 205px;
    top: 30px;
    background: url('~@/assets/image/screenData/gif2.gif') no-repeat;
    background-size:100%;
    transform: rotate(-180deg);
}
.hearder-img2{
   width:300px;
    height:32px;
    position: absolute;
    right: 205px;
    top: 0px;
    background: url('~@/assets/image/screenData/gif2.gif') no-repeat;
    background-size:100%;
}
.el-main{
  flex-basis: 100%;
}
.data-row{
  height:100%;
}
.data-row .el-col{
  height:100%;
}
.left-group,.right-group{
  width:100%;
  flex-flow: column nowrap;
  display: flex;
  height:100%;
}
.left-item,.right-item{
    flex-grow: 1;
    flex-basis:0;
}
.item-header{
  height:30px;
  background: url('~@/assets/image/screenData/itemBg.png') no-repeat; 
  position: relative;
  background-size: 100%;
}
.hright2::after,.hright1::after{
  position: absolute;
  display:block;
  height: 20px;
  width: 200px;
  top: 2px;
  right: 0px;
  content: "";
}
.hleft1::after,.hleft2::after{
  position: absolute;
  display:block;
  height: 20px;
  width: 200px;
  top: 2px;
  left: 0px;
  content: "";
}
.hright1::after,.hleft1::after{
    background: url('~@/assets/image/screenData/gif1.gif') no-repeat;
    background-size: 100%;
}
.hright2::after{
    background: url('~@/assets/image/screenData/title-left.png') no-repeat;
    background-size: 100%;
}
.hleft2::after{
    transform: rotateY(180deg);
    background: url('~@/assets/image/screenData/title-left.png') no-repeat;
    background-size: 100%;
}
.itme-content{
  height:calc(100% - 30px);
  width:100%;
}
.border-div{
  width:100%;
  height:300px;
  background: url('~@/assets/image/screenData/divBg.png') no-repeat;
  background-size: 100%;
}
</style>