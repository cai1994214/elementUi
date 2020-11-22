<template>
<div class="flex" style="height:100vh;background-color:#000d20;">
    <el-form ref="account" :model="account"  :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container page-box">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="account.password" auto-complete="off"  placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import {requestLogin} from '../api/api'
export default {
  name:'login',
  components:{},
  props:{},
  data(){
    return {
        logining: false,
        account: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
    }
  },
  mounted(){
    this.getCookie()
  },
  created(){
      let that=this;
      document.onkeypress=function(e){
          var keycode=document.all?event.keycode:e.which;
          if(keycode==13){
              that.handleLogin();
              return false
          }
      }
  },
  methods:{
      handleLogin(){
          this.$refs.account.validate((valid)=>{
              if(valid){
                  this.logining=true;
                  var loginParams={
                      name:this.account.username,
                      password:this.account.password
                  };
                if(this.checked){
                    this.setCookie(this.account.username,this.account.password,7)
                }else{
                    this.clearCookie()
                }
                requestLogin(loginParams).then(data=>{
                    console.log(data)
                    this.logining=false;
                    let {msg,code,user}=data;
                    if(code=='200'){
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.$router.push({path:'/Form',query:{
                            id:'999'
                        }});
                    }else{
                        this.$message({
                            message:msg,
                            type:'error'
                        })
                    }
                })
              }else{
                  console.log('error submit!');
                  return false
              }
          })
      },
      setCookie(c_name,c_pwd,exdays){
          var exdate=new Date();
          exdate.setTime(exdate.getTime()+24*60*60*100*exdays);//保存天数
          window.document.cookie="userName"+"="+c_name+";path=/;expires"+ exdate.toGMTString();
          window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires"+ exdate.toGMTString();
      },
      getCookie(){
           if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'userName') {
                    this.account.username = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'userPwd') {
                    this.account.password = arr2[1];
                }
            }
        }
      },
      clearCookie(){
          this.setCookie("","",-1)
      }
  }
  
}
</script>
<style scoped>
.login-container{
    width:350px;
}
.page-box{
    position: relative;
    border: 1px solid;
    border-color: #008fa0!important;
    background-color: #0e1a31;
    padding: 10px;
}
.page-box::before{
    position: absolute;
    height: 14px;
    display: block;
    content: "";
    left: -1px;
    top: -1px;
    width: 147px;
    background: url("../assets/image/page-box-left.png");
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
    background: url("../assets/image/page-box-left.png");
}
</style>