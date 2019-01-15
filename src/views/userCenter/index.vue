<template>
        <TabbarLayout>
                <div class="header bottom-1px">
                        <div class="head_img">
                                <img :src="require('@src/assets/img/default.jpg')" alt="">
                        </div>
                        <h4 class="name m-t-5">我是大美女</h4>
                        <p class="uid m-t-5">ID:131131313</p>
                        <p class="desc m-t-5">签名签名</p>
                </div>
                <div class="count">
                        <ul>
                                <li>
                                        <p>0</p>
                                        <span>点赞</span>
                                </li>
                                <li>
                                        <p>0</p>
                                        <span>关注</span>
                                </li>
                                <li>
                                        <p>0</p>
                                        <span>粉丝</span>
                                </li>
                        </ul>
                </div>
                <div class="main m-t-10">
                        <ListItem v-for="(item,index) in list" :key="index" :item="item"></ListItem>
                </div>
        </TabbarLayout>
</template>

<script>
import TabbarLayout from "@src/layouts/tabbar.vue"
import ListItem from "@src/components/v-listItem"
export default {
        components: { TabbarLayout, ListItem },
        data() {
                return {
                        list: [
                                {
                                        admin_lock: false,
                                        classify_id: 1,
                                        classify_name: "体验",
                                        comment_nub: 0,
                                        comments: null,
                                        content: "11本贴为2015年第一季度（1.1-3.31）官方水楼刷经验专贴，禁止再其他贴刷经验，吧友发现他人在你的贴恶意刷贴，请及时举报，严格处理&nbsp;&nbsp;<h4><span>2015.1.1</span></h4>",
                                        created: "2019-01-09T14:13:11+08:00",
                                        hide: false,
                                        id: 43,
                                        images: [],
                                        images_info: [],
                                        like: false,
                                        like_nub: 0,
                                        name: "评_19058600",
                                        read_count: 0,
                                        title: "【中国好声音】15年第一季度☆官方专业刷贴水楼！！",
                                        uid: 19058600,
                                        updated: "2019-01-09T14:13:11+08:00"
                                }
                        ]
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
        padding: 10 / @rem;
        box-sizing: border-box;
        color: #333333;
        ul {
                display: flex;
                li {
                        flex: 1;
                        text-align: center;
                        p {
                                font-size: 18 / @rem;
                                font-size: 400;
                        }
                        span {
                                font-size: 13 / @rem;
                        }
                }
        }
}
</style>
