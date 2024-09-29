<template>
  <mdui-dialog :open="isDialogNewNoteOpen">
    <div class="flex flex-col gap-y-4 p-2 w-96">
      <div>新建笔记</div>

      <mdui-text-field :value="curNote.title" label="标题" variant="outlined"
                       @input="curNote.title=$event.target.value"></mdui-text-field>

      <mdui-text-field :value="curTmpCategories.name" label="笔记分类" readonly variant="outlined"></mdui-text-field>

      <mdui-list class="flex flex-col overflow-y-scroll max-h-64">
        <mdui-list-subheader>
          笔记分类
        </mdui-list-subheader>
        <div v-for="cate in categoriesList" :key="cate.id" class="flex flex-col">
          <mdui-list-item @click="curTmpCategories={...cate}">
            {{ cate.name }}
          </mdui-list-item>
        </div>
      </mdui-list>

      <div class="flex flex-row justify-around my-2">
        <mdui-button @click="newNote">确定</mdui-button>
        <mdui-button @click="closeDialog">取消</mdui-button>
      </div>
    </div>
  </mdui-dialog>
  <mdui-dialog :open="isDialogDeleteNoteOpen">
    <div class="flex flex-col gap-y-4 items-center  justify-center">
      <div>确定删除笔记：</div>
      <div class="text-2xl">{{ curDeleteNote.title }}</div>
      <div class="flex gap-x-6">
        <mdui-button @click="deleteNote">确定</mdui-button>
        <mdui-button @click="closeDeleteNoteMenu">取消</mdui-button>
      </div>
    </div>
  </mdui-dialog>
  <div class="relative overflow-hidden flex m-0">
    <mdui-navigation-drawer :open="enableSideBar.v" class="h-screen w-64 overflow-auto" contained>
      <mdui-list v-if="curTab==='notes'">
        <mdui-list-subheader>笔记列表</mdui-list-subheader>
        <mdui-button
            class="w-full mt-4"
            @click="openNewNoteDialog">新建笔记
        </mdui-button>
        <mdui-divider class="m-4"/>
        <mdui-text-field :value="searchContent" class="px-2" clearable icon="search" label="搜索"
                         variant="outlined"
                         @input="searchNoteHandler($event.target.value)"/>
        <mdui-divider class="m-4"/>
        <div v-for="note in noteListView" :key="note.id" class="flex flex-col m-2">
          <mdui-card class="w-full">
            <mdui-list-item @click="loadNote(note.id)" @contextmenu.prevent="openDeleteNoteMenu(note.id,note.title)">
              {{ note.title }}
            </mdui-list-item>
          </mdui-card>
        </div>
      </mdui-list>
      <mdui-list v-else-if="curTab==='categories'">
        <mdui-list-subheader>笔记分类</mdui-list-subheader>
        <mdui-button
            class="w-full mt-4"
            @click="">新建分类
        </mdui-button>
        <mdui-divider class="m-4"/>
        <div v-for="cate in categoriesList" :key="cate.id" class="flex flex-col m-2">
          <mdui-card class="w-full">
            <mdui-list-item @click="">
              {{ cate.name }}
            </mdui-list-item>
          </mdui-card>
        </div>
      </mdui-list>
    </mdui-navigation-drawer>


    <MdEditor

        v-if="curNote.isLoad"
        v-model="curNote.content"
        :onSave="saveNote"
        :theme="darkMode.v?'dark':'light'"
        style="height: 100vh"/>
    <div v-else style="height: 100vh"></div>
  </div>
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import {enableSideBarStore} from "~/store/EnableSidebarStore";
import {darkModeStore} from "~/store/DarkThemeStore";
import {api} from "~/api/ApiInstance.ts";
import type {CategoriesDto, NoteDto} from "~/api/gen/model/dto";
import {MdEditor} from "md-editor-v3";

onMounted(() => {
  fetchNoteList()
  fetchCategoriesList()
})

const fetchNoteList = async () => {
  const resp = await api.noteController.getNoteList();
  if (resp.code !== 200) {
    const msg = "获取笔记列表失败"
    console.log(msg + ": " + resp.msg)
    alert(msg)
  }

  noteList.value = resp.data
  noteListView.value = resp.data
}
const fetchCategoriesList = async () => {
  const resp = await api.categoriesController.getCategories();
  if (resp.code !== 200) {
    const msg = "获取目录列表失败"
    console.log(msg + ": " + resp.msg)
    alert(msg)
  }
  categoriesList.value = resp.data
}


const loadNote = async (id: string) => {
  const resp = await api.noteController.getNoteDetail({
    id: id
  })
  if (resp.code !== 200) {
    const msg = "加载笔记失败"
    console.log(msg + ": " + resp.msg)
    alert(msg)
  }

  curNote.value.id = resp.data.id
  curNote.value.content = resp.data.content
  curNote.value.categories = resp.data.categories
  curNote.value.isLoad = true
}

const openNewNoteDialog = () => {
  isDialogNewNoteOpen.value = true
}
const closeDialog = () => {
  isDialogNewNoteOpen.value = false
  curTmpCategories.value = {
    id: "",
    name: ""
  }
}

const categoriesList = ref<Array<CategoriesDto['CategoriesController/CATEGORIES_BASE']>>([])
const noteList = ref<Array<NoteDto['NoteController/NOTE_WITH_TITLE']>>([])
const noteListView = ref([])
const curNote = ref({
  id: "",
  content: "",
  categories: {
    id: "",
    name: ""
  },
  isLoad: false,
  title: ""
})

const curTab = useState('curTab')
const enableSideBar = enableSideBarStore()
const darkMode = darkModeStore()
const curTmpCategories = ref<CategoriesDto['CategoriesController/CATEGORIES_BASE']>({
  id: "",
  name: "",
})

const isDialogNewNoteOpen = ref(false)
const isDialogDeleteNoteOpen = ref(false)

const curDeleteNote = ref({
  id: "",
  title: ""
})

const searchContent = ref("")
const searchNoteHandler = (input: string) => {
  searchContent.value = input

  if (input.length === 0) {
    noteListView.value = noteList.value
    return
  }

  noteListView.value = noteList.value.filter((item) => {
    return item.title.includes(input)
  })
}

const openDeleteNoteMenu = (id: string, title: string) => {
  curDeleteNote.value.id = id
  curDeleteNote.value.title = title
  isDialogDeleteNoteOpen.value = true
}
const closeDeleteNoteMenu = () => {
  isDialogDeleteNoteOpen.value = false
  curDeleteNote.value.id = ""
  curDeleteNote.value.title = ""
}
const deleteNote = async (id: string) => {
  const resp = await api.noteController.deleteNote({
    id: curDeleteNote.value.id
  })

  if (resp.code !== 200) {
    const msg = "删除笔记失败"
    console.log(msg + ": " + resp.msg)
    alert(msg)
    return
  }

  await fetchNoteList()

  closeDeleteNoteMenu()
}

const newNote = () => {
  if (curTmpCategories.value.id === "" || curTmpCategories.value.name === "") {
    alert("笔记未指定分类")
    return
  }

  curNote.value = {
    id: "",
    content: "# " + curNote.value.title + "\n",
    categories: {
      id: curTmpCategories.value.id,
      name: curTmpCategories.value.name
    },
    isLoad: true
  }
  curTmpCategories.value = {
    id: "",
    name: ""
  }

  isDialogNewNoteOpen.value = false
}


const saveNote = async (v) => {
  const lines = v.split('\n');
  const title = lines.length > 0 ? lines[0].replace(/^#+\s*/, '').trim() : '未命名笔记';


  if (curNote.value.id.length !== 0) { //update note
    const resp = await api.noteController.updateNote({
      id: curNote.value.id,
      content: v,
      title: title,
      categoriesId: curNote.value.categories.id
    })

    if (resp.code !== 200) {
      const msg = "更新笔记失败"
      console.log(msg + ": " + resp.msg)
      alert(msg)
      return
    }

    await fetchNoteList()

    return
  }

  const resp = await api.noteController.newNote({
    content: v,
    title: title,
    categoriesId: curNote.value.categories.id
  })

  if (resp.code !== 200) {
    const msg = "保存笔记失败"
    console.log(msg + ": " + resp.msg)
    alert(msg)
    return
  }

  await fetchNoteList()

}


</script>


<style>
.md-editor {
  background-color: rgb(var(--mdui-color-surface));
  --md-bk-color: rgb(var(--mdui-color-surface));
}

</style>

