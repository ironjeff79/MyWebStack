<template>
  <div class="bg">
    <div class="layout">
      <el-tabs type="border-card">
        <el-tab-pane label="登录">
          <el-form label-position="right" label-width="70px" style="max-width: 460px" class="loginForm">
            <el-form-item label="用户名：">
              <el-input v-model="username" />
            </el-form-item>
            <el-form-item label="密码：">
              <el-input type="password" v-model="password" />
            </el-form-item>

            <el-row>
              <el-checkbox class="checkBox" v-model="isAgree" label="同意用户使用准则" name="type" />
            </el-row>
            <el-button v-if="isAgree" type="primary" class="loginBtn" @click="login">
              登录
            </el-button>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册">
          <el-form label-position="right" label-width="100px" style="max-width: 460px" class="loginForm">
            <el-form-item label="用户名：">
              <el-input v-model="rUsername" />
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="rEmail" />
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="rPhone" />
            </el-form-item>
            <el-form-item label="密码：">
              <el-input type="password" v-model="rPassword" />
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input type="password" v-model="confirmPassword" @blur="confirmFunc" />
            </el-form-item>

            <el-row>
              <el-checkbox class="checkBox" v-model="rAgree" label="同意用户使用准则" name="type" />
            </el-row>
            <el-button v-if="rAgree" type="primary" class="loginBtn" @click="register">
              注册
            </el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { post, get } from '@/net/index';
import { ElMessage } from 'element-plus';
import axios from "axios";
import router from '@/router';

export default {
  setup() {
    const form = reactive({
      username: "admin",
      password: "12345",
      isAgree: true,
    });
    const registerForm = reactive({
      rUsername: "",
      rEmail: "",
      rPhone: "",
      rPassword: "",
      confirmPassword: "",
      rAgree: false,
    });

    // 方法
    // 登录
    function login() {
      if (!form.username || !form.password) {
        ElMessage.warning("请填写用户名和密码！");
      } else {
        post(
          "/user/login",
          {
            username: form.username,
            password: form.password,
          },
        );
      }
    }



    // 注册
    function register() {
      console.log("注册", registerForm);
      if (!registerForm.rUsername || !registerForm.rPassword) {
        ElMessage.warning("请填写用户名和密码！");
      } else {
        axios.post(
          '/user',
          {
            username: registerForm.rUsername,
            password: registerForm.rPassword,
            email: registerForm.rEmail,
            phone: registerForm.rPhone,
            status: 1,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          }
        )
          .then(res => {
            ElMessage.success('注册成功')
            router.push('/login')
          })
          .catch(err => {
            console.error(err);
          })
      }
    }
    // 获取验证码
    function getIdentifyCode() {
      console.log("获取验证码");
    }
    const confirmFunc = () => {
      if (registerForm.confirmPassword !== registerForm.rPassword)
        alert("密码与确认密码不一致.");
    };
    return {
      ...toRefs(form),
      ...toRefs(registerForm),
      login,
      register,
      getIdentifyCode,
      confirmFunc,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url(../assets/images/loginbg.jpg);
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100%;

}

.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 400px;

}

.loginBtn {
  width: 100px;
}

.loginForm {
  text-align: center;
}

.checkBox {
  margin-left: 7px;
}

.inpWidth {
  width: 165px;
}
</style>
