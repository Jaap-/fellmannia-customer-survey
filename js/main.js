window.serverUrl = 'http://apps.homelinux.net/fellmannia/api/';

window.fontScale = 20;
window.fontSizeMax = 40;

var world = {
	x1: 0,
	y1: 100,
	x2: $(window).width(),
	y2: $(window).height()
};

$(document).ready(function(){
	var height = $(window).height();
	$("#pallot").css("height",height-60+"px");	
	
	/*
	 * Etusivulle siirtyminen, klikkauksesta feidataan pallomeri pois ja frontpage tilalle	
	 */	
	$('#pallomeri').on("click", "#etusivu",function(){
		$('#frontpage').fadeIn('slow');
		$('#pallomeri').fadeOut('slow');
		$('#palaute_ikkuna').fadeOut('slow');
		window.BallsCollection.clearBalls();
	});
	$('#pallomeri-instructions-box').click(function(){
		$(this).fadeOut('fast');
		return false;
	});
	
	$('#frontpage').fadeIn('slow');


	$('#frontpage-info').click(function(){
		$('#frontpage-info-box').fadeIn('slow');
		return false;
	});


	$('#frontpage-info-box').click(function(){
		$(this).fadeOut('slow');
		return false;
	});


	$('#frontpage-gotoapp').click(function(){
		$('#frontpage').animate({
			opacity: 0
		},1000, function(){
			$(this).css({'display':'none', 'opacity':1});
			$('#pallomeri').fadeIn('slow');
			$('#pallomeri-instructions-box').fadeIn('slow');
			window.BallsCollection.loadBalls(1);
			window.CategoryMenu.changeWidth();
		});
		return false;
	});

	$('#frontpage-gotomap').click(function(){
		window.open(
			'http://www.fellmannia.fi/flash/fellmanniamap.swf',
			'_blank'
		);
		return false;
	});

	$('#frontpage-link-lahti').click(function(){
		window.open(
			'http://www.lahti.fi',
			'_blank'
		);
		return false;
	});

	$('#frontpage-link-matkahuolto').click(function(){
		window.open(
			'http://www.matkahuolto.fi',
			'_blank'
		);
		return false;
	});

	$('#frontpage-link-vr').click(function(){
		window.open(
			'http://www.vr.fi',
			'_blank'
		);
		return false;
	});

	$(document).on("click", "#addFeedback",function(){
		var $boxFeedback = $("div#boxFeedback");
		window.Feedback.clearFields();
		if($boxFeedback.is(":visible")){
			$boxFeedback.fadeOut("slow");
		}else{
			$boxFeedback.fadeIn("slow");
		}
	});	
	
	$(window).blur(function(){
		if(window.BallsCollection.balls.length != 0){
			window.BallsCollection.balls.forEach(function(ball){
				ball.resetAnimation();
			});
		}
	});
	$(window).focus(function(){
		if(window.BallsCollection.balls.length != 0){
			window.BallsCollection.balls.forEach(function(ball){
				ball.setAnimation();
			});
		}
	});
	$(window).resize(function(){
		window.CategoryMenu.changeWidth();
		world.x2 = $(window).width();
		world.y2 = $(window).height();
	});
	
	init();
});   

function init(){
	var width = $(window).width();
	var fontSize = width/window.fontScale;
	if(fontSize > 40){fontSize = window.fontSizeMax;}
	
	$('#pallomeri-instructions-box span, #frontpage-info-box span').css({
		'font-size': fontSize+'px'
	});
	
	window.Feedback = new Feedback();
	window.BallsCollection = new BallsCollection();
	window.CategoryMenu = new CategoryMenu();
}

// Javascriptin Math.random() muutetaan php:n tavoin muotoon rand()
function rand(a,b) {return Math.floor((Math.random()*(b-a))+a);}

function showMessage(msg){
	$('#boxMessage span').html(msg);
	$('#boxMessage').fadeIn('fast', function(){
		$(this).delay(3000).fadeOut('fast');
	});
}

