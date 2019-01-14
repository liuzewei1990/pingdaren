<template>
        <div class="create-page">
                <!-- <Header class="header-fixed">编辑帖子</Header> -->
                <div class="tags">
                        <span>#体验报告</span>
                        <span class="active">#吐槽</span>
                        <span>#攻略</span>
                </div>
                <div class="title-wrapper  bottom-1px">
                        <Textarea placeholder="加个标题呦~" fontSize="1rem" lineHeight="1.2rem" :fullHeight="true" maxlength="30" value=""></Textarea>
                </div>
                <div class="content-wrapper">
                        <Textarea placeholder="说点什么..." fontSize="0.8rem" lineHeight="1rem"></Textarea>
                </div>
                <div class="upload-wrapper top-1px bottom-1px">
                        <!-- 图片上传 -->
                        <ul class="upload clearfix">
                                <!-- 图片数组展示 -->
                                <li class="upload-view" v-for="(pic,index) in picUrls" :key="index">
                                        <img id="ssss" style="display:block;" :src="pic" width="100%" alt="">
                                </li>
                                <!-- input控件 -->
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <!-- <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li>
                                <li class="upload-view upload-control" v-if="picUrls.length < 3">
                                        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                                </li> -->

                        </ul>
                </div>
                <Button class="btn" :disabled="true" :show-loading="false">发布</Button>
        </div>
</template>

<script>
import Header from "@src/components/v-header"
import Textarea from "@src/components/v-textarea"
import Button from "@src/components/v-button"
export default {
        components: { Header, Textarea, Button },
        data() {
                return {
                        picUrls: [

                        ],
                }
        },
        mounted() {
        },
        methods: {
                change(event) {
                        console.log(event)
                },
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.create-page {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        padding: 20px 10 / @rem 0;
        box-sizing: border-box;
        flex-direction: column;
        background: #fff;
        overflow: hidden;
        display: flex;
        .tags {
                // padding: 10 / @rem;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch;
                span {
                        font-size: 18 / @rem;
                        display: inline-block;
                        padding: 10 / @rem;
                }
                .active {
                        color: #b7915d;
                }
        }

        .title-wrapper {
                font-weight: 600;
                height: 50 / @rem;
                padding: 10 / @rem 0;
        }

        .content-wrapper {
                padding: 10 / @rem 0;
                flex: 1;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
        }

        .upload-wrapper {
                padding: 10 / @rem 0;
                box-sizing: border-box;
                .upload {
                        height: 80 / @rem;
                        padding: 5 / @rem 0;
                        overflow-x: auto;
                        overflow-y: hidden;
                        white-space: nowrap;
                        -webkit-overflow-scrolling: touch;
                        .upload-view {
                                display: inline-block;
                                overflow: hidden;
                                width: 80 / @rem;
                                height: 80 / @rem;
                                margin: 0 4 / @rem;
                                // float: left;
                                input {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        opacity: 0;
                                }
                        }

                        .upload-control {
                                background: url("../../assets/img/upload.png")
                                        no-repeat;
                                background-size: 100%;
                        }
                }
        }

        .btn {
                margin: 30 / @rem 0;
                background: #b7915d;
                color: #fff;
                height: 50 / @rem;
        }
}
</style>
