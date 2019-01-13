<!-- 404 500 错误页面 -->
<template>
  <div class='error-page'>
    <Xheader class="">系统提示
      <a slot="right" href="javascript:void(0);" @click="$router.push('/')">首页</a>
    </Xheader>
    <div class="icon">
      <span class="icon-tip"></span>
    </div>
    <div>
      <small>错误码：{{statusCode ? statusCode: "未知"}}</small>
      <p>错误详情：{{msg}}</p>
    </div>
    <a href="javascript:window.history.go(-1);" class="back-btn">返回重试</a>
  </div>
</template>

<script>

import Xheader from "@src/components/v-header"
export default {
  components: { Xheader },
  data() {
    return {
      statusCode: this.$route.query["statusCode"] || 404,
      msg: this.$route.query["msg"] || "页面未找到"
    }
  }
}
</script>
<style lang="less" scoped>
.error-page {
  text-align: center;
  .icon {
    margin: 50px auto;
    .icon-tip::before {
      font-size: 80px;
      color: #ccc;
    }
  }
  .back-btn {
    display: block !important;
    width: 6rem;
    height: 1.5rem;
    margin: 30px auto;
    font-size: 0.7rem;
    color: #fff !important;
    line-height: 1.5rem;
    text-align: center;
    border-radius: 0.15rem;
    background-color: #f23030;
  }
}
</style>
