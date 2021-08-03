<template>
    <div class="tform">
        <div>
            <el-button type='text' @click="getData">查询</el-button>
        </div>
        <transition name="el-fade-in">
            <div class="flex" v-show="show">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="form.region" filterable placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="发货地址：" prop="fAdderss">
                    <el-input class="inp" v-model="form.fAdderss" auto-complete="true"></el-input>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
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
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            </div>
        </transition>
    </div>
</template>


<script>
export default {
  components:{},
  props:{},
  created(){
    //   console.log(this.$route)
  },
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
         show:true,
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
                ]
        }
    }
  },
  methods:{
       onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getData(){
          this.$http.request({
                url:'/apis/findEnergyDayKwhData',
                params:{
                    'Code':73,
                    'type':'Q',
                    'date':'2019-04-11',
                    'sortType':''
                },
                method:'post'
          }
          )
          .then((res)=>{
              this.show=!this.show;
            }
          )
        }
  },
  mounted(){}
}
</script>
<style>
    .flex{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tform{
        width: 80%;
        margin: auto;
    }
    .el-form-item__label,label span{
         color: #00e8fe ;
    }
</style>