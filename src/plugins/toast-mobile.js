import Vue from 'vue'
import Toast from '@src/components/v-toast'
Vue.prototype.Toast = {
        fail(msg) {
                Toast({
                        message: msg,
                        iconClass: "icon-tip"
                });
        },
        success(msg) {
                Toast({
                        message: msg,
                        iconClass: "icon-success_black"
                });
        }
};