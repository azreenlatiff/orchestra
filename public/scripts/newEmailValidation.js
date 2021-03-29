function verifyEmail(emailAddress) {
	
    var isEmailAddressValid = true;

	if(emailAddress == null || emailAddress == "") {
		return false;
	}

	//Check the syntax of the email address
	var atIndex = emailAddress.indexOf("@");
	var dotIndex = emailAddress.indexOf(".");
	var stringLength = emailAddress.length;

	if(atIndex < 0) {
		return false;
		//return "Email doesn't look valid. It's missing the \"@\" character.";
	}

	if(dotIndex < 0) {
		return false;
		//return "Email doesn't look valid. It's missing the period (\".\") character.";
	}

	if(atIndex == 0){
		return false;
		//return "Email doesn't look valid. It can't begin with a \"@\" character.";
	}

	if(dotIndex == 0){
		return false;
		//return "Email doesn't look valid. It can't begin with a \".\" character.";
	}

	if(emailAddress.substring(stringLength-1, stringLength) == "@"){
		return false;
		//return "Email doesn't look valid. It can't end with a \"@\" character.";
	}

	if(emailAddress.substring(stringLength-1, stringLength) == "."){
		return false;
		//return "Email doesn't look valid. It can't end with a \".\" character.";
	}

	if(emailAddress.indexOf("@", atIndex + 1) >= 0) {
		return false;
		//return "Email doesn't look valid. It can't have more than one \"@\" character.";
	}

	if(emailAddress.indexOf(".", atIndex + 2) < 0) {
		return false;
		//return "Email doesn't look valid. The \".\" character has to follow the \"@\" character and at least one letter.";
	}

	if(emailAddress.length < 5) { // Can't really get this, just a failsafe.
	   return false;
		//return "Email doesn't look valid. It's too short.";
	}

	if(emailAddress.substring(atIndex-1, atIndex) == ".") {
	   return false;
		//return "Email doesn't look valid. The \".\" character cannot precede the \"@\" character.";
	}

	if(emailAddress.substring(atIndex+1, atIndex+2) == ".") {
		return false;
		//return "Email doesn't look valid. The \".\" character cannot follow the \"@\" character.";
	}

	if(emailAddress.indexOf(" ") >= 0) {
	   return false;
		//return "Email doesn't look valid. There are spaces.";
	}
	
	return true;
}