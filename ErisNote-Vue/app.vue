<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import 'mdui';
import 'mdui/mdui.css';
import {darkModeStore} from "~/store/DarkThemeStore";
import {setTheme} from "mdui";


const darkMode = darkModeStore()
onMounted(() => {
  setTheme(darkMode.v ? 'dark' : 'light')
})
</script>
