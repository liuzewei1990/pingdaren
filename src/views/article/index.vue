<template>
        <div class="article-page">
                <div class="detail">
                        <div class="user">
                                <img :src="require('@src/assets/img/default.jpg')" alt="">
                                <span class="uid">{{detail.uid}}</span>
                        </div>
                        <div class="date m-t-10">
                                <span class="tag">发帖时间：{{detail.updated | timeago}}</span>
                        </div>
                        <div class="tags m-t-10">
                                <span class="tag">#{{detail.classify_name || 'null'}}</span>
                        </div>
                        <div class="title m-t-10">
                                <h4>{{detail.title}}</h4>
                        </div>
                        <div class="content m-t-10" v-html="detail.content">
                                <!-- {{detail.content}} -->
                        </div>
                        <div class="count">
                                <div class="count-item">
                                        <a href="javascript:void(0);" @click="postArticleLike">
                                                <img v-if="detail.like" :src="require('@src/assets/img/heart.png')" alt="">
                                                <img v-else :src="require('@src/assets/img/heart_no.png')" alt="">
                                        </a>
                                        <span> {{detail.like_nub}}</span>
                                </div>
                                <div class="count-item ping">
                                        <img :src="require('@src/assets/img/pinglun-2.png')" alt="">
                                        <span>{{detail.comment_nub}}</span>
                                </div>
                        </div>
                </div>
                <Comment :comments="detail.comments"></Comment>
                <NoData v-if="detail.comments && detail.comments.length == 0" content="还没有人评论，快来抢沙发吧！" :imgurl="require('@src/assets/img/bg_empty_data.png')" style="background: #fff;">
                        <Button v-if="!isLogin" mini recta @click.native="$router.push({name:'login'})">登录后评论</Button>
                </NoData>
                <div class="comment-fix top-1px" v-if="isLogin">
                        <input class="comment-input" placeholder="善意的发言会带来善意的回应" value="">
                        <Button mini recta type="primary" @click.native="commentSubmit">发表</Button>
                </div>
        </div>
</template>

<script>
import { getArticleDetail, getClassifyList, getUserDetail, postArticleLike, postToken } from "@src/apis"
import Comment from "@src/components/v-comment"
import Button from "@src/components/v-button"
import NoData from "@src/components/v-no-data"
import { mapState, mapActions, mapGetters } from "vuex";
export default {
        components: { Comment, NoData, Button },
        data() {
                return {
                        detail: {},
                        classifyList: {},
                        userInfo: {},
                        aid: this.$route.params["id"]
                }
        },
        computed: {
                ...mapGetters(["isLogin"])
        },
        async beforeRouteEnter(to, from, next) {
                let data = await getArticleDetail(to.params["id"]);
                next(vm => {
                        vm.detail = data;
                })
        },
        created() {
        },
        methods: {
                async getArticleDetail() {
                        this.detail = await getArticleDetail(this.aid);
                        // this.classifyList = await getClassifyList();
                        // this.userInfo = await getUserDetail(this.aid);
                },

                // 用户点赞
                async postArticleLike() {
                        let newLike = !this.detail.like;
                        await postToken();
                        let res = await postArticleLike(this.aid, { like: newLike });
                        if (res.status == true) {
                                this.detail.like = newLike;
                                this.detail.like_nub++;
                        } else {
                                this.Toast.fail(res.msg)
                        }
                },

                // 评价提交
                commentSubmit() {

                },
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.detail {
        padding: 22 / @rem;
        background: #fff;
        .user {
                img {
                        width: 60 / @rem;
                        height: 60 / @rem;
                        border-radius: 50%;
                }
                .uid {
                        color: #333333;
                        font-size: 16 / @rem;
                        line-height: 40 / @rem;
                }
        }
        .tags {
                .tag {
                        color: #b7915d;
                        font-size: 18 / @rem;
                }
        }

        .title {
                h4 {
                        color: #333333;
                        font-size: 20 / @rem;
                        font-weight: 500;
                        line-height: 24 / @rem;
                }
        }
        .content {
                line-height: 22 / @rem;
                font-size: 16 / @rem;
                color: #797777;
                letter-spacing: 0.6px;
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
                                width: 24 / @rem;
                                height: 24 / @rem;
                        }
                        span {
                                margin-left: 6 / @rem;
                        }
                }
                .ping {
                        color: #bfbfbf;
                }
        }
}
.comment-fix {
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background: white;
        display: flex;
        align-items: center;
        padding: 10px 20 / @rem;
        input {
                flex: 1;
                padding-left: 1rem;
                height: 30px;
                display: block;
                background: rgb(241, 240, 247);
                border-radius: 19px;
                margin-right: 10 / @rem;
                font-size: 12px;
        }
}
</style>
