import {setTheme} from "mdui";

export const darkModeStore = defineStore(
    "darkMode",
    () => {
        const v = ref(false)
        const toggle = () => {
            v.value = !v.value
            setTheme(v.value ? 'dark' : 'light');
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
