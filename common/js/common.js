/**************** 모바일에서 브라우저 하단베젤 고려 ****************/
let mvh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${mvh}px`);
window.addEventListener('resize', () => {
	// We execute the same script as before
	let mvh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${mvh}px`);
});

$(function(){

	var win = $(window);
	var vh = 0;

	$(window).on('load resize',function(){
	// Hide Header on on scroll down
		var didScroll = false;
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = $('header').outerHeight();

		$(window).scroll(function(event){
			//$('header').addClass('scrolled');
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 0);

		function hasScrolled() {
			var st = $(this).scrollTop();
			
			// Make sure they scroll more than delta
			if(Math.abs(lastScrollTop - st) <= delta)
				return;
			
			if (st > lastScrollTop && st > navbarHeight){
				// Scroll Down
				if($('header').hasClass('active')){
				
				}else{
					$('header').removeClass('nav-up').addClass('nav-down');
				}
				
			} else {
				// Scroll Up
				if(st + $(window).height() < $(document).height()) {
					$('header').removeClass('nav-down').addClass('nav-up');
				}
			}
			
			lastScrollTop = st;
		}
	});

	$('#scrTop').click(function(e){
		$('html, body').animate({scrollTop: '0'}, 650, 'easeInCubic');	
	});

	// 230522 UPDATE
	
	/**************** LOGO ****************/
	if($('.bird').length){
		$('.bird').each(function(e,i){ 
			var sColor = $(this).data('color');
			$(this).html(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 383" fill="none">
				<path d="M153.209 57.2071C132.008 138.887 151.365 153.248 214.966 103.881L240.775 83.237L218.653 42.8458C186.392 -17.2923 171.644 -14.5995 153.209 57.2071Z" fill="#${sColor}"/>
				<path d="M295.159 78.7487C238.01 118.242 181.783 153.248 170.722 155.941C158.739 158.634 137.539 153.248 119.104 142.477C75.7812 116.447 42.598 118.242 19.5541 146.965C8.49306 160.429 0.197266 178.38 0.197266 188.254C0.197266 202.615 4.80604 204.41 30.6152 199.922C66.5637 192.742 84.077 208.898 99.7468 263.651C114.495 313.018 131.087 324.686 184.548 323.789C221.419 322.891 230.636 326.481 238.01 342.638C242.619 353.409 258.289 367.77 272.115 374.951C294.237 386.62 299.768 385.722 330.186 370.463C368.899 349.819 390.1 313.915 381.804 281.602C377.195 262.753 371.665 260.06 335.716 260.958C282.254 260.958 262.898 244.801 308.064 236.723C352.308 228.645 392.865 185.561 410.378 130.808C427.892 72.4656 428.814 6.94206 412.222 6.94206C405.77 6.94206 353.23 39.255 295.159 78.7487Z" fill="#${sColor}"/>
			</svg>`
			);
		});
	}

	/**************** POPUP ****************/
	if($('.popup_wrap').length){
		$('.pop_btn').click(function(e){
			$('.popup_wrap').toggleClass('on');
		});
	}

	/**************** ALLMENUBTN ****************/
	$('header .all_menu_btn').click(function(){
		$('header').toggleClass('on');
	});
	$('header #gnb > ul ul li a, .contact_btn').click(function(){
		$('header, #contact').removeClass('on');
	});

	/**************** WH & BH HEADER ****************/
	var whzone = $('.whzone');
	if(whzone.length){
		$(document).on('scroll', function(e){
			let currentPos = $(this);
			let flag = false;
			for(var i=0;i<whzone.length;i++){
				var thisScroll = $(this).scrollTop();
				var whzoneOffset = $(whzone[i]).offset().top;
				var whzoneH = whzoneOffset + $(whzone[i]).height();
				
				if(thisScroll >= whzoneOffset && thisScroll < whzoneH){
					flag = true;
					break;
				}
			}
			if(flag){
				$('header').addClass('wh');
			}else{
				$('header').removeClass('wh');
			}
		});
	}

	/**************** WAVE TEXT ****************/
	$('.wave').each(function(i,e){
		var wave = $(this).children().clone();
		$(this).append(wave);
	});

	/**************** WAVE LINE ****************/
	var wave1 = `<path d="M-56.5672 1.25836C-5.73491 1.25836 50.6343 -7.79891 144.942 77.5875C257.909 179.869 421.937 634.725 525.417 648.842C628.897 662.959 732.377 550.025 835.857 479.441C939.337 408.857 1044.63 380.623 1148.11 479.441C1251.59 578.258 1355.07 804.126 1458.55 846.477C1562.03 888.827 1665.51 747.659 1770.81 677.076C1874.29 606.492 1977.77 606.492 2028.6 606.492"/>`;
	var wave2 = `<path xmlns="http://www.w3.org/2000/svg" d="M0.933594 1L39.9336 84C77.9336 168 154.934 335 232.934 356C309.934 377 386.934 251 463.934 251C541.934 251 618.934 377 695.934 418C772.934 460 850.934 418 927.934 377C1004.93 335 1081.93 293 1158.93 272C1236.93 251 1313.93 251 1390.93 272C1467.93 293 1545.93 335 1622.93 304C1699.93 272 1776.93 168 1853.93 126C1931.93 84 2008.93 105 2047.93 116L2085.93 126"/>`;
	var wave3 = `<path xmlns="http://www.w3.org/2000/svg" d="M1.31201 0.858887L40.312 73.8589C78.312 146.859 155.312 292.859 233.312 323.859C310.312 354.859 387.312 271.859 464.312 198.859C542.312 125.859 619.312 62.8589 696.312 31.8589C773.312 0.858887 850.312 0.858887 928.312 73.8589C1005.31 146.859 1082.31 292.859 1159.31 386.859C1237.31 480.859 1314.31 521.859 1391.31 521.859C1468.31 521.859 1545.31 480.859 1623.31 427.859C1700.31 375.859 1777.31 313.859 1854.31 281.859C1932.31 250.859 2009.31 250.859 2047.31 250.859H2086.31"/>`;
	var wave4 = `<path xmlns="http://www.w3.org/2000/svg" d="M0.280029 61.7327L59.9587 23.262C117.242 -12.9356 200.913 -8.06573 295.64 61.7327C392.028 131.531 486.755 320.984 581.481 330.955C676.208 340.926 770.934 201.33 865.661 181.387C960.387 161.445 1056.78 261.157 1151.5 330.955C1246.23 400.754 1340.95 440.638 1435.68 410.725C1530.41 380.811 1625.13 281.099 1721.52 211.301C1816.25 141.502 1906.95 94.6422 1957.51 81.675L2046.31 61.7327" />`;
	var wave5 = `<path d="M0.921875 0.657471H1582.5C1609.22 0.657471 1630.88 22.3189 1630.88 49.0397V49.0397C1630.88 75.7604 1609.22 97.4219 1582.5 97.4219H368.153 M768.172 97.4219H339.341C312.62 97.4219 290.959 119.083 290.959 145.804V145.804C290.959 172.525 312.62 194.186 339.341 194.186H1920.92"/>`;
	var wave_list = [wave1,wave2,wave3,wave4,wave5];
	var wave_h = [855,436,523,422,195];

	for (let i=1; i<=wave_list.length; i++) { 
		var wave_html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 ${wave_h[i-1]}" fill="none">${wave_list[i-1]}</svg>`;
		$(`.wave_line.wave${i}`).append(wave_html, wave_html);
	}

	/**************** ONLY MOBILE SWIPER ****************/
	var m= matchMedia("screen and (max-width:1280px)"); 
	if(m.matches){
		$('.swiper_m').addClass('swiper');
		$('.swiper_m > ul').addClass('swiper-wrapper');
		$('.swiper_m > ul > li').addClass('swiper-slide');
	} else{
		$('.swiper_m').removeClass('swiper');
		$('.swiper_m > ul').removeClass('swiper-wrapper');
		$('.swiper_m > ul > li').removeClass('swiper-slide');
	}

	/**************** BROWSER WIDTH ****************/
	$('.contact_btn').click(function(){
		$('#contact').toggleClass('on');
	});
	
	/**************** BROWSER WIDTH ****************/
	var width = $(window).width();
	$(window).on('resize', function() {
		if ($(this).width() !== width) {
			width = $(this).width();
			location.reload();
		}
	});

	/**************** FOOTER ****************/
	var ft = $('footer');
	var ft_h = ft.outerHeight();
	$('.ft_blank').css('height', ft_h-1);

	let ft_ani = gsap.timeline({
		scrollTrigger: { 
			trigger: '.ft_blank',
			start: "top bottom",
			end: "100% bottom",
			scrub: true,
		},
	});
	
	ft_ani
	.to('footer',{y:0, backgroundColor:"#512520"})

	/**************** AOS ****************/
	AOS.init({duration: 700, offset: 200, easing: 'cubic-bezier(0.25, 1, 0.5, 1);'});
	
	/**************** SMOOTH SCROLL ****************/
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	})
	
	function raf(time) {
		lenis.raf(time);
		ScrollTrigger.update();
		requestAnimationFrame(raf)
	}
	
	requestAnimationFrame(raf)
});

/**************** IMG RESIZING ****************/
$(window).on('load', function(){
	var allRemImg = $('.remImg');
	allRemImg.hide();
	for(i=0; i<allRemImg.length; i++){
		var remImg = allRemImg.eq(i);
		var remImgWidth= remImg[0].naturalWidth;
		remImg.css({'width' : remImgWidth + 'rem', 'display' : 'block'});
		allRemImg.show();
	}
});
