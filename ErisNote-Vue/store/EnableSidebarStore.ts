export const enableSideBarStore = defineStore(
    "EnableSideBar",
    () => {
        const v = ref(true)
        const toggle = () => {
            v.value = !v.value
        }
        return {
            v,
            toggle
        }
    },
    {
        persist: true
    }
)
