$(function(){           
    var step = 1;
    var current = 0;
    var maximum = $(".kategoriat ul li").size();
    var visible = 2;
    var speed = 500;
    var liSize = 120;
    var height = 60;    
    var ulSize = liSize * maximum;
    var divSize = liSize * visible; 

    $('.kategoriat').css("width", "auto").css("height", height+"px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative");
    $(".kategoriat ul li").css("list-style","none").css("display","inline");
    $(".kategoriat ul").css("width", ulSize+"px").css("left", -(current * liSize)).css("position", "absolute").css("white-space","nowrap").css("margin","0px").css("padding","5px");

    $(".kategoriat").swipeleft(function(event){
        if(current + step < 0 || current + step > maximum - visible) {return; }
        else {
            current = current + step;
            $('.kategoriat ul').animate({left: -(liSize * current)}, speed, null);
        }
        return false;
    });

    $(".kategoriat").swiperight(function(){
        if(current - step < 0 || current - step > maximum - visible) {return; }
        else {
            current = current - step;
            $('.kategoriat ul').animate({left: -(liSize * current)}, speed, null);
        }
        return false;
    });         
});