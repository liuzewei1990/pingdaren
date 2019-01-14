export default {
        NODE_ENV: process.env.NODE_ENV,
        oaIp: process.env.NODE_ENV == "development" ? "" : location.protocol + "//m.pingdaren.cn",
        fileUrl: process.env.NODE_ENV == "development" ? location.protocol + "//m.pingdaren.cn" : location.protocol + "//m.pingdaren.cn",
}
