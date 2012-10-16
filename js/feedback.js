$('#submit').live('click',function(){
	var type = $(this).attr('name');
	var id = $(this).attr('title');
	if(type=='palaute'){
		var deadline = $('input#deadline').val();
		deadline = clean(deadline);
		var description = $('textarea#description').val();
		description = clean(description);
		var priority = $('select#priority').val();
	}
	else{
		var description = $('textarea#description').val();
		description = clean(description);
	}
$.ajax({
	type: "POST",
	url: "index.php",
	data: "act=saveWindow&id="+id+"&type="+type+"&deadline="+deadline+"&priority="+priority+"&description="+description
	}).done(function( msg ) {
		if(msg=='Saved!'){
			$('#palaute_ikkuna').removeClass('windowUserstory windowTask windowDefect windowBlocked windowCompleted').fadeOut('fast');
			$('#sisalto').html('');
			$("DIV[id='"+id+"'][name='"+type+"']").children('div[class*="description"]').html(decodeURIComponent(description));
			if(type=='palaute'){
				//$("DIV[id='"+id+"'][name='"+type+"']").children('div[class*="deadline"]').html(deadline);
				//$("DIV[id='"+id+"'][name='"+type+"']").children('div[class*="priority"]').removeClass('level1 level2 level3').addClass('level'+priority).attr('name',priority);
			}
		}else{
			$('#sisalto').append(msg);
		}
	});
}); 

$('#sulje_ikkuna').live('click',function(){
	$('#palaute_ikkuna').fadeOut('fast',function(){
		$('#palaute_ikkuna').removeClass('windowUserstory windowTask windowDefect windowBlocked windowCompleted');
	});
}); 

$('#delete').live('click',function(){
	var type = $(this).attr('name');
	var id = $(this).attr('id');
	$.ajax({
		type: "POST",
		url: "index.php",
		data: "act=deleteItem&type="+type+"&id="+id
	}).done(function(msg){
		$('#palaute_ikkuna').fadeOut('fast',function(){
			$('#palaute_ikkuna').removeClass('windowUserstory windowTask windowDefect windowBlocked');
		});
		$("DIV[id='"+id+"'][name='"+type+"']").fadeOut('slow');
	});
}); 