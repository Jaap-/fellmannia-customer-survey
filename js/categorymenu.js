window.serverUrl = 'http://lamk.net/api/';
changewidth();
var width = $(window).width()/3;
var windowWidth = $(window).width();
var position = 0;															// indicates selected category
var catCount = 0;
var n;

function layout(){															// adjusts the height of div "content"
	var height = $(window).height();
	$("#content").css("height",height-60+"px");
}

function changewidth(){														// adjust width of category divs
	width = $(window).width()/3;
	$("#container").css("margin-left",+-((position-1)*width)+"px");			// adjusts the category positions 
	var i;
	var textwidth = 0;
	var compare;
	var count = catCount;
	for(i = 0; i <= catCount; i++){										// loops through categories and adjusts them
		$("#header"+i).css("width",+width+"px");
		$("#header"+i).css("margin-left",+(-(catCount-count)*width)+"px");
		count++;
		compare = $("#header"+i+" > div").innerWidth();
		if(compare > textwidth){
			textwidth = compare;
		}
	}
	if(textwidth >= width){
		count = catCount;
		for(i = 0; i <= catCount; i++){
			$("#header"+i).css("width",+textwidth+"px");
			$("#header"+i).css("margin-left",+(-(catCount-count)*textwidth)+"px");
			count++;
			windowWidth = $(window).width();
			$("#container").css("margin-left",+-(((position-1)*textwidth)+(textwidth*3-windowWidth)/2)+"px");
		}
	}
}

function transitionleft(){																// swipe left
	$("#instruction"+position).hide();
	width = $("#header5").innerWidth();
	position++;																			// updates the indicator of selected category
	n = $("#header"+position).attr("data-id");
	$("#container").animate({"margin-left":"-="+width+"px"}, "slow", function(){		// category movement by animating margin change
		loadBalls(n);
		if(position>catCount-1){															// checks if categories are going too far
			position--;																		// update position indicator
			n = $("#header"+position).attr("data-id");
			$("#container").animate({"margin-left":"+="+width+"px"}, "slow", function(){	// if categories are going too far move them back
				loadBalls(n);
			});
		}
	});
	$("#instruction"+position).show();
}

function transitionright(){																// swipe right
	$("#instruction"+position).hide();
	width = $("#header5").innerWidth();
	position--;
	n = $("#header"+position).attr("data-id");
	$("#container").animate({"margin-left":"+="+width+"px"}, "slow", function(){
		loadBalls(n);
		if(position<0){
			position++;
			n = $("#header"+position).attr("data-id");
			$("#container").animate({"margin-left":"-="+width+"px"}, "slow", function(){
				loadBalls(n);
			});
		}
	});
	
	$("#instruction"+position).show();	
}


$(document).ready(function(){
	layout();
			
	$.ajax({
		url: window.serverUrl,
		data: {act:'getcategories'},
		type: "GET",
		dataType: 'jsonp',
		crossDomain: true,
		cache : "false",
		success: function(data){
			if(data.status != 0){
				$(data.categories).each(function(i,item){
					$('#container').append('<div class="header" id="header'+i+'" data-id="'+item.id+'"><div class="textcontainer"><h1>'+item.name+'</h1></div></div>');
					$('#instructions').append('<div class="instructiontext" id="instruction'+i+'"><p>'+item.instructiontext+'</p></div>');
					$("#instruction"+i).hide();
					catCount++;
				});
				$("#instruction0").show();
					//changewidth();
			}
		}
	});
	$("#categories").swipe({												// waits for swipe at categories div
		swipe:function(event, direction, distance, duration, fingerCount){
			if(direction == "left"){
				transitionleft();
			}
			else if(direction == "right"){
				transitionright();
			}
		}
	});
});