function capitalizeFirstLetterOfWordsInString(str) {
  str = str.toLowerCase().trim();
  let word_array = str.split(" ");
  for (var i = 0; i < word_array.length; i++) {
    word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substring(1);
  }

  return word_array.join(" ");
}

function displayCityName(city) {
  city = capitalizeFirstLetterOfWordsInString(city);
  let currentCityLocator = document.querySelector("#current-city");
  currentCityLocator.innerHTML = city;
}

function getCurrentWeatherConditions(event) {
  event.preventDefault();

  let searchBarInputLocator = document.querySelector("#search-bar-input");
  let city = searchBarInputLocator.value;
  displayCityName(city);
}

let searchBarLocator = document.querySelector("#search-bar");

searchBarLocator.addEventListener("submit", getCurrentWeatherConditions);
