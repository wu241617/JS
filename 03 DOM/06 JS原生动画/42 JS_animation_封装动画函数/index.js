//动画函数的封装
//1,getStyle函数
function getStyle(el, property) {//获取元素属性的兼容性写法封装函数
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
		
		for(var property in properties){//循环遍历，获取对应的目标值
		
		//1，获取目标值
			var current;//当前的数值
			var target = properties[property];//目标值
		
		//2，获取当前值	
			if(property === "opacity"){//属性为透明度
				current = Math.round(parseFloat(getStyle(el,"opacity"))*100);//获取当前状态下对应的数值（做四舍五入操作）
			}else{
				current = parseInt(getStyle(el,property));
			}
			
		//3，设置运动速度	
			var speed = (target - current) / 30;//规定运动速度
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//速度大于0，上取整；小于0，下取整
			
		//4，更新对应属性值	
			if(property === "opacity"){//属性为透明度
				el.style.opacity = (current + speed)/100;
			}else{
				el.style[property] = current + speed + "px";
			}
		}

	}, 60);
}