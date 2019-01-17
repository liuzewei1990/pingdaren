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
                        name: 'userFans',
                        path: '/userFans',
                        component: () => import(/* webpackChunkName: "userFans" */ '@src/views/userFans/index.vue'),
                        meta: { title: '我的粉丝', requiresAuth: true }
                },
                {
                        name: 'userCenter',
                        path: '/userCenter',
                        component: () => import(/* webpackChunkName: "userCenter" */ '@src/views/userCenter/index.vue'),
                        meta: { title: '个人主页' }
                },
                {
                        name: 'userSetting',
                        path: '/userSetting',
                        component: () => import(/* webpackChunkName: "userSetting" */ '@src/views/userSetting/index.vue'),
                        meta: { title: '个人资料', requiresAuth: true }
                },
                {
                        name: 'userHome',
                        path: '/userHome',
                        component: () => import(/* webpackChunkName: "userHome" */ '@src/views/userHome/index.vue'),
                        meta: { title: '个人中心', keepAlive: true, requiresAuth: true }
                },
                {
                        name: 'userFollow',
                        path: '/userFollow',
                        component: () => import(/* webpackChunkName: "userFollow" */ '@src/views/userFollow/index.vue'),
                        meta: { title: '我的关注', requiresAuth: true }
                },
                {
                        name: 'userCollection',
                        path: '/userCollection',
                        component: () => import(/* webpackChunkName: "userCollection" */ '@src/views/userCollection/index.vue'),
                        meta: { title: '我的收藏', requiresAuth: true }
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
