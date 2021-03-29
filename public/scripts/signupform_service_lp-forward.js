
 
var selectedSignupPlan = URL_param('signupPlan');
if(selectedSignupPlan == null) selectedSignupPlan = "apollo";
else selectedSignupPlan = selectedSignupPlan.toLowerCase();

var s = selectedSignupPlan;
if(s != "apollo" && s != "gaia" && s != "athena") {
    selectedSignupPlan = "apollo";
}



function URL_param(param){
    // this condition suppress error
	if(location.href.match(param+'=')) return location.href.toString().split(param+'=')[1].split('&')[0];
}



      
/* ================================= INSTA-Validate ================================= */
$(document).ready(function(){

	$("#schoolName").focus();
	
	//School Name
	$("#schoolName").focusin(function() {
		$("#schoolName").removeClass("fieldError");
		$("#schoolNameError").hide();
	}).focusout(function() {
	  if ($("#schoolName").val() == "")
		{
			$("#schoolName").addClass("fieldError");
			$("#schoolNameError").show();
		}
		else
		{				
			$("#schoolName").removeClass("fieldError");
			$("#schoolNameError").hide();
		}
  });
	
	//Email Address
	$("#emailAddress").focusin(function() {
		$("#emailAddress").removeClass("fieldError");
		$("#emailAddressError").hide();
		$("#emailAddressInvalid").hide();
	}).focusout(function() {
		let emailAddress = $("#emailAddress").val();
		
		if  ($("#emailAddress").val() == "" )
		{
			$("#emailAddress").addClass("fieldError");
			$("#emailAddressError").show();
			$("#emailAddressInvalid").hide();
		}
		else if (!verifyEmail(emailAddress))
		{
			$("#emailAddressError").hide();
			$("#emailAddress").addClass("fieldError");
			$("#emailAddressInvalid").show();
		}
		else
		{
			$("#emailAddress").removeClass("fieldError");
			$("#emailAddressError").hide();
			$("#emailAddressInvalid").hide();
		}
	});
});
/* ================================= End of INSTA-Validate ================================= */


function validateFields()
{						
	var isAllFieldsGood = true;
	var isEmailValid = checkIsEmailValid();

	if(isEmailValid == false)
	{
		isAllFieldsGood =  false;
	}

	//School Name 
	if ($("#schoolName").val() == "")
	{
		$("#schoolName").addClass("fieldError");
		$("#schoolNameError").show();
		isAllFieldsGood =  false;
	}
	else
	{				
		$("#schoolName").removeClass("fieldError");
		$("#schoolNameError").hide();
  }

	//Email Address
	if  ($("#emailAddress").val() == "" )
	{
		$("#emailAddress").addClass("fieldError");
		$("#emailAddressError").show();				
		isAllFieldsGood =  false;					
	}
	else if (isEmailValid == false)
	{
		$("#emailAddressError").hide();
		$("#emailAddress").addClass("fieldError");
		$("#emailAddressInvalid").show();
		isAllFieldsGood =  false;					
	}
	else
	{
		$("#emailAddress").removeClass("fieldError");
		$("#emailAddressError").hide();
		$("#emailAddressInvalid").hide();
	}

	return isAllFieldsGood;
}


function validateForm()
{
  $(".error").hide();
  $(".fa-spinner").css("display", "inline-block");
	
  var isAllFieldsAreFilled = validateFields(); 
  const URL = 'https://www.quickschools.com/quickschools/free-trial-lp-form';


	if(isAllFieldsAreFilled == true) 
	{  
    const schoolName = $("#schoolName").val();
    const emailAddress = $("#emailAddress").val();
		window.location.href = `https://www.quickschools.com/quickschools/free-trial-lp-form?schoolName=${schoolName}&emailAddress=${emailAddress}`;
	}
	else
	{
		//Show the main error message at the bottom of the page
		$(".error-overview").show();
		$(".fa-spinner").hide();
	}// End isAllFieldsAreFilled
}


function checkIsEmailValid() 
{
	var emailAddress = document.submissionForm.emailAddress.value;
	if (!verifyEmail(emailAddress)){
		return false;
	}
	return true;
}

