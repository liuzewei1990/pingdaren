<template>
        <div id="main">
                <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                        <keep-alive>
                                <router-view class="router-view"></router-view>
                        </keep-alive>
                </transition> -->
                <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
        name: 'app',
        data() {
                return {
                        showFooter: false
                }
        },
        computed: {
                ...mapState({
                        direction: state => state.mutations.direction
                })
        },
}
</script>


<style lang="less">
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
        will-change: transform;
        transition: all 250ms;
        height: 100%;
        top: 0;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
}

.vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
}

body.modal-open {
        position: fixed;
        width: 100%;
}
</style>
