<template>
  <div class="product-section">
    <div class="table-wrapper">
      <div class="tableTitle">
        <h3>表格组件</h3>
        <div class="search-title">
          <span>
            <el-button size="mini" type="primary" @click="formDataVisible = true">新建MSKU</el-button>
          </span>
      </div>
      </div>
      <div class="tableCont">
        <el-form :model="tableForm" :rules="rules" ref="tableForm" class="table-form" @submit.native.prevent>
        <CommTable
        :tableData="tableForm.tableData"
        :tablecolumn="tablecolumn"
        :selectionObj="{show: true, fixed: true}"
        :dragTableFlag="true"
        rowKey="id"
        :tabClass="'sortable-table'"
        ref="tableRef"
        @selectionChange="selectionChange"
        @sortChange="sortChange"
        :loading="loading"
        >
          <template v-slot:sku="{data}">
           {{data}}
          </template>
          <template v-slot:productPositionHeader="{}">  <!-- 产品定位表头 -->
            <span>产品定位</span>
             <el-tooltip effect="light" placement="right" >
                <span class="el-icon-question helpTips" style="cursor:pointer;"></span>
                <div slot="content">
                  <CommTable :tableData="tipTableData" :height="400" :tablecolumn="tipTableColumn" :smallRow="true"></CommTable>
                </div>
            </el-tooltip>
          </template>
          <template v-slot:productPosition="{data}"> <!-- 产品定位 -->
              <span>{{data}}</span>
          </template>
          <template v-slot:productLine="{data, index, rowData}"> <!-- 产品线 -->
            <el-form-item v-if="rowData.rowEditFlag" :prop="'tableData.'+index+'.productLine'" :rules='rules.productLine'>
                  <el-input  size="mini" v-model="rowData.productLine"></el-input>
            </el-form-item>
            <p v-else>
              <span>{{data}}</span>
            </p>
          </template>
           <template v-slot:innerGTIN="{data, index, rowData}">   <!-- 内箱GTIN -->
             <el-form-item v-if="rowData.rowEditFlag" :prop="'tableData.'+index+'.innerGTIN'" :rules='rules.innerGTIN'>
                  <el-input  size="mini" v-model="rowData.innerGTIN"></el-input>
              </el-form-item>
              <p v-else>
                <span>{{data}}</span>
              </p>
          </template>
           <template v-slot:outerGTIN="{data, index, rowData}">  <!-- 外箱 -->
              <el-form-item v-if="rowData.rowEditFlag" :prop="'tableData.'+index+'.outerGTIN'" :rules='rules.outerGTIN'>
                  <el-input  size="mini" v-model="rowData.outerGTIN"></el-input>
              </el-form-item>
              <p v-else>
                <span>{{data}}</span>
              </p>
          </template>
          <template v-slot:operate="{index, rowData}"><!-- 操作 -->
            <div class="btn-edit">
              <el-button type="default" size="mini" v-show="!rowData.rowEditFlag" @click="handleEditRow(index, rowData)">编辑</el-button>
             <div v-show="rowData.rowEditFlag">
                <el-button type="default" size="mini"  @click="handleCloseSave(index, rowData)">取消</el-button>
               <el-button type="primary" size="mini"  @click="handleSave(index, rowData)">保存</el-button>
             </div>
            </div>
          </template>
          <el-pagination slot="el-pagination" :total="total" :current-page="pageNum" :page-size="pageSize" :page-sizes="[10, 15, 20, 30, 50]" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </CommTable>
        </el-form>
      </div>

    </div>
    <AddProduct :formDataVisible.sync="formDataVisible" ></AddProduct>
  </div>
</template>
<script>
import CommTable from '@/components/partials/commTable.vue'
import AddProduct from './components/addProductInfo.vue'
import Mock from 'mockjs'
import { Mixin } from './mixin'
export default {
  name: 'productMgr',
  components: {
    CommTable, AddProduct
  },
  mixins: [ Mixin ],
  data () {
    const skuProductColumn = [
      {prop: 'name', label: 'sku'},
      {prop: 'count', label: '数量'},
      {prop: 'price', label: '价格'},
    ];
    return {
      loading: false,
      rules: {
        productLine: [
          {required: true, message: '请输入产品线', trigger: 'blur'},
        ],
        outerGTIN: [
          { required: true, message: '请输入外箱', trigger: ['blur'] }
        ],
        innerGTIN: [
          { required: true, message: '请输入内箱', trigger: ['blur'] }
        ],
      },
      condition: {
        productLineIds: [],
        productPositionIds: [],
        shopIds: [],
        msku: '',
        sku: ''
      },
      skuListObj: [],
      skuLoading: false,
      selection: [],//选中行
      tableForm: {
        tableData: [],
      },
      tableEditCode: ['productLine', 'productPosition', 'salesUrl', 'upc', 'innerGTIN', 'outerGTIN'],
      selRowObj: {},//编辑当前的行
      batchOptions: [
        {value: 1, label: '批量维护品线'},
        {value: 2, label: '批量维护产品定位'},
      ],
      productLineList: [],
      tablecolumn: [
        { prop: "msku", label: "MSKU" },
        { prop: "sku", label: "SKU", slotName: "sku" },
        { prop: 'skuProductList',label: 'sku信息', minWidth: 200, childrenList: skuProductColumn},
        { prop: "shop", label: "店铺" , },
        // { prop: "country", label: "国家" , },
        // { prop: "productLine", label: "品线" , width: 150, slotName: 'productLine'},
        // { prop: "productPosition", label: "产品定位" ,slotName: 'productPosition', width: 150},
        // { prop: "asin", label: "ASIN" , },
        // { prop: "fnsku", label: "FNSKU" , },
        // { prop: "planState", label: "透明计划状态" , width: 150},
        // { prop: "salesUrl", label: "销售链接" , slotName: 'salesUrl', width: 150},
        // { prop: "upc", label: "UPC" , width: 150, countLimit: 25},
        // { prop: "innerGTIN", label: "内箱GTIN" , slotName: 'innerGTIN', width: 150 , sortBy: 'innerGTIN'},
        // { prop: "outerGTIN", label: "外箱GTIN" , slotName: 'outerGTIN', width: 150, sortBy: 'outerGTIN', columnFlag: true},
        { prop: '', label: '操作', slotName: 'operate', width: 180, fixed: 'right'}
      ],
      tipTableData: [
        {line: '6111', content: '基础款&Classlc灯带'},
        {line: '6112', content: 'Basic灯带'},
        {line: '6113', content: 'RGBIC灯带'},
        {line: '6114', content: 'Minger灯带'},
        {line: '6121', content: 'TV灯带'},
        {line: '6122', content: '条状霓虹灯'},
        {line: '6131', content: '汽车灯'},
        {line: '6011', content: '电工照明'},
        {line: '6012', content: '室内气氛灯'},
        {line: '6013', content: '影音灯柱'},
        {line: '6014', content: 'PC灯具'},
        {line: '6015', content: '方块桌面灯'},
        {line: '7011', content: '户外球泡灯'},
        {line: '7012', content: '庭院景观灯'},
        {line: '5111', content: '温度检测'},
        {line: '5112', content: '漏水烤灯'},
        {line: '7111', content: '智能家电'},
        {line: '1011', content: 'EOL品类'},
      ],
      tipTableColumn: [{prop: "line", label: '产品线'},{prop: 'content', label: '注释'}],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      batchProductPosition: '',//产品定位
      batchProductLine: '',//产品线
      isListener: false,
      ListenerCloseIndex: 0, //点击行的索引值
      formDataVisible: false,
    }
  },
  computed: {

  },
  methods: {
    sortChange(obj) { //后台排序回调
     console.log(obj)
    },
    handleEditRow(index, res) {//编辑表格
      this.ListenerCloseIndex = index;
      res.rowEditFlag = true;
      // !this.isListener && document.addEventListener('click', this.closeEditListener)
    },
    closeEditListener(e){//点击当前行以外的地方 关闭编辑状态
      let tableDomArr = Array.from(document.querySelector('.el-table__body-wrapper tbody').children);
      let fixTableDomArr = Array.from(document.querySelector('.el-table__fixed-body-wrapper tbody').children);
      if(!tableDomArr[this.ListenerCloseIndex].contains(e.target) && !fixTableDomArr[this.ListenerCloseIndex].contains(e.target)){
        this.$set(this.tableData[this.ListenerCloseIndex], 'rowEditFlag', false)
        this.isListener = true;
      }
    },
    handleCloseSave(index, res){//表格保存取消
      res.rowEditFlag = false;
    },
    handleSave(index, res){//表格修改保存
      this.$refs.tableForm.validate((valid)=>{
        if(valid){
          res.rowEditFlag = false;
        }
      })

    },
    selectionChange(val){
      console.log('选择的内容', val)
      this.selection = val;
    },
    handleCurrentChange (value) {
      this.pageNum = value
      this.getProductList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getProductList()
    },
    initParams() {
      let params = {};
      for(var k in this.condition) {
        if(k == 'productLineIds' || k== 'productPositionIds' || k == 'shopIds'){
          if(Object.values(this.condition[k]).length > 0){
            params[k] = this.condition[k]
          }
        }else{
          if(this.condition[k] !== '' ){
            params[k] = this.condition[k]
          }
        }
      }
      return params
    },
    getProductList () {
      let params = Object.assign({pageSize: this.pageSize, pageNum: this.pageNum}, this.initParams());
      this.tableForm.tableData = [...Array(10).keys()].map(e => ({
        id: e,
        sku: 'h3310',
        skuProductList: [
          {name: 'H60523D1', count: 2, price: 39.99},
          {name: 'H60523D2', count: 10, price: 5.99},
        ],
        msku: 'msku'+e,
        shop: 'shop'+e,
        country: 'country'+e,
        productLine: 'productLine'+e,
        productPosition: 'productPosition'+e,
        asin: 'asin'+e,
        fnsku: 'fnsku'+e,
        planState: 'planState'+e,
        salesUrl: 'salesUrl'+e,
        upc: Mock.Random.sentence(0,50),//随机生成一段话
        innerGTIN: Math.floor(Math.random()*20),
        outerGTIN: Math.floor(Math.random()*20),
        rowEditFlag: false,//是否可以编辑
      }));
    },
    handleSearch () {
      this.getProductList()
    },
  },
  created () {
    this.getProductList()
  },
  destroyed() {
    document.removeEventListener('click', this.closeEditListener);
  }
}
</script>
<style lang="scss" scoped>
.helpTips {
    animation-name: upAnimation;
    transform-origin: center bottom;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-delay: .5s;
}
@keyframes upAnimation
{
    0% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.215,.61,.355,1);
    }
    10% {
        transform: rotate(-12deg);
         transition-timing-function: cubic-bezier(0.215,.61,.355,1);
    }
    20% {
        transform: rotate(12deg);
        transition-timing-function: cubic-bezier(0.215,.61,.355,1);
    }
    28% {
        transform: rotate(-10deg);
        transition-timing-function: cubic-bezier(0.215,.61,.355,1);
    }
    36% {
        transform: rotate(10deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
    42% {
        transform: rotate(-8deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
    48% {
        transform: rotate(8deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
    52% {
        transform: rotate(-4deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
    56% {
        transform: rotate(4deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
    60% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.755,.5,.855,.06);
    }
   100% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.215,.61,.355,1);
    }
}
.conCenter{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.btn-edit{
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    display: flex;
    justify-content: space-between;
  }
}
.el-form-item {
  margin-bottom: 18px;
}
.product-section {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #f5f8ff;
}
.table-wrapper {
  background-color: #fff;
  padding: 20px 20px;
  box-sizing: border-box;
  .search-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
.batch-options {
  display: inline-block;
  width: 180px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d8d8d8;
  background-color: #fff;
  text-indent: 10px;
  font-size: 12px;
  border-radius: 4px;
}
.batch-options .el-dropdown-link .text {
  display: inline-block;
  font-size: 13px;
  width: 125px;
}

.batch-options-menu {
  width: 180px;
}

.timezone {
  margin-left: 20px;
  margin-right: 20px;
}

.batch-options-menu .batch-option-item {
  text-indent: 15px;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  box-sizing: border-box;
}
</style>

