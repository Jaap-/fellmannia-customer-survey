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
                    if(ball.status != 3){
                        if(ball.selected){
                            ball.deselect();
                        }else{
                            ball.select();
                        }
                    }else{
                        window.BallsCollection.loadAnswers(ball.id);
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

        $('#boxMonthlyQuestion .boxClose').click(function(){
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
        
        $('#boxMonthlyQuestion .boxTitle').css({
            'width':width+'px',
            'font-size': (width/20 < 84) ? width/20+'px' : '84px'
        });
        
        $('#boxMonthlyQuestion .boxContent').css({
            'top':(width/5 < 250) ? width/5+'px' : '250px'
        });
    },
    loadBalls: function(wantedCategory){
        if(this.balls.length != 0){
            this.clearBalls(0);
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
                            
                            if(item.status == 3){
                                BallsCollection.balls.push(new Ball(item.id, 3, item.text, BallsCollection.ballSizeMax, color, 0, 0));
                            }else{
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
                            }
                        });
					
                        BallsCollection.balls.forEach(function(ball){
                            if(ball.status != 3){
                                var value = ball.thumbCountPlus - ball.thumbCountMinus;
                                ball.size = translate(value, BallsCollection.ballValueMin, BallsCollection.ballValueMax, BallsCollection.ballSizeMin, BallsCollection.ballSizeMax);
                                ball.draw();
                            }else{
                                ball.draw();
                            }
                            
                        });			
                    }
                }
            });
        });
    },
    clearBalls: function(f){
        $('div.sphere').fadeOut('fast', function(){
            $(this).remove();
        });
        this.balls.forEach(function(ball){
            ball.resetAnimation();
        });
        this.balls = [];
        
        setTimeout(function(){
            if(typeof f == 'function') f();
        }, 500);
    },
    loadAnswers: function(qID){
        $.ajax({
            url: window.serverUrl+'question/comments/'+qID,
            type: "GET",
            dataType: 'json',
            success: function(data){
                var $answers = $('#boxMonthlyQuestion .boxContent');
                var $count = $('#boxMonthlyQuestion .boxTitle span.answerCount');
                $answers.html('');
                if(data.status != 0){
                    $.each(data.comments, function(i, item){
                        $answers.append('<div>'+item.text+'</div>');
                        $count.html(i+1);
                    });
                    $('#boxMonthlyQuestion').fadeIn('fast');
                }else{
                    showMessage('Jokin meni pieleen');
                }
            }
        });
    }
};
