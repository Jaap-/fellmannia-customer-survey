function BallsCollection(){
    this.balls = [];
    this.ballSizeMin = 150;
    this.ballSizeMax = 250;
    this.ballValueMax = 0;
    this.ballValueMin = 999999999;
    
    this.fontScale = 12;
    this.animationTime = 60;
	
    this.initialize();
}
BallsCollection.prototype = {
    initialize: function(){
        this.onResize();
        
        $(document).on('click', '.sphere', function(){
            var id = $(this).attr('data-id');
			
            window.BallsCollection.balls.forEach(function(ball) {
                if(parseInt(ball.id) == parseInt(id)){
                    if(ball.selected){
                        ball.deselect();
                    }else{
                        ball.select();
                    }
                }
            });
            return false;
        });
		
        // like
        $(document).on('click', '.like-icon', function(){
            var id = $(this).attr('data-id');
			
            $.ajax({
                url: window.serverUrl+'comments/like/'+id,
                type: "POST",
                dataType: 'json',
                cache : "false",
                success: function(data){
                    if(data.status != 0){
                        showMessage('Palautetta tykätty!');
                    }else{
                        showMessage(data.msg);
                    }
                }
            });
            return false;
        });
		
        // dislike
        $(document).on('click', '.dislike-icon', function(){
            var id = $(this).attr('data-id');
			
            $.ajax({
                url: window.serverUrl+'comments/dislike/'+id,
                type: "POST",
                dataType: 'json',
                cache : "false",
                success: function(data){
                    if(data.status != 0){
                        showMessage('Palautetta ei-tykätty!');
                    }else{
                        showMessage(data.msg);
                    }
                }
            });
            return false;
        });

        $('#boxMonthlyQuestions .boxClose').click(function(){
            $(this).parent().fadeOut('fast');
            return false;
        });
    },
    onResize: function(){
        var width = $(window).width();
        var height = $(window).height();
        
        if(width >= height){
            if(!(width/3 > this.ballSizeMax)){
                this.ballSizeMax = width/3;
            }
            if(!(width/6 > this.ballSizeMin)){
                this.ballSizeMin = width/6;
            }
        }else{
            if(!(height/3 > this.ballSizeMax)){
                this.ballSizeMax = height/3;
            }
            if(!(height/6 > this.ballSizeMin)){
                this.ballSizeMin = height/6;
            }
        }
    },
    loadBalls: function(wantedCategory){
        if(this.balls.length != 0){
            this.clearBalls();
            this.loadBallsAjax(wantedCategory);
        }else{
            this.loadBallsAjax(wantedCategory);
        }
    },
    loadBallsAjax: function(wantedCategory){
        var BallsCollection = this;
        $('div.balls').show(function(){
            $.ajax({
                url: window.serverUrl+'comments/'+wantedCategory+'/0',
                type: "GET",
                dataType: 'json',
                cache : "false",
                success: function(data){
                    if(data.status != 0){
                        $.each(data.comments, function(i,item){
                            var color = '';
                            if (item.status == 0){
                                color = 'grey';
                            }
                            else if(item.status == 1){
                                color = 'yellow';
                            }
                            else if(item.status == 2){
                                color = 'green';
                            }
                            else if(item.status == 3){
                                color = 'blue';
                            }
							
                            var thumbCountPlus = 0;
                            var thumbCountMinus = 0;
							
                            if(parseInt(item.thumbcountplus) >= 0){
                                thumbCountPlus = item.thumbcountplus;
                            }
                            if(parseInt(item.thumbcountminus) >= 0){
                                thumbCountMinus = item.thumbcountminus;
                            }
                            
                            var value = thumbCountPlus - thumbCountMinus;
                            if(value > BallsCollection.ballValueMax){
                                BallsCollection.ballValueMax = value;
                            }
                            if(value < BallsCollection.ballValueMin){
                                BallsCollection.ballValueMin = value;
                            }
							
                            var size = BallsCollection.ballSizeMin;
                            BallsCollection.balls.push(new Ball(item.id, item.status, item.text, size, color, thumbCountPlus, thumbCountMinus));
							
                        });
					
                        BallsCollection.balls.forEach(function(ball){
                            var value = ball.thumbCountPlus - ball.thumbCountMinus;
                            ball.size = translate(value, BallsCollection.ballValueMin, BallsCollection.ballValueMax, BallsCollection.ballSizeMin, BallsCollection.ballSizeMax);
                            ball.draw();
                        });			
                    }
                }
            });
        });
    },
    clearBalls: function(){
        $('div.sphere').fadeOut('fast', function(){
            $(this).remove();
        });
        this.balls.forEach(function(ball){
            ball.resetAnimation();
        });
        this.balls = [];
    },
    loadMonthlyQuestions: function(commentID){
        $.ajax({
            url: window.serverUrl+'comments/question/'+commentID,
            type: "GET",
            dataType: 'json',
            success: function(data){
                if(data.status != 0){
                    $.each(data.comments, function(i, item){
						
                        });
                    $('#boxMonthlyQuestions').fadeIn('fast');
                }else{
				
                }
            }
        });
    }
};
