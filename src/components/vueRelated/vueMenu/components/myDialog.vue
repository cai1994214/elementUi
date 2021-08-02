<template>
  <div>
      <el-button @click="dialogVisible=true">打开dialog</el-button>
      <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width='50%'
      :before-close="handleClose"
      @close='closeDialog'
      class="diaForm"
      >
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="发货地址：" prop="fAdderss">
                    <el-input class="inp" v-model="form.fAdderss" auto-complete="true"></el-input>
                </el-form-item>
                <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                    <el-button type="primary" plain @click="callOf('form')" style="width:98px;">取消</el-button>
                </el-form-item>
            </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
       var validAge=(rule,value,callback)=>{
        if(value==""){
            callback(new Error("年龄不能为空"))
        }
        setTimeout(()=>{
            if(isNaN(value*1)){
                callback(new Error("请输入数子"))
            }else{
                if(value>16){
                     callback(new Error("年龄必须小于16周岁"))
                }else{
                    callback()
                }
            }
        },1000)
    }
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        dialogVisible:false,
        form: {
          name: '',
          pass:'',
          checkPass:'',
          age:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          fAdderss: ''
        },
        rules: {
            fAdderss: [//地址验证
                {
                required: true, //是否必填
                message: '地址不能为空', //规则
                trigger: 'blur'  //何事件触发
                }
            ],
            name:[
                 {
                required: true, //是否必填
                message: '名称不能为空', //规则
                trigger: 'blur'  //何事件触发
                },
                //可以设置双重验证标准
                { min: 3, max: 6,  message: '长度在 3 到 6 个字符', }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
             pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            age:[
                {validator:validAge,trigger:'change'}
            ],
             type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc:[
                {required:true,message:'请输入活动信息',trigger:'blur'}
            ],
             date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ]
        }
    }
  },
  methods:{
      handleClose(done,form){
          this.$confirm("确认关闭?").then(_=>{
              done();
          }).catch(_=>{});
      },
      closeDialog(){
           this.clearData();
           this.$refs['form'].resetFields();//关闭刷新
      },
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$alert('提交成功');
            this.dialogVisible=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      callOf(formName){
    　　this.dialogVisible = false;
    　　this.$refs[formName].resetFields();
      },
      clearData(){
          var json=this.form;
          for(var k in json){
              if(k=='delivery'){
                  json[k]=false
              }else if(k=='type'){
                  json[k]=[]
              }else{
                  json[k]='';
              }
            
          }
      }
  },
  mounted(){
  }
}
</script>
<style>
    .el-dialog{
        margin-top:15px !important;
        height: 877px;
        overflow: auto
    }
    .el-form-item:nth-last-child(1){
        display: flex;
        justify-content: center;
    }
</style>