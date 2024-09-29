<template>
  <div class="flex">
    <mdui-navigation-rail :value="curTab" class="fixed" contained>
      <div slot="top">
        <div v-if="enableSideBar.v">
          <mdui-button-icon icon="view_sidebar" @click="enableSideBar.toggle()"/>
        </div>
        <div v-else>
          <mdui-button-icon
              icon="view_sidebar--outlined"
              @click="enableSideBar.toggle()"
          />
        </div>
      </div>

      <mdui-navigation-rail-item
          :value="curTab"
          active-icon="sticky_note_2"
          icon="sticky_note_2--outlined"
          @click="changeTab('notes')">
        笔记
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item
          :value="curTab"
          active-icon="folder"
          icon="folder--outlined"
          @click="changeTab('categories')">
        分类
      </mdui-navigation-rail-item>
      <div slot="bottom">
        <div v-if="darkMode.v">
          <mdui-button-icon icon="dark_mode" @click="darkMode.toggle()"/>
        </div>
        <div v-else>
          <mdui-button-icon
              icon="dark_mode--outlined"
              @click="darkMode.toggle()"
          />
        </div>
      </div>
    </mdui-navigation-rail>
    <div class="h-screen w-screen">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {darkModeStore} from "~/store/DarkThemeStore";
import {enableSideBarStore} from "~/store/EnableSidebarStore";
import {useState} from "#app";

const curTab = useState('curTab', () => {
  return 'notes'
})

const changeTab = (tab: string) => {
  curTab.value = tab
}

const darkMode = darkModeStore()
const enableSideBar = enableSideBarStore()
</script>
