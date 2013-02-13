
function Feedback(){
    this.element = 'boxFeedback';
    this.formElement = 'formFeedback';
    this.selectCategoryElement = 'feedbackCategory';
    this.currentTone;
    this.question = '';
	
    this.initialize();
}
Feedback.prototype = {
    initialize: function(){
        this.clearFields();
        this.getCurrentQuestion();
		
        $('#'+this.formElement+' input:radio').addClass('input_hidden');
        $('#'+this.formElement+' label').click(function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            window.Feedback.currentTone = $(this).attr('data-status');
            return false;
        });
	
        $('#feedbackCategory').change(function(){
            var catID = $(this).val();
            
            if(catID == 2){
                $('#feedbackOnly').css('display','none');
                $('#feedbackAnswer').css('display','block');
            }else{
                $('#feedbackOnly').css('display','block');
                $('#feedbackAnswer').css('display','none');
            }
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
            $(this).fadeOut("fast", function(){
                var currentCat = $('#header'+window.CategoryMenu.position).attr('data-id');
                window.BallsCollection.clearBalls(function(){
                    window.BallsCollection.loadBalls(currentCat);
                });
            });
            
            return false;
        });
    },
    changeContent: function(){
        if(window.loggedIn){
            $('#feedbackNotLoggedIn').css({'display':'none'});
            $('#feedbackLoggedIn').css({'display':'block'});
        }else{
            $('#feedbackNotLoggedIn').css({'display':'block'});
            $('#feedbackLoggedIn').css({'display':'none'});
        }
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
    getCurrentQuestion: function(){
        $.ajax({
            url: window.serverUrl+'question',
            type: "GET",
            dataType: 'json',
            cache : "false",
            success: function(data){
                if(data.status != 0){
                    window.Feedback.question = data.question[0].text;
                    $('#feedbackAnswer').prepend('<span><br /><br />'+data.question[0].text+'<br /><br /></span>');
                }
            }
        });
    },
    save: function(){
        $("span.error").hide();
        var errors = false;
        
        if(window.loggedIn){
            var question = $('#feedbackQuestion').val();
            if(question == ''){
                $("span.questionError").html('Ole hyvä ja kirjoita kysymys').show();
                errors = true;
            }
                
            if(!errors){
                $.ajax({
                    url: window.serverUrl+'question/'+question,
                    type: "POST",
                    dataType: 'json',
                    cache : "false",
                    success: function(data){
                        if(data.status == 0){
                            $.each(data.errors, function(i,item){
                                showMessage(item);
                            });
                        }else{
                            $('#'+window.Feedback.element).fadeOut("fast");
                            $('#boxThanks').fadeIn("fast");
                        }
                    }
                });
            }
        }else{
            var category = $('#'+this.selectCategoryElement).val();
            var url = '';
            
            if(category == 2){
                var answer = $('#feedbackAnswerText').val();
                if(answer == ''){
                    $("span.answerError").html('Kirjoita vastauksesi').show();
                    errors = true;
                }
                url = 'comments/question/'+answer;
            }else{
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
                
                url = 'comments/'+category+'/0/'+tone+'/'+msg+'/'+name+'/'+email+'/'+phone;
            }

            if(!errors){
                $.ajax({
                    url: window.serverUrl+url,
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
    }
};
