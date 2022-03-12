import { getSettings } from "../api/settings"
import { setTitle } from "../utils"
export default {
    namespaced: true,
    getters: {

    },
    state: {
        loading: false,
        data: []
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchSettings(ctx) {
            ctx.commit("setLoading", true)
            const resp = await getSettings()
            ctx.commit("setLoading", false)
            ctx.commit("setData", resp)
            if (resp.favicon) {
                let link = document.querySelector("link[ref='shortcut icon']")
                if (link) {
                    return
                }
                link = document.createElement("link")
                link.rel = "shortcut icon"
                link.type = "images/x-icon"
                link.href = resp.favicon
                document.querySelector("head").appendChild(link)
            }
            setTitle.setSiteTitle(resp.siteTitle)
        },
    }
}