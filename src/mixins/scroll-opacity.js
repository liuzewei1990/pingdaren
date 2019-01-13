export default {
    data() {
        return {
            mixinsOpacity: 0,
        }
    },
    mounted() {
        window.onscroll = (params) => {
            this.mixinsOpacity = this._getScrollTop() / 200;
        }
    },
    methods: {
        _getScrollTop() {
            let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        }
    },
    destroyed() {
        window.onscroll = null;
    },
}