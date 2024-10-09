<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="box rounded-2xl p-48 pb-32 border-2">
      <div class="text-4xl pb-12">ErisNote</div>
      <mdui-text-field :value="username" class="my-4" label="用户名" variant="outlined"
                       @input="username = $event.target.value"/>
      <mdui-text-field :value="password" label="密码" variant="outlined" @input="password = $event.target.value"/>
      <div class="flex gap-x-4 my-8">
        <mdui-button @click="loginHandler">登陆</mdui-button>
        <mdui-button @click="navigateTo('/register')">注册</mdui-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {navigateTo} from "#app";
import {api} from "~/api/ApiInstance.ts";

definePageMeta({
  layout: 'none'
})

const username = ref('')
const password = ref('')


const loginHandler = async () => {
  const resp = await api.userController.login({
    body:{
      username: username.value,
      password: password.value
    }
  })

  if (resp.code !== 200) {
    const msg = "登陆失败: " + resp.msg;
    alert(msg)
    console.log(msg)
  }

  alert("登陆成功")
  navigateTo("/home")
}
</script>


<style scoped>
.box {
  background-color: rgb(var(--mdui-color-secondary-container));
  border-color: rgb(var(--mdui-color-primary));
}
</style>
