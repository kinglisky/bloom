const UA = window.navigator.userAgent;

/**
 * @description 检查客服端是否为移动端
 */
export function isMobile() {
    return /Android|iPhone|webOS|BlackBerry|SymbianOS|Windows Phone|iPad|iPod/i.test(UA);
}

/**
 * @description 检查客服端是否为 IOS
 */
export function isIOS() {
    return !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @description  检查客服端是否为 android
 */
export function isAndroid() {
    return UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
}

/**
 * @description 排查掉一些特定浏览器
 * quark（夸克浏览器）
 */
export function isExclude(keys = ['quark']) {
    const ua = UA.toLowerCase();
    return keys.some(k => ua.indexOf(k) !== -1);
}

/**
 * @description 检查是否为微信 webview 环境
 */
export function isWeiXin() {
    return /MicroMessenger/i.test(UA);
}

/**
 * @description 检查是否为微信小程序 web-view 环境
 */
export function isWXMP() {
    return window.__wxjs_environment === 'miniprogram'
        || /miniProgram/i.test(UA);
}
