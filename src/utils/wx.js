/**
* 检测是否微信环境 isWeiXin true | false
*/
export function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};

/**
 * 检测是微信还是支付宝环境
 */
export function isWeixinOrAlipay() {
    var ua = window.navigator.userAgent.toLowerCase();
    //判断是不是微信
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return "WeiXIN";
    }
    //判断是不是支付宝
    if (ua.match(/AlipayClient/i) == 'alipayclient') {
        return "Alipay";
    }
    return false;
}