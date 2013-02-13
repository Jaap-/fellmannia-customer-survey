function CategoryMenu(){
    this.width = $(window).width()/3;
    this.position = 0; // indicates selected category
    this.catCount = 0;
    this.n;
    this.currentCategory = 1;
    this.categoriesLoaded = false;
	
    this.fontScale = 14;
    this.fontSizeMax = 80;
	
    this.initialize();
}
CategoryMenu.prototype = {
    initialize: function(){
        this.changeWidth();
        this.loadCategories();
        
        $('#arrowLeft').click(function(){
            window.CategoryMenu.transitionRight();
            return false;
        });
        $('#arrowRight').click(function(){
            window.CategoryMenu.transitionLeft();
            return false;
        });
    },
    layout: function(){	// adjusts the height of div "content"
        var height = $(window).height();
        $("#content").css("height",height-60+"px");
    },
    changeWidth: function(){ // adjust width of category divs
        this.width = $(window).width()/3;
		
        var fontSize = $(window).width()/this.fontScale;
        if(fontSize > this.fontSizeMax){
            fontSize = this.fontSizeMax;
        }
        $("#container").css({
            'margin-left': +-((this.position-1)*this.width)+"px" // adjusts the category positions 
        });	
        $('#categories').css({
            'height': fontSize*2.4+'px'
        });
        $('.textcontainer > h1').css({
            'font-size': fontSize+'px',
            'margin': 0
        });
        $('#container2').css({
            'top': fontSize*1.1+"px",
            'height': fontSize*1.75+"px"
        });	
        $('.instructiontext').css({
            'width': $(window).width(),
            'font-size': fontSize/2+"px"
        });	

        world.y1 = fontSize*2.4;
		
        var i;
        var textwidth = 0;
        var compare;
        var count = this.catCount;
        for(i = 0; i <= this.catCount; i++){	// loops through categories and adjusts them
            $("#header"+i).css("width",+this.width+"px");
            $("#header"+i).css("margin-left",+(-(this.catCount-count)*this.width)+"px");
            count++;
            compare = $("#header"+i+" > div").innerWidth();
            if(compare > textwidth){
                textwidth = compare;
            }
        }
        if(textwidth >= this.width){
            count = this.catCount;
            for(i = 0; i <= this.catCount; i++){
                $("#header"+i).css("width",+textwidth+"px");
                $("#header"+i).css("margin-left",+(-(this.catCount-count)*textwidth)+"px");
                count++;
                var windowWidth = $(window).width();
                $("#container").css("margin-left",+-(((this.position-1)*textwidth)+(textwidth*3-windowWidth)/2)+"px");
            }
        }
    },
    transitionLeft: function(){	// swipe left
        $("#instruction"+this.position).hide();
        this.width = $("#header5").innerWidth();
        this.position++;	// updates the indicator of selected category
        this.n = $("#header"+this.position).attr("data-id");
        var CategoryMenu = this;
		
        $("#container").animate({
            "margin-left":"-="+CategoryMenu.width+"px"
        }, "slow", function(){		// category movement by animating margin change
            if(CategoryMenu.position>CategoryMenu.catCount-1){	// checks if categories are going too far
                CategoryMenu.position--;	// update position indicator
                CategoryMenu.n = $("#header"+CategoryMenu.position).attr("data-id");
                $("#container").animate({
                    "margin-left":"+="+CategoryMenu.width+"px"
                }, "slow", function(){	// if categories are going too far move them back
                    $("#instruction"+CategoryMenu.position).show();
                    CategoryMenu.changeWidth();
                });
            }else{
                window.BallsCollection.loadBalls(CategoryMenu.n);
            }
            $("#instruction"+CategoryMenu.position).show();
        });
    },
    transitionRight: function(){ // swipe right
        $("#instruction"+this.position).hide();
        this.width = $("#header5").innerWidth();
        this.position--;
        this.n = $("#header"+this.position).attr("data-id");
        var CategoryMenu = this;
        $("#container").animate({
            "margin-left":"+="+CategoryMenu.width+"px"
            }, "slow", function(){
            if(CategoryMenu.position<0){
                CategoryMenu.position++;
                CategoryMenu.n = $("#header"+CategoryMenu.position).attr("data-id");
                $("#container").animate({
                    "margin-left":"-="+CategoryMenu.width+"px"
                }, "slow", function(){
                    //window.BallsCollection.loadBalls(CategoryMenu.n);
                    $("#instruction"+CategoryMenu.position).show();
                    CategoryMenu.changeWidth();
                });
            }else{
                window.BallsCollection.loadBalls(CategoryMenu.n);
            }
            $("#instruction"+CategoryMenu.position).show();	
        });
    },
    loadCategories: function(){
        this.layout();
				
        if(!this.categoriesLoaded){
            var CategoryMenu = this;
            this.categoriesLoaded = true;
			
            $.ajax({
                url: window.serverUrl+'categories',
                type: "GET",
                dataType: 'json',
                cache : "false",
                success: function(data){
                    if(data.status != 0){
                        $(data.categories).each(function(i,item){
                            $('#container').append('<div class="header" id="header'+i+'" data-id="'+item.id+'"><div class="textcontainer"><h1>'+item.name+'</h1></div></div>');
                            $('#instructions').append('<div class="instructiontext" id="instruction'+i+'"><p>'+item.instructiontext+'</p></div>');
                            $("#instruction"+i).hide();
                            CategoryMenu.catCount++;
                        });
                        window.Feedback.setCategories(data.categories);
                        $("#instruction0").show();
                        CategoryMenu.changeWidth();
                    }
                }
            });
			
            $("#categories").swipe({ // waits for swipe at categories div
                swipe:function(event, direction, distance, duration, fingerCount){
                    if(direction == "left"){
                        CategoryMenu.transitionLeft();
                    }
                    else if(direction == "right"){
                        CategoryMenu.transitionRight();
                    }
                }
            });
        }
    }
};
