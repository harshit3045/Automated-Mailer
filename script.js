var otp = Math.floor(Math.random()*10001);
var toname,tomail

// general function to send email; 
function sendEmail(body) {                                          // param body is a string that goes as email content
    tomail = document.getElementById("toMail").value;

    Email.send({
        Host: "smtp.gmail.com",
		Username : "mailtest1815@gmail.com",
		Password : "mailer1815",
		To : tomail,
		From : "mailtest1815@gmail.com",
		Subject : "XKCD comic subscription",
		Body : body
        }).then(function(message){
            alert("Mail sent successfully!")
	});
}

// sends OTP; called by Send OTP Buttton
function sendOTP() {
    toname = document.getElementById("toName").value
    sendEmail("Hi, "+toname+"<br><h1> Your OTP is <br>" + otp+"</h1><p> From<br> XKCD Mails");
}

// called from verifyAndStart function. verifies OTP and returns true or false
function verify(){
    var inputOTP = document.getElementById("otp").value;
    if(inputOTP == otp) {
        alert("OTP verified")
        return true
    }
    return false
}

// fetches comic link and sends a call to sendEmail with image link as param
function getComic() {
    
    var a = Math.floor(Math.random()*2553);              //random comic id
	var url = "https://xkcd.com/"+a+"/info.0.json";
    //code taken from API to account for CORS thingy
	$.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(url), function (data) {
	        var a = JSON.parse( data.contents).img
            body = '<img src = "'+a+'">'
            sendEmail(body)
		});
    // API code end
}

// called from verify and start button. sends the email periodically
function verifyAndStart(params){
    if(verify()) {
        const a = setInterval(getComic,60000);        // getComic and not 'getComic()' 
    }
    else{
        alert("Wrong OTP. Please try again");
    }
}
