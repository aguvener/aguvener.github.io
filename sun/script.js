var latitude = geoplugin_latitude();
var longitude = geoplugin_longitude();
var reverse = false;

function sunmodechange() {
	var element = document.body;
	element.classList.toggle("sun-mode");
	var x = document.getElementById("status");
	if (reverse == false) {
		reverse = true;
	}
	else {
		reverse = false;
	}
	if (x.innerHTML === "Sunset") {
	  x.innerHTML = "Sunrise";
	} else {
	  x.innerHTML = "Sunset";
	}
	makeTimer();
  
}

function makeTimer() {
	let sunset = (Date.parse(new Date().sunset(latitude, longitude))) / 1000;
	let sunrise = (Date.parse(new Date().sunrise(latitude, longitude))) / 1000;

	let now = (Date.parse(new Date()) / 1000);

	var timeLeftToSunset = sunset - now;
	var timeLeftToSunrise = sunrise - now;

	if (timeLeftToSunrise < timeLeftToSunset && reverse == false) {
		var timeLeft = timeLeftToSunrise;
	} else {
		var timeLeft = timeLeftToSunset;
	}


	var days = Math.floor(timeLeft / 86400); 
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < 10) { hours = "0" + hours; }
	if (minutes < 10) { minutes = "0" + minutes; }
	if (seconds < 10) { seconds = "0" + seconds; }

	$("#hours").html(hours + "<span>hours</span>");
	$("#minutes").html(minutes + "<span>minutes</span>");
	$("#seconds").html(seconds + "<span>seconds</span>");
}

setInterval(makeTimer, 1000);
