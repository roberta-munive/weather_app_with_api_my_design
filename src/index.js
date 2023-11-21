function capitalizeFirstLetterOfWordsInString(str) {
  str = str.toLowerCase().trim();
  let word_array = str.split(" ");
  for (var i = 0; i < word_array.length; i++) {
    word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substring(1);
  }

  return word_array.join(" ");
}

function displayCityName(city) {
  // city = capitalizeFirstLetterOfWordsInString(city);
  let currentCityLocator = document.querySelector("#current-city");
  currentCityLocator.innerHTML = city;
}

function displayCurrentWeatherConditions(response) {
  let city = response.data.city;
  displayCityName(city);

  let currentTemperature = response.data.temperature.current;
  currentTemperature = Math.round(currentTemperature);
  let currentTemperatureLocator = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureLocator.innerHTML = currentTemperature;

  //remove hardcoded current weather conditions from HTML
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
getCurrentWeatherConditions(defaultCity);

let searchBarLocator = document.querySelector("#search-bar");

searchBarLocator.addEventListener("submit", getCity);
