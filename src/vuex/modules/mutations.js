
const types = {
        UPDATE_DIRECTION: "UPDATE_DIRECTION",//设置home数据
}

export default {
        state: {
                direction: 'forward'
        },
        getters: {

        },
        mutations: {
                [types.UPDATE_DIRECTION](state, payload) {
                        state.direction = payload.direction
                },
        },
        actions: {

        },
}