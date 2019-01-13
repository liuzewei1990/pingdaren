// import { mapState, mapActions, mapGetters } from "vuex";
// ...mapState({ store: state => state.customerTamplate }),
// ...mapActions(["saveStore"]),
// ...mapGetters([name,age])

import { getProductDetailById, postCollect } from '@src/apis/product.js'
import { getCartGoodscount, postCart, postBuyGoods } from '@src/apis/cart.js'
import { picListTransformData } from '@src/utils/data-transform-utils.js'

const types = {
    PAGE_SHOW: "PAGE_SHOW",//数据是否请求成功
    INIT_DATA: "INIT_DATA",//初始化商品数据
    UPDATA_GOODSCOUNT: "UPDATA_GOODSCOUNT",//更新购物车数量
    SKU_STATUS: "SKU_STATUS",// 控制sku状态
    USERHASCOLLECT: "USERHASCOLLECT", // 设置商品收藏状态
    // CHANGE_TAB_VIEW: "CHANGE_TAB_VIEW" // 修改详情、评价、参数tab的view
}

export default {
    // 不使用严格模式,表单量太大，官方给出的解决方案会造成代码大量堆积
    // strict: process.env.NODE_ENV == "development",
    state: {
        //页面是否显示
        pageShow: false,
        // banner
        bannerList: [],
        // 商品参数数组
        attribute: [],
        // 商品信息
        info: {},

        // 规格列表
        productList: [],
        // 选中的规格 productList中的对象
        // productItem: {},

        // sku数据
        specificationList: [],
        // 常见问题
        issue: [],
        // 评价列表
        comment: {},
        // 购物车总数
        goodscount: 0,

        //sku是否打开
        skuStatus: false,
        //sku底部按钮类型  confirm | addCart | buyNow
        skuBtnType: "addCart",

        // 是否收藏
        userHasCollect: 0,

        //购买数量
        number: 1,

        // currentView: "ProductDetailContent",
        // tabs items
        tabItems: [
            {
                tabName: "图文详情",
                currentView: "ProductDetailContent"
            },
            {
                tabName: "商品参数",
                currentView: "ProductDetailAttribute"
            },
            {
                tabName: "用户评价",
                currentView: "ProductDetailComment"
            }
        ],

    },

    getters: {
        // productItem为当前选中的产品规格对象 对象中需要包含一个specifications成员
        // 处理逻辑：监控specificationList的变化 得到 specificationValue ["标准","黑色"] 字符串数组，然后拿该数组从productList数组中查找对应的规格。因为只有字符串数组才是唯一查找的标识。
        productItem: (state) => {
            //注：这里的checked成员是在sku数据渲染时隐性加入的 代表当前选中的对象 监控v-model变化 checked 会发生改变
            let specificationValue = []; // ["标准","黑色"]
            state.specificationList.forEach(item => {
                if (item.checked) specificationValue.push(item.checked.value)
            });
            let productItem = state.productList.find(item => item.specifications.join(" ") == specificationValue.join(" "));
            return productItem || {};
        }
    },

    mutations: {
        [types.INIT_DATA](state, data) {
            state.info = data.info;
            state.issue = data.issue;
            state.attribute = data.attribute;
            data.comment.data = picListTransformData(data.comment.data);
            state.comment = data.comment;
            state.userHasCollect = data.userHasCollect;

            //设置默认 注意：请在赋值state之前初始化数据 否则无法监控到数据变化
            for (var i = 0; i < data.specificationList.length; i++) data.specificationList[i]["checked"] = data.specificationList[i].valueList[0];
            // debugger
            state.specificationList = data.specificationList;
            state.productList = data.productList;

            //产品图片 需要对接口数据进行转换
            state.bannerList = state.info.gallery.map(item => { return { img: item } });

            //初始化购买数量
            state.number = 1;
        },

        [types.UPDATA_GOODSCOUNT](state, goodscount) {
            state.goodscount = goodscount;
        },

        [types.SKU_STATUS](state, skuStatus) {
            if (state.pageShow) {
                state.skuStatus = Boolean(skuStatus.open);
                state.skuBtnType = skuStatus.skuBtnType;
            }
        },

        [types.USERHASCOLLECT](state, userHasCollect) {
            state.userHasCollect = userHasCollect;
        },

        [types.PAGE_SHOW](state, pageShow) {
            state.pageShow = pageShow;
        },

        // [types.CHANGE_TAB_VIEW](state, currentView) {
        //     state.currentView = currentView;
        // },
    },

    actions: {
        // 初始化获取数据
        async getProductDetailById({ commit, state }, id) {
            commit(types.PAGE_SHOW, false);

            // 如果id相同不请求接口
            if (id != state.info.id) {
                // commit(types.USERHASCOLLECT, 0);
                let data = await getProductDetailById({ id: id });
                commit(types.INIT_DATA, data);
            }
            commit(types.PAGE_SHOW, true);
        },

        // 更新购物车数量
        async getCartGoodscount({ commit, getters }, id) {
            if (getters.isLogin) {
                let goodscount = await getCartGoodscount();
                commit(types.UPDATA_GOODSCOUNT, goodscount || 0);
            }
        },

        // 获取已选规格 调用者需要判断是否获取成功
        getSpecifications({ commit, state, getters }) {
            // 这里判断是 如果productList.specifications 数组拼接字符串后 和 skuStr相等的话 返回这一项
            // let product = state.productList.find(item => item.specifications.join(" ") == getters.skuStr);
            return getters.productItem;
        },

        //立即购买 
        async buyNow({ commit, dispatch, state }) {
            return new Promise(async (resolve, reject) => {
                //获取规格
                let product = await dispatch("getSpecifications");
                if (product) {
                    let data = await postBuyGoods({ goodsId: state.info.id, number: state.number, productId: product.id });
                    // 关闭sku
                    commit(types.SKU_STATUS, {
                        open: false,
                        skuBtnType: "confirm"
                    });
                    // 返回请求结果
                    if (data.errno == 0) {
                        resolve(data.data);// 这里的data是cartId
                    } else {
                        reject(data.errmsg);
                    }
                } else {
                    commit(types.SKU_STATUS, {
                        open: true,
                        skuBtnType: "buyNow"
                    });
                    reject("请选择完整规格");
                }
            })
        },

        // 加入购物车
        async addCart({ commit, state, getters, dispatch }) {
            //获取规格
            let product = await dispatch("getSpecifications");
            if (product) {
                return dispatch("postCart", product.id);
            } else {
                commit(types.SKU_STATUS, {
                    open: true,
                    skuBtnType: "confirm"
                });
                return Promise.reject("请选择完整规格");
            }
        },

        // 发起购物车请求
        async postCart({ commit, state }, productId) {
            return new Promise(async (resolve, reject) => {
                let data = await postCart({ goodsId: state.info.id, number: state.number, productId: productId });
                // 关闭sku
                commit(types.SKU_STATUS, {
                    open: false,
                    skuBtnType: "confirm"
                });

                // 返回请求结果
                if (data.errno == 0) {
                    // 更新购物车数量
                    commit(types.UPDATA_GOODSCOUNT, data.data || 0);
                    resolve();
                } else {
                    reject(data.errmsg);
                }
            })
        },

        // 打开sku
        isOpenSkuModule({ commit }, skuStatus, ) {
            commit(types.SKU_STATUS, {
                open: skuStatus.open || false,
                skuBtnType: skuStatus.skuBtnType || "addCart"
            });
        },

        // 收藏商品
        async postCollectByGoods({ commit, state }) {
            let data = await postCollect({ type: 0, valueId: state.info.id });
            if (data.type == "add")
                // 收藏成功
                commit(types.USERHASCOLLECT, 1);
            else if (data.type == "delete")
                // 取消成功
                commit(types.USERHASCOLLECT, 0);
        }

    },
}
