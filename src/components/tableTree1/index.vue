<template>
  <div class="menus-tree">
  <div class="search">
    <el-date-picker
      class="datePicker"
      v-model="dateTime"
      type="daterange"
      range-separator="至"
      :picker-options="pickerOptions"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-button @click="initData()" style="float: right"
      >查询</el-button>
  </div>
  <el-table
      :data="tableData"
      row-key="code"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      default-expand-all
      class="table-striped el-table"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      max-height="350"
    >
        <template
        v-for="(item,index) in tableColumn"
        >
          <!-- index是固定的字段个数 -->
          <el-table-column
          v-if="index<3"
          fixed
          :prop="item.props"
          :key="index"
          :width="item.width"
          :label="item.label"
          >
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.props"
          :key="index"
          :min-width="item.width"
          :label="item.label"
          >
        </el-table-column>
        </template>
  </el-table>
  </div>
</template>

<script>
  import Vue from 'vue';
  import './format.js'
  import JSONDATA from "./data.json";
  export default {
    data() {
      return {
        lineStyle: {
          "font-size": "14px",
          height: "45px",
          padding: "3px 0",
        },
        pickerOptions: {//限制当前时间
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        dateTime: [
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),new Date(Date.now())
        ],//当前时间和过去31天的
        tableColumn:[],//表格列表
        tableData:[],//表格数据
      }
    },
    created() {
      this.initData();//初始化数据 实际项目咋请求之后操作
    },
    methods: {
       headerStyle() {
        return this.lineStyle;
      },
      cellStyle() {
        return this.lineStyle;
      },
      initData(){
        //这里时间格式化 可以用vue的moment插件 看你个人
        let dateArr = this.getTimeArr(this.dateTime[0].Format('yyyy-MM-dd'),this.dateTime[1].Format('yyyy-MM-dd'),'yyyy-MM-dd',1);
        //-------start:  这里模拟后台数据格式 -------
        let newData = this.treeTransArray(JSONDATA,'children');
        newData.map(item=>{
          item.priceInfo = dateArr.map(ele=>{
            return {date:ele,price:Math.random()*10+2}
          });
          return item
        });
        let treeData = this.arrayTransTree(newData,'code','parentCode','children');
        //-------end:  这里模拟后台数据格式  treeData 是树形结构 newData是普通结构 ------
        //这里我直接拿第一个数据遍历组出表格列表
        let columnArr = [];
        for(var k in treeData[0]){
            switch(k){
                case 'level':
                    columnArr.push({props:k,label:'层级',width:120});
                    break;
                case 'code':
                    columnArr.push({props:k,label:'编码',width:120});
                    break;
                case 'name':
                    columnArr.push({props:k,label:'名称',width:120});
                    break;
                case 'priceInfo':
                    treeData[0][k].forEach(item=>{
                         columnArr.push({'props':item.date,'label':item.date.slice(5),width:100});
                    });
                    break;
            }
        }
        this.tableColumn = columnArr;
        console.log('columnArr',columnArr)
        //------start: 将时间字段为key 价格为vule的对象处理出来放在 普通对象的字段里 ------
        //1:处理表格数据  把每项时间对应的价格 和其他需要展示的字段提出来
        let tableData = newData.map((item)=>{
          let arr = [],obj;
          item.priceInfo.forEach((ele,j)=>{
              obj = {};
              obj.date = ele.date;
              obj.price = ele.price;
              obj.level = item.level;
              obj.name = item.name;
              obj.parentCode = item.parentCode;
              obj.code = item.code;
              obj.children = [];//这里子项 我没用到 直接赋值空
              arr.push(obj)
          })
          return arr
        });
        console.log('tableData',tableData)
        //2:通过对象合并 处理成想要的格式
        let newtableData = tableData.map((item) => {
          let obj2 = {},arr2 = [];
          item.forEach((ele) => {
              obj2.level = ele.level;
              obj2.parentCode = ele.parentCode;
              obj2.name = ele.name;
              obj2.code = ele.code;
              obj2.children = ele.children;
              obj2[ele.date] = ele.price; //价格
              arr2.push(obj2);
          });
          return Object.assign.apply({}, arr2);
      });
      //------end: 将时间字段为key 价格为vule的对象处理出来放在 普通对象的字段里 ------
      console.log('newtableData',newtableData)

      //再将普通json 转化成树形 往组件里一丢 完事
      this.tableData = this.arrayTransTree(newtableData,'code','parentCode','children');
      

      },
      getTimeArr(begin,end,type,interval){  //获取两个时间相邻的数组
        var arr=[],beginDate,endDate,msCount;
        beginDate=new Date(begin+" 00:00");
        endDate=new Date(end+" 00:00");
        msCount=interval*24*60*60*1000;  //1天 2天 3天
        var beginMs=beginDate.getTime();
        var endMs=endDate.getTime();
        for(var i=beginMs;i<=endMs;i+=msCount){
            arr.push(new Date(i).Format(type));
        }
        return arr;
      },
      treeTransArray(tree, key) {//树转普通
        return tree.reduce(function a(con, item) {
            con.push(item);
            if (item[key] && item[key].length > 0)
              item[key].reduce(a, con);
            return con;
          }, [])
          .map(function (item) {
            item[key] = [];
            return item;
          });
      },
      arrayTransTree(list,idstr,pidstr,children){ //普通转树
          let result = [],temp = {};  
          for(let i = 0; i < list.length; i++){  
              temp[list[i][idstr]]=list[i];//将nodes数组转成对象类型  
          }  
          for(let j=0; j<list.length; j++){  
              let tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象  
              if(tempVp){//判断父对象是否存在，如果不存在直接将对象放到第一层  
                  if(!tempVp[children]) tempVp[children] = [];//如果父元素的nodes对象不存在，则创建数组  
                  tempVp[children].push(list[j]);//将本对象压入父对象的nodes数组  
              }else{  
                  result.push(list[j]);//将不存在父对象的对象直接放入一级目录  
              }  
          }  
          return result;  
      },
      
    }
  }
</script>

<style scoped>
 .search{
   margin-bottom: 20px;
 }
</style>