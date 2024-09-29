<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import 'mdui';
import 'mdui/mdui.css';
import { darkModeStore } from "~/store/DarkThemeStore";
import { setColorScheme, setTheme } from "mdui";


const darkMode = darkModeStore()
onMounted(() => {
  setTheme(darkMode.darkMode ? 'dark' : 'light')
})
</script>
