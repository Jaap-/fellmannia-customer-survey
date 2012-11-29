
/*
 * palautteenanto toimii fadeIn ja fadeOut :ina, sulkeminen onnistuu tällä hetkellä
 * sekä sulje ruksista, että klikkaamalla uudelleen palautepallon luonti
 * varmaan tuolla ruksisulkemisella mennään? ei ole tarvetta sulkea palautteenantoa pallonluontipainikkeesta?
 */
 $(document).ready(function()
 {
	$(document).on("click", "#lisaa_pallo",function()
	{
		if ($("div#palaute_ikkuna").is(":visible"))
		{
			$("#palaute_ikkuna").fadeOut("slow");
		} else {
			$("#palaute_ikkuna").fadeIn("slow");
		}
		
		/*
		 * Näytetään jäljellä olevien merkkien määrä
		 */
		$('#charLeft').text(140);
	});

	/*
	 * Lisätään palautteen laaduille class, joka määrittää ne olemaan hidden,
	 * main.css:ssä siirretään varsinaiset radio inputit reilusti sivulle piiloon
	 * ja korvataan ne palautteen laatua kuvaavilla kuvakkeilla, joilla on radio inputtien toiminta
	 */
	$('#sisalto input:radio').addClass('input_hidden');
	$('#sisalto label').click(function()
	{
		$(this).addClass('selected').siblings().removeClass('selected');
	});
 });