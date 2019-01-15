<template>
        <div>
                <Header title="个人资料">
                        <span slot="right" class="saveBtn" @click="submitUpdata">保存</span>
                </Header>
                <Cell :borderLine="true" :isLink="false" title="评大人ID" :desc="info.id"></Cell>
                <Cell :borderLine="true" :isLink="true" title="头像">
                        <div slot="desc" class="avatar-img m-r-10">
                                <img v-if="info.photo" :src="APP.fileUrl + info.photo" alt="">
                                <img v-else :src="require('@src/assets/img/default.jpg')" alt="">
                                <input type="file" ref="inputFile" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                        </div>
                </Cell>
                <Cell :borderLine="true" :isLink="true" title="昵称" :desc="info.nickname" @click.native="openNickNameEdit"></Cell>
                <Cell :borderLine="true" :isLink="true" title="生日" :desc="info.birthday || '未设置'" @click.native="$refs.DateTime.show()"></Cell>
                <Cell :borderLine="true" :isLink="true" title="性别" :desc="sexs[info.sex]" @click.native="showActionsheet = true"></Cell>
                <Cell :borderLine="true" :isLink="true" title="家乡" :desc="(info.province + info.city) || '未设置'" @click.native="$refs.CityPopup.open()"></Cell>
                <Cell :borderLine="true" :isLink="true" title="个人签名" :desc="info.autograph || '未设置'" @click.native="openEdit"></Cell>
                <Button class="signOut" @click.native="signOut">退出</Button>

                <!-- 编辑昵称 -->
                <Popup v-model="namePop" height="100%" style="background:#fff;" @on-show="ModalHelper.open" @on-hide="ModalHelper.close">
                        <PopupHeader title="修改昵称" leftText="取消" rightText="完成" @on-click-left="namePop = false" @on-click-right="saveNickName"></PopupHeader>
                        <Textarea class="post-area m-t-10 m-b-10" :border="true" v-model="nickName" placeholder="长度为10个字符" :autofocus="true" maxlength="10"></Textarea>
                </Popup>
                <!-- 编辑签名 -->
                <Popup v-model="qianPop" height="100%" style="background:#fff;" @on-show="ModalHelper.open" @on-hide="ModalHelper.close">
                        <PopupHeader title="编辑签名" leftText="取消" rightText="完成" @on-click-left="qianPop = false" @on-click-right="saveEdit"></PopupHeader>
                        <Textarea class="post-area m-t-10 m-b-10" :border="true" v-model="autograph" placeholder="说点什么...长度为30个字符" :autofocus="true" maxlength="30"></Textarea>
                </Popup>
                <!-- 地区选择 -->
                <CityPopup ref="CityPopup" :init-value="defaultCityVal" @confirm="cityConfirm" @on-show="ModalHelper.open" @on-hide="ModalHelper.close"></CityPopup>
                <!-- 性别选择 -->
                <Actionsheet theme="ios" :show-cancel="false" cancel-text="关闭" v-model="showActionsheet" :menus="sexs" @on-click-menu="clickMenu" @on-after-show="ModalHelper.open" @on-after-hide="ModalHelper.close"></Actionsheet>
                <!-- 生日选择 -->
                <DateTime ref="DateTime" type="date" :showTodayButton="false" :value="info.birthday || ''" color='#CFA972' @confirm="dateTimeSelect">
                        <i slot="prevMonth" class="date-arraw">-</i>
                        <i slot="nextMonth" class="date-arraw">+</i>
                </DateTime>
        </div>
</template>

<script>
import Cell from "@src/components/v-cell"
import Header from "@src/components/v-header"
import Popup from "@src/components/v-popup"
import Textarea from '@src/components/v-textarea'
import Button from '@src/components/v-button'
import PopupHeader from '@src/components/v-popup-header'
import CityPopup from '@src/components/v-city-popup'
import Actionsheet from "@src/components/v-actionsheet/actionsheet.vue";
import DateTime from "@src/components/v-date-time"
import format from '@src/utils/format.js'
import { mapState, mapActions, mapGetters } from "vuex";
import { postUserUpdate, postUserPhoto } from "@src/apis"
export default {
        components: { Cell, Header, Popup, Textarea, Button, PopupHeader, CityPopup, Actionsheet, DateTime },
        data() {
                return {
                        namePop: false,
                        qianPop: false,
                        showActionsheet: false,
                        defaultCityVal: [
                                // {
                                //         "code": "130000",
                                //         "name": "河北省",
                                // }, {
                                //         "code": "130800",
                                //         "name": "承德市",
                                // }, {
                                //         "code": "130825",
                                //         "name": "隆化县"
                                // }
                        ],
                        sexs: { "1": '男', "0": '女' },

                        // 用户信息
                        info: {},
                        nickName: "",
                        autograph: "",
                }
        },
        computed: {
                ...mapState({
                        userInfo: state => state.user.userInfo
                }),
        },
        created() {
                this.info = { ...this.userInfo }
        },
        methods: {
                ...mapActions(["userInfoUpdata", "fedLogOut"]),
                cityConfirm(v) {
                        if (v.length === 3) {
                                this.info.province = v[0].name + v[1].name;
                                this.info.city = v[2].name;
                        }
                },
                clickMenu(v) {
                        this.info.sex = v;
                },
                dateTimeSelect(val) {
                        this.info.birthday = format(new Date(val), "YYYY-MM-DD");
                },
                openNickNameEdit() {
                        this.namePop = true;
                        this.nickName = this.info.nickname;
                },
                saveNickName() {
                        this.namePop = false;
                        this.info.nickname = this.nickName;
                },
                openEdit() {
                        this.qianPop = true;
                        this.autograph = this.info.autograph;
                },
                saveEdit() {
                        this.qianPop = false;
                        this.info.autograph = this.autograph;
                },
                async change(e) {
                        let file = e.target.files[0];
                        let param = new FormData(); //创建form对象
                        param.append('uploadfile', file);//通过append向form对象添加数据
                        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                        let data = await postUserPhoto(param);
                        this.info.photo = data;
                        this.userInfoUpdata(this.info);
                },
                async submitUpdata() {
                        let params = {};
                        params["id"] = this.info.id;
                        params["nickname"] = this.info.nickname;
                        params["birthday"] = this.info.birthday;
                        params["sex"] = Number(this.info.sex);
                        params["province"] = this.info.province;
                        params["ccccc"] = this.info.aaaaaa;
                        params["city"] = this.info.city;
                        params["autograph"] = this.info.autograph;
                        params["phone"] = this.info.phone;
                        let data = await postUserUpdate(params);
                        this.userInfoUpdata(this.info);
                        this.Toast.success("修改成功");
                        setTimeout(() => {
                                this.$router.back();
                        }, 1000)
                },
                signOut() {
                        this.fedLogOut();
                }
        }
}
</script>

<style lang="less" scoped>
@rem: 20rem;
.avatar-img {
        // position: relative;
        margin-left: 15 / @rem;
        height: 58 / @rem;
        width: 58 / @rem;
        box-sizing: border-box;
        border-radius: 100%;
        overflow: hidden;
        border: 2 / @rem solid rgba(255, 255, 255, 0.4);
}
.saveBtn {
        padding: 10px;
}
.avatar-img img,
.avatar-img input {
        display: block;
        height: 54 / @rem;
        width: 54 / @rem;
}
.avatar-img input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
}
.signOut {
        width: 90% !important;
        margin: 20 / @rem auto;
        background: #cfa972 !important;
        color: #fff !important;
        border-radius: 500px !important;
        &::after {
                display: none;
        }
}
</style>
