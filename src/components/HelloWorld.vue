<template>
  <div class="hello">
    <el-button @click="show=!show">Click Me</el-button>
    <div style="display:flex;margin:20px 38%;height:100px;width:400px">
        <transition name="el-fade-in-linear">
            <div v-show="show" class="transition-box">
              .el-fade-in-linear
            </div>
        </transition>
        <!-- 注释 -->
        <transition name="el-fade-in">
            <div v-show="show" class="transition-box">
              .el-fade-in
            </div>
        </transition>
    </div>
    <!-- <el-row :gutter="20">
      <el-col :span="24"><div class="grid-content bg-purple-dark">24</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple-light">12</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-dark">4</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">8</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row> -->
    <!-- <el-button type='text' @click="getData">文字按钮</el-button> -->
    <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
    <el-row>
      <el-col :span="12">
          <div class="sub-title">激活即列出输入建议</div>
          <el-autocomplete class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          >
          </el-autocomplete>
      </el-col>
      <el-col :span="12">
          <div class="sub-title">输入后匹配输入建议</div>
           <el-autocomplete class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            >
            </el-autocomplete>
      </el-col>
    </el-row>
    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    <el-select class="select" v-model="value" placeholder="请选择..." 
      @change="selValue" 
      clearable multiple
      collapse-tags
      filterable 
    >
      <el-option v-for="item in restaurants"
       :key="item.value" 
       :label="item.value"
       :value="item.address"
       :disabled="item.disabled">
      <!-- <span style="float: left">{{ item.value }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.address }}</span> -->
      </el-option>
    </el-select>
    <div class="block">
        <span>默认点击触发</span>
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
    </div>
    <el-switch
      v-model="value2"
      active-color="#13ce66"
      active-text="帅哥"
      inactive-color="#ff4949"
      inactive-text="美女"
    >
    </el-switch>
    <div class="flex">
      <span class="demonstration">有默认值</span>
      <el-color-picker 
        v-model="color1"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <tForm></tForm>
     <!-- <transfer></transfer>
    <textVue></textVue> 
    <wheel></wheel> -->
  </div>
</template>

<script>
import textVue from './text'
import transfer from './transfer'
import wheel from './Wheel'
import tForm from './tform'
export default {
  components:{textVue,wheel,transfer,tForm},
  name: 'HelloWorld',
  data () {
    return {
      show:true,
      color1:"#409eFF",
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#c7158577'
      ],
      msg: 'Welcome to Your Vue.js App',
      input:"",
      restaurants:[],
      state1:"",
      state2:"",
      num1:1,
      value:"",
      value2:true,
      options:[{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions: [],
        selectedOptions2: []
    }
  },
   methods:{
        // getData(){
        //  let postData={areaCode:73,date:'2019-03',type:'month'};
        //   this.$http.request({
        //         url:'/apis/findDeviceTypecumption',
        //         params:{
        //             'areaCode':73,
        //             'date':'2019-04'
        //         },
        //         method:'post'
        //   }
        //   )
        //   .then(function(res){
        //       console.log(res);
        //     }
        //   )
        // },
        querySearch(queryString,cb){
          var restaurants=this.restaurants;
          var result=queryString?restaurants.filter(this.createFilter(queryString)):restaurants;
          cb(result);
        },
        createFilter(queryString){
          return (restaurant)=>{
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase())>-1);
          }
        },
        loadAll(){
           return [
              { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" ,"disabled":true},
              { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
              { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
              { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
              { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
              { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
              { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
              { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
              { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
              { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
              { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
              { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
              { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
              { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
              { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
              { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
              { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
              { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
              { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
              { "value": "枪会山", "address": "上海市普陀区棕榈路" },
              { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
              { "value": "钱记", "address": "上海市长宁区天山西路" },
              { "value": "壹杯加", "address": "上海市长宁区通协路" },
              { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
              { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
              { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
              { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
              { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
              { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
              { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
              { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
              { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
              { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
              { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
              { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
              { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
              { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
              { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
              { "value": "浏阳蒸菜", "address": "天山西路430号" },
              { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
              { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
              { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
              { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
              { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
              { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
              { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
              { "value": "阳阳麻辣烫", "address": "天山西路389号" },
              { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
            ];
        },
        handleSelect(item){
          console.log(item)
        },
        handleChange(value){
          console.log(this.selectedOptions)
        },
        selValue(value){
          console.log(value)
        }
    },
    mounted() {
          this.restaurants = this.loadAll();
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.transition-box{
  margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .select{
    width: 300px;
  }
</style>
