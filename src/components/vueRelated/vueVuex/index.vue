<template>
  <div class="tlc">
    <h2>我是从页面上直接获取的:{{this.$store.state.userData.count}}</h2>
    <h2>我是从页面上直接获取的:{{this.$store.state.userData.name}}</h2>
    <p>这是子页面向父页面传的值{{childWords}}</p>
    <ul>
      <li v-for="item in listData" :key="item">{{item}}</li>
    </ul>
    <button @click="changeList">改变</button>
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  data() {
    return {
      childWords:'',
      listData:['a','b','c']
    };
  },
  methods: {
   listenToMyBoy(somedata){
     this.childWords=somedata
   },
   changeList(){
    //  this.listData[0]='d'//利用索引去改变数组 vue视图不会跟新 要用set
     this.$set(this.listData,0,'d')
   }
  },
  mounted() {

  }
};
</script>
<style scoped>
  .tlc{
    text-align: center;
  }
</style>
