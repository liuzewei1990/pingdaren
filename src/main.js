// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import config from './config.js'
import filters from './filters'
Vue.use(filters)

import "@src/assets/less/reset.less"
import "@src/assets/less/common.less"
import "@src/assets/icomoon/style.css"
import "@src/plugins/rem.js"
import "@src/plugins/vue-svg-icon.js"
import "@src/plugins/fastclick.js"
import "@src/plugins/toast-mobile.js"
import "@src/plugins/vue-lazyload.js"
import "@src/plugins/vue-alert-view.js"
import "@src/middleware/routerController.js"
// import "@src/middleware/routerAnimation.js"

Vue.prototype.APP = config
Vue.prototype.ModalHelper = (function (bodyCls) {
        var scrollTop;
        return {
                open: function () {
                        scrollTop = document.scrollingElement.scrollTop;
                        document.body.classList.add(bodyCls);
                        document.body.style.top = -scrollTop + 'px';
                },
                close: function () {
                        document.body.classList.remove(bodyCls);
                        // scrollTop lost after set position:fixed, restore it back.
                        document.scrollingElement.scrollTop = scrollTop;
                }
        };
})('modal-open');


Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
// })

let app = new Vue({
        router,
        store,
        components: { App },
        template: '<App/>'
})

window.mountApp = () => {
        app.$mount('#app')
}
if (process.env.NODE_ENV === 'production') {
        window.onload = function () {
                window.mountApp()
        }
} else {
        window.mountApp()
}