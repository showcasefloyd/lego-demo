// import 'animate.css'
// import 'hover.css'

// import "../node_modules/bootstrap/scss/bootstrap";
import $ from './jquery-global.js'
// import 'bootstrap'
// import 'owl.carousel'
// import 'owl.carousel/dist/assets/owl.carousel.css'
// import 'owl.carousel/dist/assets/owl.theme.default.css'
import '../sass/ninjago.scss'

$(function () {
	var endAni = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	var $icon = $('.hidden-menu-icon');
	var menuopen = false;
	preload("img/unlock-glow.png", "img/menu-bg-small-blank.gif");

	/* Adjust bottom footer height */
	fixFooterHeight();

	/* Start Carousel */
	$("#ninjago-carousel").owlCarousel({
		navigation: true,
		singleItem: true,
		rewindNav: true,
		transitionStyle: "backSlide",
		addClassActive: true
	});

	$('#ninjago-logo').addClass('animated fadeIn');

	/* if window opens small enable check box */
	if (checkWindowSize(992)) {
		$("#offcanvas-menu").removeAttr("disabled");
	}

	/* Open Mobile Menu On Resize */
	$(window).resize(function () {
		fixFooterHeight();

		/* if window opens small enable check box */
		if (checkWindowSize(992)) {
			$icon.rotate(0);
			$("#offcanvas-menu").removeAttr("disabled");
		} else {
			//console.log($icon.css("opacity"));
			$("#offcanvas-menu").attr("disabled", true);
		}
		$('#offcanvas-menu').prop('checked', false);
	});


	$("#offcanvas-menu").bind("change", function () {
		if (!menuopen) {
			menuopen = true;
			$icon.rotate(-90);
		} else {
			menuopen = false;
			$icon.rotate(0);
		}
	});

	/** Homepage Animations **/
	/* First Season Button */
	$('#enterButtonOverlay').on('mouseover', function () {
		$next = $('#enterButtonOverlay').next();
		runAnimation($next, 'pulse');
		runAnimation('#enterButtonOverlay', 'tada');
	});


	/* Second Season Button */
	var buttonUnlock = true;
	$('#unlockOverlay1').on('mouseover', function () {
		if (buttonUnlock) {
			runAnimation('#unlockOverlay1 #lock', 'swing');
		}
	});

	$('#unlockOverlay1').on('click', function () {

		buttonUnlock = false;

		$("#unlockOverlay1 #lock").animate({ 'opacity': 1 }, 500, function () {

			$("#unlockOverlay1 #lock img").fadeOut(10, function () {

				$(this).attr('src', 'img/unlock-glow.png').fadeIn(1000).addClass('poplock2').one(endAni, function () {

					$('#unlockOverlay1').addClass('animated slideOutDown');

					$('#enterButtonOverlay1').on('mouseover', function () {
						$next = $('#enterButtonOverlay1').next();
						runAnimation($next, 'pulse');
						runAnimation('#enterButtonOverlay1', 'bounce');
					});

				});;
			});

		});


	});

	/* Third Season Button */
	$('#lockOverlay3').on('mouseover', function () {
		//runAnimation('#lockOverlay3 #lock','shake');
		$(this).runAnimation('shake', '#lock');
	})

	/* Fourth Season Button */
	$('#lockOverlay4').on('mouseover', function () {
		//runAnimation('#lockOverlay4 #lock','shake');
		$(this).runAnimation('shake', '#lock');
	})


	/* Utilies */
	function runAnimation(selector, ani) {
		//console.log("Mouse Over" + selector + " " + ani);
		$(selector).addClass('animated ' + ani).one(endAni, function () {
			$(this).removeClass('animated ' + ani);
		});

		return;
	}

	// Carousel Events
	var $activelink = "";
	var $clickableDiv = $('.ninjago-href');
	$clickableDiv.on('mouseover', function () {
		$activelink = $('#ninjago-carousel .owl-wrapper-outer .owl-wrapper .owl-item.active').find('.item').data('urllink');
		//console.log($activelink);	
	});
	$clickableDiv.on('click', function () {
		if ($activelink != null) {
			window.open($activelink, "_blank");
		}
	});
});


function fixFooterHeight() {
	var $h = $("footer").height();
	$('#footer-wrap').height($h * 2);
}


function checkWindowSize(size) {
	var pageWidth = $(window).width();
	if (pageWidth <= size) {
		return true;
	}
	return false;
}

function preload() {
	var images = Array();
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}


/* JQuery Functions */
jQuery.fn.rotate = function (degrees) {

	var rotate = "rotate(" + degrees + "deg)";
	var trans = "all 0.3s ease-out";
	$(this).css({
		"-webkit-transform": rotate,
		"-moz-transform": rotate,
		"-o-transform": rotate,
		"msTransform": rotate,
		"transform": rotate,
		"-webkit-transition": trans,
		"-moz-transition": trans,
		"-o-transition": trans,
		"transition": trans
	});

	return $(this);
};


jQuery.fn.runAnimation = function (animation, subselector) {

	var endAni = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	if (typeof subselector !== 'undefined') {
		$(this).find(subselector).addClass('animated ' + animation).one(endAni, function () {
			$(this).removeClass('animated ' + animation);
		});
	} else {
		$(this).addClass('animated ' + animation).one(endAni, function () {
			$(this).removeClass('animated ' + animation);
		});
	}

	return $(this);
};
