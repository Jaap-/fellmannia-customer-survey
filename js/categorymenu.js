window.serverUrl = 'http://lamk.net/api/';
changewidth();
var width = $(window).width()/3;
var windowWidth = $(window).width();
var position = 2;															// indicates selected category
var catCount = 0;

function layout(){															// adjusts the height of div "content"
	var height = $(window).height();
	$("#content").css("height",height-60+"px");
}

function changewidth(){														// adjust width of category divs
	var width = $(window).width()/3;
	$("#container").css("margin-left",+-((position-2)*width)+"px");			// adjusts the category positions 
	var i;
	for(i = 1; i <= catCount; i++){											// loops through categorise and adjusts them
		$("#"+i).css("width",+width+"px");
		$("#"+i).css("margin-left",+((i-1)*width)+"px");
	}
}

function transitionleft(){													// swipe left
	$("#instruction"+position).hide();
	var width = $(window).width()/3;
	$("#container").animate({"margin-left":"-="+width+"px"}, "slow");		// category movement by animating margin change
	position++;																// updates the indicator of selected category
	if(position>catCount){													// checks if categories are going too far
		$("#container").animate({"margin-left":"+="+width+"px"}, "slow");	// if categories are going too far move them back
		position--;															// update position indicator
	}
	$("#instruction"+position).show();
}

function transitionright(){													// swipe right
	$("#instruction"+position).hide();
	var width = $(window).width()/3;
	$("#container").animate({"margin-left":"+="+width+"px"}, "slow");
	position--;
	if(position<1){
		$("#container").animate({"margin-left":"-="+width+"px"}, "slow");
		position++;
	}
	$("#instruction"+position).show();
}


$(document).ready(function(){
	layout();
	$(window).resize(function(){
		layout();
	});
			
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
					$('#container').append('<div class="header" id="'+item.id+'"><h1>'+item.name+'</h1></div>');
					$('#instructions').append('<div class="instructiontext" id="instruction'+item.id+'"><p>'+item.instructiontext+'</p></div>');
					$("#"+item.id).css("margin-left",+(i*width)+"px");
					$("#instruction"+item.id).hide();
					catCount = i+1;
				});
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