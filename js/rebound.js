 $(document).ready(function() {
	$(document).on("click", "#rebound",function() {	
		if ($("div#in").is(":visible")) {
			$("#in").fadeOut("slow");
		} else {
			$("#in").fadeIn("slow");
		}
	});
});