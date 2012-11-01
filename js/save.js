$("document").ready(function() {
	$("#personal_details").submit(function() {
		processDetails();
		return false;
	});
});

function processDetails() {
	var errors = '';
	
	// Validate name
	var name = $("#personal_details [name='name']").val();
	if (!name) {
		errors += ' - Please enter a name\n';
	}
	// Validate age range
	var age_range = $("#personal_details [name='age_range']").val();
	if (!age_range) {
		errors += ' - Please select and age range\n';
	}
	// Validate sports selection
	var sports = $("#personal_details [name='sports[]']:checked").length;
	if (!sports) {
		errors += ' - Please select your favourite sports\n';
	}
	
	if (errors) {
		errors = 'The following errors occurred:\n' + errors;
		alert(errors);
		return false;
	} else {
		// Submit our form via Ajax and then reset the form
		$("#personal_details").ajaxSubmit({success:showResult});
		return false;
	}
	
}

function showResult(data) {
	if (data == 'save_failed') {
		alert('Form save failed, please contact your administrator');
		return false;
	} else {
		$("#personal_details").clearForm().clearFields().resetForm();
		alert('Form save success');
		return false;
	}
}