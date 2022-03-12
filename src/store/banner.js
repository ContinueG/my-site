import { getBanners } from "../api/banner"
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
        async fetchBanner(ctx) {
            if (ctx.state.data.length) {//当页面有数据的时候就不要重复拿了
                return
            }
            ctx.commit("setLoading", true)
            const resp = await getBanners()
            ctx.commit("setLoading", false)
            ctx.commit("setData", resp)
        }
    }
}