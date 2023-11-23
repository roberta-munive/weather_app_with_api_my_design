function capitalizeFirstLetterOfWordsInString(str) {
  str = str.toLowerCase().trim();

  // split words of sentence into separate indices of array
  let word_array = str.split(" ");
  for (var i = 0; i < word_array.length; i++) {
    word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substring(1);
  }

  // return a string with first letter of words capitalized
  return word_array.join(" ");
}

function displayCityName(city) {
  // city = capitalizeFirstLetterOfWordsInString(city);
  let currentCityLocator = document.querySelector("#current-city");
  currentCityLocator.innerHTML = city;
}

function displayCurrentWeatherConditions(response) {
  // pull data from api
  let city = response.data.city;
  let currentTemperature = response.data.temperature.current;
  let currentTemperatureLocator = document.querySelector(
    "#current-temperature"
  );
  let currentDateAndTime = response.data.time;
  formatAndDisplayDateAndTime(currentDateAndTime);

  currentTemperature = Math.round(currentTemperature);

  //display data
  displayCityName(city);
  currentTemperatureLocator.innerHTML = currentTemperature;

  //remove hardcoded current weather conditions from HTML
}

function formatAndDisplayDateAndTime(timeStamp) {
  // reference: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

  // Need to multiply by 1000 so that the argument is in milliseconds, not seconds
  let dateAndTimeStr = new Date(timeStamp * 1000);
  let dayOfWeek = dateAndTimeStr.getDay();

  //convert time to the format 6:53 PM
  let timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  let dateOptions = { month: "long", day: "numeric" };
  let currentTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    dateAndTimeStr
  );
  let currentDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    dateAndTimeStr
  );

  //convert time to the format 6:53 PM

  let dateLocator = document.querySelector("#current-date");
  let dayOfWeekLocator = document.querySelector("#current-day-of-week");
  let currentTimeLocator = document.querySelector("#current-time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dayOfWeekLocator.innerHTML = days[dayOfWeek];
  dateLocator.innerHTML = currentDate;
  currentTimeLocator.innerHTML = currentTime;
}

function getCity(event) {
  event.preventDefault();

  let searchBarInputLocator = document.querySelector("#search-bar-input");
  let city = searchBarInputLocator.value;
  getCurrentWeatherConditions(city);
}

function getCurrentWeatherConditions(city) {
  let unit = "imperial";
  let apiKey = "cf14b4c0f0c0d7a973ee3b4e430t2bo5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

let defaultCity = "Paris";
let searchBarLocator = document.querySelector("#search-bar");

getCurrentWeatherConditions(defaultCity);

searchBarLocator.addEventListener("submit", getCity);
