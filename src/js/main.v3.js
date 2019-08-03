$(function(){
	
	var endAni = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	
	fixFooterHeight();
	
	$('#ninjago-logo').addClass('animated fadeIn');
	
	/* Menu */
	$(".lego-logo").on('click',function(){
		if(checkWindowSize(990)){
			$('#hidden-menu').slideToggle("slow" );
		}
	});
	
	$(window).resize(function() {
		
		//if hidded is false it's showing
		if( (!$( "#hidden-menu" ).is( ":hidden" )) && ($(window).width() > 990) ){
			$('#hidden-menu').slideUp( "slow" );
		}
		fixFooterHeight();
	});

	
	/** Homepage Animations **/

	/* First Season Button */
	$('#enterButtonOverlay').on('mouseover',function(){
		
		$('#enterButtonOverlay').next().addClass('animated pulse').one(endAni, function(){
			$(this).removeClass('animated pulse');
		});
	});
	addAnimation('#enterButtonOverlay','tada');
	

	var buttonUnlock = true;
	/* Second Season Button */
	$('#unlockOverlay1').on('mouseover',function(){
		if(buttonUnlock){
			$('#unlockOverlay1 #lock')
				.addClass('animated swing')
				.one(endAni, function(){
					$(this).removeClass('animated swing');
			});
		}			
	});
	
	$('#unlockOverlay1').on('click',function(){
	
		$("#unlockOverlay1 #lock").animate({'opacity':1},500);
		buttonUnlock = false;
		
		$('#unlockOverlay1 #lock img')
			.attr('src', 'img/unlock-glow.png')
			.addClass('poplock2')
			//.addClass('animated zoomOutDown')
			.one(endAni, function(){
				
				$('#unlockOverlay1').addClass('animated slideOutDown');
			
				$('#enterButtonOverlay1').on('mouseover',function(){
					
					$('#enterButtonOverlay1').next().addClass('animated pulse').one(endAni, function(){
						$(this).removeClass('animated pulse');
					});
				});
					
				addAnimation('#enterButtonOverlay1','bounce');
				
			});
	});
	
	/* Third Season Button */
	$('#lockOverlay3').on('mouseover',function(){
		//console.log(this);
		$('#lockOverlay3 #lock')
			.addClass('animated shake')
			.one(endAni, function(){
				$(this).removeClass('animated shake');
		});
	})
	
	/* Fourth Season Button */
	$('#lockOverlay4').on('mouseover',function(){
		//console.log(this);
		$('#lockOverlay4 #lock')
		.addClass('animated shake')
			.one(endAni, function(){
				$(this).removeClass('animated shake');
		});
	})
	
	
	/* Utilies */

	function addAnimation(selector,ani){

		$(selector).on('mouseover',function(){
			//console.log("Mouse Over" + selector + " " + ani);
			
			$(selector).addClass('animated '+ ani).one(endAni, function(){
				$(this).removeClass('animated '+ ani);
			});
		})
	}



	// Updated FUNCTION - Function to animate slider captions 
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';
        
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    
     
});



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
