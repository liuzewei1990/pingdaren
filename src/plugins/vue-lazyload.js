import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import '@src/assets/less/lazyload.less'
Vue.use(VueLazyload, {
    // error: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    error: 'data:image/png;base64,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',
    loading: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    // loading: require("@src/assets/img/logo-loading.png"),
    // try: 2 // 加载图片数量T
})