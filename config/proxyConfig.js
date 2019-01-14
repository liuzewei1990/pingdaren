module.exports = {
        proxy: {
                '/api': {
                        target: 'http://m.pingdaren.cn',
                        secure: false,
                        changeOrigin: true,
                        cookieDomainRewrite: {
                                '*': 'localhost'
                        },
                        // pathRewrite: {
                        //         '^/apis': ''   //需要rewrite的,
                        // }
                        // 把相应的 cookie 域都设置成 localhost，或者指定的域名

                }
        }
}