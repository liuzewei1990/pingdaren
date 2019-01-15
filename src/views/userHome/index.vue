<template>
        <TabbarLayout v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">
                <div class="header bottom-1px">
                        <div class="head_img" @click="$router.push({name:'userSetting'})">
                                <img v-if="userInfo.photo" :src="APP.fileUrl + userInfo.photo" alt="">
                                <img v-else :src="require('@src/assets/img/default.jpg')" alt="">
                        </div>
                        <h4 class="name m-t-5">{{userInfo.nickname}}</h4>
                        <p class="uid m-t-5">ID:{{userInfo.id}}</p>
                        <p class="desc m-t-5">{{userInfo.autograph || "这货很懒什么也没写"}}</p>
                </div>
                <div class="count">
                        <ul>
                                <li>
                                        <a href="javascript:void(0);" @click="$router.push({name:'userCollection'})">
                                                <p>{{userInfo.like_nub || 0}}</p>
                                                <span>我的收藏</span>
                                        </a>
                                </li>
                                <li>
                                        <a href="javascript:void(0);" @click="$router.push({name:'userFollow'})">
                                                <p>{{userInfo.follow_nub || 0}}</p>
                                                <span>我的关注</span>
                                        </a>
                                </li>
                                <li>
                                        <a href="javascript:void(0);" @click="$router.push({name:'userFans'})">
                                                <p>{{userInfo.fans_nub || 0}}</p>
                                                <span>我的粉丝</span>
                                        </a>
                                </li>
                        </ul>
                </div>
                <div class="main m-t-10">
                        <ListItem v-for="(item,index) in list" :key="index" :item="item"></ListItem>
                        <div style="min-height:80px; overflow: hidden;">
                                <LoadMore v-if="status=='请求中'" tip="努力加载中..." :showLoading="true"></LoadMore>
                                <LoadMore v-if="status=='没有更多'" tip="到底了~" :showLoading="false"></LoadMore>
                                <LoadMore v-if="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="loadMore"></LoadMore>
                                <!-- <Nodata v-if="status=='暂无数据'" :imgurl="require('@src/assets/img/bg_empty_data.png')" content='暂无收藏记录'></Nodata> -->
                        </div>
                </div>
        </TabbarLayout>
</template>

<script>
import TabbarLayout from "@src/layouts/tabbar.vue"
import ListItem from "@src/components/v-listItem"
import LoadMore from "@src/components/v-load-more"
import { getUserInfo, getArticleList } from "@src/apis"
import { mapState, mapActions, mapGetters } from "vuex";
import infiniteScroll from '@src/directives/vue-infinite-scroll'
export default {
        components: { TabbarLayout, ListItem, LoadMore },
        directives: { infiniteScroll },
        data() {
                return {
                        status: "", // 加载状态
                        query: {
                                p: 0,
                                self: true
                        },
                        list: [],
                }
        },
        computed: {
                ...mapGetters(["isLogin"]),
                ...mapState({
                        userInfo: state => state.user.userInfo
                }),
                // 返回true禁用下拉加载
                infiniteDisabled() {
                        return this.status == '请求中' || this.status == '第一次加载' || this.status == '没有更多' || this.status == '暂无数据' || this.status == '请求失败';
                }
        },
        created() {
        },
        activated() {
                this.getUserInfo();
                this.query.p = 0;
                this.loadMore(true);
        },
        methods: {
                ...mapActions(["getUserInfo"]),

                // 请求函数
                async loadMore(isFrst = false) {
                        try {
                                this.status = isFrst ? "第一次加载" : "请求中";
                                let data = await getArticleList(this.query);
                                this.setData(data, isFrst);
                        } catch (error) {
                                this.status = "请求失败";
                        }
                },
                // 设置数据
                setData(data, isFrst = false) {
                        if (isFrst) {
                                this.list = data;
                        } else {
                                this.list = this.list.concat(data);
                        }
                        // 是否有更多数据
                        if (this.list.length === 0) {
                                this.status = "暂无数据";
                        } else if (data.length < 10) {
                                this.status = "没有更多";
                        } else {
                                this.status = "请求更多";
                                this.query.p++;
                        }
                }
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.header {
        background: #fff;
        text-align: center;
        overflow: hidden;
        padding: 20 / @rem;
        .head_img {
                width: 102 / @rem;
                height: 102 / @rem;
                border-radius: 50%;
                overflow: hidden;
                margin: 10 / @rem auto;
                img {
                        width: 100%;
                        height: 100%;
                }
        }

        .name {
                font-size: 18 / @rem;
                color: #333333;
                font-size: 400;
        }
        .uid {
                font-size: 16 / @rem;
                color: #797777;
        }
        .desc {
                font-size: 12 / @rem;
                color: #333333;
        }
}
.count {
        background: #fff;
        // padding: 0 10 / @rem;
        box-sizing: border-box;
        ul {
                display: flex;
                li {
                        flex: 1;
                        text-align: center;
                        // display: flex;
                        a {
                                padding: 10 / @rem;
                        }
                        p {
                                font-size: 18 / @rem;
                                font-size: 400;
                                color: #333333;
                        }
                        span {
                                font-size: 13 / @rem;
                                color: #333333;
                        }
                }
        }
}
</style>
