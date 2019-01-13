import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);

// import productDetail from "@src/vuex/modules/product-detail.js"
import user from "@src/vuex/modules/user.js"
// import home from "@src/vuex/modules/home.js"
// import mutations from "@src/vuex/modules/mutations.js"

export const SHOWLOADING = 'SHOWLOADING';
export const HIDELOADING = 'HIDELOADING';
const store = new Vuex.Store({
        state: {
                showLoading: false
        },

        getters: {
                /**
                 * 触发情况一：api中配置loading为true，当有请求时自动触发，当请求结束后自动关闭。
                 * 触发情况二：手动调用this.$store.dispatch('openGlobalLoading')触发，当请求结束后自动关闭。
                 * 使用该状态用...mapGetters(["showLoading"]) 映射到组件
                 * @param {*} state 
                 */
                showLoading(state) {
                        return state.showLoading
                },
        },

        mutations: {
                [SHOWLOADING](state) {
                        state.showLoading = true;
                },
                [HIDELOADING](state) {
                        state.showLoading = false;
                }
        },

        actions: {
                openGlobalLoading: ({ commit }) => {
                        commit(SHOWLOADING)
                },
                closeGlobalLoading: ({ commit }) => {
                        commit(HIDELOADING)
                }
        },

        modules: { user }
})
export default store;
