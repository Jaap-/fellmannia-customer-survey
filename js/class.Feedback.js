
function Feedback(){
    this.element = 'boxFeedback';
    this.formElement = 'formFeedback';
    this.selectCategoryElement = 'feedbackCategory';
    this.currentTone;
	
    this.initialize();
}
Feedback.prototype = {
    initialize: function(){
        this.clearFields();
		
        $('#'+this.formElement+' input:radio').addClass('input_hidden');
        $('#'+this.formElement+' label').click(function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            window.Feedback.currentTone = $(this).attr('data-status');
            return false;
        });
		
        $('#'+this.formElement+' .btnCancel').click(function(){
            $('#'+window.Feedback.element).fadeOut('fast');
            window.Feedback.clearFields();
            return false;
        });
		
        $('#'+this.formElement+' .btnSave').click(function(){
            window.Feedback.save();
            return false;
        });
		
        $('#boxThanks').click(function(){
            $(this).fadeOut("fast");
            return false;
        });
    },
    clearFields: function(){
        $(':input','#'+this.formElement).not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $('#'+this.formElement+'input[type="radio"]').prop('checked', false);
        $('#'+this.formElement+' label').removeClass('selected');
        $("span.error").hide();
        this.currentTone = '';
    },
    setCategories: function(categories){
        $(categories).each(function(i,item){
            if(item.id != 1 && item.id != 2){
                $('#'+window.Feedback.selectCategoryElement).append('<option value="'+item.id+'">'+item.name+'</option>');
            }
        });
    },
    save: function(){
        $("span.error").hide();
        var errors = false;
		
        var category = $('#'+this.selectCategoryElement).val();
        var msg = $('#feedbackMsg').val();
        var tone = this.currentTone;
        var name = '_';
        var email = '_';
        var phone = '_';
			
        if(category == 0){
            $("span.categoryError").html('Valitse kategoria').show();
            errors = true;
        }
        if($('#feedbackName').val() != ''){
            name = $('#feedbackName').val();
        }
        if($('#feedbackEmail').val() != ''){
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            email = $('#feedbackEmail').val();
            if(!emailReg.test(email)){
                $("span.emailError").html('Tarkista sähköpostiosoite').show();
                errors = true;
            }
        }
        if($('#feedbackPhone').val() != ''){
            phone = $('#feedbackPhone').val();
        }
        if(msg == ''){
            $("span.msgError").html('Kirjoita palaute').show();
            errors = true;
        }
        if(tone == ''){
            $("span.toneError").html('Valitse sävy').show();
            errors = true;
        }
		
        if(!errors){
            $.ajax({
                url: window.serverUrl+'comments/'+category+'/0/'+tone+'/'+msg+'/'+name+'/'+email+'/'+phone,
                type: "POST",
                dataType: 'json',
                cache : "false",
                success: function(data){
                    if(data.status == 0){
                        $.each(data.errors, function(i,item){
                            console.log(item);
                        });
                    }else{
                        $('#'+window.Feedback.element).fadeOut("fast");
                        $('#boxThanks').fadeIn("fast");
                    }
                }
            });
        }
		
    }
};
