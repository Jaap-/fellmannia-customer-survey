// Asetukset
	var settings = {
		// Pallojen minikoko pikselein?
		minsize: 100,
		// Pallojen maksimikoko pikselein?
		maxsize: 350,
		// Fonttien skaalautumisen kerroin
		fontscale: 12
	}

$(document).ready(function(d) {
	loadBalls(5);
	
	// Liikkumis-funktion suoritus
	shuffle();
	
	// Peukuttaminen +1
	$('.like-icon', this).click(function() {
		var id = $(this).parent().parent().attr("data-id");
		//$.post("pallot.php", {id:id, value:'plus', 'thumbs':true}, function(data) {})
		$.ajax({
			url: window.serverUrl,
			data: {
				act:'likecomment',
				commentid: id
			},
			type: "GET",
			dataType: 'jsonp',
			crossDomain: true,
			cache : "false",
			success: function(data){
				if(data.status != 0){
					alert('Liked!');
				}else{
					$.each(data.errors, function(i, item){
						alert(item);
					});
				}
			}
		});
		return false;
	})
	  
	// Peukuttaminen -1
	$('.dislike-icon', this).click(function() {
		var id = $(this).parent().parent().attr("data-id");
		//$.post("pallot.php", {id:id, value:'minus', 'thumbs':true}, function(data) {})
		$.ajax({
			url: window.serverUrl,
			data: {
				act:'dislikecomment',
				commentid: id
			},
			type: "GET",
			dataType: 'jsonp',
			crossDomain: true,
			cache : "false",
			success: function(data){
				if(data.status != 0){
					alert('Disliked!');
				}else{
					$.each(data.errors, function(i, item){
						alert(item);
					});
				}
			}
		});
		return false;
	});
	  
	// Pallon valinta ja siirto keskelle
	$('#pallot').on('click', '.sphere', function() {
		var size = settings['maxsize'] + 'px', top = ($(window).height() / 2) - (settings['maxsize'] / 2) + 'px', left = ($(window).width() / 2) - (settings['maxsize'] / 2) + 'px';
	  
		// Pallojen syvyyskorjaus
		$(this).each(function() {
			$(this).css('z-index', '1')
		})
	  
		// Pallon eteensiirtymisen animaatio
		$(this).animate({
			'position':'absolute', 
			'top':top, 
			'left':left, 
			'width':size, 
			'height':size, 
			'font-size': Math.floor(settings['maxsize'] / 10) + 'px', 
			'z-index':'100'
		}, 1000, function() {
			// Eteensiirretyn pallon tekstien keskitt?minen pystysuunnassa
			$('p', this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($('p', this).height() + 20) / 2) + 'px'});
		
			// Kuvakkeet skaalaaminen
			var scale = Math.round(((size - settings["minsize"]) / (settings["maxsize"] - settings["minsize"])) * 100);
		
			// Liian pieneksi skaalautumisen rajoitus
			scale = (scale < 10) ? '10%' : scale + '%';
		
			// Kuvan n?ytt?minen skaalautumisen j?lkeen
			$('.like-icon', this).css('background-size', scale).fadeIn(function() {
				$(this).css("cursor", "pointer");
			});
		
			// Kuvan n?ytt?minen skaalautumisen j?lkeen
			$('.dislike-icon', this).css('background-size', scale).fadeIn(function() {
				$(this).css("cursor", "pointer");
			});
	 
		});
		return false;
	});
	
});


// Pallojen liikkumisen funktio
var shuffle = function(s) {
	$('.sphere').delay(1000).each(function() {
		var x2 = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20)), y2 = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20));
		var size = rand(settings["minsize"], settings["maxsize"]), scale = Math.round(((size - settings["minsize"]) / (settings["maxsize"] - settings["minsize"])) * 100);
		scale = (scale < 10) ? '10%' : scale + '%';
		$('.like-icon, .dislike-icon').fadeOut()
		$("p", this).animate({'opacity':'0'}, 1000, function() {
			$(this).parent().animate({'position':'absolute', 'top':y2, 'left':x2, 'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / settings["fontscale"]) + 'px'}, 3000, function() {
				$("p", this).each(function() {
					$(this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'})
					$(this).animate({'opacity':'1'}, 1000)
				})
			})
		})
	})
  
	setTimeout(shuffle, 10000);
}

function loadBalls(wantedCategory){
	if($('.sphere').length != 0){
		$('.sphere').fadeOut('fast');
	}
	$('div.clones').empty().show(function(){
		$.ajax({
			url: window.serverUrl,
			data: {
				act:'getcomments',
				catid: wantedCategory
			},
			type: "GET",
			dataType: 'jsonp',
			crossDomain: true,
			cache : "false",
			success: function(data){
				if(data.status != 0){
					
					$(data.comments).each(function(i,item){
						var color = '';
						if (item.type == 0){
							color = 'green';
						}
						else if(item.type == 2){
							color = 'yellow';
						}else{
							color = 'grey';
						}
						
						$('div.clones').append('\
						<div class="clearfix sphere '+color+' float-left" data-id="'+item.id+'">\
							<!--<div class="absolute sphere-top full">\
								<div class="margin-a like-icon hide"></div>\
							</div>-->\
							<p>'+item.text+'</p>\
							<!--<div class="absolute sphere-bottom full">\
								<div class="margin-a dislike-icon hide"></div>\
							</div>-->\
						</div>');
						$('.like-icon, .dislike-icon').fadeOut();
					});

					// Jokaisen pallon funktiot
					$('.sphere').each(function(){
						// Pallojen sijaintien satunnaistaminen
						var x = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20));
						var y = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20));
						$(this).css({'position':'absolute', 'top':y, 'left':x});
					  
						// Pallojen koot minimin ja maksimin v?lilt?
						var size = rand(settings["minsize"], settings["maxsize"]);
						$(this).css({'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / settings["fontscale"]) + 'px'});
					  
						// Pallon py?ristys (ei v?ltt?m?tt? tarvii en??)
						var h = $(this).height(), w = $(this).width();
						if (w < h) { $(this).css({'width':h + 'px'}) } else if (h < w) { $(this).css({'height':w + 'px'}) }
					});
					
					// Tekstikent?n keskitys pystysuunnassa
					$('.sphere p').each(function() {
						$(this).css({'position':'relative', 'top':'50%', 'overflow':'hidden', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'});
					});
				
					
				}
			}
		});
	});
}
  
  
// Javascriptin Math.random() muutetaan php:n tavoin muotoon rand()
function rand(a,b) {return Math.floor((Math.random()*(b-a))+a);}

