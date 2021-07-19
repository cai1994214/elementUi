<template>
  <div class="contMain">
      <div class="page-box">
        <el-date-picker class="date-Input"
        v-model="dateVal1"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="至">
        </el-date-picker>
      </div>
      <div class="tab-group flex">
          <div v-for="item in tablist" class="page-box tab-item" :key="item">
              <i class="fa" :class="item.i"></i>
              <span>{{item.name}}</span>
              <el-tooltip class="item" effect="dark"  placement="top">
                <div slot="content"><span>{{item.title}}</span><br v-if="item.title"/>{{item.content}}</div>
                <i class="fa fa-github-alt"></i>
              </el-tooltip>
              <span>{{item.value}}{{item.unit}}</span>
          </div>
      </div>
      <div class="ec-group page-box">
          <div class="ec-title flex-l">
              <svg  t="1561596347156" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3037" width="30" height="30"><path d="M800 157.866667l-130.133333 74.666666-157.866667-89.6-157.866667 89.6-130.133333-74.666666-142.933333 83.2h-2.133334v166.4l110.933334 64v224l320 183.466666 320-183.466666h2.133333V469.333333l108.8-64v-166.4l-140.8-81.066666z m89.6 217.6l-110.933333 64v224l-264.533334 151.466666-264.533333-153.6v-224l-110.933333-64v-102.4l87.466666-51.2 87.466667 51.2v46.933334l198.4-115.2 198.4 115.2v-46.933334l87.466667-51.2 87.466666 51.2v104.533334z" fill="#00C1DE" p-id="3038"/><path d="M366.933333 467.2v64l117.333334 68.266667v68.266666h55.466666v-72.533333l121.6-70.4v-64l-151.466666 87.466667z" fill="#00C1DE" p-id="3039"/></svg>
              <span>日对比</span>
          </div>
          <div id="ec-cont" ref="myEchart">

          </div>
          <div class="ec-title flex-l">
              <svg  t="1561596347156" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3037" width="30" height="30"><path d="M800 157.866667l-130.133333 74.666666-157.866667-89.6-157.866667 89.6-130.133333-74.666666-142.933333 83.2h-2.133334v166.4l110.933334 64v224l320 183.466666 320-183.466666h2.133333V469.333333l108.8-64v-166.4l-140.8-81.066666z m89.6 217.6l-110.933333 64v224l-264.533334 151.466666-264.533333-153.6v-224l-110.933333-64v-102.4l87.466666-51.2 87.466667 51.2v46.933334l198.4-115.2 198.4 115.2v-46.933334l87.466667-51.2 87.466666 51.2v104.533334z" fill="#00C1DE" p-id="3038"/><path d="M366.933333 467.2v64l117.333334 68.266667v68.266666h55.466666v-72.533333l121.6-70.4v-64l-151.466666 87.466667z" fill="#00C1DE" p-id="3039"/></svg>
              <span>年对比{{isCollapse}}</span>
          </div>
          <div id="ec-cont1" ref="myEchart1">

          </div>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:['isCollapse'],
  data(){
    return {
        dateVal1: '',
        Collapse:"",
        energyList:[//综合能耗
            {date:"1",valNow:"320",valPre:"120"},
            {date:"2",valNow:"332",valPre:"180"},
            {date:"3",valNow:"301",valPre:"250"},
            {date:"4",valNow:"334",valPre:"302"},
            {date:"5",valNow:"390",valPre:"375"},
            {date:"6",valNow:"330",valPre:"280"},
            {date:"7",valNow:"310",valPre:"230"},
            {date:"8",valNow:"334",valPre:"245"},
            {date:"9",valNow:"390",valPre:"265"},
            {date:"10",valNow:"330",valPre:"290"},
            {date:"11",valNow:"400",valPre:"365"},
            {date:"12",valNow:"330",valPre:"320"},
            {date:"13",valNow:"",valPre:"290"},
            {date:"14",valNow:"",valPre:"280"},
            {date:"15",valNow:"",valPre:"302"},
            {date:"16",valNow:"",valPre:"120"},
            {date:"17",valNow:"",valPre:"375"},
            {date:"18",valNow:"",valPre:"320"},
            {date:"19",valNow:"",valPre:"302"},
            {date:"20",valNow:"",valPre:"250"},
            {date:"21",valNow:"",valPre:"230"},
            {date:"22",valNow:"",valPre:"301"},
            {date:"23",valNow:"",valPre:"245"},
            {date:"24",valNow:"",valPre:"305"},
        ],
        CarbonList:[//co2排放
            {date:"1",valPre:"120",valNow:"320"},
            {date:"2",valPre:"232",valNow:"332"},
            {date:"3",valPre:"201",valNow:"301"},
            {date:"4",valPre:"234",valNow:"320"},
            {date:"5",valPre:"290",valNow:"390"},
            {date:"6",valPre:"230",valNow:"320"},
            {date:"7",valPre:"220",valNow:""},
            {date:"8",valPre:"234",valNow:""},
            {date:"9",valPre:"290",valNow:""},
            {date:"10",valPre:"230",valNow:""},
            {date:"11",valPre:"230",valNow:""},
            {date:"12",valPre:"220",valNow:""},
        ],
        tablist:[
            {
                name:"平均持仓比例",
                value:20,
                unit:"%",
                i:"fa-line-chart",
                title:"每小时持仓比例的算数平均值",
                content:"持仓比例 = 中长期持仓量 / 实际负荷"
            },
            {
                name:"平均申报偏差率",
                value:21,
                unit:"%",
                i:"fa-signal",
                title:"每小时偏差率的算数平均值",
                content:"偏差率 =（实际负荷-申报负荷）/ 申报负荷"
            },
            {
                name:"度电成本",
                value:22,
                unit:"元(/MWh)",
                i:"fa-jpy",
                content:"度电成本 =（中长期市场成本+现货市场成本）/ 购电量"
            },
            {
                name:"平均度电毛利",
                value:23,
                i:"fa-jpy",
                unit:"厘/kWh",
                content:"度电毛利 =（零售市场售电收入-批发市场购电支出）/ 购电量"
            }
        ],
    }
  },
  methods:{
      getCarbonList(CarbonList,col1,col2,col3,col4,id,type){
        var objInf={};
        for(var j=0,val=[],seriesData=[];j<2;j++){
            var obj={};
            if(type=="bar"){
                obj.type="bar";
            }else{
                obj.type=j==1?"bar":"line";
            }
            val[j]=[];
            for(var i=0,xData=[];i<CarbonList.length;i++){
                xData.push(CarbonList[i].date);
                if(j==0){
                    val[j].push(CarbonList[i]["valPre"]*1);
                }else{
                    val[j].push(CarbonList[i]["valNow"]==""?"-":CarbonList[i]["valNow"]*1);
                }
            }
            obj.data=val[j];
            if(type=="bar"){
                obj.name=j==1?'2019':'2018'
            }else{
                obj.name=j==1?'今日':'昨日';
                obj.barWidth="65%"
            }
            obj.itemStyle={
                normal: {
                    barBorderRadius: [5, 5, 0, 0],
                    color: new this.$echarts.graphic.LinearGradient(
                        0,0, 0, 1, j==1?this.linearColor(col1,col2):this.linearColor(col3,col4)
                    ),
                    label:{
                        show:(type=="bar"||j==1)?true:false,
                        position:'top',
                        textStyle:{
                            color:j==1?col1:col3,
                            fontSize:13
                        }
                    }
                }
            },
            seriesData.push(obj)
        }
        if(type=="bar"){
            objInf={
                legendName:['2018','2019'],
                toolbox:true
            }
        }else{
            objInf={
                legendName:['昨日','今日'],
                toolbox:true
            }
        }
        this.getEchart(id,xData,seriesData,objInf)
    },
    getEchart(id,xData,seriesData,objInf){
        var mec = this.$echarts.init(document.getElementById(id));
        var toolboxObj={
            show : true,
            feature : {
                mark : {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            },
            iconStyle:{
                normal:{
                    borderColor: '#01A9E8'
                }
            },
            orient:"vertical",
            top:'45'
        };
        var op = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox:objInf.toolbox?toolboxObj:{},
            legend: {
                data: [],
                top:"top",
                right:"30",
                bottom:"5",
                textStyle: {
                    color: '#C4F7FF'
                },
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '3%',
                top: '22%',
                height: '75%',
                width:"90%",
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#0154BE',//左边线的颜色
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {     //网格线
                    "show": false
                },
                axisLine: {
                    lineStyle: {
                        color: '#0154BE',//左边线的颜色
                    }
                },
                name:objInf.yname||'',
                nameTextStyle:{
                    padding:[0,30,0,0]
                }
            }],
            textStyle: {
                color: '#01A3E1'
            },
            series: []
        };
        op.legend.data=objInf?objInf.legendName:[];
        op.xAxis[0].data = xData;
        op.series = [];
        op.series = seriesData;
        mec.setOption(op,true);
    },
    linearColor(col1,col2){
        return [{
                offset: 0,
                color: col1
            },
            {
                offset: 1,
                color: col2
            }
        ]
    },
    init(){
        const self = this;
        setTimeout(() => {
          window.onresize = function () {
            self.chart = self.$echarts.init(self.$refs.myEchart);
            self.chart.resize();
            self.chart1 = self.$echarts.init(self.$refs.myEchart1);
            self.chart1.resize();
          };
        }, 20);
    },
    getResize(){//父组件折叠子组件ec自适应
        setTimeout(() => {
            var ec = this.$echarts.init(this.$refs.myEchart);
            ec.resize();
            var ec1 = this.$echarts.init(this.$refs.myEchart1);
            ec1.resize();
        }, 300);
    }
  },
  created(){
      
  },
  watch:{
      isCollapse(newval,oldval){
         this.getResize()
      }
  },
  mounted(){
        this.getCarbonList(this.energyList,'#FFC000','#D08900','#01C581','#01C581',"ec-cont","mix");
        this.getCarbonList(this.CarbonList,'#30EEFF','#0098AF','#41BAFF','#0064B1',"ec-cont1","bar");
        this.init();
  }
}
</script>
<style scoped lang="scss">
    .flex-l{
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .tab-group{
        margin-top:20px;
         .tab-item{
            flex: 1;
            margin-right: 10px;
            height: 150px;
        }
        .tab-item:nth-of-type(4){
            margin: 0;
        }
        .tab-item i:nth-of-type(1){
            top: 35px;
            position: absolute;
            font-size: 32px;
            left: 35px;
        }
        .tab-item i:nth-of-type(2){
            top: 43px;
            position: absolute;
            right: 45px;
            color: #ccc;
        }
        .tab-item span:nth-of-type(1){
            position: absolute;
            top: 38px;
            right: 65px;
            font-size: 20px;
        }
        .tab-item span:nth-of-type(2){
            position: absolute;
            right: 110px;
            bottom: 20px;
            font-size: 25px;
        }
    }
    .date-Input{
        color: #00e8fe !important;
        background: transparent !important;
        border:0;
    }
   
    .ec-group{
        margin-top: 20px;
    }
    .ec-group svg{
        margin: 10px 10px 5px 10px;
    }
    #ec-cont{
        width: 100%;
        height: 30vh;
    }
    #ec-cont1{
        width: 100%;
        height: 30vh;
    }
</style>