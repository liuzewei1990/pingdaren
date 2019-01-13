<template>
        <!-- <div class="v-goods"> -->
        <a href="javascript::void(0);" class="v-goods" @click="$router.push({name:'article',params:{id:item.id}})">
                <div class="tags">
                        <Button class="tag" recta mini plain>{{item.classify_name}}</Button>
                        <span style="float:right;">{{item.created | timeago}}</span>
                </div>
                <div class="goods-header" v-if="item.images_info[0] ">
                        <div class="goods-img">
                                <img :src="item.images_info[0] && base.oaIp + item.images_info[0].path" />
                        </div>
                </div>
                <div class="content">
                        <div class="title">{{item.title}}</div>
                        <span class="brief" :class="{'lineclamp':!!item.images_info[0]}">{{item.content}}</span>
                </div>
                <div class="count">
                        <div class="count-item">
                                <img :src="require('@src/assets/img/heart.png')" alt="">
                                <span> {{item.like_nub}}</span>
                        </div>
                        <div class="count-item ping">
                                <img :src="require('@src/assets/img/pinglun-2.png')" alt="">
                                <span>{{item.comment_nub}}</span>
                        </div>
                </div>
        </a>
        <!-- </div> -->
</template>

<script>
import base from "@src/apis/base.js"
import Button from "@src/components/v-button"
export default {
        components: { Button },
        props: {
                item: Object
        },
        data() {
                return {
                        base: base
                }
        },
        methods: {
                toUrl() {
                        this.disabled || this.$router.push({ path: `/product/${this.item.id}` })
                }
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.v-goods {
        padding: 15 / @rem 20 / @rem;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
}

.tags {
        .tag {
                padding: 0 20 / @rem;
                line-height: 24 / @rem;
                font-size: 14 / @rem;
                border-radius: 2px;
                color: #d1ac77;
                border: 1px solid #d1ac77;
                &:not(.weui-btn_plain-disabled):active {
                        color: #d1ac77;
                        border-color: #d1ac77;
                        background-color: transparent;
                }
                &:after {
                        border-width: 0;
                }
        }
}

.goods-header {
        position: relative;

        .goods-img {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 179 / @rem;
                img[lazy="loading"] {
                        background-color: #f1f4f3;
                        width: 100% !important;
                }
                img[lazy="error"] {
                        width: 100px !important;
                }
                img {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                        width: auto;
                        height: auto;
                        max-height: 100%;
                        max-width: 100%;
                }
        }
}

.v-goods .content {
        .title {
                word-break: break-word;
                white-space: pre-line; //合并空白符序列，但是保留换行符。
                text-align: left;
                //     height: 31px;
                margin-top: 10 / @rem;
                box-sizing: border-box;
                font-size: 18 / @rem;
                font-weight: 500;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                display: -webkit-box;
                // 留着以下注释，否则wenpack打包不上
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
        }

        .brief {
                color: #9f9f9f;
                margin-top: 10 / @rem;
                text-align: left;
                display: flex;
                font-size: 14 / @rem;
                line-height: 20 / @rem;
                letter-spacing: 0.6px;
                word-break: break-word;
                white-space: pre-line; //合并空白符序列，但是保留换行符。
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                display: -webkit-box;
                // 留着以下注释，否则wenpack打包不上
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 3;
        }
        .lineclamp {
                -webkit-line-clamp: 1 !important;
        }
}

.count {
        display: flex;
        margin-top: 15 / @rem;
        .count-item {
                display: flex;
                align-items: center;
                font-size: 18 / @rem;
                color: #cfa972;
                margin-left: 20 / @rem;
                flex: 1;
                line-height: 1;

                img {
                        width: 18 / @rem;
                        height: 18 / @rem;
                        margin-right: 6 / @rem;
                }
        }
        .ping {
                color: #bfbfbf;
        }
}
</style>
