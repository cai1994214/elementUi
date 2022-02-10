<template>
  <div>
     <CommonDialog :visible="formDataVisible" @handleClose="closeFormData" DialogTitle="新建MSKU"> <!-- 新增产品信息 -->
      <div slot="cont" class="conCenter">
         <el-form :model="formData" ref="formData" :rules="rules" label-width="100px" @submit.native.prevent>
           <el-form-item label="MSKU" prop="msku">
              <el-input v-model="formData.msku" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SKU" required>
              <el-input v-model="formData.sku" size="small" disabled></el-input>
          </el-form-item>
           <el-form-item label="店铺" prop="shopId">
              <el-select v-model="formData.shopId" size="small">
                <el-option v-for="({name, id}, index) in shopList" :key="`shop${index}`" :label="name" :value="id"></el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="国家" required>
              <el-select v-model="formData.country" size="small" disabled>
                <el-option v-for="(item, index) in countryList" :key="`country${index}`" :label="item" :value="item"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="品线" prop="productLine">
              <el-input v-model="formData.productLine" size="small" >
                 <template slot="prepend">{{preLine || '-'}}</template>
              </el-input>
          </el-form-item>
           <el-form-item label="销售链接">
             <el-input v-model="formData.salesUrl" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="UPC">
             <el-input v-model="formData.upc" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="内箱GTIN">
             <el-input v-model="formData.innerGTIN" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="外箱GTIN">
             <el-input v-model="formData.outerGTIN" size="small" ></el-input>
          </el-form-item>
         </el-form>
      </div>
       <div slot="footerBtn" class="conCenter">
          <el-button size="small" @click="closeFormData">取 消</el-button>
          <el-button size="small" @click="saveFormData" type="primary">确定</el-button>
      </div>
    </CommonDialog>
  </div>
</template>
<script>
import CommonDialog from './commonDialog'
import { Mixin } from '../mixin'
export default {
  name: "add_product_info",
  components: {
    CommonDialog
  },
  mixins: [ Mixin ],
  props: {
    formDataVisible: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
   return {
     formData: {
       msku: '',
       sku: '',
       shopId: '',
       productLine: '',
       country: '',
       productPosition: ''
     },
     shopList: [],
     countryList: ['US', 'DE', 'UK', 'JP', 'CA', 'FR', 'IT', 'ES'],
     rules: {
       msku: [{ required: true, message: '请输入MSKU', trigger: 'blur'}],
       shopId: [{ required: true, message: '请选择店铺', trigger: 'blur'}],
       productLine: [{ required: true, message: '请输入品线', trigger: 'blur'}],
       productPosition: [{ required: true, message: '请选择产品定位', trigger: 'blur'}],
     },
     preLine: '',//sku查询的品线前缀
   }
  },
  computed:{
  },
  methods:{
    closeFormData(){
        this.$emit('update:formDataVisible', false);
        this.$refs.formData.resetFields();
    },
    saveFormData(){//保存 新增msku内容
      this.$refs.formData.validate((valid) => {
        if(valid) {

        }
      })
    },
  },
  mounted(){
    this.getProductPosition();
  }
}
</script>
<style lang="scss" scoped>
.conCenter{
  display: flex;
  justify-content: center;
  .el-input, .el-select {
    width: 250px;
  }
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
