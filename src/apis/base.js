export default {
        NODE_ENV: process.env.NODE_ENV,
        oaIp: process.env.NODE_ENV == "development" ? "" : location.protocol + "//m.pingdaren.cn",
}
