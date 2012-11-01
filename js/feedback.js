/*$.ajax({

type: "POST",
url: "index.php",
data: "act=saveWindow&id="+id+"&type="+type+"&deadline="+deadline+"&priority="+priority+"&description="+description	}).done(function( msg ) {
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
});*/

$(document).ready(function() {
	$('#palautelaatikko').keyup(function() {
		var len = this.value.length;
		if (len >= 140) {
			this.value = this.value.substring(0, 140);
		}
		$('#charLeft').text(140 - len);
	});
	
	/*
	 * Palautteen peruuttaminen ja kenttien tyhjennyt
	 */
	$('#cancel').live('click',function(){
		$('#palaute_ikkuna').fadeOut('fast',function(){
			$('#palaute_ikkuna').removeClass('windowUserstory windowTask windowDefect windowBlocked windowCompleted');
		});
	});
	
	$('#save').live('click', function(){
	
		/*
		 * Haetaan lähettäjän nimi, sähköposti ja palaute
		 */
		var lahettaja = $('#lahettaja').val();
		var sposti = $('#sposti').val();
		
		if(lahettaja == '' && sposti== '' )
		{
			var type=0;
		}else{
			var type=2;
		}
		
		var palautelaatikko = $('#palautelaatikko').val();
		
		/*
		 * Haetaan checkboxin status
		 */
		if($('input[type="checkbox"]#halu_palaute').is(':checked')) {
			var halu_palaute = 1;
		}else{
			var halu_palaute = 0;
		}
		
		/*
		 * Haetaan palautteen laatu
		 */
		var tone = $('#palaute input[name=tone]:checked').val();
		
		/*alert(lahettaja + ', ' + sposti + ', ' + palautelaatikko + ', ' + halu_palaute + ', ' + tone);*/

		
		$.ajax({
			url: window.serverUrl,
			data: {act:'addcomment', catid:window.currentCategory, type:type, text:palautelaatikko, contactinfo:lahettaja+':'+sposti, contact:halu_palaute, tone:tone},
			type: "GET",
			dataType: 'jsonp',
			crossDomain: true,
			cache : "false",
			success: function(data){
				alert(data.affectedrows);
				/*loadComments();*/
			}
		});
	});
});

   