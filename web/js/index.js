(function(){
	// ban动画
	$('.index_box2').mousemove(function(e) {
		var offsetX = e.clientX / window.innerWidth - 0.5,
			offsetY = e.clientY / window.innerHeight - 0.5;
		var _left = -40 * offsetX;    //如果想动的幅度更大，可以调整 -40 的值
		var _top = -40 * offsetY;     //如果想动的幅度更大，可以调整 -40 的值
		//应用公式
	//	$('.index_box2 .ibox2con_icon img').css('left',_left*1.4).css('top',_top*0.4);  //将您的left值和top值先+此数值，*的小数越大，动的越大，否则越小
	});

	$(window).scroll(function(){
		var A = $(window).scrollTop();
	//	var indexbox2 = $(".index_box2").offset().top;
	});

	// var wW = $(window).width();
	// var ibox5 = (wW/2190).toFixed(2)*100;
	// $(".ibox5gdt .ibox5gdt_con").css("width",ibox5+"%");
	// $(".ibox5gdt .ibox5gdt_con").on("mousedown",function(e){
	// 	l=e.pageX-$(this).offset().left;
	// 	l2 = $(".ibox5gdt").offset().left;
	// 	//获取页面宽高
	// 	winW=$(".ibox5gdt").width();
	// 	//获取盒子宽高
	// 	boxW=$(this).width();
	// 	//移动
	// 	$(document).on("mousemove",moveFn);
	// 	//放开
	// 	$(document).on("mouseup",upFn);
	// })
	// //移动
	// function moveFn(e){
	// 	var x=e.pageX-l-l2,
	// 	x=fn(x,0,(winW-boxW));
	// 	x2 = (x/730*130);
	// 	// console.log(x)
	// 	$(".ibox5gdt .ibox5gdt_con").css({"left":x});
	// 	$(".index_box5 .ibox5_con ul").stop().animate({"left":-x2+"%"},10);
	// }
	// function fn(vall,min,max){
	// 	if(vall<min) vall=min;
	// 	if(vall>max) vall=max;
	// 	return vall;
	// }
	// //放开
	// function upFn(){
	// 	$(document).off("mousemove");
	// }

	var x;
	$(".ibox5gdt .ibox5gdt_con").mousedown(function(e){
		x = e.pageX-$(this).offset().left;//盒子左侧到当前鼠标的距离[内部距离]
		//x=e.pageX;
		var wW=$(".ibox5gdt").width()-$(".ibox5gdt .ibox5gdt_con").width();
		$(document).bind("mousemove",function(e){
			var _x=e.pageX-x-$(".ibox5gdt").offset().left;
			//var _x=e.pageX-x+$(".box").offset().left-$(".scroll").offset().left;在移动过程中取$(".box").offset().left得值会有误差。
			//确保box不会超出scroll的范围
			if (_x<0){
				_x=0;
			}else if (_x>=wW){
				_x=wW;
			}
			//_y是context内容移动的距离，按比例计算
			var _y=_x*($(".index_box5 .ibox5_con ul").width()-$(".index_box5 .ibox5_con").width())/wW;
			$(".ibox5gdt .ibox5gdt_con").css("left",_x);
			$(".index_box5 .ibox5_con ul").css("left",-_y-10);
		});
		$(document).mouseup(function(){
			$(document).unbind("mousemove");
		});
	});

	
	$(".ibox6_con .ibox6vid").on("click",function(){
		var video = $(this).parents("li").find("video").get(0);
		video && video.play();
		$(this).hide();
	});
	//鼠标移入显示左右箭头和关闭按钮
	var timer = null;
	var timer2 = null;
	var arr = [];
	var arr2 = [];
	var ibox6len = $(".ibox6_con ul li").length;
	var ibox8len = $(".ibox8_con ul li").length;
	for(var i=1;i<=ibox6len;i++){
		arr.push("p"+i);
	}
	for(var i=1;i<=ibox8len;i++){
		arr2.push("p"+i);
	}
	// $('.ibox6_con').mouseover(function () {
	// 	clearInterval(timer);
	// }).mouseleave(function () {
	// 	timer = setInterval(function(){btn_right($(".ibox6_con"),arr,ibox6len);}, 4000);
	// });
	// $('.ibox8_con').mouseover(function () {
	// 	clearInterval(timer2);
	// }).mouseleave(function () {
	// 	timer2 = setInterval(function(){btn_right($(".ibox8_con"),arr2,ibox8len);}, 4000);
	// });

	//上一张
	$('.ibox6btn_left').on('click', function () {
		btn_left($(".ibox6_con"),arr,ibox6len);
	});
	$('.ibox8btn_left').on('click', function () {
		btn_left($(".ibox8_con"),arr2,ibox8len);
	});
	//下一张
	$('.ibox6btn_right').on('click', function () {
		btn_right($(".ibox6_con"),arr,ibox6len);
	});
	$('.ibox8btn_right').on('click', function () {
		btn_right($(".ibox8_con"),arr2,ibox8len);
	});

	
	//图片自动轮播
	// timer = setInterval(function(){btn_right($(".ibox6_con"),arr,ibox6len);}, 4000);
	// timer2 = setInterval(function(){btn_right($(".ibox8_con"),arr2,ibox8len);}, 4000);
	
	//点击下一张的封装函数
	function btn_right(iboxcon,darr,iboxlen) {
		darr.unshift(darr[iboxlen-1]);
		darr.pop();
		iboxcon.find("ul.ul1>li").each(function (i, e) {
			$(e).removeClass().addClass(darr[i]);
		});
		iboxcon.find(".ibox8_list span").each(function (i, e) {
			$(e).removeClass().addClass(darr[i]);
		});
		for(var j=0;j<iboxcon.find("ul.ul1>li").length;j++){
			var videoElem = $(".ibox6_con ul.ul1>li").eq(j).find("video").get(0);
			videoElem && videoElem.pause();
			$(".ibox6_con ul.ul1>li").eq(j).find(".ibox6vid").show();
		}
	}
	
	//点击上一张的封装函数
	function btn_left(iboxcon,darr,iboxlen) {
		darr.push(darr[0]);
		darr.shift();
		iboxcon.find("ul.ul1>li").each(function (i, e) {
			$(e).removeClass().addClass(darr[i]);
		});
		iboxcon.find(".ibox8_list span").each(function (i, e) {
			$(e).removeClass().addClass(darr[i]);
		});
		for(var j=0;j<iboxcon.find("ul.ul1>li").length;j++){
			var videoElem = $(".ibox6_con ul.ul1>li").eq(j).find("video").get(0);
			videoElem && videoElem.pause();
			$(".ibox6_con ul li").eq(j).find(".ibox6vid").show();
		}
	}

	var spanlen = $(".ibox8_con ul li").length;
	var spancon = "";
	for(var i=1;i<=spanlen;i++){
		spancon += '<span class="p'+i+'"></span>'
	}
	$(".ibox8_list").html(spancon);
	$(".ibox8_list").on("click","span",function(){
		var spanind = $(".ibox8_list span.p1").index();
		var spanind2 = $(this).index();
		console.log(spanind);
		for(var i=0;i<spanlen;i++){
			var iind = 4-(spanind2-i);
			if(iind>=4){iind = iind-4;}
			$(".ibox8_list span").eq(i).removeClass().addClass("p"+(iind+1));
			$(".ibox8_con ul li").eq(i).removeClass().addClass("p"+(iind+1));
		}
	});


})()