$("document").ready(function() {
	$("#palaute").submit(function() {
		processDetails();
		return false;
	});
});

function processDetails() {
	var errors = '';
	
	// Validate palautelaatikko selection
	var palautelaatikko = $("#palaute [name='palautelaatikko']").length;
	if (!palautelaatikko) {
		errors += ' - Please enter your feedback\n';
	}
	
	if (errors) {
		errors = 'The following errors occurred:\n' + errors;
		alert(errors);
		return false;
	} else {
		// Submit our form via Ajax and then reset the form
		$("#palaute").ajaxSubmit({success:showResult});
		return false;
	}
	
}

function showResult(data) {
	if (data == 'save_failed') {
		alert('Form save failed, please contact your administrator');
		return false;
	} else {
		$("#palaute").clearForm().clearFields().resetForm();
		alert('Form save success');
		return false;
	}
}