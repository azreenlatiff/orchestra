var appServerAddress = "quickschools.com";
var webServerAddress = "www.quickschools.com";

var isLiveServer = true;
var host = window.location.host.toLowerCase();
if(host.indexOf("quickschools.com") < 0 && host.indexOf("smartschoolcentral.com") < 0) {
    isLiveServer = false;
}
console.log("Is live server 2:", isLiveServer);

var stageMessages = [];
stageMessages[0] = "Here we go...";
stageMessages[1] = "Collecting the ingredients";
stageMessages[2] = "Measuring the sugar";
stageMessages[3] = "Sifting the flour";
stageMessages[4] = "Melting the chocolate";
stageMessages[5] = "Preheating the oven";
stageMessages[6] = "Mixing the batter";
stageMessages[7] = "Popping them in the oven";
stageMessages[8] = "Adding on some smiley faces";
stageMessages[9] = "The cookies are done!";

var stagePercentage = [];
stagePercentage[-1] = 0;
stagePercentage[0] = 1;
stagePercentage[1] = 10;
stagePercentage[2] = 60;
stagePercentage[3] = 70;
stagePercentage[4] = 75;
stagePercentage[5] = 80;
stagePercentage[6] = 85;
stagePercentage[7] = 90;
stagePercentage[8] = 95;
stagePercentage[9] = 100;

var curr = 0;
var stage = {stage:0};

var interval = setInterval(updateBar, 100);

var success = false;

function updateBar() {
    
    var range = {
        min: stagePercentage[stage.stage-1],
        max: stagePercentage[stage.stage]
    };
    
    if(curr < range.min) curr = curr + 3; // Fast when it's less
    else if(curr < range.max) curr = curr + 0.5; // Slow when in range
    else curr = curr + 0.1; // Super slow when exceeded

    if(curr >= 100) curr = 100;
    
    //If ever a success, succeed
    if(stage.success == true) success = true;
    
    if(curr >= 100) {
        if(stage.success == true) success = true;
        console.log("Considered done. Success: " + success);
        clearInterval(interval);
        
        if(!success) setMessage("We're so sorry, we encountered a problem with creating your account. Please <a href='javascript:$zopim.livechat.window.show()'>chat with us</a> so we can help you.<br />Or you can also try the login button below.");
        else setMessage("We're all set! Click below to get started.");
        
        fb.off("value", handleFirebaseValue);
        
        showLogin();
    }
    
    setProgress(curr);
}

var schoolCode = getQueryParam("schoolCode");
if(schoolCode == null || schoolCode == "") schoolCode = "aris950";

var fbUrl = "http://quickschools.firebaseio.com/qslive/accountcreation/";
if(!isLiveServer) fbUrl = "http://quickschools.firebaseio.com/qstest/accountcreation/";

var fb = new Firebase(fbUrl + schoolCode);

function handleFirebaseValue(snapshot) {
    var incomingStage = snapshot.val();
    console.log("Got new stage:", incomingStage);
    if(incomingStage != null) {
        stage = incomingStage;
        
        updateBar();
        setMessage(stageMessages[stage.stage]);
    }
}

fb.on("value", handleFirebaseValue);

function setProgress(percentage) {
    $(".meter > span").css("width", percentage + "%");
}

function showLogin() {
    $("#login-button").show();
    $("#login-button").click(function() {
        location.href="http://" + schoolCode + ".quickschools.com?ausername=" + getQueryParam("ausername");
    });
    
    $(".meter").hide();
    console.log("Done");
}

function setMessage(msg) {
    $("#progress-message").html(msg);
}