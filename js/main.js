window.serverUrl = 'http://lamk.net/api';window.currentCategory = 1;$(document).ready(function() {
	var height = $(window).height();
	$("#pallot").css("height",height-60+"px");	/*		 * Etusivulle siirtyminen, klikkauksesta feidataan pallomeri pois ja frontpage tilalle	 	 */		 $('#pallomeri').on("click", "#etusivu",function() {			$('#frontpage').fadeIn('slow');			$('#pallomeri').fadeOut('slow');			$('#palaute_ikkuna').fadeOut('slow');		});		$('#pallomeri-instructions-box').click(function(){			$(this).fadeOut('fast');			return false;		});});   