<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <div class="logo"></div>
        <h3 class="title">“穗智管” 在线填报平台</h3>
        <div class="buttom_bg"></div>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="handleLogin">确认</el-button>

    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { login } from './api'
import utils from '@/utils/utils'
// import  routerIndex  from '@/router/index';
// import  routerJs from '@/router/router';
// import Layout from '@/layout'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true,message: "请输入账号", trigger: 'blur' }],
        password: [{ required: true,message: "请输入密码", trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    userLogin(){
      sessionStorage.clear();
      login(this.loginForm)
        .then(res => {
          const data = res.data;
          if(data.code == 200){
            let getData = data.data;
            sessionStorage.setItem('isLogin',true);
            sessionStorage.setItem('djwjsc_token',getData.token);
            sessionStorage.setItem('dj_userId',getData.userId);
            sessionStorage.setItem('dj_userName',getData.userName);

            // utils.initRouter(this);
            // const getRouterJs = routerJs.filter(item=>item.meta.id==data.data.userId);

            // const routerArr = getRouterJs.map(item=>{
            //   return {
            //     path:'/',
            //     component:Layout,
            //     redirect:item.path,
            //     children:[item]
            //   }
            // })

            // const obj404 = {
            //   path:'/*',
            //   component: () => import('@/views/404'),
            //   hidden:true
            // }
            // routerArr.push(obj404)
            // sessionStorage.setItem('dj_meanList',JSON.stringify(routerArr))

            // this.$router.options.routes = routerArr;
            // routerIndex.addRoutes(routerArr)
            this.$router.push({ path: this.redirect || '/' });
          }
        })
        .catch(() => {
          this.$message.warning('登录失败');
          this.loading = false;
        })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.userLogin()
          // this.$router.push({ path: this.redirect || '/' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 0.47rem;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0.12rem 0.05rem 0.12rem 0.15rem;
      color: $light_gray;
      height: 0.47rem;
      caret-color: $cursor;

      font-size: 0.18rem;
      font-weight: bold;
      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 10rem #2F4767 inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }

      //延长增加自动填充背景色的方式, 是用户感受不到样式的变化
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
          -webkit-transition-delay: 99999s;
          -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
      }
    }

    
   
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #2F4767;
    border-radius: 5px;
    color: #454545;

    margin: 0 auto 0.22rem!important;
    width:40%;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  background:url('./images/bg_login.png') no-repeat;
  background-size: 100% 100%;
  .login-form {
    // position: relative;
    width: 10rem;
    max-width: 100%;
    // padding: 1.6rem 0.35rem 0;
    // margin: 0 auto;
    overflow: hidden;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    .btn{
      width: 40%;
      font-size: 0.18rem;
      font-weight: bold;
    }

  }

  .tips {
    font-size: 0.14rem;
    color: #fff;
    margin-bottom: 0.1rem;

    span {
      &:first-of-type {
        margin-right: 0.16rem;
      }
    }
  }

  .svg-container {
    padding:0.06rem 0.05rem 0.06rem 0.15rem;
    color: $dark_gray;
    vertical-align: middle;
    width: 0.3rem;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .logo{
      width:1rem;
      height:1.5rem;
      background:url('./images/logo.png') no-repeat center center;
      background-size: 100% 100%;
      margin: 0 auto 0.2rem;
    }
    .title {
      font-size: 0.5rem;
      color: $light_gray;
      // margin: 0px auto;
      text-align: center;
      font-weight: bold;
    }
    .buttom_bg{
      margin: 0.3rem auto;
      height:0.05rem;
      width: 60%;
      background:linear-gradient(to left, #253A54, #4E9DFB, #253A54);
      // border-bottom: 10px solid #ccc;
    }
  }

  .show-pwd {
    position: absolute;
    right: 0.1rem;
    top: 0.07rem;
    font-size: 0.16rem;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
