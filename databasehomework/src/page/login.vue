// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div id="login">
      <transition name="form-fade">
        <div class="form" v-show="showForm">
          <el-form :rules="rules" :model="loginForm" ref="loginForm">
            <el-form-item prop="name">
              <el-input placeholder="用户名" v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('loginForm')" class="loginButton">登陆</el-button>
            </el-form-item>
          </el-form>
          <div class="tip">
            <p>温馨提示：<br>未登录过的新用户，自动注册<br>注册过的用户可凭账号密码登录</p>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import {mapState} from 'vuex';
  export default {
    data() {
      return {
        loginForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        showForm: false
      };
    },
    mounted() {
    },
    watch: {
      adminInfo: function(newValue) {
        if (newValue.id) {
          this.$message({
            message: '登陆成功', 
            type: 'success'
          });
          this.$router.push('manage');
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  @import '../style/mixin';
  #login {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #324057;
    .wh(100%,100%);
    .form {
      background-color: white;
      border-radius: 5px;
      flex-basis: 370px;
      height: 260px;
      position: relative;
      padding: 25px;
      box-sizing: border-box;
  
      &:before {
        content: 'elm后台管理系统';
        display: block;
        position: absolute;
        font-size: 34px;
        color: #fff;
        top: -100px;
        left: 0;
        width: 370px;
        text-align: center;
      }
      .loginButton {
        width: 100%;
      }
      .tip {
        color: red;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s ease-in-out;
  }
  .form-fade-enter, .form-fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
  </style>
  