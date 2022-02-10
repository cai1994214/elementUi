<template>
  <div>
    <el-table
      :data="tableData"
      border
      :class="tabClass ? tabClass : null"
      :showHeader="showHeader ? showHeader : true"
      :spanMethod="spanMethod ? spanMethod : null"
      element-loading-text="加载中..."
      v-loading="loading"
      :height="height ? height : null"
      :maxHeight="maxHeight ? maxHeight : null"
      :ref="tabRef ? tabRef : null"
      :header-cell-style="smallRow ? lineStyle : null"
      :cell-style="smallRow ? lineStyle : null"
      @sort-change="sortByKey"
      @selection-change="selectionChange"
      :row-key="rowKey ? rowKey : null"
    >
      <!-- 详情内容展示 需要showExpand属性  -->
      <el-table-column type="expand" v-if="showExpand">
        <template slot-scope="{ row }">
          <slot name="expand" :data="row"></slot>
        </template>
      </el-table-column>
      <!-- checkout复选框  selectionObj对象 {show: true, fixed: true}-->
      <el-table-column type="selection" align="center" width="50" v-if="selectionObj.show" :fixed="selectionObj.fixed ? true : false ">
      </el-table-column>
      <el-table-column
        v-for="({ prop, label, width, minWidth ,sortBy, slotName, countLimit, childrenList, columnFlag, className, fixed }, index) in tablecolumn"
        :key="index"
        :prop="prop ? prop : null"
        :label="label ? label : null"
        :width="width ? width : null"
        :min-width="minWidth ? minWidth : 100"
        :sort-by="sortBy ? sortBy : null"
        :sortable="sortBy ? (columnFlag ? 'column' : true) : null"
        :className="className ? className : null"
        :fixed="fixed ? fixed : null"
        :render-header="renderHeader ? renderHeader : null"
        align="center"
      >
      <!-- 自定义表头 -->
      <template  slot="header" >
        <slot v-if="slotName" :name="slotName+'Header'" ></slot>
      </template>
      <!-- 自定义内容 -->
      <template v-if="!childrenList" slot-scope="{row, $index}">
        <!-- 自定义tamplate -->
        <!-- prop没有值的情况 传整个row -->
        <div  v-if="slotName" >
          <slot :name="slotName" :data="prop ? row[prop] : null" :index="$index" :rowData="row"></slot>
        </div>
        <!-- 字数(countLimit控制)超出显示tip -->
        <div v-else>
          <div v-if="row[prop] && row[prop].length > (countLimit ? countLimit : 50)">
              <el-tooltip effect="dark" :content="row[prop]" placement="top" popper-class="tooltipsCont">
                  <span class="limitInfo">{{row[prop] | textSubstr((countLimit ? countLimit : 50))}}</span>
              </el-tooltip>
          </div>
          <div  v-else>
              <span >{{row[prop] | emptyText}}</span>
          </div>
        </div>
      </template>

      <!-- 如果有多组数据 注: 必传prop  childrenList为数据配置项 -->
      <el-table-column
      v-if="childrenList && childrenList.length > 0"
      v-for="(item, index) in childrenList"
      :label="item.label"
      :key="index"
      :width="width ? width : null"
      :min-width="minWidth ? minWidth : 100"
      align="center">
        <template slot-scope="{row, $index}">
           <!-- 自定义tamplate -->
          <div  v-if="slotName">
            <!-- 插槽传值 data:数组数据 prop:当前数组对象的key index:行索引 -->
            <slot  :name="slotName" :data="prop ? row[prop] : []" :prop="item.prop" :rowData="row" :index="$index"></slot>
          </div>
          <!-- 不是自定义默认遍历数据 row[prop] 获取数组 item.prop为数组配置项的prop -->
          <div v-else >
            <div class="flex-column">
              <div v-for="(dataItem, dataIndex) in row[prop]" :key="dataIndex">
                {{dataItem[item.prop]}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页插槽 -->
    <slot name="el-pagination"></slot>
  </div>
</template>
<script>
import { PropsType } from "@/utils/propsType.js";
import Sortable from "sortablejs";
export default {
  name: "comm_table",
  data() {
    return {
      lineStyle:{
        'font-size': '14px',
        'height': '45px',
        'padding': '3px 0'
      },
    };
  },
  props: {
    tableData: PropsType.Array,
    tablecolumn: PropsType.Array,
    loading: PropsType.Boolean,//loading
    showExpand: PropsType.Boolean,//是否展示详情行
    selectionObj: PropsType.Object,//是否展示详情行
    height: PropsType.Number,//表格高度
    maxHeight: PropsType.Number,//表格最大高
    tabRef:  PropsType.String,//表格ref
    smallRow: PropsType.Boolean,//控制表格行高
    showHeader: PropsType.Boolean,//是否显示表头
    spanMethod: PropsType.Function,//合并行合并列
    renderHeader: PropsType.Function,//自定义表头
    tabClass: PropsType.String,//表格class [拖动表格需要的参数]
    rowKey: PropsType.String,//表格唯一标识 [拖动表格需要的参数]
    dragTableFlag: PropsType.Boolean,//是否可拖动表格排序 [拖动表格需要的参数]
  },
  watch: {
  },
  methods: {
     sortByKey (column) {//排序
      let params = {}
      if(column.order){
        if (column.column) {
          params.orderBy = column.column.sortBy
          params.desc = column.column.order === 'descending'
          params.order = true;
        }
      }else{//排序恢复
        params.order = false;
      }
      // else {//自定义初始化排序 看情况传入
        //例如
        // params.orderBy = 'avgSales'
        // params.desc = true
      // }
      this.$emit('sortChange', params)
    },
    selectionChange(val) {
      this.$emit('selectionChange', val)
    },
    rowDrop() {
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.querySelector(`.${this.tabClass} .el-table__body-wrapper tbody`);
      const _this = this;
      Sortable.create(tbody, {
        // 指定父元素下可被拖拽的子元素
        draggable: ".el-table__row",
        onEnd({ newIndex, oldIndex }) {
          if (newIndex !== oldIndex) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0];
            _this.tableData.splice(newIndex, 0, currRow);
            _this.$emit('getDragTableSort', _this.tableData);
          }
        },
      });
    },
  },
  filters: {
    textSubstr (value, qtd = 50, mask = '...') {
      if (!value) return '-';
      return value.length > qtd ? `${value.substring(0, qtd)}${mask}` : value
    },
    emptyText(value){//数据为0的情况显示
      return value !== '' ? value : '-'
    }
  },
  mounted() {
    this.dragTableFlag && this.rowDrop();
  },
};
</script>
<style lang="scss">
.tooltipsCont{
  max-width: 500px;
  max-height: 450px;
}
</style>
<style lang="scss" scoped>
.limitInfo{
  cursor: pointer;
}
.flex-column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
