function Ball(id, status, text, size, color, thumbCountPlus, thumbCountMinus) {
	this.id = id;
	this.status = 0;	// 0=negative, 1=neutral, 2=positive
	this.position = new Point(rand(world.x1, world.x2-size), rand(world.y1, world.y2-size));
	$('div.balls').append('<div class="clearfix sphere '+color+' float-left" style="display:none;" data-id="'+id+'" data-status="'+status+'" data-size="'+size+'">\
						<!--<div class="absolute sphere-top full">\
							<div class="margin-a like-icon hide"></div>\
						</div>-->\
						<p>'+text+'</p>\
						<!--<div class="absolute sphere-bottom full">\
							<div class="margin-a dislike-icon hide"></div>\
						</div>-->\
					</div>');
	this.size = size;
	this.animationInterval;
	this.active = false; // animation
	this.selected = false;
	this.thumbCountPlus = thumbCountPlus;
	this.thumbCountMinus = thumbCountMinus;
}
Ball.prototype = {
	remove: function() {
		$('div.sphere[data-id="'+this.id+'"]').fadeOut('fast', function(){
			$(this).remove();
		});
		
		/*for(var i=0; i<=balls.length; i++){
			if(parseInt(balls[i].id) == parseInt(this.id)){
				console.log('i: '+i+', removing ball #'+parseInt(balls[i].id)+', ballCount: '+balls.length);
				balls.splice(i,1);
				break;
			}
		}*/
	},
	setAnimation: function() {
		var ballo = this;
		this.animationInterval = setInterval(function() {
			ballo.animate();
		}, window.BallsCollection.animationTime*1000);
		ballo.animate();
		this.active = true;
	},
	resetAnimation: function() {
		clearInterval(this.animationInterval);
		$('.sphere[data-id="'+this.id+'"]').clear();
		this.active = false;
		
		this.position.x = parseInt($('.sphere[data-id="'+this.id+'"]').css('left'));
		this.position.y = parseInt($('.sphere[data-id="'+this.id+'"]').css('top'));
	},
	animate: function(){
		//this.animate();
		var old_x = this.position.x;
		var old_y = this.position.y;
		
		// update position
		this.position.x = rand(world.x1, world.x2-this.size);
		this.position.y = rand(world.y1, world.y2-this.size);

		var ballo = this;
		//$.framerate(60);
		$('.sphere[data-id="'+this.id+'"]').tween({
			left:{
				start: old_x,
				stop: this.position.x,
				time: 0,
				units: 'px',
				duration: window.BallsCollection.animationTime,
				effect:'linear'
			},
			top:{
				start: old_y,
				stop: this.position.y,
				time: 0,
				units: 'px',
				duration: window.BallsCollection.animationTime,
				effect:'linear'
			},
			onFrame: function(elem){
				//var elemID = $(elem).attr('data-id');
				//console.log(ballo);
				//ballo.position.x = $(elem).css('left');
				//ballo.position.y = $(elem).css('top');
			}
		}).play();
	},
	draw: function(){
		if(!this.active){
			var $element = $('.sphere[data-id="'+this.id+'"]').fadeIn('slow');
			$element.css({
				'position':'absolute', 
				'top':this.position.y, 
				'left':this.position.x,
				'width':this.size + 'px', 
				'height':this.size + 'px', 
				'font-size': Math.floor(this.size / window.BallsCollection.fontScale) + 'px'
			});

			$('.sphere p').each(function() {
				$(this).css({
					'width':this.size+'px',
					'position':'relative',
					'top':'50%',
					'overflow':'hidden',
					'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'});
			});
			
			var ballo = this;
			$element.draggable({
				start: function(event, ui){
					// pysäytetään animaatio
					ballo.resetAnimation();
					//$element.css('z-index', '10');
				},
				stop: function(event, ui){
					// aloitetaan animaatio siitä kohtaa mihin on raahattu
					if(!ballo.selected){
						ballo.position.x = parseInt($element.css('left'));
						ballo.position.y = parseInt($element.css('top'));
						ballo.setAnimation();
					}
				}
			});

			this.setAnimation();
		}
		
	},
	changeSize: function(size){
		this.size = size;
		var $element = $('.sphere[data-id="'+this.id+'"]');
		$element.css({
			'width':this.size + 'px', 
			'height':this.size + 'px', 
			'font-size': Math.floor(this.size / window.BallsCollection.fontScale) + 'px'
		});
	  
		$('.sphere p').each(function() {
			$(this).css({
				'position':'relative', 
				'top':'50%', 
				'overflow':'hidden', 
				'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'
			});
		});
	},
	select: function(){
		this.selected = true;
		this.resetAnimation();
		var ballo = this;
		var $element = $('.sphere[data-id="'+this.id+'"]');
		
		var size = 0;
		if(world.x2 <= world.y2){
			// jos leveys pienempi kuin korkeus
			size = world.x2-10;
		}else{
			size = world.y2-10;
		}
		
		$element.css('z-index', 100).animate({
			'position':'absolute',
			'top':'50%',
			'left':'50%',
			'margin-left':0-size/2,
			'margin-top':0-size/2,
			'width':size+'px',
			'height':size+'px'
		}, 1000);
		$element.children().each(function() {
			$(this).animate({
				'position':'relative',
				'top':'50%',
				'overflow':'hidden',
				//'margin-top':-(parseInt($(this).height()+40) / 2) + 'px',
				'font-size': Math.floor(size / (window.BallsCollection.fontScale+4)) + 'px'
			}, 1000, function(){
				$element.children().each(function(){
					$(this).css('margin-top',-(parseInt($(this).height()) / 2) + 'px');
				});
				
				// peukut
				// world.y2 - size / 2
				var imgWidth = $('img.like-icon').width();
				$('img.like-icon').css({'margin-left': imgWidth/6, 'top':(world.y2-size)/2+20+'px'}).attr('data-id', ballo.id).fadeIn('slow');
				$('div#likeCount').css({
					'margin-left': -(world.x2/12), 
					'top': (world.y2-size)/2+imgWidth/2+'px', 
					'font-size': Math.floor(size / (window.BallsCollection.fontScale+4)) + 'px'
				}).html(ballo.thumbCountPlus).fadeIn('slow');
				
				$('img.dislike-icon').css({'margin-left': -imgWidth, 'bottom':(world.y2-size)/2+20+'px'}).attr('data-id', ballo.id).fadeIn('slow');
				$('div#dislikeCount').css({
					'margin-left': world.x2/20+'px', 
					'bottom': (world.y2-size)/2+imgWidth/2+'px', 
					'font-size': Math.floor(size / (window.BallsCollection.fontScale+4)) + 'px'
				}).html(ballo.thumbCountMinus).fadeIn('slow');
			});
		});
	},
	deselect: function(){
		this.selected = false;
		var ballo = this;
		
		$('img.like-icon, img.dislike-icon, div#likeCount, div#dislikeCount').fadeOut('slow');
		
		var $element = $('.sphere[data-id="'+this.id+'"]');
		$element.animate({
			'position':'absolute',
			'top':this.position.y,
			'left':this.position.x,
			'margin-left':0-this.size/2,
			'margin-top':0-this.size/2,
			'width':this.size+'px',
			'height':this.size+'px'
		}, 1000).css('z-index', 0);
		$element.children().each(function() {
			$(this).animate({
				'position':'relative',
				'top':'50%',
				'overflow':'hidden',
				'margin-top':0-(parseInt($(this).height()+10) / 2) + 'px',
				'font-size': Math.floor(ballo.size / window.BallsCollection.fontScale) + 'px'
			}, 1000, function(){
				$element.children().each(function(){
					$(this).css('margin-top',-(parseInt($(this).height()+15) / 2) + 'px');
				});
				ballo.setAnimation();
			});
		});
	}
};
