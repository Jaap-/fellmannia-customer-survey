window.serverUrl = 'http://lamk.net/api/';
changewidth();
var width = $(window).width()/3;
var windowWidth = $(window).width();
var position = 2;															// indicates selected category
var catCount = 0;
var lastCategory;
var firstCategory;
var instruction;

function layout(){															// adjusts the height of div "content"
	var height = $(window).height();
	$("#content").css("height",height-60+"px");
}

function currentCategory(){
	var count = firstCategory;
	var i;
	for(i = 1; i != position; i++){
			count++;
	}
	return count;
}

function changewidth(){														// adjust width of category divs
	width = $(window).width()/3;
	$("#container").css("margin-left",+-((position-2)*width)+"px");			// adjusts the category positions 
	var i;
	var textwidth = 0;
	var compare;
	var count = catCount;
	for(i = 1; i <= lastCategory; i++){										// loops through categories and adjusts them
		if(i >= firstCategory){
			$("#header"+i).css("width",+width+"px");
			$("#header"+i).css("margin-left",+(-(catCount-count)*width)+"px");
			count++;
			compare = $("#header"+i+" > div").innerWidth();
			if(compare > textwidth){
				textwidth = compare;
			}
		}
	}
	if(textwidth >= width){
		count = catCount;
		for(i = 1; i <= lastCategory; i++){
			if(i >= firstCategory){
				$("#header"+i).css("width",+textwidth+"px");
				$("#header"+i).css("margin-left",+(-(catCount-count)*textwidth)+"px");
				count++;
				windowWidth = $(window).width();
				$("#container").css("margin-left",+-(((position-2)*textwidth)+(textwidth*3-windowWidth)/2)+"px");
			}
		}
	}
}

function transitionleft(){													// swipe left
	var n = currentCategory();
	n++;
	$("#instruction"+instruction).hide();
	width = $("#header5").innerWidth();
	$("#container").animate({"margin-left":"-="+width+"px"}, "slow");		// category movement by animating margin change
	position++;																// updates the indicator of selected category
	instruction++;
	if(position>catCount){													// checks if categories are going too far
		$("#container").animate({"margin-left":"+="+width+"px"}, "slow");	// if categories are going too far move them back
		position--;															// update position indicator
		n--;
		instruction--;
	}
	$("#instruction"+instruction).show();
	loadBalls(n);
}

function transitionright(){													// swipe right
	var n = currentCategory();
	n--;
	$("#instruction"+instruction).hide();
	width = $("#header5").innerWidth();
	$("#container").animate({"margin-left":"+="+width+"px"}, "slow");
	position--;
	instruction--;
	if(position<1){
		$("#container").animate({"margin-left":"-="+width+"px"}, "slow");
		position++;
		n++;
		instruction++;
	}
	$("#instruction"+instruction).show();
	loadBalls(n);
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
					catCount = i+1;
					if(i == 0){
						firstCategory = item.id;
					}
					$('#container').append('<div class="header" id="header'+item.id+'"><div class="textcontainer"><h1>'+item.name+'</h1></div></div>');
					$('#instructions').append('<div class="instructiontext" id="instruction'+item.id+'"><p>'+item.instructiontext+'</p></div>');
					$("#instruction"+item.id).hide();
					lastCategory = item.id;
				});
				$("#instruction"+(firstCategory+1)).show();
				instruction = firstCategory;
				instruction++;
				changewidth();
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