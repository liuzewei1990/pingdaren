<template>
        <div class="no-data-box">
                <div class="img-box">
                        <img :src="imgurl" alt="">
                </div>
                <p class="text-content">{{content}}</p>
                <slot></slot>
        </div>
</template>
<script>
export default {
        props: {
                content: String,
                imgurl: String,
                havebut: Boolean
        },
}
</script>
<style lang='less' scoped>
.no-data-box {
        //   position: absolute;
        text-align: center;
        //   top: 47px;
        //   bottom: 0;
        //   left: 0;
        //   right: 0;
        //   background: #fff;
        overflow: hidden;
        padding-bottom: 80px;
        .img-box {
                margin: 0 auto;
                width: 100px;
                margin-top: 50px;
                img {
                        width: 100%;
                }
        }
        .text-content {
                margin-top: 10px;
                margin-bottom: 20px;
        }
}
</style>