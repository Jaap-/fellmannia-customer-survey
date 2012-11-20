$(document).ready(function() {
	$('#reboundbox').keydown(function() {
		var len = this.value.length;
		if (len >= 140) {
			this.value = this.value.substring(0, 140);
		}
		$('#charLeft_rebound').text(140 - len);
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
	$('#cancel_rebound').live('click',function(){
		$('#in').fadeOut('fast',function(){
			$('#in').removeClass('windowUserstory windowTask windowDefect windowBlocked windowCompleted');
		});

		$('#in').click(function(){
			$(':input','#reply')
				.not(':button, :submit, :reset, :hidden')
				.val('')
				.removeAttr('checked')
				.removeAttr('selected');
		});    
	});
});


	
$('#save_rebound').live('click', function(){

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

	/*
	 * Suljetaan palauteikkuna postauksen yhteydessä
	 */	
	$("#in").fadeOut("fast");
		

	/*
	 * Tyhjennetään kaikki kentät ja valinnat tallennettaessa.
	 */
	$('#save_rebound').click(function(){
		$(':input','#reply')
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
	});    

	
	/*
	 * ÄLÄ KOSKE TÄNNE VIELÄ!!!!!
	 */
	$.ajax({
		url: window.serverUrl,
		data: {act:'addcomment', catid:category, type:type, text:reboundbox, contactinfo:sender+':'+email, contact:want_answer, status:tone},
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
	});
});