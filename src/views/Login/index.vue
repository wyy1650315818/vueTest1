<template>
<div id ="login">
<div class ="login-wrap">
<ul class="menu-tab">
  <li  v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)"> {{item.txt}}
  </li>
</ul>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="meduim">
  
  <el-form-item  prop="username" class="item-form">
    <label>用户名</label>
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item  prop="password" class="item-form">
    <label>密码</label>
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
  </el-form-item>
  <el-form-item  prop="password2" class="item-form" v-if="model === 'register'">
    <label>重复密码</label>
    <el-input type="password" v-model="ruleForm.password2" autocomplete="off" ></el-input>
  </el-form-item>
  <el-form-item  prop="code" class="item-form">
    <label>验证码</label>
    <el-row :gutter="10">
  <el-col :span="15">
    <el-input type="text" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
    </el-col>
  <el-col :span="9">
    <el-button type="success" class="block">获取验证码</el-button>
    </el-col>
</el-row>
    
  </el-form-item>
  <el-form-item>
    <el-button type="danger" @click="submitForm('ruleForm')" class=" login-btn block">提交</el-button>

  </el-form-item>
</el-form>
</div>

</div>
</template>
<script>
import {stripscript,validatePassword,validateCodes} from '@/utils/validate.js';
 export default{
     name : 'login',
     data(){
      //验证用户名
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      //验证密码
      var validatePass = (rule, value, callback) => {
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;

        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        if(validatePassword(value)){

          callback(new Error('密码格式不正确!'));
        }
        else {
          callback();
        }
      };
      //验证重复密码
      var validatePass2 = (rule, value, callback) => {
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;

        if (value === '') {
          callback(new Error('请再次输入密码'));
        } 
        if(value!=this.ruleForm.password){

          callback(new Error('两次密码不一致!'));
        }
        else {
          callback();
        }
      };
      //验证验证码
       var validateCode = (rule, value, callback) => {
         this.ruleForm.code = stripscript(value)
         value = this.ruleForm.code
        //  console.log(stripscript(value))
      console.log(validateCodes(value))
        if (value === '') {
          callback(new Error('请输入验证码'));
        } if(validateCodes(value)){
          console.log(value)
          callback(new Error('验证码格式不正确！'));
        }
        else {
          callback();
        }
      };
       return{
         
       menuTab:[
        { txt :'登陆',current :true,type:'logon'},
        { txt :'注册',current :false,type:'register'}
       ],
       model:'login',
       ruleForm: {
          username: '',
          password: '',
          password2: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
       }
     },
     created(){},
     mounted(){

     },
     methods:{
       toggleMenu(data){
         console.log(data.type)
         this.model = data.type;
         this.menuTab.forEach((elem,index) => {
           elem.current = false
         });
         data.current = true;
       },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
     }
 }
</script>
<style lang="scss" scoped>
#login {
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap {
width: 330px;
margin :auto;
}
.menu-tab{
  text-align:center;
  li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current{
    background-color:rgba(0,0,0,1);
  }
}
.login-form{
    label{
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .item-form{
    margin-bottom: 13px;
  }
  .block{
   
    display: block;
     width: 100%;
  }
  .login-btn{
    margin-top: 19px;
  }
  }
</style>