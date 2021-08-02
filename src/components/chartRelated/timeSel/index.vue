<template>
  <div class="contMain">
    <div class="page-box time-info">
      <div class="ec-title flex-l">
          <svg  t="1561596347156" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3037" width="30" height="30"><path d="M800 157.866667l-130.133333 74.666666-157.866667-89.6-157.866667 89.6-130.133333-74.666666-142.933333 83.2h-2.133334v166.4l110.933334 64v224l320 183.466666 320-183.466666h2.133333V469.333333l108.8-64v-166.4l-140.8-81.066666z m89.6 217.6l-110.933333 64v224l-264.533334 151.466666-264.533333-153.6v-224l-110.933333-64v-102.4l87.466666-51.2 87.466667 51.2v46.933334l198.4-115.2 198.4 115.2v-46.933334l87.466667-51.2 87.466666 51.2v104.533334z" fill="#00C1DE" p-id="3038"/><path d="M366.933333 467.2v64l117.333334 68.266667v68.266666h55.466666v-72.533333l121.6-70.4v-64l-151.466666 87.466667z" fill="#00C1DE" p-id="3039"/></svg>
          <span>分时数据</span>
      </div>
      <div class="time-select">
        <div class="times list">
          <div class="times-main">
            <div v-for="(item,index) in 24" :key="index" class="time-item el-col el-col-24" @click="checkItem(index)" :class="{active:current.indexOf(index)!=-1}">
              <div></div>
              <p>{{item}}:00</p>
            </div>
          </div>
          <div class="main" v-for="(item,index) in listData" :key="index"  v-show="current.indexOf(index)!=-1">
                <div class="list-time">{{index+1}}:00</div>
                <div class="list-cont">
                  <P>中长期持仓量</P>
                  <p>{{item.hold}}<span>MW</span></p>
                </div>
                <div class="list-cont">
                  <P>中长期持仓比例</P>
                  <p>{{item.holdRate}}<span>%</span></p>
                </div>
                <div class="list-cont">
                  <P>实际负荷</P>
                  <p>{{item.ActualLoad}}<span>MW</span></p>
                </div>
                <div class="list-cont">
                  <P>暴露现货电量</P>
                  <p>{{item.spotEle}}<span>MW</span></p>
                </div>
                <div class="list-cont">
                  <P>申报/实际偏差量</P>
                  <p>{{item.Deviation}}<span>MW</span></p>
                </div>
                <div class="list-cont">
                  <P>目前价格</P>
                  <p>{{item.PrePrice}}<span>元/MW</span></p>
                </div>
                <div class="list-cont">
                  <P>实时价格</P>
                  <p>{{item.timePrice}}<span>元/MW</span></p>
                </div>
                <div class="list-cont">
                  <P>中长期合同均价</P>
                  <p>{{item.avePrice}}<span>元/MW</span></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      current:[1],//时间节点选中第二个
      listData:[
        {hold:200,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:201,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:202,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:203,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:204,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:205,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:206,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:207,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:208,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:209,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:210,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:211,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:212,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:213,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:214,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:215,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:216,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:217,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:218,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:219,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:220,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:221,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:222,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10},
        {hold:223,holdRate:10,ActualLoad:2000,spotEle:600,Deviation:500,PrePrice:1.35,timePrice:2.10,avePrice:3.10}
      ]
    }
  },
  methods:{
    checkItem(index){
       let indexItem=this.current.indexOf(index);
       if(indexItem==-1){
         this.current.push(index);
       }else{
         this.current.splice(indexItem,1)
       }
    }
  },
  mounted(){}
}
</script>
<style scoped>
  .showDiv{
    display: none;
  }
  .time-select{
    padding: 15px 2%;
    display: flex;
    -webkit-columns: 2;
    columns: 2;
    line-height: 32px;
  }
  .flex-l{
      display: flex;
      justify-content: left;
      align-items: center;
  }
  .time-select .list {
      width: 100%;
  }
  .times{
    position: relative;
    font-size: 14px;
    display: inline-block;
  }
  .times .times-main{
    padding: 0;
    height: 5px;
    background-color: #314361;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .times .times-main .time-item {
      width: 26px;
      height: 26px;
      border-radius: 16px;
      border: 4px solid;
      border-color: #314361 !important;
      background-color: #0e1a31;
      margin-top: -11px;
      cursor: pointer;
  }
  .times .times-main .time-item > div {
      width: 18px;
      height: 18px;
      background-color: rgba(22, 48, 93, 0.4);
      border-radius: 15px;
  }
  .times .times-main .time-item p{
    margin:  0px -9px;
    text-align: center;
    color: #92aad2;
    line-height: 30px;
  }
  .times .times-main .time-item.active{
    border: 0;
    background-color: #0e1a31;
    background-image: url("../../../assets/image/borderBg.png");
    background-size: contain;
    background-repeat: no-repeat;
  } 
  .times .times-main .time-item.active > div:before {
    height: 10px;
    width: 10px;
    color: #fff;
    border-radius: 50%;
    background: transparent;
    background-color: #00e8fe;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    content: '';
    display: block;
    border: none;
    animation: sploosh2 1.2s infinite;
  }
  .times .times-main .time-item.active > div{
    width: 10px;
    height: 10px;
    margin: 4px;
    padding: 4px;
    border: none;
    animation: 1200ms  sploosh1 ;
  }
  .times .times-main .time-item.active > p {
    margin-top: -4px;
  }
  .time-info .main {
    display: flex;
    margin: 10px auto;
    border: 1px solid;
    border-color: #314361 !important;
  }
  .list-time{
    text-align: center;
    flex: 1;
    max-width: 88px;
    background-color: rgba(22,48,93,0.4);
    color: #fff;
    line-height: 70px;
    border-right: 1px solid #314361;
  }
  .list-cont{
    flex: 1;
    border-right: 1px solid;
    border-color: #314361 !important;
    text-align: center;
  }
  .list-cont p{
    margin: 0;
  }
  @keyframes sploosh1{
    0%{
        box-shadow: 0 0 0 0px #00e8fe;
        background-color: rgba(0, 232, 254, 0.5);
    }
    100%{
        box-shadow: 0 0 0 16px transparent;
        background-color: rgba(0, 232, 254, 0.3);
    }
  }
  @keyframes sploosh2{
    0%{
        box-shadow: 0 0 0 0px #00e8fe;
    }
    100%{
        box-shadow: 0 0 0 8px transparent;
    }
  }
  
</style>