window.onload = function(){
	//动画函数的封装
	//1,getStyle函数
	function getStyle(el, property) {//获取元素属性值的兼容性函数
		if (getComputedStyle) {
			return getComputedStyle(el)[property];
		} else {
			return el.currentStyle[property];
		}
	}
	
	//减速函数
	function animate(el,properties) { //el-->元素 properties-->[property属性,targe目标值（到那个位置停下）]
	    clearInterval(el.timerId);//清除前一个定时器,防止定时器太多,速度越来越快
		el.timerId = setInterval(function() {//开启定时器
			
			for(var property in properties){//遍历集合中的每个元素
			
			//1，获取每个属性对应的目标值
				var current;
				var target = properties[property];
			
			//2，获取每个属性对应的当前的属性值	
				if(property === "opacity"){
					current = Math.round(parseFloat(getStyle(el,"opacity"))*100);
				}else{
					current = parseInt(getStyle(el,property));
				}
			
			//3，设置运动速度	
				var speed = (target - current) / 30;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			//4，更改状态值	
				if(property === "opacity"){
					el.style.opacity = (current + speed)/100;
				}else{
					el.style[property] = current + speed + "px";
				}
			}
	
		}, 40);
	}
	
	(function(){
		var nowIndex,nextIndex;//nowvIntdex-->前一张(当前)   nextIndex-->马上要显示的
		var len;
		var id;
		
		init();
		
		function init(){
			nowIndex = nextIndex = 0;//初始化prevIndex和nextIndex数值
			len = document.querySelectorAll(".list .item").length;//获得li的个数
			var oBtn1 = document.querySelector(".prev");//获取到按钮元素prev
			var oBtn2 = document.querySelector(".next");//获取到按钮元素next
			oBtn1.onclick = function(){//给按钮元素添加事件点击函数
				slidePrev();
			}
			oBtn2.onclick = function(){//给按钮元素添加事件点击函数
				slideNext();
			}
			
			//底线按钮轮播
			var arr = document.querySelectorAll(".list1 .item1");
			for(var i in arr){
				arr[i].index = i;
				arr[i].onclick = function(){//循环添加事件函数
					nowIndex = nextIndex;
					nextIndex = this.index;
					slideTo(nowIndex,nextIndex);
				}
			}
			
			auto();//自动轮播
			
			//给页面添加鼠标移除和鼠标悬停的事件函数
			var list1 = document.querySelector(".lunbo");
			list1.onmouseover = function(){
				stop();
			}
			list1.onmouseout = function(){
				auto();
			}
			
		}
		
		function slidePrev(){//前一张的事件驱动函数
			nowIndex = nextIndex;
			nextIndex--;
			if(nextIndex === -1){
				nextIndex = len-1;
			}
			slideTo(nowIndex,nextIndex);//prevIndex:0,-1,-2,-3    nextIndex:-1,-2,-3,0
		}
		
		function slideNext(){//后一张的事件驱动函数
			nowIndex = nextIndex;
			nextIndex++;
			if(nextIndex === len){
				nextIndex = 0;
			}
			slideTo(nowIndex,nextIndex);//preIndex:0,1,2,3    nextIndex:1,2,3,0
		}
		
		function slideTo(now,next){//点击的主体透明度的变化,prev-->前一张(当前)  next-->马上要显示的
			var lis = document.querySelectorAll(".list .item");
			/* //焦点切换
			var lis1 = document.querySelectorAll(".list1 .item1");
			lis1[prev].className = "item1";
			lis1[next].className = "focus"; */
			
			//调用动画封装函数
			animate(lis[now],{opacity:0});//当前opacity-->1-0
			animate(lis[next],{opacity:100});//马上显示的一张opacity-->0-1
		}
		
		function auto(){//自动轮播
		clearInterval(id);
			id = setInterval(function(){
				slidePrev();
			},2500)
		}
		
		function stop(){//停止自动轮播
			clearInterval(id);
		}
		
	})()
}