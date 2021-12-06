<template>
<div id ="login">
<div class ="login-wrap">
<ul class="menu-tab">
  <li  v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)"> {{item.txt}}
  </li>
</ul>
<el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="login-form" size="meduim">
  
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
    <el-button type="danger" @click="submitForm('loginForm')" class=" login-btn block">提交</el-button>

  </el-form-item>
</el-form>
</div>

</div>
</template>
<script>
// import {reactive,ref} from '@vue/composition-api';
import {GetSms} from "@/api/login.js"
import {axios} from 'axios';
import {reactive,ref,isRef, toRefs, onMounted,unref} from 'vue';
import {stripscript,validatePassword,validateCodes} from '@/utils/validate.js';
// import { isRef, toRef } from '@vue/reactivity';
 export default{
     name : 'login',
     
     setup(props,{refs}){
      
      /**
      * 声明数据
      */
     //这里放置data数据，生命周期，自定义的函数
       const menuTab = reactive([
        { txt :'登陆',current :true,type:'logon'},
        { txt :'注册',current :false,type:'register'}
       ])
       //模块值
       const model = ref('login')
       console.log('model:'+model.value)
       //判断是否为基础数据类型ref
       console.log(isRef(model)?'是基础数据类型':'是对象类型')

       const aa = reactive({
       x:0,
       y:1
       } )
       console.log('aa.x:'+aa.x)
       const bb = toRefs(aa);
       console.log('bb.x:'+bb.x);
       console.log('bb.x:'+bb.x.value);
       //表单绑定数据
        const ruleForm = reactive({
          username: '',
          password: '',
          password2: '',
          code: ''
        }) 
        const loginForm = ref(null)
        // const loginForm = reactive({
        //   username: '',
        //   password: '',
        //   password2: '',
        //   code: ''
        // }) 
         //验证用户名
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      }
      //验证密码
      let validatePass = (rule, value, callback) => {
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
      }
      //验证重复密码
      let validatePass2 = (rule, value, callback) => {
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;

        if (value === '') {
          callback(new Error('请再次输入密码'));
        } 
        if(value!=ruleForm.password){

          callback(new Error('两次密码不一致!'));
        }
        else {
          callback();
        }
      }
      //验证验证码
       let validateCode = (rule, value, callback) => {
         ruleForm.code = stripscript(value)
         value = ruleForm.code
        //  console.log(stripscript(value))
      // console.log(validateCodes(value))
        if (value === '') {
          callback(new Error('请输入验证码'));
        } if(validateCodes(value)){
          // console.log(value)
          callback(new Error('验证码格式不正确！'));
        }
        else {
          callback();
        }
      };
      //表单的验证
          const rules = reactive({
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
        }) 
      /**
       * 声明函数
       */
      const toggleMenu = (data => {
         console.log(data.type)
         model.value = data.type;
         menuTab.forEach((elem,index) => {
           elem.current = false
         });
         data.current = true;
       })
       /**
       * 提交表单
       */
      const submitForm = (formName => {
        alert(123)
        // 为给定 ID 的 user 创建请求
        axios.request({
          url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get', // default
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

        console.log('loginForm:'+JSON.stringify(loginForm,['_rawValue']))
        const c =  JSON.parse(JSON.stringify(loginForm))
      console.log('C:'+c.toString())
        // console.log('loginForm:'+JSON.stringify(loginForm)[2])
        // console.log('loginForm:'+JSON.stringify(loginForm)._rawValue)
        // console.log('loginForm:'+JSON.stringify(loginForm)[2].value)
        const form = unref(loginForm)
      form.validate((valid) => {
           if (valid) {
             console.log(form.validate)
             console.log(form.model)
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }) 
       /**
        * 生命周期
        */
       //挂载完成后
       onMounted(() => {
         GetSms()
       })
       return{
          menuTab,
          model,
          ruleForm,
          rules,
          loginForm,
          toggleMenu,
          submitForm,
          // post
          
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