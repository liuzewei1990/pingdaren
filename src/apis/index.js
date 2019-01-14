import base from '@src/apis/base.js'
import http from '@src/apis/http.js'

// 获取帖子列表
export const getArticleList = (params) => http.get(base.oaIp, "/api/article/list", params, false, false)
export const getArticleDetail = (aid) => http.get(base.oaIp, `/api/article/${aid}/info`, {}, true, false)
export const getClassifyList = () => http.get(base.oaIp, `/api/classify`, {}, false, false)

// 个人信息
export const getUserInfo = () => http.get(base.oaIp, `/api/user/info`, {}, false, false)
// 获取个人主页
export const getUserDetail = (uid) => http.get(base.oaIp, `/api/user/${uid}`, {}, false, false)
// 个人信息修改
export const postUserUpdate = (params) => http.postJson(base.oaIp, `/api/user/update`, params, true, false)
// 用户修改头像
export const postUserPhoto = (params) => http.postFile(base.oaIp, `/api/user/photo`, params, true, false)

// 用户点赞
export const postArticleLike = (aid, params) => http.postForm(base.oaIp, `/api/article/${aid}/like`, params, true, true)
// 发送验证码
export const postLoginVc = (params) => http.postForm(base.oaIp, `/api/login/vc`, params, false, true)
// 获取token
export const postToken = (params) => http.postForm(base.oaIp, `/api/token`, params, false, false)
// 登录
export const postLogin = (params) => http.postForm(base.oaIp, `/api/login/user`, params, true, true)

