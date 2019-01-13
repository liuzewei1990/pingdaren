<template>
        <div>
                <Header>个人资料</Header>
                <Cell :borderLine="true" :isLink="false" title="评大人号" :desc="2341242342"></Cell>
                <Cell :borderLine="true" :isLink="true" title="头像">
                        <div slot="desc" class="avatar-img m-r-10">
                                <img :src="require('@src/assets/img/default.jpg')" alt="">
                                <input type="file" ref="inputFile" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
                        </div>
                </Cell>
                <Cell :borderLine="true" :isLink="true" title="昵称" desc="冰河" @click.native="namePop = true"></Cell>
                <Cell :borderLine="true" :isLink="true" title="生日" desc="2019-1-1" @click.native="$refs.DateTime.show()"></Cell>
                <Cell :borderLine="true" :isLink="true" title="性别" desc="男" @click.native="showActionsheet = true"></Cell>
                <Cell :borderLine="true" :isLink="true" title="家乡" desc="请选择" @click.native="$refs.CityPopup.open()"></Cell>
                <Cell :borderLine="true" :isLink="true" title="个人签名" desc="请输入" @click.native="qianPop = true"></Cell>

                <!-- 编辑昵称 -->
                <Popup v-model="namePop" height="100%" style="background:#fff;" @on-show="ModalHelper.open" @on-hide="ModalHelper.close">
                        <PopupHeader title="编辑昵称" leftText="取消" rightText="完成" @on-click-left="namePop = false" @on-click-right="namePop = false"></PopupHeader>
                        <Textarea class="post-area m-t-10 m-b-10" :border="true" placeholder="长度为10个字符" :autofocus="true" maxlength="10"></Textarea>
                </Popup>
                <!-- 编辑签名 -->
                <Popup v-model="qianPop" height="100%" style="background:#fff;" @on-show="ModalHelper.open" @on-hide="ModalHelper.close">
                        <PopupHeader title="编辑签名" leftText="取消" rightText="完成" @on-click-left="qianPop = false" @on-click-right="qianPop = false"></PopupHeader>
                        <Textarea class="post-area m-t-10 m-b-10" :border="true" placeholder="说点什么...长度为30个字符" :autofocus="true" maxlength="30"></Textarea>
                </Popup>
                <!-- 地区选择 -->
                <CityPopup ref="CityPopup" :init-value="defaultCityVal" @confirm="cityConfirm" @on-show="ModalHelper.open" @on-hide="ModalHelper.close"></CityPopup>
                <!-- 性别选择 -->
                <Actionsheet theme="ios" :show-cancel="false" cancel-text="关闭" v-model="showActionsheet" :menus="menus" @on-click-menu="clickMenu" @on-after-show="ModalHelper.open" @on-after-hide="ModalHelper.close"></Actionsheet>
                <!-- 生日选择 -->
                <DateTime ref="DateTime" type="date" :showTodayButton="false" value="1990-5-8" color='#CFA972' @confirm="dateTimeSelect">
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
import PopupHeader from '@src/components/v-popup-header'
import CityPopup from '@src/components/v-city-popup'
import Actionsheet from "@src/components/v-actionsheet/actionsheet.vue";
import DateTime from 'vue-date-time-m';
export default {
        components: { Cell, Header, Popup, Textarea, PopupHeader, CityPopup, Actionsheet, DateTime },
        data() {
                return {
                        namePop: false,
                        qianPop: false,
                        showActionsheet: false,
                        defaultCityVal: [],
                        menus: {
                                "1": '男',
                                "2": '女'
                        },
                }
        },
        methods: {
                cityConfirm(v) { },
                clickMenu(v) {
                        console.log(v)
                },
                dateTimeSelect(val) {
                        console.log(val);
                },
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
</style>
