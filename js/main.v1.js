$(function(){
	var endAni = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	fixHeight();
		
	$('#ninjago-logo').addClass('animated fadeIn');
	
	$(".lego-logo").on('click',function(){
		if(checkWindowSize(990)){
			$('#hidden-menu').slideToggle("slow" );
		}
	});
	
	$( window ).resize(function() {
		//if hidded is false it's showing
		if( (!$( "#hidden-menu" ).is( ":hidden" )) && ($(window).width() > 990) ){
			$('#hidden-menu').hide( "slow" );
		}
		
		fixHeight();
	});
	
	/* OLD TEST JS */
	$('#buttonCover1').on('mouseover',function(){
		$(this).toggle("slow" );
	});
	
	
	$('#buttonCover2').on('mouseover',function(){
		$('#buttonCover2 #cover').addClass('animated shake').one(endAni, function(){
			$(this).removeClass('animated shake');
		});
	});
	
	function addWelcomAnimation(selector,ani){
		$(selector +' #enterButton').on('mouseover',function(){
			$(selector +' #enterButton').addClass('animated '+ ani).one(endAni, function(){
				$(this).removeClass('animated '+ ani);
			});
		});
	}
	
	
	/* Working Animations */
	/* First Button */
	/*
	$('#buttonWrapper1 #enterButton').on('mouseover',function(){
		$('#buttonWrapper1 #enterButton').addClass('animated tada').one(endAni, function(){
			$(this).removeClass('animated tada');
		});
	});
	*/
	$('#buttonWrapper1').on('mouseover',function(){
		$('#buttonWrapper1').addClass('animated pulse').one(endAni, function(){
			$(this).removeClass('animated pulse');
		});
	});
	addWelcomAnimation('#buttonWrapper1','tada');
	

	/* Second Button */
	$('#buttonWrapper2').on('mouseover',function(){
		$('#buttonWrapper2 #unlockOverlay #lock')
			.addClass('animated swing')
			.one(endAni, function(){
				$(this).removeClass('animated swing');
			});
	});
	
	$('#buttonWrapper2').on('click',function(){
		
		$('#buttonWrapper2 #unlockOverlay #lock img')
			.attr('src', 'img/unlock.png')
			.addClass('animated zoomOutDown')
			.one(endAni, function(){
				
				$('#buttonWrapper2 #unlockOverlay').addClass('animated slideOutDown');
				
				$('#buttonWrapper2').on('mouseover',function(){
					$('#buttonWrapper2').addClass('animated pulse').one(endAni, function(){
						$(this).removeClass('animated pulse');
					});
				});
					
				addWelcomAnimation('#buttonWrapper2','bounce');
				
				
				
			});
	});
	
	/* Third Button */
	$('#buttonWrapper3').on('mouseover',function(){
		$('#buttonWrapper3 #lockOverlay #lock')
			.addClass('animated shake')
			.one(endAni, function(){
				$(this).removeClass('animated shake');
		});
	})
	
	/* Four Button */
	$('#buttonWrapper4').on('mouseover',function(){
		$('#buttonWrapper4 #lockOverlay #lock').addClass('animated shake').one(endAni, function(){
			$(this).removeClass('animated shake');
		});
	})
	
})

function fixHeight() {
    var $h = $(window).height();
    //jQuery('#myDiv').css('background-image').height();
    //console.log($('#buttonWrapper1').css('height'));
	
	//$("tabs").css('height','650px !important;');
	
	//$('custom-height').attr('style','height:500px !important');
	//$('#buttonCol1').css("height",'400px !important');
    $('#footer-wrap').height($h * .5);
}
	
	
	
function checkWindowSize(size) {
   var pageWidth = $(window).width();  
   if ( pageWidth <= size ) {
   		return true;
   }
   return false;
}


/* GET CSS BG HEIGHT */
function getBGHeight(div){

	var img = new Image;
	img.src = $(div).css('background-image').replace(/url\(|\)$/ig, "");
	var bgImgWidth = img.width;
	var bgImgHeight = img.height;
	
	console.log (bgImgHeight);

}

