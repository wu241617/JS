//节流throttle代码：
function throttle(fn,delay) {
    let canRun = true; // 通过闭包保存一个标记；当前没有延迟调用函数未执行
    return function () {
        // 在函数开头判断标记是否为true，不为true（当前有延迟调用函数未执行）则return
        if (!canRun) return;
        // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => { 
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
        // 当定时器没有执行的时候标记永远是false，在开头被return掉
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
}
 
function sayHi(e) {
    console.log('节流：', e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi,500));
