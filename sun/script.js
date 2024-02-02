let latitude, longitude;
let isSunModeReversed = false;
const statusElement = document.getElementById("status");

function fetchLocation() {
    return fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(jsonData => {
            latitude = jsonData.latitude;
            longitude = jsonData.longitude;
        })
        .catch(error => {
            console.error("Error fetching location:", error);
            // Handle the error, e.g., display a message to the user
        });
}

function sunmodechange() {
	var element = document.body;
	element.classList.toggle("sun-mode");
	isSunModeReversed = !isSunModeReversed;
	makeTimer();
}

function setInnerHTML(selector, value) {
	document.querySelector(selector  + ' .time-value').innerHTML = value;
  }

function formatTimeUnit(unit) {
	return unit < 10 ? "0" + unit : unit;
  }

function makeTimer() {
	let timeLeft;

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const now = (Date.parse(new Date()) / 1000);

	let sunsetToday = Date.parse(new Date().sunset(latitude, longitude)) / 1000;
	let sunriseToday = Date.parse(new Date().sunrise(latitude, longitude)) / 1000;

	const sunsetTomorrow = Date.parse(tomorrow.sunset(latitude, longitude)) / 1000;
	const sunriseTomorrow = Date.parse(tomorrow.sunrise(latitude, longitude)) / 1000;

	
	if (sunriseToday < now) {
		sunriseToday = sunriseTomorrow;
	} else {
		sunsetToday = sunsetTomorrow;
	}

	const timeLeftToSunset = sunsetToday - now;
	const timeLeftToSunrise = sunriseToday - now;

	if ((isSunModeReversed && timeLeftToSunset > timeLeftToSunrise) || (!isSunModeReversed && timeLeftToSunset < timeLeftToSunrise)) {
		timeLeft = timeLeftToSunset;
		statusElement.textContent = "Sunset";
	} else {
		timeLeft = timeLeftToSunrise;
		statusElement.textContent = "Sunrise";
	}

	const hours = formatTimeUnit(Math.floor(timeLeft / 3600));
	const minutes = formatTimeUnit(Math.floor((timeLeft % 3600) / 60));
	const seconds = formatTimeUnit(timeLeft % 60);

	setInnerHTML("#hours", hours);
	setInnerHTML("#minutes", minutes);
	setInnerHTML("#seconds", seconds);
}

fetchLocation().then(makeTimer);

setInterval(makeTimer, 1000);