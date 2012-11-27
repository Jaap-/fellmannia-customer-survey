﻿
$(document).ready(function() {	$.ajax({		url: window.serverUrl,		data: {act:'getcategories'},		type: "GET",		dataType: 'jsonp',		crossDomain: true,		cache : "false",		success: function(data){			if(data.status != 0){				$(data.categories).each(function(i,item){					$('#kategoria_valinta').append('<option value="'+item.id+'">'+item.name+'</option>');				});							}		}	});	$('#palautelaatikko').keydown(function() {		var len = this.value.length;		if (len >= 140) {			this.value = this.value.substring(0, 140);		}		$('#charLeft').text(140 - len);	});	/*	 * fadeIn lähettäjän tiedoille, mikäli haluaa vastauksen...	 */
	$(document).on("click", "#halu_palaute",function() {			if ($("div#tiedot").is(":visible")) {				$("div#tiedot").fadeOut("fast");				} else {					$("div#tiedot").fadeIn("fast");				}	});
	/*	 * Palautteen peruuttaminen ja kenttien tyhjennyt	 */
	$('#cancel').click(function(){		$('#palaute_ikkuna').fadeOut('fast');		$('#cancel').click(function(){			$(':input','#palaute')				.not(':button, :submit, :reset, :hidden')				.val('')				.removeAttr('checked')				.removeAttr('selected');		});    	});
		$('#save').click(function(){		var lahettaja = '';		var sposti = '';
		/*		 * Haetaan lähettäjän nimi, sähköposti, mikäli halu_palaute valittu		 */		if($('input[type="checkbox"]#halu_palaute').is(':checked')) {			lahettaja = $('#lahettaja').val();			sposti = $('#sposti').val();			
			if(lahettaja == '' && sposti== '' )			{				var type=0;			}else{				var type=2;			}							var halu_palaute = 1;		}else{			var halu_palaute = 0;		}		/*		 * Haetaan palaute		 */
		var palautelaatikko = $('#palautelaatikko').val();
		/*		 * Haetaan palautteen laatu		 */		var tone = $('#palaute input[name=tone]:checked').val();					/*		 * Haetaan kategoria, jolle palaute osoitetaan		 */		var category = $('#kategoria_valinta').val();
		/*		 * Suljetaan palauteikkuna postauksen yhteydessä		 */			$("#palaute_ikkuna").fadeOut("fast");   		/*		 * Tyhjennetään kaikki kentät ja valinnat tallennettaessa.		 */		$(':input,#palaute')			.not(':button, :submit, :reset, :hidden')			.val('')			.removeAttr('checked')			.removeAttr('selected'); 				console.log(category, palautelaatikko);		
		$.ajax({			url: window.serverUrl,			data: {act:'addcomment', catid:category, type:type, text:palautelaatikko, contactinfo:lahettaja+':'+sposti, contact:halu_palaute, status:tone},			type: "GET",			dataType: 'jsonp',			crossDomain: true,			cache : "false",			success: function(data){				if(data.status != 0){						$.each(data.errors, function(i,item){						alert(item[i]);					});				}			}		});	});});

   