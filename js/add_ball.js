$(document).ready(function() {
	$(document).on("click", "#lisaa_pallo",function() {
	if ($("div#palaute_ikkuna").is(":hidden")) {
      $("#palaute_ikkuna").fadeIn("slow");
    } else {
      $("#sulje_ikkuna").fadeOut("slow");
    }

	});
});