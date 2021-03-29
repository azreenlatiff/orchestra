$(document).ready(function(){
	$("#schoolCode").focus();

	$("#schoolCode").on("keypress", function(e) {
	  if(e.keyCode == 13) { // Enter key
		  event.preventDefault();
	    validateForm();
	  }
	});
});


function validateFields()
{
  let isFieldValid =  true;
  let emailAddress = $("#emailAddress").val().toLowerCase();

	//Email Address
	if  (emailAddress == "" )
	{
    $("#emailAddress").addClass("fieldError");
    $("#emailAddressInvalid").hide();
		$("#emailAddressError").show();				
		isFieldValid =  false;					
	}
	else if (!verifyEmail(emailAddress))
	{
		$("#emailAddressError").hide();
		$("#emailAddress").addClass("fieldError");
		$("#emailAddressInvalid").show();
		isFieldValid =  false;					
	}
	else
	{
		$("#emailAddress").removeClass("fieldError");
		$("#emailAddressError").hide();
		$("#emailAddressInvalid").hide();
	}
	
	return isFieldValid;
}

function validateForm()
{
  let isfieldValid = validateFields(); 
  let emailAddress = $("#emailAddress").val().toLowerCase();

  if(isfieldValid) {
    console.log(`email input: ${emailAddress}`);
  }
}