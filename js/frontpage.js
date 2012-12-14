$(document).ready(function(){
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
			changewidth();
			// ladataan kategoriat ja pallot
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
});