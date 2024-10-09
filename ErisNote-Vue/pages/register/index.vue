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

const registerHandler = async() => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("密码不一致")
    return
  }
  const resp = await api.userController.register({
    body:{
      username: form.value.username,
      password: form.value.password
    }
  })

  if (resp.code!==200){
    const msg="注册失败"
    alert(msg)
    console.log(msg+": "+resp.msg)
  }else {
    alert("注册成功")
    navigateTo("/")
  }
}

</script>

<style scoped>
.box {
  background-color: rgb(var(--mdui-color-secondary-container));
  border-color: rgb(var(--mdui-color-primary));
}
</style>
