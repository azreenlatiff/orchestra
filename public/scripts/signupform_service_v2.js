
 
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
	$("#formabbrexplain-showhide").hide();
  $("#confirmPassword-showhide").hide();
  $("#mainFormCopy").hide();
  $("#view-main-form").hide();
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
  
  //School Type
	$("#schoolType").focusin(function() {
		$("#schoolType").removeClass("fieldError");
		$("#schoolTypeError").hide();
	}).focusout(function() {
	  if ($("#schoolType").val() == "")
		{
			$("#schoolType").addClass("fieldError");
			$("#schoolTypeError").show();
		}
		else
		{				
			$("#schoolType").removeClass("fieldError");
			$("#schoolTypeError").hide();
		}
	});
  
  //School Size
	$("#schoolSize").focusin(function() {
		$("#schoolSize").removeClass("fieldError");
		$("#schoolSizeError").hide();
	}).focusout(function() {
	  if ($("#schoolSize").val() == "")
		{
			$("#schoolSize").addClass("fieldError");
			$("#schoolSizeError").show();
		}
		else
		{				
			$("#schoolSize").removeClass("fieldError");
			$("#schoolSizeError").hide();
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
	
	//Email Verification Code
	$("#emailVerificationCode").focusin(function() {
		$("#emailVerificationCode").removeClass("fieldError");
    $("#emailVerificationCodeError").hide();
    $("#emailVerificationCodeErrorBottom").hide();
    $("#emailVerificationCodeInvalid").hide();
	}).focusout(function() {
		if ($("#emailVerificationCode").val() === "")
		{
			$("#emailVerificationCode").addClass("fieldError");
			$("#emailVerificationCodeInvalid").show();
		}
		else
		{
			$("#emailVerificationCode").removeClass("fieldError");
      $("#emailVerificationCodeInvalid").hide();
			$("#emailVerificationCodeError").hide();
      $("#emailVerificationCodeErrorBottom").hide();
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

    let sc = $("#schoolCode").val().toLowerCase();
    // var regex = /^[a-z0-9]+$/;
    // let regexDigitsOnly = /^[0-9]+$/;
    let regex = /^[^0-9][a-zA-Z0-9_]+$/g
    
    if (sc == "") {
      // bad - empty
      $("#schoolCode").addClass("fieldError");
      $("#schoolCodeError").show();				
      isAllFieldsGood =  false;
    } else if (!regex.test(sc)) {
      // bad
      $("#schoolCode").addClass("fieldError");
      $("#schoolCodeInvalidChar").show();
      return;
    } else {
      // good
      $("#schoolCode").removeClass("fieldError");
      $("#schoolCodeError").hide();
      $("#schoolCodeInvalidChar").hide();
    }
	});
});
/* ================================= End of INSTA-Validate ================================= */


function validateFields() {					
	var isAllFieldsGood = true;
	setOnSucessHost(); 
	
	var isEmailValid = checkIsEmailValid();
	var isPhoneNumberValid = checkIsValidPhoneNumber();

  /*
	if(isValidSchoolcode() == false)
	{
		isAllFieldsGood =  false;
	}
  
	if(isSchoolCodeDigitsOnly() == false)
	{
		isAllFieldsGood =  false;
	}
	
	if(isUnderscorePresent() == false)
	{
		isAllFieldsGood =  false;
  } */
	
	if(isEmailValid == false)
	{
		isAllFieldsGood =  false;
	}

	if(isPhoneNumberValid == false)
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

  //School Type
  if ($("#schoolType").val() == "")
	{
		$("#schoolType").addClass("fieldError");
		$("#schoolTypeError").show();
		isAllFieldsGood =  false;
	}
	else
	{				
    $("#schoolType").removeClass("fieldError");
    $("#schoolTypeError").hide();
  }

  
  //School Size 
	if ($("#schoolSize").val() == "")
	{
		$("#schoolSize").addClass("fieldError");
		$("#schoolSizeError").show();
		isAllFieldsGood =  false;
	}
	else
	{				
    $("#schoolSize").removeClass("fieldError");
    $("#schoolSizeError").hide();
  }

	//Contact Name
	if ($("#contactPerson").val() == "")
	{
		$("#contactPerson").addClass("fieldError");
		$("#contactPersonError").show();
		isAllFieldsGood = false;
	}
	else
	{
		$("#contactPerson").removeClass("fieldError");
		$("#contactPersonError").hide();
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

	// Phone
	if ($("#phoneNumber").val() == "")
	{
		$("#phoneNumber").addClass("fieldError");
		$("#phoneNumberError").show();
		isAllFieldsGood =  false;
	}
	else if (isPhoneNumberValid == false )
	{
		$("#phoneNumber").addClass("fieldError");
		$("#phoneNumberError").hide();
		$("#phoneNumberInvalid").show();
		isAllFieldsGood =  false;
	}
	else
	{
		$("#phoneNumber").removeClass("fieldError");
		$("#phoneNumberError").hide();
		$("#phoneNumberInvalid").hide();
	}
	
	// User Password
	if ($("#userPassword").val() == "" )
	{
		$("#userPassword").addClass("fieldError");
		$("#userPasswordError").show();				
		isAllFieldsGood =  false;
	}
	else if ($("#userPassword").val().length <= 7 )
	{
		$("#userPassword").addClass("fieldError");
		$("#userPasswordError").hide();
		$("#userPasswordLengthError").show();
		isAllFieldsGood =  false;
	}
	else
	{
		$("#userPassword").removeClass("fieldError");
		$("#userPasswordError").hide();
	}
	
	// Confirm Password
	if ($("#confirmPassword").val() == "" )
	{
		$("#confirmPassword").addClass("fieldError");
		$("#confirmPasswordError").show();
		isAllFieldsGood =  false;
	}
	else if ($("#confirmPassword").val() !== $("#userPassword").val() )
	{
		$("#confirmPassword").addClass("fieldError");
		$("#confirmPasswordError").hide();
		$("#confirmPasswordMismatch").show();
		isAllFieldsGood =  false;
	}
	else 
	{	
		$("#confirmPassword").removeClass("fieldError");
		$("#confirmPasswordError").hide();
		$("#confirmPasswordMismatch").hide();
	}
	
  // School Code
  let sc = $("#schoolCode").val().toLowerCase();
  let regex = /^[^0-9][a-zA-Z0-9_]+$/g
    
  if (sc == "") {
    // bad - empty
    $("#schoolCode").addClass("fieldError");
    $("#schoolCodeError").show();				
    isAllFieldsGood =  false;
  } else if (!regex.test(sc)) {
    // bad
    $("#schoolCode").addClass("fieldError");
    $("#schoolCodeInvalidChar").show();
    return;
  } else {
    // good
    $("#schoolCode").removeClass("fieldError");
    $("#schoolCodeError").hide();
    $("#schoolCodeInvalidChar").hide();
  }

	return isAllFieldsGood;
}

var userCity = "";
var userState = "";
var countryCode = "";
var userCountry = "";
var userLatitude = "";
var userLongitude = "";
var timezoneId = "";

function validateForm() {
  $(".error").hide();
  $(".fa-spinner").css("display", "inline-block");
    
	//get the school code
	schoolCode = document.getElementById("schoolCode").value.toLowerCase();
	
  let isAllFieldsAreFilled = validateFields();

	// Submit form based on where this form is being accessed from.
	var stagingHost = "c9.io";
    
	var host = window.location.host;	

	var usSubmissionSite = "https://control.quickschools.com/sms/servlet/com.maestro.servlet.FrontFormSubmissionController";
	var stagingSubmissionSite = "http://localhost:8080/sms/servlet/com.maestro.servlet.FrontFormSubmissionController";
	
	var actualSubmissionSite;
	var actionURL;

	if(host.indexOf(stagingHost) >= 0)
	{
		actualSubmissionSite = stagingSubmissionSite;
		actionURL = stagingSubmissionSite;
	}
	else
	{		
		actualSubmissionSite = usSubmissionSite;
		actionURL = usSubmissionSite;
	}
		
	var submissionFormElement = document.getElementById("submissionForm");
  submissionFormElement.action = actualSubmissionSite;

	if (isAllFieldsAreFilled) {
    console.log("Okay, all fields are good to go.");

    let emailAddress = $("#emailAddress").val();
    let verificationCode = $("#emailVerificationCode").val();
    console.log('emailAddress: ', emailAddress, 'verificationCode: ', verificationCode);
    fetch(`https://control.quickschools.com/sms/v1/signup?email=${emailAddress}&verificationCode=${verificationCode}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then((responseJson) => {
        console.log('Code Verification Response: ', responseJson);
        if (!responseJson.success) {
          $("#emailVerificationCode").addClass("fieldError");
          $("#emailVerificationCodeError").show();
          $("#emailVerificationCodeErrorBottom").show();
          $(".fa-spinner").hide();
        } else {
          $.getJSON("https://control.quickschools.com/sms/api/v1/schools/schoolCode:" + schoolCode + ".jsonp?callback=?",
            function(data) {
              var success = data.success;
              var isTaken = success;
              
              if (isTaken == true) {
                $("#schoolCode").addClass("fieldError");
                $("#schoolCodeInvalid").show();
                $(".fa-spinner").hide();
                            
              } else {
                console.log('SUCCESS: getGeoMapAndSubmitForm();')
                $( "#emailVerificationCode" ).prop( "disabled", true );
                getGeoMapAndSubmitForm();
                $("#schoolCode").removeClass("fieldError");
                $("#schoolCodeInvalid").hide();
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
	} else {
		//Show the main error message at the bottom of the page
		$(".error-overview").show();
		$(".fa-spinner").hide();
	}// End isAllFieldsAreFilled
}

function generateToken() {
  let emailAddress = $("#emailAddress").val();	
  let isEmailValid = false;
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
      isEmailValid = true;
		}

  if(isEmailValid) {
    $(".fa-spinner").css("display", "inline-block");
    fetch(`https://control.quickschools.com/sms/v1/signup?email=${emailAddress}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        $("#emailFormCopy").hide();
        $("#mainFormCopy").show();
        $( "#emailAddress" ).prop( "readonly", true );
        $(".fa-spinner").hide();
        $("#veriCodeButton").hide();
        $("#view-main-form").show();
        $("#mainFormCopy").show();
        $("#postVerificationInfo").show();
        setTimeout(function() {
          $('#veriCodeButton').prop('disabled', false);
          $('.button-verify-email').css({'background-color': '#7ac735'});
          $(".button-verify-email").on("mouseover mouseout", function(){
            $(this).toggleClass("button-submit-mouseover");
          });
        }, 30000);
      } else {
        $(".fa-spinner").hide();
        $("#emailVerificationOffline").show();
      }
      console.log('Code Generation Response: ', responseJson);
    })
    .catch((err) => {
      console.log(err);
      $(".fa-spinner").hide();
    });
  }
}
	
function getGeoMapAndSubmitForm(){
    // 2014-03-31: ipinfodb has has stopped responding. Continue on error/timeout.
    $.ajax({
        url: "https://api.ipinfodb.com/v3/ip-city/?format=json&key=0abaf74c6036cf6e670b67e68db7c743faa3be7760495da774d839b11cfa5e40&callback=?",
        dataType: "jsonp",
        timeout: 10000,
        success: function(data) {
			userCity = data.cityName;
			userState = data.regionName;
			userCountry = data.countryName;
			countryCode = data.countryCode;
			userLatitude = data.latitude;
			userLongitude = data.longitude;
			timezoneId = data.timeZone;
            try {
                _kmq.push(['record', 'signed up', {'plan level':selectedSignupPlan}]);
            } catch(e) {
                // ignore
            }
			submitForm(userCity, userState, countryCode, userCountry, userLatitude, userLongitude, timezoneId);
		},
        error: function (parsedjson, textStatus, errorThrown) {
            console.log("Proceeding without location info");
            try {
                _kmq.push(['record', 'signed up', {'plan level':selectedSignupPlan}]);
            } catch(e) {
                // ignore
            }
			submitForm(null, null, null, null, null, null, null);
    }});
    
	// 2010-11-16: ipinfodb has changed API, and this has stopped working. Circumventing for now.
	// 2011-10-05: ipinfodb is working again, and I have an API key. Let's use this again.
	// 2011-10-05: Back to ipinfodb, so commenting this out.
	// Careful: You NEED the weird callback=?. This is for jquery, not for pidgets.com.
	/*$.getJSON("http://geoip.pidgets.com/?format=json&callback=?",
		function(data)
		{						
			alert("Back from geoip");
		   userCity = data.city;
		   userState = data.region;
		   countryCode = data.country_code;
		   userCountry = data.country_name;
		   userLatitude = data.latitude;
		   userLongitude = data.longitude;
		   timezoneId = null;
	
		   submitForm(userCity, userState, countryCode, userCountry, userLatitude, userLongitude, timezoneId);
		}

	);*/
}

// This is what submits the form after validation and geo checking.
function submitForm(userCity, userState, countryCode, userCountry, userLatitude, userLongitude, timezoneId)
{	
	document.getElementById('countryCode').value = countryCode;
	document.getElementById('userCountry').value = userCountry;
	document.getElementById('userCity').value = userCity;
	document.getElementById('userState').value = userState;
	document.getElementById('userLatitude').value = userLatitude;
	document.getElementById('userLongitude').value = userLongitude;
	document.getElementById('timezoneId').value = timezoneId;
	document.getElementById('subscriptionPackageMetaId').value = selectedSignupPlan;
    
    if(Cookie.has("qsTags")) {
        document.getElementById('qsTags').value = Cookie.get("qsTags");
    }
	
	var submissionFormElement = document.getElementById("submissionForm");
	
	submissionFormElement.submit();
}

function isInteger (s)
{
  var i;

  if (isEmpty(s))
  if (isInteger.arguments.length == 1) return 0;
  else return (isInteger.arguments[1] == true);
	
  for (i = 0; i < s.length; i++)
  {
	 var c = s.charAt(i);
	 if (!isDigit(c)) return false;
  }

  return true;
}

function isEmpty(s)
{
  return ((s == null) || (s.length == 0))
}

function isDigit (c)
{
  //var convertStringToInt = parseInt(c, 10);	  
  return ((c >= "0") && (c <= "9"))
}

function size(referalCodeLength)
{
  var strLength = referalCodeLength.length;	  
  //alert("referal code length " + strLength);
  return strLength;
}

function setOnSucessHost()
{
	document.submissionForm.onSuccess.value = "https://www.quickschools.com/quickschools/accountcreation?smsSchoolId=${smsSchoolId}&schoolCode=${schoolCode}&ausername=${username}";
}
 
function isValidSchoolcode()
{
	var validateSchoolCode = document.submissionForm.schoolCode.value;		
	//alert("This is the school code validation 1: " + /^\w+$/i.test(validateSchoolCode));	class="form-submit" id="signup-submit" name="op"		
	return /^\w+$/i.test(validateSchoolCode);
}

function isSchoolCodeDigitsOnly(value, element) 
{
	var validateSchoolCode = document.submissionForm.schoolCode.value;
	return /^[a-zA-Z]/i.test(validateSchoolCode);
}

function isUnderscorePresent(value, element) 
{
	var validateSchoolCode = document.submissionForm.schoolCode.value;
	return /^[^_]*$/i.test(validateSchoolCode);
}

function checkIsEmailValid() 
{
	var emailAddress = document.submissionForm.emailAddress.value;
	if (!verifyEmail(emailAddress)){
		return false;
	}
	return true;
}

function checkIsValidPhoneNumber(value, element) 
{
	var stripped = document.submissionForm.phoneNumber.value.replace(/[\(\)\.\-\ ]/g, '');    

	var isContainAlphabets = containsAlphabets(stripped);
	var isContainSpecialCharacters = containsSpecialCharacters(stripped);

	if(isContainAlphabets){
	   //alert('There are alphabets in the phone number.');
	   return false;
	}
	else if(isContainSpecialCharacters ){
	   //alert('There are special characters in the phone number.');
	   return false;
	}
	else if(isNaN(parseInt(stripped))){
	   //alert('The phone number contains illegal characters.');
	   return false;
	} else if((stripped.length < 6)){
	   //alert('The phone number is the wrong length. Make sure you included an area code.');
	   return false;
	} 

	return true;
}

function containsAlphabets(checkString) {
   
	var tempString;
	var regExp = /^[A-Za-z]$/;

	if(checkString != null && checkString != "")
	{
		for(var i = 0; i < checkString.length; i++)
		{
			if (checkString.charAt(i).match(regExp))
			{
				//alert('none match');
				return true;
			}
		}
	}
	else
	{
		return false;
	}
	return false;
}

function containsSpecialCharacters(checkString2) {

	var specialChars = '!@#$%^&*=[]\\\';,/{}|\":<>?~_';

	for (var i = 0; i < checkString2.length; i++) {
		if (specialChars.indexOf(checkString2.charAt(i))!= -1) {
			return true;
		}
	}
	return false;
}
