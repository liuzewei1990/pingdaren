
const types = {
    SET_DATA: "SET_DATA",//设置home数据
}

export default {
    state: {
        // 首页分类
        gridList: [],
        // 首页banner
        banner: [],
        //品牌制造商直供
        brandList: [],
        // 分类商品
        floorGoodsList: [],
        // 人气推荐
        hotGoodsList: [],
        //新品首发
        newGoodsList: [],
    },
    getters: {

    },
    mutations: {
        [types.SET_DATA](state, data) {
            state.banner = data.banner.map((item) => {
                return { url: item.link, img: item.url, title: item.name }
            });
            state.gridList = data.channel;
            state.brandList = data.brandList;
            state.floorGoodsList = data.floorGoodsList;
            state.hotGoodsList = data.hotGoodsList;
            state.newGoodsList = data.newGoodsList;
        },
    },

    actions: {
        // 获取首页数据
        async setHomeData({ commit }, data) {
            commit(types.SET_DATA, data || {});
        },
    },
}
