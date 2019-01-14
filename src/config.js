import { isWeixin } from '@src/utils/wx.js'
import base from "@src/apis/base.js"
export default {
        winH: window.innerHeight,
        winW: window.innerWidth,
        isWeixin: isWeixin(),
        fileUrl: base.fileUrl
}