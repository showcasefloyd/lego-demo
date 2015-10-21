$(function(){
	
	//fixHeight();
		
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
		
		//fixHeight();
	});
	
	/* OLD TEST JS */
	$('#buttonCover1').on('mouseover',function(){
		$(this).toggle("slow" );
	});
	
	
	$('#buttonCover2').on('mouseover',function(){
		$('#buttonCover2 #cover').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated shake');
		});
	});
	
	function addWelcomAnimation(button,ani){
		$(button +' #enterButton').on('mouseover',function(){
			$(button +' #enterButton').addClass('animated '+ ani).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated '+ ani);
			});
		});
	}
	
	
	/* Working Animations */
	/* First Button */
	/*
	$('#buttonWrapper1 #enterButton').on('mouseover',function(){
		$('#buttonWrapper1 #enterButton').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated tada');
		});
	});
	*/
	$('#buttonWrapper1').on('mouseover',function(){
		$('#buttonWrapper1').addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated pulse');
		});
	});
	addWelcomAnimation('#buttonWrapper1','tada');
	

	/* Second Button */
	$('#buttonWrapper2').on('mouseover',function(){
		$('#buttonWrapper2 #lockOverlay #lock')
			.addClass('animated swing')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated swing');
			});
	});
	
	$('#buttonWrapper2').on('click',function(){
		
		$('#buttonWrapper2 #lockOverlay #lock img')
			.attr('src', 'img/unlock.png')
			.addClass('animated zoomOutDown')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
				$('#buttonWrapper2 #lockOverlay').addClass('animated slideOutDown');
				
				$('#buttonWrapper2').on('mouseover',function(){
					$('#buttonWrapper2').addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
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
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated shake');
		});
	})
	
	/* Four Button */
	$('#buttonWrapper4').on('mouseover',function(){
		$('#buttonWrapper4 #lockOverlay #lock').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated shake');
		});
	})
	
})

function fixHeight() {
    var $h = $('#overlay2').height();
    //jQuery('#myDiv').css('background-image').height();
    //console.log($('#buttonWrapper1').css('height'));
	 console.log($('overlay2').css('height'));

    $('#buttonCol').height($h);
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

