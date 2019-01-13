
import router from '@src/router'
import store from "@src/vuex";

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach(function (to, from, next) {
        console.log(to.meta, from.meta)
        // if (to.meta.routerAnimation == 22 && from.meta.routerAnimation == 22) {
        //         next()
        // } else {

        const toIndex = history.getItem(to.path);
        const fromIndex = history.getItem(from.path);

        if (toIndex) {
                if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                        store.commit('UPDATE_DIRECTION', { direction: 'forward' })
                } else {
                        store.commit('UPDATE_DIRECTION', { direction: 'reverse' })
                }
        } else {
                ++historyCount;
                history.setItem('count', historyCount);
                to.path !== '/' && history.setItem(to.path, historyCount);
                store.commit('UPDATE_DIRECTION', { direction: 'forward' })
        }
        next()


        // }
});
