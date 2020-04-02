window.onload = function() {
	//1,getStyle函数
	function getStyle(el, property) {//获取样式的兼容性函数
		if (getComputedStyle) {
			return getComputedStyle(el)[property];
		} else {
			return el.currentStyle[property];
		}
	}

	//减速函数
	function animate(el, properties) { //el-->元素 properties-->[property属性,targe目标值（到那个位置停下）]
		clearInterval(el.timerId); //清除前一个定时器,防止定时器太多,速度越来越快
		el.timerId = setInterval(function() {//开启一个定时器

			for (var property in properties) {//循环遍历传入集合中的每一对属性
			//获取对应的每个属性的目标值
				var current;
				var target = properties[property];
            
			//获取当前的属性值
				if (property === "opacity") {
					current = Math.round(parseFloat(getStyle(el, "opacity")) * 100);
				} else {
					current = parseInt(getStyle(el, property));
				}
            
			//设置速度
				var speed = (target - current) / 30;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            
			//更新对应的属性值
				if (property === "opacity") {
					el.style.opacity = (current + speed) / 100;
				} else {
					el.style[property] = current + speed + "px";
				}
			}

		}, 20);
	}
	//立即执行函数,避免污染全局作用域
	(function() {
		var currIndex; //指定当前图片的位置
		var len; //图片数组长度
		var id; //定时器
		var lis;
		var liWidth;

		init();

		//初始化函数
		function init() {
			currIndex = 1; //从第一张图片开始
			var li_1 = document.querySelector(".list .item:first-of-type");
			var copy_1 = li_1.cloneNode(true);
			var li_last = document.querySelector(".list .item:last-of-type");
			var copy_last = li_last.cloneNode(true);

			var list = document.querySelector(".list");
			list.appendChild(copy_1);
			list.insertBefore(copy_last, li_1);

			lis = document.querySelectorAll(".list .item");
			liWidth = lis[0].offsetWidth;
			len = lis.length;

			list.style.width = liWidth * len + "px";
			list.style.left = -liWidth + "px";

			var prev = document.querySelector(".prev"); //获取按钮prev元素
			var next = document.querySelector(".next"); //获取按钮next元素
			prev.onclick = function() { //给prev添加事件监听函数
				slidePrev();
			}
			next.onclick = function() { //给next添加事件监听函数
				slideNext();
			}

			var lis1 = document.querySelectorAll(".list1 .item1");//获取小图标对象
			for(var i = 0; i < lis1.length; i++){
				lis1[i].index = i;
				lis1[i].onclick = function(){
					currIndex = this.index + 1;
					slideTo(currIndex);
				}
				
			}
			
			auto();//自动轮播
			var oDiv = document.querySelector("div");//获取界面元素
			oDiv.onmouseover = function(){//给元素oDiv添加事件监听函数,鼠标上移
				stop();
			}
			oDiv.onmouseout = function(){//给元素oDiv添加事件监听函数,鼠标移除
				auto();
			}

		}
		//后退
		function slidePrev() {
			currIndex--;
			slideTo(currIndex);
		}
		//前进
		function slideNext() {
			currIndex++;
			slideTo(currIndex);
		}
		//转变过程
		function slideTo(index) {
			var list = document.querySelector(".list");
			if (index === len) {
				currIndex = index = 2;
				list.style.left = -liWidth + "px";
			}

			if (index === -1) {
				currIndex = index = len - 3;
				list.style.left = -(len - 2) * liWidth + "px";
			}
			
			//焦点设置
			var focusIndex;
			var lis1 = document.querySelectorAll(".list1 .item1");
			if(index === 0){
				focusIndex = lis1.length - 1;
			}else if(index === len-1){
				focusIndex = 0;
			}else{
				focusIndex = index - 1;
			}
			document.querySelector(".focus").className = "item1";
			lis1[focusIndex].className = "focus";

			var left = -index * liWidth;
			animate(list, {
				left: left
			})
		}
		//自动轮播
		function auto() {
			clearInterval(id);
			id = setInterval(function() {
				slidePrev();
			}, 1500);
		}
		//停止轮播
		function stop() {
			clearInterval(id);
		}
	})()
}
