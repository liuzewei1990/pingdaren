<template>
        <div id="page" class="tabbar-layout">
                <!-- <LoadingPage v-if="showPageLoading"></LoadingPage> -->
                <!-- <slot v-else></slot> -->
                <slot></slot>
                <div class="tabbar top-1px">
                        <div class="tab-item" :class="{'active':$route.name == 'home'}" @click="$router.replace({name:'home'})">HOME</div>
                        <div class="tab-item jia" @click="$router.push({name:'create'})">
                                <img :src="require('@src/assets/img/add.png')" alt="">
                        </div>
                        <div class="tab-item" :class="{'active':$route.name == 'userHome'}" @click="$router.replace({name:'userHome'})">ME</div>
                </div>
        </div>
</template>

<script>
// import LoadingPage from "@src/components/base/loadingPage"
import { mapState, mapActions, mapGetters } from "vuex";
export default {
        props: {
                showPageLoading: {
                        type: Boolean,
                        default: false
                }
        },
        computed: {
                ...mapState({
                        goodscount: state => state.productDetail.goodscount
                }),
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.tabbar-layout {
        padding-bottom: 58 / @rem;
        .active-fill-color {
                fill: #f23030;
        }
}
.tabbar {
        height: 58 / @rem;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #fff;
        display: flex;
        font-size: 18 / @rem;
        font-weight: 500;
        .tab-item {
                flex: 1;
                text-align: center;
                line-height: 58 / @rem;
        }
        .active {
                color: #d1ac77;
        }
        .jia {
                width: 60 / @rem;
                flex: inherit;
                display: flex;
                align-items: center;
                img {
                        display: block;
                        width: 40 / @rem;
                        margin: 0 auto;
                }
        }
}
</style>
