<template>
  <h1 class="page-title">个人主页</h1>
  <div class="content">
  <div class="userBox">
    <h2 class="user-name">账户名：{{ user.name }}</h2>
    <h2 class="user-roles">角色：{{ user.roles }}</h2>
  </div>
  <div class="avatarBox">
    <img class="user-avatar" :src="user.avatar" alt="">
  </div>
</div>

  <el-button class="btn" type="warning" plain @click="logout">注销</el-button>
</template>

<script setup>
import { ref, onMounted } from "vue"; // 导入 ref 和 onMounted
import { post, get } from "@/net/index";
import axios from 'axios';
import router from '@/router';

const mytoken = ref("");
const user = ref([{}]);

onMounted(() => {
  // 页面加载时就从本地通过localstorage获取存储的token值
  mytoken.value = localStorage.getItem("token");
  // 调用get函数
  axios.get('/user/info', {
    params: {
      token: mytoken.value
    },
  })
    .then(response => {
      // 处理成功响应的数据
      console.log(response.data);
      user.value = response.data.data;
      console.log(user.value.name);
    })
    .catch(error => {
      // 处理错误
      console.error(error);
    });

});

function logout() {
  mytoken.value = ''
  localStorage.removeItem("token")
  ElMessage.success('注销成功')
  router.push('/')
}

</script>

<style>
.content{
  display: flex;
  justify-content: center;
}
.avatarBox{
  margin-left: 300px;
}
.page-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.user-name {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.user-roles {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
  display: flex;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.btn{
  display:block;
  margin:0 auto
}
</style>
