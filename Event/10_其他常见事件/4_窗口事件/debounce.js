//防抖debounce代码
function debounce (fn,delay){
	//创建一个标记用来存放定时器的返回值
	let timeout;
	timeout = null;
	return function(e){
		//每当用户输入的时候把前一个定时器clear掉
		clearTimeout(timeout);
		//然后创建一个新的定时器
		timeout = setTimeout(() => {
			fn,apply(this,arguments);
		},delay)
	}
}
//处理函数
function handle(){
	console.log('防抖',Math.random());
}
//滚动事件
window.addEventListener('scroll',debounce(handle,500));