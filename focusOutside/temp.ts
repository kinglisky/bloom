function createFouceOutside(target, callback) {
    target.setAttribute('tabIndex', '-1');

    let blurTimer = null;
    // 弹窗聚焦，取消关闭弹窗
    function onTargetFocus() {
        clearTimeout(blurTimer);
    }
    // 弹窗失焦，关闭弹窗
    function onTargetBlur() {
        blurTimer = setTimeout(() => callback());
    }
    // 窗口失焦，判断是否需要取消关闭弹窗
    function onWindowBlur() {
        if (target.contains(document.activeElement)) {
            onTargetFocus();
        }
    }
    // 窗口聚焦，判断是否需要关闭弹窗
    function onWindowFocus() {
        if (!target.contains(document.activeElement)) {
            onTargetBlur();
        }
    }
    target.addEventListener('focus', onTargetFocus, true);
    target.addEventListener('blur', onTargetBlur, true);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);
    // 弹窗打开时自动获取焦点
    setTimeout(() => {
        target.focus();
    });
    // 返回一个销毁事件函数
    return () => {
        clearTimeout(blurTimer);
        target.removeAttribute('tabIndex');
        target.removeEventListener('focus', onTargetFocus, true);
        target.removeEventListener('blur', onTargetBlur, true);
        window.removeEventListener('blur', onWindowBlur);
        window.removeEventListener('focus', onWindowFocus);
    };
}
