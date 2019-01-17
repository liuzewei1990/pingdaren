<template>
        <headerLayout v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">
                <Header class="header-fixed" :title="$route.meta.title"></Header>
                <ListItem v-for="(item,index) in list" :key="index" :item="item"></ListItem>
                <div style="min-height:80px; overflow: hidden;">
                        <LoadMore v-if="status=='请求中'" tip="努力加载中..." :showLoading="true"></LoadMore>
                        <LoadMore v-if="status=='没有更多'" tip="没有更多了" :showLoading="false"></LoadMore>
                        <LoadMore v-if="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="loadMore"></LoadMore>
                        <!-- <Nodata v-if="status=='暂无数据'" :imgurl="require('@src/assets/img/bg_empty_data.png')" content='暂无收藏记录'></Nodata> -->
                </div>
        </headerLayout>
</template>

<script>
import headerLayout from "@src/layouts/headerLayout.vue"
import Header from "@src/components/v-header"
import LoadMore from "@src/components/v-load-more"
import ListItem from "@src/components/v-listItem"
import infiniteScroll from '@src/directives/vue-infinite-scroll'
import { getArticleList } from "@src/apis"
export default {
        components: { headerLayout, Header, ListItem, LoadMore },
        directives: { infiniteScroll },
        data() {
                return {
                        status: "", // 加载状态
                        query: {
                                p: 0,
                                self: true,
                                dataype: "like"
                        },
                        list: [],
                }
        },
        computed: {
                // 返回true禁用下拉加载
                infiniteDisabled() {
                        return this.status == '请求中' || this.status == '第一次加载' || this.status == '没有更多' || this.status == '暂无数据' || this.status == '请求失败';
                }
        },
        created() {
                this.loadMore(true)
        },
        methods: {
                // 请求函数
                async loadMore(isFrst = false) {
                        try {
                                this.status = isFrst ? "第一次加载" : "请求中";
                                let data = await getArticleList(this.query);
                                this.setData(data);
                        } catch (error) {
                                this.status = "请求失败";
                        }
                },
                // 设置数据
                setData(data) {
                        this.list = this.list.concat(data);
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

<style>
</style>
