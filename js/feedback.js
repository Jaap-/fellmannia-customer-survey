
$(document).ready(function() {
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
			$('#kategoria_valinta').append('<option value="'+item.id+'">'+item.name+'</option>');
			});
		}
		}
	});
	
	$('#palautelaatikko').keydown(function() {
		var len = this.value.length;
		if (len >= 140) {
			this.value = this.value.substring(0, 140);
		}
		$('#charLeft').text(140 - len);
	});
		
	/*
	 * fadeIn lähettäjän tiedoille, mikäli haluaa vastauksen...
	 */
	$(document).on("click", "#halu_palaute",function() {
		if ($("div#tiedot").is(":visible")) {
			$("div#tiedot").fadeOut("fast");
		} else {
			$("div#tiedot").fadeIn("fast");
		}
	});
	
	/*
	* Palautteen peruuttaminen ja kenttien tyhjennyt
	*/
	$('#cancel').click(function(){
		$('#palaute_ikkuna').fadeOut('fast');
		$('#cancel').click(function(){
			$(':input','#palaute')
				.not(':button, :submit, :reset, :hidden')
				.val('')
				.removeAttr('checked')
				.removeAttr('selected');
		});
	});
		
	$('#save').click(function(){
	
		if($('input[type="checkbox"]#halu_palaute').is(':checked'))
		{
			/*
			 * Tämä toteutetaan, mikäli halu_palaute on valittu
			 */

			var lahettaja = '';
			var sposti = '';
				
			/*
			 * Haetaan lähettäjän nimi, sähköposti, mikäli halu_palaute valittu
			 */
			lahettaja = $('#lahettaja').val();
			sposti = $('#sposti').val();			
				
			var type=2;
			var halu_palaute = 1;
				
			/*
			 * Haetaan palaute
			 */
			var palautelaatikko = $('#palautelaatikko').val();
				
			/*
			 * Haetaan palautteen laatu
			 */
			var tone = $('#palaute input[name=tone]:checked').val();
				
			/*
			 * Haetaan kategoria, jolle palaute osoitetaan
			 */
			var category = $('#kategoria_valinta').val();
				
			/*
			 * Sähköpostin tarkistus
			 */
			if($('input[type="checkbox"]#halu_palaute').is(':checked'))
			{
				$(".error").hide();
				var hasError = false;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var emailaddressVal = $("#sposti").val();
				if(emailaddressVal == '') // Mikäli sposti on tyhjä
				{
					$("#sposti").after('<span class="error">Tarkasta sähköpostiosoite.</span>');
					hasError = true;
				}
				else if(!emailReg.test(emailaddressVal)) // Mikäli sposti ei vastaa oletuksia
				{
					$("#sposti").after('<span class="error">Tarkasta sähköpostiosoite.</span>');
					hasError = true;
				}
				if(hasError == true)
				{
					return false;
				}else{ // Mikäli sähköposti on ok, lähetetään tiedot
					$.ajax({
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
				});
				}
			}
			
		} else {
			/*
			 * Tämä toteutetaan, mikäli halu_palautetta ei ole valittu
			 */
				
			/*
			 * Määritetään, ettei haluta palautetta
			 */
			var lahettaja = '';
			var sposti = '';
			var type=0;	
			var halu_palaute = 0;

			/*
			 * Haetaan palaute
			 */
			var palautelaatikko = $('#palautelaatikko').val();
				
			/*
			 * Haetaan palautteen laatu
			 */
			var tone = $('#palaute input[name=tone]:checked').val();
				
			/*
			 * Haetaan kategoria, jolle palaute osoitetaan
			 */
			var category = $('#kategoria_valinta').val();
			
			/*
			 * Suljetaan palauteikkuna postauksen yhteydessä
			 */
			$("#palaute_ikkuna").fadeOut("fast");

			/*
			 * Tyhjennetään kaikki kentät ja valinnat tallennettaessa.
			 */
			$(':input,#palaute')
				.not(':button, :submit, :reset, :hidden')
				.val('')
				.removeAttr('checked')
				.removeAttr('selected');
			
			/*
			 * Lähetetään palaute
			 */
			$.ajax({
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
			});
		}
	
	});
});

