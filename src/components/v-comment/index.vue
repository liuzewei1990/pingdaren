<template>
        <div class="comment m-t-10">
                <div class="comment-title bottom-1px">评论</div>
                <div class="comment-item bottom-1px" v-for="(item,index) in comments" :key="index">
                        <div class="comment-item__user">
                                <div class="info">
                                        <img :src="require('@src/assets/img/default.jpg')" alt="">
                                        <span class="uid">用户ID:{{item.uid}}</span>
                                </div>
                                <div class="like">{{item.uptime | timeago}}</div>
                                <!-- <a href="javascript:void(0);" class="like">
                                        <img v-if="item.like" :src="require('@src/assets/img/favour.png')" alt="">
                                        <img v-else :src="require('@src/assets/img/favour-active.png')" alt="">
                                        <span> {{item.like_nub>1000?'1000+':item.like_nub}}</span>
                                </a> -->
                        </div>
                        <div class="comment-item__content">
                                你看今年春节开始拿出会计师的承诺尽快收到
                        </div>
                </div>
        </div>
</template>

<script>
export default {
        props: {
                comments: {
                        type: Array,
                        default: () => []
                }
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.comment {
        padding: 0 10 / @rem;
        background: #fff;
        .comment-title {
                color: #333333;
                font-size: 16 / @rem;
                line-height: 45 / @rem;
                padding: 0 10 / @rem;
        }

        .comment-item {
                padding: 20 / @rem 10 / @rem;
        }
        .comment-item__user {
                display: flex;
                align-items: center;
                .info {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        img {
                                width: 30 / @rem;
                                height: 30 / @rem;
                                border-radius: 50%;
                        }
                        .uid {
                                color: #333333;
                                font-size: 16 / @rem;
                                line-height: 40 / @rem;
                                margin-left: 6 / @rem;
                        }
                }
                .like {
                        // flex: 0.3;
                        display: flex;
                        align-items: center;
                        font-size: 12 / @rem;
                        color: #cfa972;
                        line-height: 1;
                        // padding: 10 / @rem;
                        width: 60 / @rem;
                        img {
                                width: 14 / @rem;
                                height: 14 / @rem;
                                margin-right: 6 / @rem;
                        }
                }
        }

        .comment-item__content {
                margin-top: 10 / @rem;
                color: #797777;
                font-size: 12 / @rem;
        }
}
</style>
