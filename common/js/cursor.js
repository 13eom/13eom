$(function(){
	cursor = $(".cursor"); // 기본 커서
	if($(window).width() >= 1280){
		var posX = 0,
			posY = 0;
		var mouseX = 0,
			mouseY = 0;
		TweenMax.to({}, 0.01, {
			repeat: -1,
			onRepeat: function() {
				posX += (mouseX - posX) / 9;
				posY += (mouseY - posY) / 9;
				TweenMax.set(cursor, {
					css: {
					left: mouseX,
					top: mouseY
					}
				});
			}
		});

		// 커서가 활성화되는 영역
		$("html,body").on("mousemove", function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}).on("mouseenter", function(e) {
			cursor.css('opacity', 1);
		}).on("mouseleave", function(e) {
			cursor.css('opacity', 0);
		});
	}
});

$(window).load(function() {
	$("input, a, input, button, .btn_list > li").on("mouseenter", function() {
		cursor.addClass("on");
	}).on("mouseleave", function() {
		cursor.removeClass("on");
	});
});

