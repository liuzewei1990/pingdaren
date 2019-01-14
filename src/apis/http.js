import axios from "axios"
import qs from "qs"
import store from '@src/vuex'
import router from '@src/router'
import Toast from '@src/components/v-toast'

//默认axios不发送cookie，需要全局设置以下项，允许跨域发送cookie。
axios.defaults.withCredentials = true;
//全局请求拦截器
axios.interceptors.request.use(function (config) {

        if (config.isLoading) {
                // 显示loading...
                store.dispatch('openGlobalLoading');
        }
        return config;
}, function (error) {
        return Promise.reject(error);
})

//全局响应拦截器
axios.interceptors.response.use(function (response) {
        let config = response.config;
        // 关闭loading...
        store.dispatch('closeGlobalLoading');
        //如果状态吗正常直接返回data中的数据
        if (response && response.status === 200) {

                const data = response.data;
                if (data.code == 201) {
                        store.dispatch('reLogin');
                        return Promise.reject('系统未登录，请重新登录')

                }
                else if (config.isGetCode) {
                        return data;

                } else if (data.status == true) {

                        return data.data;

                } else {
                        //提示具体错误信息
                        Toast({
                                message: `${data.msg}`,
                                iconClass: "icon-tip"
                        });
                        return Promise.reject(data.msg);
                }
        } else {
                router.push(`/error?statusCode=${response.status}&msg=HTTP状态码异常`)
                return Promise.reject("HTTP状态码：" + response.status + "异常");
        }
}, function (error) {
        // 关闭loading...
        store.dispatch('closeGlobalLoading');

        if (error && error.response) {
                switch (error.response.status) {
                        case 400:
                                error.message = '请求错误'
                                break

                        case 401:
                                error.message = '未授权，请登录'
                                break

                        case 403:
                                error.message = '拒绝访问'
                                break

                        case 404:
                                error.message = `请求错误，未找到该资源`
                                break

                        case 408:
                                error.message = '请求超时'
                                break

                        case 500:
                                error.message = '服务器内部错误'
                                break

                        case 501:
                                error.message = '服务未实现'
                                break

                        case 502:
                                error.message = '网关错误'
                                break

                        case 503:
                                error.message = '服务不可用'
                                break

                        case 504:
                                error.message = '网关超时'
                                break

                        case 505:
                                error.message = 'HTTP版本不受支持'
                                break

                        default:
                }
                error.code = error.response.status;

        } else if (error.code == "ECONNABORTED") {
                error.message = '请求超时'
                Toast({ message: error.message, iconClass: "icon-network" });
                return Promise.reject(error.message);
        } else if (error.code == undefined) {
                error.message = '网络开小差了'
                Toast({ message: error.message, iconClass: "icon-network" });
                return Promise.reject(error.message);
        } else {
                error.message = '未知错误'
        }

        router.push(`/error?statusCode=${error.code}&msg=${error.message}`)
        // Toast(error.message);
        return Promise.reject(error.message)
})

export default {
        all: function (requests = []) {
                return axios.all(requests);
        },
        postJson: function (baseURL, url, data, loading, isCode) {
                let isLoading = loading || false;
                let isGetCode = isCode || false;
                return axios({
                        method: "post",
                        url: url,
                        baseURL: baseURL,
                        data: data,
                        timeout: 20000,
                        isLoading,
                        isGetCode,
                        headers: {
                                // 'Cache-Control': 'no-cache',
                        },
                })
        },
        postForm: function (baseURL, url, data, loading, isCode) {
                let isLoading = loading || false;
                let isGetCode = isCode || false;
                return axios({
                        method: "post",
                        url: url,
                        baseURL: baseURL,
                        data: qs.stringify(data),
                        timeout: 20000,
                        isLoading,
                        isGetCode,
                        headers: {
                                // 'Cache-Control': 'no-cache',
                                // "Content-Type": "text/html"
                                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                })
        },
        postFile: function (baseURL, url, data, loading, isCode) {
                let isLoading = loading || false;
                let isGetCode = isCode || false;
                return axios({
                        method: "post",
                        url: url,
                        baseURL: baseURL,
                        data: data,
                        timeout: 20000,
                        isLoading,
                        isGetCode,
                        headers: {
                                'Content-Type': 'multipart/form-data'
                        },
                })
        },
        get: function (baseURL, url, params, loading, isCode) {
                let isLoading = loading || false;
                let isGetCode = isCode || false;
                return axios({
                        method: "GET",
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        timeout: 20000,
                        isLoading,
                        isGetCode,
                        headers: {
                                // 'Cache-Control': 'no-cache',
                        }
                })
        }
}
