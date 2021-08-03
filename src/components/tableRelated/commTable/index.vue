<template>
  <div>
      <el-button type="primary" plain @click="openMsg" class="search">查询</el-button>
      <el-button type="primary" plain @click="openVn" class="search">查看</el-button>
      <el-button type="text" plain  @click="openAlt"  class="search">弹框</el-button>
       <transition name="el-fade-in">
            <div  >
                 <el-table
                    :stripe="true"
                    :data="tempList"
                    height="600"
                    border
                    highlight-current-row
                    @current-change="clickThisRow"
                    style="width: 100%">
                    <el-table-column
                        fixed
                        prop="data"
                        label="数值"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sname"
                        label="编码">
                    </el-table-column>
                </el-table>
                  <el-pagination background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        tableData:[],
        currentRow:null,
        keyword: "集团",
        total: 5,
        tempList:[],
        currentPage: 1,
　　　　 pageSize: 10,
        multipleSelection: []
    }
  },
  methods:{
       getData(){
        //   this.openFullScreen()//加载loading
         this.$http.request({
                url:'/apis/findEnergyDayKwhData',
                params:{
                    'Code':73,
                    'type':'Q',
                    'date':'2019-04-11',
                    'sortType':''
                },
                method:'post'
          }).then((res)=>{//成功
              this.tableData=res.data.energy
              this.total=res.data.energy.length;
              this.currentPage=this.total/this.pageSize
              this.currentChangePage(this.tableData,1);//数据初始化
            //   this.closeFullScreen(this.openFullScreen())
            }).catch(()=>{//失败
              this.closeFullScreen(this.openFullScreen())//关闭loading
            })
        },
        initData(){
            this.openFullScreen()//加载loading
            this.$http.request({
                    url:'/apis/findDeviceTypecumption',
                    params:{
                        'areaCode':73,
                        'date':'2019-03'
                    },
                    method:'post'
            }).then((res)=>{//成功
                this.closeFullScreen(this.openFullScreen())//关闭loading
            })
        },
        handleCurrentChange(val){
            this.currntRow=val;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        clickThisRow(value){
            // console.log(value);
        },
         handleSizeChange(val){//页码大小
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage)
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){//页面跳转
            this.currentPage = val;
            this.currentChangePage(this.tableData,val)
            // console.log(`当前页: ${val}`);
        },
        currentChangePage(list,currentPage) {//分页计算
            let from = (currentPage - 1) * this.pageSize;
            let to = currentPage * this.pageSize;
            this.tempList = [];
            for (; from < to; from++) {
                if (list[from]) {
                this.tempList.push(list[from]);
                }
            }
        },
        openFullScreen(){
            const loading=this.$loading({
                lock:true,
                text:'正在加载中',
                spinner:'el-icon-loading',
                background:'rgba(0,0,0,.7)'
            })
            return loading;
        },
        closeFullScreen(loading){
            loading.close();
        },
        openMsg(){
            this.$message("查询暂时无数据")
        },
        openVn(){
            this.$message({
                message:'this is warning',
                type:'warning'
            })
        },
        openAlt(){
           this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        }
  },
  created(){
      this.getData();
      this.initData();
  }
}
</script>
<style>
    .search{
        padding:4px 12px;
    }
    .search span{
        display:inline-block;
        width:50px;
    }
</style>