$(document).ready(function(){

	$("#formabbrexplain-showhide").hide();
	$("#confirmPassword-showhide").hide();
	$("#schoolName").focus();
	
	//show hidden password confirmation on password input focus
	$("#userPassword").focusin(function() {
	  $("#confirmPassword-showhide").show();
	});
	
	//show site name explaination on input focus
	$("#schoolCode").focusin(function() {
	  $("#formabbrexplain-showhide").show();
	});
	
	$("#schoolCode").on("keypress", function(e) {
	  if(e.keyCode == 13) { // Enter key
	    validateForm();
	  }
	});
	
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
	
	//Contact Name
	$("#contactPerson").focusin(function() {
		$("#contactPerson").removeClass("fieldError");
		$("#contactPersonError").hide();
	}).focusout(function() {
		if ($("#contactPerson").val() == "")
		{
			$("#contactPerson").addClass("fieldError");
			$("#contactPersonError").show();
		}
		else
		{
			$("#contactPerson").removeClass("fieldError");
			$("#contactPersonError").hide();
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
	
	//Phone
	$("#phoneNumber").focusin(function() {
		$("#phoneNumber").removeClass("fieldError");
		$("#phoneNumberError").hide();
		$("#phoneNumberInvalid").hide();
	}).focusout(function() {
		if ($("#phoneNumber").val() == "")
		{
			$("#phoneNumber").addClass("fieldError");
			$("#phoneNumberInvalid").hide();
			$("#phoneNumberError").show();
		}
		else if (!checkIsValidPhoneNumber())
		{
			$("#phoneNumber").addClass("fieldError");
			$("#phoneNumberError").hide();
			$("#phoneNumberInvalid").show();
		}
		else
		{
			$("#phoneNumber").removeClass("fieldError");
			$("#phoneNumberError").hide();
			$("#phoneNumberInvalid").hide();
		}
	});
	
	//User Password
	$("#userPassword").focusin(function() {
		$("#userPassword").removeClass("fieldError");
		$("#userPasswordError").hide();
		$("#userPasswordLengthError").hide();
	}).focusout(function() {
		if ($("#userPassword").val() == "" )
		{
			$("#userPassword").addClass("fieldError");
			$("#userPasswordError").show();
			$("#userPasswordLengthError").hide();		
		}
		else if ($("#userPassword").val().length <= 7 )
		{
			$("#userPassword").addClass("fieldError");
			$("#userPasswordError").hide();
			$("#userPasswordLengthError").show();
		}
		else
		{
			$("#userPassword").removeClass("fieldError");
			$("#userPasswordError").hide();
			$("#userPasswordLengthError").hide();
		}
	});
	
	//Confirm Password
	$("#confirmPassword").focusin(function() {
		$("#confirmPassword").removeClass("fieldError");
		$("#confirmPasswordError").hide();
		$("#confirmPasswordMismatch").hide();
	}).focusout(function() {
		if ($("#confirmPassword").val() == "" )
		{
			$("#confirmPassword").addClass("fieldError");
			$("#confirmPasswordError").show();
		}
		else if ($("#confirmPassword").val() !== $("#userPassword").val() )
		{
			$("#confirmPassword").addClass("fieldError");
			$("#confirmPasswordError").hide();
			$("#confirmPasswordMismatch").show();
		}
		else 
		{
			$("#confirmPassword").removeClass("fieldError");
			$("#confirmPasswordError").hide();
			$("#confirmPasswordMismatch").hide();
		}
	});
	
	//School Code
	$("#schoolCode").focusin(function() {
		$("#schoolCode").removeClass("fieldError");
		$("#schoolCodeError").hide();
		$("#schoolCodeInvalidChar").hide();
	}).focusout(function() {
		if ($("#schoolCode").val() == "")
		{
			$("#schoolCode").addClass("fieldError");
			$("#schoolCodeError").show();				
		}
		else
		{
			var sc = $("#schoolCode").val();
			var regex = /^[a-zA-Z0-9]+$/;
			
			if(!regex.test(sc)) {
				// bad
				$("#schoolCode").addClass("fieldError");
				$("#schoolCodeInvalidChar").show();
				return;
			}
		
			$("#schoolCode").removeClass("fieldError");
			$("#schoolCodeError").hide();
			$("#schoolCodeInvalidChar").hide();
		}
	});
});