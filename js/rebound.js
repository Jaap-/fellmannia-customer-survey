 $(document).ready(function() {
	$(document).on("click", "#rebound",function() {	
		if ($("div#in").is(":visible")) {
			$("#in").fadeOut("slow");
		} else {
			$("#in").fadeIn("slow");
		}
	});
	
	$('#rebound_reply input:radio').addClass('input_hidden');
	$('#rebound_reply label').click(function() {
		$(this).addClass('selected').siblings().removeClass('selected');
	});
});