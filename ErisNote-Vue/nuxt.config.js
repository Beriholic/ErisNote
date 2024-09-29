// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: {enabled: true},

    router: {
        middleware: ['auth', 'redirect'],
    },

    css: [
        "~/assets/icons/filled.css",
        "~/assets/icons/outlined.css",
    ],

    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "pinia-plugin-persistedstate/nuxt"
    ],

    plugins: [
        {src: '~/plugins/theme.js'}
    ],

    pinia: {
        storesDirs: ['./stores/**'],
    },

    nitro: {
        devProxy: {
            "/api": {
                target: "http://127.0.0.1:8080",
                prependPath: true,
                changeOrigin: true,
            },
        },
    },
});
