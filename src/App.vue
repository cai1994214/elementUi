<template>
  <div id="app">
     <router-view/> 
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style >
body,html{
  padding:0;
  margin:0;
  background-color: #0e1a31;
  color:#00e8fe;
  height: 100%;
  overflow: hidden;
}
/*子页面大小*/
.contMain{
  height:100%;
  width:100%;
  min-width: 1300px;
}
.el-range-input{
  background: transparent;
  color:#00e8fe !important;
}
.el-picker-panel,.el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div{
  background: #0e1a31;
  color:#00e8fe !important;
}
.el-date-editor .el-range__icon{
  font-size: 20px;
  color:#00e8fe;
}
.el-range-separator,.el-date-table th{
  color:#00e8fe !important;
}
.el-picker-panel,.el-date-range-picker__content.is-left{
  border-color: #00e8fe;
}
.page-box{
    position: relative;
    border: 1px solid;
    border-color: #008fa0!important;
    background-color: #0e1a31;
    padding: 15px 15px 0 15px;;
}
.page-box::before{
    position: absolute;
    height: 14px;
    display: block;
    content: "";
    left: -1px;
    top: -1px;
    width: 147px;
    background: url("assets/image/page-box-left.png");
}
.page-box::after{
    position: absolute;
    height: 14px;
    display: block;
    content: "";
    right: -1px;
    bottom: -1px;
    width: 14px;
    transform: rotate(180deg);
    background: url("assets/image/page-box-left.png");
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
