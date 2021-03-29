
$(document).ready(function(){
	$("#schoolCode").focus();

	$("#schoolCode").on("keypress", function(e) {
	  if(e.keyCode == 13) { // Enter key
		  event.preventDefault();
	    validateForm();
	  }
	});
	
	/* ---------- INSTA-Validate ---------- */
  $("#schoolCode").focusin(function() 
  {
		$("#schoolCode").removeClass("fieldError");
		$("#schoolCodeError").hide();
		$("#schoolCodeInvalid").hide();
  }).focusout(function() 
  {
    let sc = $("#schoolCode").val().toLowerCase();
    let regex = /^[a-z0-9]+$/;
    let regexDigitsOnly = /^[0-9]+$/;
    
    if (sc == "") 
    {
      $("#schoolCode").addClass("fieldError");
    }
		else if (!regex.test(sc) || regexDigitsOnly.test(sc))
    {
      // bad
      $("#schoolCode").addClass("fieldError");
      $("#schoolCodeInvalid").show();
      return;		
		}
		else
		{	
			$("#schoolCode").removeClass("fieldError");
			$("#schoolCodeError").hide();
			$("#schoolCodeInvalid").hide();
		}
	}); //focusout
}); //doc ready

function validateFields()
{					
	let isAllFieldsGood = true;
  let sc = $("#schoolCode").val().toLowerCase();
	let regex = /^[a-z0-9]+$/;
	let regexDigitsOnly = /^[0-9]+$/;

	if (sc == "" || !regex.test(sc) || regexDigitsOnly.test(sc))
	{
		// bad
		$("#schoolCode").addClass("fieldError");
		$("#schoolCodeInvalid").show();
		isAllFieldsGood =  false;
		return;
	}
	else
	{
		// good
		console.log("validateFields: Valid school code");
	}
	
	$("#schoolCode").removeClass("fieldError");
	$("#schoolCodeError").hide();
	return isAllFieldsGood;
}

function validateForm()
{
	$(".signin-error").hide();
	$(".fa-spinner").css("display", "inline-block");
    
	//get the school code
	var schoolCode = document.getElementById("schoolCode").value.toLowerCase();
	var isAllFieldsAreFilled = validateFields(); 

	if(isAllFieldsAreFilled == true) 
	{
		$.getJSON("https://control.quickschools.com/sms/api/v1/schools/schoolCode:" + schoolCode + ".jsonp?callback=?",
			function(data) {
				var success = data.success;
				var isTaken = success;

				if(!isTaken) {
					$("#schoolCode").addClass("fieldError");
					$("#schoolCodeError").show();
					$(".fa-spinner").hide();
                      
				} else {
					$("#schoolCode").removeClass("fieldError");
					$("#schoolCodeInvalid").hide();
					window.location.replace(`https://${schoolCode}.quickschools.com`);
				}
			}
		);
	}
	else
	{
		$(".fa-spinner").hide();
	}// End isAllFieldsAreFilled
}
