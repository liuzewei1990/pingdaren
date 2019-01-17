import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ErrorPage from "@src/layouts/error.vue"

export default new Router({
        mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),

        routes: [
                {
                        name: 'home',
                        path: '/',
                        // component: require('@src/views/home/index.vue').default,
                        component: () => import(/* webpackChunkName: "home" */ '@src/views/home/index.vue'),
                        meta: { title: '首页', keepAlive: true }
                },
                {
                        name: 'article',
                        path: '/article/:id',
                        component: () => import(/* webpackChunkName: "article" */ '@src/views/article/index.vue'),
                        meta: { title: '帖子详情' }
                },
                {
                        name: 'create',
                        path: '/create',
                        component: () => import(/* webpackChunkName: "create" */ '@src/views/create/index.vue'),
                        meta: { title: '发布帖子', requiresAuth: true }
                },
                {
                        name: 'message',
                        path: '/message',
                        component: () => import(/* webpackChunkName: "message" */ '@src/views/message/index.vue'),
                        meta: { title: '消息中心', requiresAuth: true }
                },
                {
                        name: 'personalCenter',
                        path: '/personalCenter',
                        component: () => import(/* webpackChunkName: "personalCenter" */ '@src/views/personalCenter/index.vue'),
                        meta: { title: '个人主页' }
                },
                {
                        name: 'setting',
                        path: '/setting',
                        component: () => import(/* webpackChunkName: "setting" */ '@src/views/setting/index.vue'),
                        meta: { title: '个人资料', requiresAuth: true }
                },
                {
                        name: 'user',
                        path: '/user',
                        component: () => import(/* webpackChunkName: "user" */ '@src/views/user/index.vue'),
                        meta: { title: '个人中心', keepAlive: true, requiresAuth: true }
                },
                {
                        name: 'login',
                        path: '/login',
                        component: () => import(/* webpackChunkName: "login" */ '@src/views/login/index.vue'),
                        meta: { title: '用户登录' }
                },
                {
                        name: 'test',
                        path: '/test',
                        component: () => import(/* webpackChunkName: "test" */ '@src/views/test.vue'),
                        meta: { title: '测试页面' }
                },
                {
                        name: 'error',
                        path: '/error',
                        component: ErrorPage,
                        meta: { title: '错误' }
                },
                {
                        path: '*',
                        redirect: "/error",
                        meta: { title: '404' }
                },
        ]
})
