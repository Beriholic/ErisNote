<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="box rounded-2xl p-48 pb-32 border-2">
      <div class="flex">
        <div class="text-4xl pb-12">ErisNote Register</div>
      </div>
      <mdui-text-field :value="form.username" class="my-2" label="用户名" variant="outlined"
                       @input="form.username = $event.target.value"/>
      <mdui-text-field :value="form.password" class="my-2" label="密码" type="password"
                       variant="outlined"
                       @input="form.password = $event.target.value"/>
      <mdui-text-field :value="form.confirmPassword" class="my-2" label="确认密码" type="password"
                       variant="outlined"
                       @input="form.confirmPassword = $event.target.value"/>

      <div class="flex justify-center">
        <mdui-button class="mt-12" @click="registerHandler">提交</mdui-button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'none'
})


const form = ref({
  username: "",
  password: "",
  confirmPassword: ""
})

const registerHandler = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("密码不一致")
    return
  }
  useFetch("/api/user/register", {
    method: "POST",
    query: {
      username: form.value.username,
      password: form.value.password
    }
  }).then(res => {
    const code = res.data.value.code
    if (code === 200) {
      alert("注册成功")
      navigateTo("/login")
    } else {
      alert(res.data.value.msg)
    }
  })
}

</script>

<style scoped>
.box {
  background-color: rgb(var(--mdui-color-secondary-container));
  border-color: rgb(var(--mdui-color-primary));
}
</style>
