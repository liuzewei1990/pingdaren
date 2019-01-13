
// import { userLogin, userLoginByMobile, bindMobile, userRegister, userExit, getmallUserInfo, userInfoUpdata } from '@src/apis/user.js'
import { getToken, setToken, removeToken } from '@src/utils/auth.js'
import router from '@src/router'
const types = {
        SET_TOKEN: "SET_TOKEN",//设置token
        SET_USERINFO: "SET_USERINFO",//设置用户信息
}

export default {
        state: {
                // 用户token
                token: getToken(),
                // token过期时间
                tokenExpire: "",
                //用户信息
                userInfo: JSON.parse(localStorage.getItem("userInfo")) || { headImg: "", agentNo: "", gender: "", nickName: "", birthDay: "" }
        },
        getters: {
                isLogin: state => {
                        if (state.token) {
                                return true;
                        } else {
                                return false
                        }
                }
        },
        mutations: {
                [types.SET_TOKEN](state, token) {
                        state.token = token;
                },
                [types.SET_USERINFO](state, userInfo) {
                        state.userInfo = userInfo;
                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                }
        },

        actions: {
                // 用户注册 + 登录
                async userRegister({ commit, dispatch }, userInfo) {
                        let data = await userRegister(userInfo);
                        return dispatch("login", data);
                },

                // 使用用户名密码登录
                async loginByUsername({ commit, dispatch }, userInfo) {
                        let data = await userLogin({ username: userInfo.username, password: userInfo.password });
                        return dispatch("login", data);
                },

                // 使用手机号验证码登录
                async userLoginByMobile({ commit, dispatch }, userInfo) {
                        let data = await userLoginByMobile({ ...userInfo });
                        return dispatch("login", data);
                },

                // 微信用户绑定手机号
                async bindMobile({ commit, dispatch }, userInfo) {
                        let data = await bindMobile({ phone: userInfo.phone, code: userInfo.code });
                        return dispatch("login", data);
                },

                //使用微信登录
                loginByWx({ commit }, userInfo) {

                },

                // 登入
                async login({ commit, dispatch }, data) {
                        console.log("登录信息", data);
                        commit(types.SET_TOKEN, data.token);
                        setToken(data.token, { expires: new Date(data.tokenExpire) });
                        // 登录成功获取购物车数量
                        dispatch("getCartGoodscount");
                        // 获取用户信息
                        dispatch("getmallUserInfo");
                        if (getToken()) {
                                return true;
                        } else {
                                return false;
                        }
                },

                // 修改用户信息
                async userInfoUpdata({ commit, dispatch }, userInfo) {
                        let data = await userInfoUpdata(userInfo);
                        commit(types.SET_USERINFO, userInfo);
                },

                // 获取用户信息
                async getmallUserInfo({ commit, dispatch }) {
                        let userInfo = await getmallUserInfo();
                        commit(types.SET_USERINFO, userInfo);
                },

                // 登出
                async fedLogOut({ commit, dispatch }) {
                        userExit();
                        removeToken();
                        window.location.reload();
                },

                // 登录过期 重新登录
                async reLogin({ commit, dispatch }) {
                        commit(types.SET_TOKEN, "");
                        removeToken();
                        router.push({ path: "/login", query: { redirect: encodeURIComponent(location.href) } });
                },

        },
}
