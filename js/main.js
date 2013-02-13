window.serverUrl = 'http://apps.homelinux.net/fellmannia/api/';

window.fontScale = 20;
window.fontSizeMax = 40;

window.loginCheckInterval = 30;

var world = {
    x1: 0,
    y1: 100,
    x2: $(window).width(),
    y2: $(window).height()
};

$(document).ready(function(){
    var height = $(window).height();
    $("#pallot").css("height",height-60+"px");	
	
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
            $(this).css({
                'display':'none', 
                'opacity':1
            });
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
        window.Feedback.changeContent();
        
        if($boxFeedback.is(":visible")){
            $boxFeedback.fadeOut("slow");
        }else{
            $boxFeedback.fadeIn("slow");
        }
    });	
    
    $('#frontpage-admin, #backToAdmin').click(function(){
        window.location = 'staff/';
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
        window.BallsCollection.onResize();
        world.x2 = $(window).width();
        world.y2 = $(window).height();
    });
	
    $(window).keypress(function(event) {
        if(event.which == 167){
            $('#boxDebug').slideToggle('fast');
        }
    });
    
    $('#settingsSave').click(function(){
       window.loginCheckInterval = parseInt($('#settingsLoginCheck').val()); 
       var newCommentsInterval = $('#settingsNewComments').val(); 
    });
	
    init();
});   

function init(){
    var width = $(window).width();
    var fontSize = width/window.fontScale;
    if(fontSize > 40){
        fontSize = window.fontSizeMax;
    }
	
    $('#pallomeri-instructions-box span, #frontpage-info-box span, #boxMessage span').css({
        'font-size': fontSize+'px'
    });
    
    loginCheck();
    setInterval(function() {
        loginCheck();
    }, window.loginCheckInterval*1000);
    
    window.Feedback = new Feedback();
    window.BallsCollection = new BallsCollection();
    window.CategoryMenu = new CategoryMenu();
}

function rand(a,b) {
    return Math.floor((Math.random()*(b-a))+a);
}

/**
 * Convert a value from old range to new
 * @param a Old value
 * @param x1 Old range min
 * @param x2 Old range max
 * @param y1 New range min
 * @param y2 New range max
 */
function translate(a,x1,x2,y1,y2) {
    return Math.floor((((a-x1)*(y2-y1))/(x2-x1))+y1);
}

function showMessage(msg){
    $('#boxMessage span').html(msg);
    $('#boxMessage').fadeIn('fast', function(){
        $(this).delay(2000).fadeOut('fast');
    });
}

function loginCheck(f){
    $.ajax({
        url: window.serverUrl+'logincheck',
        type: "POST",
        dataType: 'json',
        cache : "false",
        success: function(data){
            if(data.status != 0){
                $('#frontpage-admin, #backToAdmin').css('display', 'block');
                window.loggedIn = true;
            }else{
                $('#frontpage-admin, #backToAdmin').css('display', 'none');
                window.loggedIn = false;
            }
        }
    });
}