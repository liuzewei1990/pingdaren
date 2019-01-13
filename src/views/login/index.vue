<template>
        <div class="login-page">
                <div class="login-bg"></div>
                <h2>你好,</h2>
                <p>欢迎进入评大人</p>
                <div class="input-item bottom-1px m-t-30">
                        <input type="tel" ref="phone" v-model="phoneNo" name="phone" placeholder="请输入手机号" maxlength="11">
                </div>
                <div class="input-item bottom-1px m-t-20">
                        <input type="tel" v-model="code" name="code" placeholder="请输入短信验证码" maxlength="6">
                        <TimerBtn ref="TimerBtn" text="发送验证码" :time="60" :cb="sendCode"></TimerBtn>
                </div>
                <a href="javascript:void(0);" class="btn" @click="submitLogin">登录></a>
        </div>
</template>

<script>
import TimerBtn from "@src/components/v-timer-btn"
import { postLoginVc, postToken, postLogin } from "@src/apis"
import { getStorage, setStorage } from '@src/utils/storage.js'
import { mapState, mapActions, mapGetters } from "vuex";
import channel from '@src/utils/channel.js'
export default {
        components: { TimerBtn },
        data() {
                return {
                        phoneNo: "",
                        code: "",
                        redirect: this.$route.query["redirect"]
                }
        },
        methods: {

                ...mapActions(["userLoginByMobile"]),
                async sendCode() {
                        if (!this.phoneNo) {
                                this.$refs.phone.focus();
                                return;
                        }
                        if (!(/^[1][3456789][0-9]{9}$/).test(this.phoneNo)) {
                                this.Toast.fail("手机格式不对");
                                return false
                        }
                        // token key
                        setStorage("APP_TOKEN_KEY", this.phoneNo)

                        // 第一次获取token
                        const TOKEN = await postToken({ key: this.phoneNo });

                        let res = await postLoginVc({ phone: this.phoneNo, token: TOKEN });
                        if (res.status == true) {
                                this.$refs.TimerBtn.disabled = true;
                                this.$refs.TimerBtn.timer();
                                this.Toast.success("验证码发送成功");
                        } else {
                                this.Toast.fail(res.msg)
                        }
                },

                async submitLogin() {
                        if (!(/^[1][3456789][0-9]{9}$/).test(this.phoneNo)) {
                                this.Toast.fail("手机格式不对");
                                return false
                        }
                        if (!this.code) {
                                this.Toast.fail("请输入短信验证码");
                                return false
                        }

                        const TOKEN = await postToken({ key: this.phoneNo });

                        let res = await postLogin({ token: TOKEN, phone: this.phoneNo, code: this.code, referee: channel.get() });

                        if (res.status == true) {
                                window.location.href = decodeURIComponent(this.redirect);
                        } else {
                                this.Toast.fail(res.msg);
                        }
                }

        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.login-page {
        padding: 0 20 / @rem;

        h2 {
                margin-top: 70 / @rem;
                color: #111111;
                font-size: 36 / @rem;
                font-weight: 600;
        }

        p {
                margin-top: 25 / @rem;
                color: #a4a4a4;
                font-size: 24 / @rem;
        }

        .input-item {
                padding: 18 / @rem 0;
                display: flex;
                input {
                        font-size: 18 / @rem;
                }
        }

        .btn {
                margin-top: 37 / @rem;
                color: #9a9a9a;
                font-size: 24 / @rem;
                float: right;
                padding: 10 / @rem;
                box-sizing: border-box;
        }
}
.login-bg {
        position: fixed;
        left: 0;
        top: 0;
        background: #fff;
        width: 100%;
        height: 100%;
        z-index: -1;
}
</style>
