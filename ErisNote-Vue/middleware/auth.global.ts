import {awsAmplify} from "nitropack/dist/shared/nitro.18796496";

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path == '/login' || to.path == '/register') return

    const token = unref(useCookie('token'))
    if (!token) {
        return navigateTo('/login')
    }
});
