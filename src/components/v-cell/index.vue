<template>
        <div class='x-cell' :class="{'border-1px':borderLine,'top-line':topLine}">
                <slot name="icon"></slot>
                <div class='title'>{{title}}</div>
                <div class='desc' :class="{'mr-l':isLink}">{{desc}}</div>
                <slot name="desc"></slot>
                <img v-if="isLink" class='link-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAMAAAAootjDAAAAPFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlr8OySAAAAE3RSTlMABA2nfQeel5GKr4R1FLppzsxxRm9JNQAAAFhJREFUKM+l0UsOgDAIBFBa7Qdbv3P/u7pwByQ1heXLkBCGHHNzkFRQpYWKYlmSxjpHjKxyDUv8YbQ6rGPbpZ04xvSoxW5JVCdMSEPWksRTx0JGGddXo39eigoD2cYeb8gAAAAASUVORK5CYII=' alt="">
        </div>
</template>

<script>
export default {
        props: [
                "title",
                "desc",
                "isLink",
                "borderLine",
                "topLine",
                "to",
        ]
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.x-cell {
        position: relative;
        display: flex;
        background-color: #fff;
        padding: 12 / @rem 3%;
        box-sizing: border-box;
        overflow: hidden;
        align-items: center;
        font-size: 14 / @rem;

        .title {
                flex: 1.2;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                //   font-size: 16px;
        }

        .desc {
                //   font-size: 24px;
                color: #aaa;
                //   flex: 0.8;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: right;
                /* display: table-cell;  */
                /* line-height: 30rpx;  */
                /* vertical-align:middle; */
        }

        .link-icon {
                width: 10 / @rem;
                height: 17 / @rem;
                margin-left: 3 / @rem;
        }

        .mr-l {
                margin-right: 20 / @rem;
        }
}
.border-1px {
        &::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                border-bottom: 1px solid #e3e5e9;
                color: #e3e5e9;
                transform-origin: 0 100%;
                transform: scaleY(0.5);
        }
}

.top-line {
        &::before {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                height: 1px;
                border-top: 1px solid #e3e5e9;
                color: #e3e5e9;
                transform-origin: 0 0;
                transform: scaleY(0.5);
        }
}
</style>
