/*  * Palautteen anto, joka aukeaa palautepallon luonnista ja sulkeutuu ruksista. * fadeIn ja fadeOut slow  */ /*$(document).ready(function() {
	$(document).on("click", "#lisaa_pallo",function() {
		if ($("div#palaute_ikkuna").is(":hidden")) {
			$("#palaute_ikkuna").fadeIn("slow");
		} else {
			$("#sulje_ikkuna").fadeOut("slow");
		}
	});
});*/
/*
 * palautteenanto toimii fadeIn ja fadeOut :ina, sulkeminen onnistuu t‰ll‰ hetkell‰
 * sek‰ sulje ruksista, ett‰ klikkaamalla uudelleen palautepallon luontia
 * varmaan tuolla ruksisulkemisella menn‰‰n? ei ole tarvetta sulkea palautteenantoa pallonluontipainikkeesta? */
 $(document).ready(function() {	$(document).on("click", "#lisaa_pallo",function() {			if ($("div#palaute_ikkuna").is(":visible")) {			$("#palaute_ikkuna").fadeOut("slow");		} else {			$("#palaute_ikkuna").fadeIn("slow");
		}	});		$('#sisalto input:radio').addClass('input_hidden');	$('#sisalto label').click(function() {		$(this).addClass('selected').siblings().removeClass('selected');	});});