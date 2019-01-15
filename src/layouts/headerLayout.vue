<template>
        <div id="page">
                <LoadingPage v-if="showPageLoading"></LoadingPage>
                <slot v-else></slot>
        </div>
</template>

<script>

import LoadingPage from "@src/components/v-loading-page"
export default {
        components: { LoadingPage },
        props: {
                showPageLoading: {
                        type: Boolean,
                        default: false
                }
        }
}
</script>

<style lang="less" scoped>
#page {
        //header的高度
        padding-top: 47px;
}
</style>

