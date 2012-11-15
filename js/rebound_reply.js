$(document).ready(function() {
	$('#reboundbox').keyup(function() {
		var len = this.value.length;
		if (len >= 140) {
			this.value = this.value.substring(0, 140);
		}
		$('#charLeft').text(140 - len);
	});

	/*
	 * fadeIn lähettäjän tiedoille, mikäli haluaa vastauksen...
	 */
	$(document).on("click", "#want_answer",function() {	
		if ($("div#info").is(":visible")) {
				$("div#info").fadeOut("fast");
				} else {
					$("div#info").fadeIn("fast");
				}
	});

	/*
	 * Palautteen peruuttaminen ja kenttien tyhjennyt
	 */


	$('#cancel').live('click',function(){
		$('#rebound_reply').fadeOut('fast',function(){
			$('#rebound_reply').removeClass('windowUserstory windowTask windowDefect windowBlocked windowCompleted');
		});

		$('#cancel').click(function(){
			$(':input','#reply')
				.not(':button, :submit, :reset, :hidden')
				.val('')
				.removeAttr('checked')
				.removeAttr('selected');
		});    
	});
});


	
$('#save').live('click', function(){

	var sender = '';
	var email = '';

	/*
	 * Haetaan lähettäjän nimi, sähköposti, mikäli want_answer valittu
	 */
	if($('input[type="checkbox"]#want_answer').is(':checked')) {
		sender = $('#sender').val();
		email = $('#email').val();
		
		if(sender == '' && email== '' )
		{
			var type=0;
		}else{
			var type=2;
		}
			
		var want_answer = 1;
	}else{
		var want_answer = 0;
	}

	/*
	 * Haetaan palaute
	 */
	var reboundbox = $('#reboundbox').val();


	/*
	 * Haetaan palautteen laatu
	 */
	var tone = $('#reply input[name=tone]:checked').val();
		
	/*
	 * Haetaan kategoria, jolle palaute osoitetaan
	 */
	var category = $('#category_select').val();

		
	/*alert(lahettaja + ', ' + sposti + ', ' + palautelaatikko + ', ' + halu_palaute + ', ' + tone);*/


	/*
	 * Suljetaan palauteikkuna postauksen yhteydessä
	 */	
	$("#rebound_reply").fadeOut("fast");
		

	/*
	 * Tyhjennetään kaikki kentät ja valinnat tallennettaessa.
	 */
	$('#save').click(function(){
		$(':input','#reply')
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
	});    

	
	/*
	 * ÄLÄ KOSKE TÄNNE VIELÄ!!!!!
	 */
/*	$.ajax({
		url: window.serverUrl,
		data: {act:'addcomment', catid:category, type:type, text:palautelaatikko, contactinfo:lahettaja+':'+sposti, contact:halu_palaute, status:tone},
		type: "GET",
		dataType: 'jsonp',
		crossDomain: true,
		cache : "false",
		success: function(data){
			if(data.status != 0){
					$.each(data.errors, function(i,item){
					alert(item[i]);
				});
			}
		}
	});*/
});