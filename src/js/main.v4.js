$(function(){
	var endAni = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	
	preload("img/unlock-glow.png");

	/* Adjust bottom footer height */
	fixFooterHeight();
	
	/* Start Carousel */
	$("#ninjago-carousel").owlCarousel({
	    navigation : true,
	    singleItem : true,
	    rewindNav : true,
	    transitionStyle : "backSlide",
	    addClassActive : true
	    //responsiveRefreshRate: 25,
	    //responsiveBaseWidth: ".homepage-middle"
	    // transitionStyle : "backSlideRev"
		//	autoPlay: true,
	    //  stopOnHover: true
    });
	
	$('#ninjago-logo').addClass('animated fadeIn');
	
	/* Open Mobile Menu */
	$(".lego-logo").on('click',function(){
		if(checkWindowSize(990)){
			$('.mobile-menu').slideToggle("ease" );
		}
	});
	
	/* Open Mobile Menu On Resize */
	$(window).resize(function() {
		
		// If hidded is false it's showing
		if( (!$( ".mobile-menu" ).is( ":hidden" )) && ($(window).width() > 990) ){
			$('.mobile-menu').slideUp( "ease" );
		}
		fixFooterHeight();
	});

	
	/** Homepage Animations **/
	/* First Season Button */
	$('#enterButtonOverlay').on('mouseover',function(){
		
		$next = $('#enterButtonOverlay').next();
		runAnimation($next,'pulse');
		runAnimation('#enterButtonOverlay','tada');
	});
	
	
	/* Second Season Button */
	var buttonUnlock = true;
	$('#unlockOverlay1').on('mouseover',function(){
		if(buttonUnlock){
			runAnimation('#unlockOverlay1 #lock','swing');
		}			
	});
	
	$('#unlockOverlay1').on('click',function(){
		
		buttonUnlock = false;
		
		$("#unlockOverlay1 #lock").animate({'opacity':1},500,function(){
			
			$("#unlockOverlay1 #lock img").fadeOut(10,function() { 
				
			  	 	$(this).attr('src', 'img/unlock-glow.png').fadeIn(1000).addClass('poplock2').one(endAni, function(){
					
					$('#unlockOverlay1').addClass('animated slideOutDown');
					
					$('#enterButtonOverlay1').on('mouseover',function(){		
						$next = $('#enterButtonOverlay1').next();
						runAnimation($next,'pulse');
						runAnimation('#enterButtonOverlay1','bounce');
					});
						
				});;
			}); 
			
			
		});
		

	});
	
	/* Third Season Button */
	$('#lockOverlay3').on('mouseover',function(){
		runAnimation('#lockOverlay3 #lock','shake');
	})
	
	/* Fourth Season Button */
	$('#lockOverlay4').on('mouseover',function(){
		runAnimation('#lockOverlay4 #lock','shake');
	})
	
	
	/* Utilies */
	function runAnimation(selector,ani){
		//console.log("Mouse Over" + selector + " " + ani);
		
		$(selector).addClass('animated '+ ani).one(endAni, function(){
			$(this).removeClass('animated '+ ani);
		});	
		
		return;
	}

	// Carousel Events
	$('.ninjago-href').on('mouseover',function(){
	  	//console.log(this);
		//var $active =  $('div.item .active');
		//console.log($active);	
	});
     
});




jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


function fixFooterHeight() {
    var $h = $("footer").height();
    $('#footer-wrap').height($h * 2);
}
	
	
function checkWindowSize(size) {
   var pageWidth = $(window).width();  
   if ( pageWidth <= size ) {
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
			