$(function(){
	var pc = matchMedia("screen and (min-width:1280px)"); 

	/************ INTRO ************/

	//LOADING
	let cnt = document.querySelector("#intro .circle_box .count");
	let cnt_num = Number(cnt.innerText);
	let running = setInterval(function(){
		if(cnt_num == 100){
			//인트로 끝나면 실행 될 인터렉션
			clearInterval(running);
			setTimeout(function() {
				$('#intro').addClass('sound');
			}, 1000);
		}else{
			cnt_num++;
			cnt.innerText = cnt_num;
			$('#intro .circle_box .bg').css('transform', `scale(${cnt_num}%)`);
		}
	},50);

	// BGM BUTTON
	var bgm_btn = $("#intro .sound_btn_wrap button");
	bgm_btn.on("mousemove", function(e) {
		if($(this).hasClass('on')){
			cursor.removeClass('bgm_off').addClass('bgm_on');
		}else{
			cursor.removeClass('bgm_on').addClass('bgm_off');
		}
	}).on("mouseleave", function(e) {
		cursor.removeClass('bgm_on bgm_off');
	});

	var bgm = document.getElementById('bgm');

	$('.sound_btn.on').click(function(){
		$('header .bgm_btn').removeClass('on');
		bgm.play();
	});
	$('.sound_btn.off').click(function(){
		$('header .bgm_btn').addClass('on');
		bgm.pause();
	});


	// INTRO OFF
	$('.aos-init').removeClass('aos-animate');
	bgm_btn.click(function(){
		$('html,body').css({'overflow':'visible', 'height':'auto'});
		window.scrollTo(0,0);
		$('.main').addClass('on');
		setTimeout(function() {
			$('#main_visual .aos-init').addClass('aos-animate');
		}, 1500);
	});

	/************ PORTFOLIO AJAX ************/
	var pf_view = $('#pf_view');
	var pf_info = pf_view.find('.view_popup .inner .txt_box ul li');
	var best_pf = $('#main_best_pf .sticky_box .pf_box .inner .pf_con');
	var pf_list = $('#main_all_pf .pf_list_wrap .pf_list');
	var pf_list_w = pf_list.children('ul.tit_list');

	$.ajax({
		url : "./common/ajax/project.json",
		type : "get",
		dataType: "json",
		success : function(data) {
			/******* BEST PORTFOLIO *******/
			function best_pf_var(index){
				best_pf.find('.info_box .info_list li.date .amount p').text(data[index].date_y+'.'+data[index].date_m); 
				best_pf.find('.info_box .info_list li.contribution .amount p').text(data[index].contribution); 
				if(data[index].details === undefined){
					best_pf.find('.info_box .info_list li.contribution .detail p').text('All pages'); 
				}else{
					best_pf.find('.info_box .info_list li.contribution .detail p').text(data[index].details); 
				}
				best_pf.find('.info_box .info_list li.awards .detail').empty();
				if(data[index].awards == undefined){
					best_pf.find('.info_box .info_list li.awards .amount p').text('-');
				}else{
					for(awards_i=0; awards_i<data[index].awards.length; awards_i++){
						best_pf.find('.info_box .info_list li.awards .amount p').text(awards_i+1+' SECTOR');
						best_pf.find('.info_box .info_list li.awards .detail').append(`<p>· ${data[index].awards[awards_i]}</p>`);
					}
				}
				best_pf.find('.info_box .view_box').attr('href', data[index].pf_url);
				best_pf.find('.info_box .view_box video').attr('src', `/13eom/video/best_pf${index}.mp4`);
			}

			// BEST PF : LIST
			var best_pf_leng = new Array();
			var best_pf_idx = 0;
			for(idx=0; idx<data.length; idx++){
				if(data[idx].best == true){
					best_pf.find('.list_box .list ul').append(
					`<li>${data[idx].name} <span>${data[idx].date_y}</span><i></i></li>`
					);

					$('header #gnb > ul > li.pf ul').append(
            `<li><a href="${data[idx].pf_url}" target="_blank">${data[idx].name}</a></li>`
					);
					
					best_pf_leng[best_pf_idx] = idx;
					best_pf_idx++;
				}
			}
			// BEST PF : CLICK
			best_pf.find('.list_box .list ul li').click(function(){
				var index = $(this).index();
				var best_pf_leng_i = best_pf_leng[index];
				$(this).addClass('on').siblings().removeClass('on');
				best_pf_var(best_pf_leng_i);
			});
			
			// BEST PF : DEFAULT
			best_pf.find('.list_box .list ul li').eq(0).addClass('on');
			best_pf_var(best_pf_leng[0]);

			/******* ALL PORTFOLIO *******/
			pf_list_w.each(function(i,e){
				for(idx=0; idx<data.length; idx++){
					var all_pf_li = document.createElement('li');
					if(data[idx].contribution == "100%"){
						all_pf_li.setAttribute('class', 'all_mine');
					}
					if(data[idx].date_y == [2021+i]){
						all_pf_li.innerHTML = `
							<p>${data[idx].name}</p>
							<p>${data[idx].name}</p>
						`
						pf_list_w.eq(i).append(all_pf_li); 
					}
				}
			});
			pf_list_w.children('li').each(function(i,e){
				$(this).click(function(){
					var pf_val = data[i];
					pf_view.addClass('on');
					pf_view.find('#pf_link').attr('href', pf_val.pf_url);
					pf_info.find('#pf_name').text(pf_val.name);
					pf_info.find('#pf_date').text(`${pf_val.date_y}. ${pf_val.date_m}`);
					pf_info.find('#pf_period').text(`${pf_val.period} days`);
					if(pf_val.details === undefined){
						pf_info.find('#pf_details').text('All pages');
					}else{
						pf_info.find('#pf_details').text(pf_val.details);
					}
					pf_info.find('#pf_ctrbt').text(pf_val.contribution);
					pf_info.find('#pf_awards').text(pf_val.awards);
					pf_info.find('#pf_about').text(pf_val.about);
					$('.cursor').addClass('visit');
				});
			});

		},
		error : function() {
			alert('error!');
		}
	});

	/************ BEST PORTFOLIO ************/
	let bpf = $('#main_best_pf');
	let bpf_box = bpf.find('.pf_box');
	let tit_tag = bpf_box.find('.tit_tag');
	if(pc.matches){
		let bpf1 = gsap.timeline({
			scrollTrigger: { 
				trigger: bpf,
				start: "10% top",
				end: `${$("#main_best_pf").height() - $(window).height()} top`,
				scrub: true,
			},
		});

		bpf1
		.to( tit_tag.find(".bpf_logo"),.4,{ marginLeft: '0',},'scene1')
		.to( tit_tag.find(".bpf_logo p"),.4,{ opacity: '1', marginRight: '2rem'},'scene1')
		.to( tit_tag.find(".bpf_logo img"),.4,{ width: '8rem',},'scene1')
		.to( tit_tag.find("span"),.4,{ marginLeft: '20rem',},'scene1')
		.to( tit_tag.find("span i"),.4,{ height: '13rem',},'scene1')
		.to( bpf_box,.7,{ width: "1060rem", height:"667rem",},'scene1')
		.to( bpf.find('.wave_line svg:first-child'),1,{ strokeDashoffset: 0,},'scene1')
		.to( bpf.find('.wave_line svg:last-child'),1,{ opacity: 1,},'scene1')
		
		let bpf2 = gsap.timeline({
			scrollTrigger: { 
				trigger: bpf,
				start: "25% top",
				end: `${$("#main_best_pf").height() - $(window).height()} top`,
				scrub: true,
			},
		});

		bpf2
		.to( "#main_best_pf .sticky_box .pf_box .inner .pf_con",.3,{ opacity: 1, y: "0%",},'scene1')
	}else{
		let bpf_m = gsap.timeline({
			scrollTrigger: { 
				trigger: "#main_visual",
				start: "20% top",
				end: "70% top",
				scrub: true,
			},
		});

		bpf_m
		.to( tit_tag.find(".bpf_logo"),1,{ marginLeft: '0',},'scene1')
		.to( tit_tag.find(".bpf_logo p"),1,{ opacity: '1', marginRight: '2rem'},'scene1')
		.to( tit_tag.find(".bpf_logo img"),1,{ width: '8rem',},'scene1')
		.to( tit_tag.find("span"),1,{ marginLeft: '15rem',},'scene1')
		.to( tit_tag.find("span i"),1,{ height: '13rem',},'scene1')
		.to( "#main_best_pf .sticky_box .pf_box .inner .pf_con",1,{ opacity: 1, y: "0%",},'scene1')
	}
	var best_pf_vid = document.getElementsByClassName('best_pf_vid');
	var vid_pause_anchor = $('#main_feature').offset().top;
	var vid_play_anchor = $('#main_best_pf').offset().top;
	$(window).scroll(function(){
		var scrTop = $(this).scrollTop();
		if(scrTop > vid_play_anchor && scrTop < vid_pause_anchor){
			best_pf_vid[0].play();
		}else{
			best_pf_vid[0].pause();
		}
	});

	/************ FEATURE ************/
	var interaction_box = $('#main_feature .feature_list ul li.interaction .ani_box');
	for(var i=0; i<=40; i++){ //원본 1 + 0부터시작 1 ( 50 + 2개추가됨)
		var $_clone = interaction_box.find('i:first-child').css('animationDelay',i*.2+'s').clone();
		interaction_box.append($_clone); //복제될 선택자의 부모
	};

	/************ VALUES ************/
	$('.main #main_value .value_box .tit_box').on({
		mouseenter: function(){
			$('.cursor').addClass('value_on');
		}
		,mouseleave: function(){
			$('.cursor').removeClass('value_on');
		}
	});
	let values = gsap.timeline({
		scrollTrigger: { 
			trigger: "#main_value",
			start: "-10% top",
			end: "30%",
			scrub: true,
		},
	});

	values
	.to( "#main_value",.3,{ paddingLeft:"0", paddingRight: "0"},'scene1')

	/************ ALL PORTFOLIO ************/
	
	$('#pf_view .close').on("click",function() {
		pf_view.removeClass('on');
		$('.cursor').removeClass('visit');
	});

	$('#pf_view .view_popup').on({
		mouseenter: function(){
			$('.cursor').addClass('visit_on');
		}
		,mouseleave: function(){
			$('.cursor').removeClass('visit_on');
		}
	});
	if(pc.matches == false){
		$(window).scroll(function(){
			pf_view.removeClass('on');
		});
	}

	for(i=0; i<pf_list.length; i++){
		let all_pf_year = gsap.timeline({
			scrollTrigger: { 
				trigger: pf_list[i],
				start: "top bottom",
				end: 1,
				scrub: true,
			},
		});

		all_pf_year
		.to('#main_all_pf .sticky_box',{className:`sticky_box vh100 scene${[i]}`, duration: 0.5},)
	}

	$('#main_all_pf .pf_list_wrap .pf_list ul.tit_list li p').each(function(){
		var pf_tit = $(this).clone();
		$(this).parent().append(pf_tit);
	});

	let all_pf_progress = gsap.timeline({
		scrollTrigger: { 
			trigger: "#main_all_pf",
			start: "top bottom",
			end: "100% bottom",
			scrub: true,
		},
	});

	all_pf_progress
	.to( "#main_all_pf .sticky_box .bird_progress i",.3,{ top: "-20%"},)

	let all_pf_window = gsap.timeline({
		scrollTrigger: { 
			trigger: ".window_box_wrap",
			start: "top bottom",
			end: "100% bottom",
			scrub: true,
		},
	});
	all_pf_window.staggerFromTo(".window_box_wrap .img_wrap li", 2, {y:"100%", opacity:0,}, {y: "0", opacity:1,}, .5)
	.to( ".main #main_all_pf .bg .sticky_box .info",1,{ opacity:0, y: "100%"},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap",1.5,{ width: "100%", height:"100%",},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap li.img1",1.5,{ y:"-60rem",},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap li.img2",1.5,{ x:"-60rem",},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap li.img3",1.5,{ x:"60rem",},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap li.img4, .window_box_wrap .window_box .img_wrap li.img5",1.5,{ y:"60rem",},'scene2')
	.to( ".window_box_wrap .window_box .img_wrap li img",1.7,{ scale:1,},'scene2')

	/************ ABOUT ME ************/
	let about_cross = gsap.timeline({
		scrollTrigger: { 
			trigger: "#main_about .cross",
			start: "top bottom",
			end: "120% 100%",
			scrub: true,
		},
	});

	about_cross
	.to( "#main_about .cross img",1,{ rotate: "-450deg"},);

	let about_border = gsap.utils.toArray('#main_about .about_list li svg');
	about_border.forEach(box => {
		gsap.to(box, { 
			strokeDashoffset: 0,
			scrollTrigger: {
				trigger: box,
				scrub: true,
				start: "top 80%",
				end: "100% 80%",
			}
		})
	});

	let about_img = gsap.utils.toArray('#main_about .about_list li .inner .img_box img');
	about_img.forEach(box => {
		gsap.to(box, { 
			y: "10%",
			// opacity: "1",
			scrollTrigger: {
				trigger: box,
				scrub: true,
			}
		})
	});

});
