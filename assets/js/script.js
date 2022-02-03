// variables
const apiKey = "0e0473efb94c0f7d3ef894e82a6c2281";
const searchCityHistory = [];

// functions
function handleCoords(searchCity) {
  const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      handleCurrentWeather(data.coord, data.name);
    });
}

function handleCurrentWeather(coordinates, city) {
  const lat = coordinates.lat;
  const lon = coordinates.lon;

  const fetchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data.current, city);
      displayFiveDayWeather(data.daily);
    });
}

function displayCurrentWeather(currentCityData, cityName) {
  let weatherIcon = `https://openweathermap.org/img/wn/${currentCityData.weather[0].icon}.png`;

  document.querySelector(
    "#currentWeather"
  ).innerHTML = `<h2>${cityName} ${moment
    .unix(currentCityData.dt)
    .format("MMM Do YYYY")} <img src="${weatherIcon}"></h2> <div>Temp: ${
    currentCityData.temp
  } \xB0F </div> <div>Wind: ${
    currentCityData.wind_speed
  } MPH </div> <div> Humidity: ${
    currentCityData.humidity
  }% <div id="uvIndex"> UV Index: ${currentCityData.uvi}`;

  let uvIndexData = currentCityData.uvi;
  let uvIndexColor = document.getElementById("uvIndex");

  if (uvIndexData <= 2) {
    uvIndexColor.classList.add("btn-success");
  } else if (uvIndexData >= 8) {
    uvIndexColor.classList.add("btn-danger");
  } else {
    uvIndexColor.classList.add("btn-warning");
  }
}

function displayFiveDayWeather(fiveDayCityData) {
  const cityData = fiveDayCityData.slice(1, 6);
  document.querySelector("#fiveDayWeather").innerHTML = "";

  cityData.forEach((day) => {
    let weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

    document.querySelector("#fiveDayWeather").innerHTML += `<div> ${moment
      .unix(day.dt)
      .format("MMM Do YYYY")}</div> <img src="${weatherIcon}"> <div>Temp: ${
      day.temp.day
    } \xB0F </div> <div>Wind: ${day.wind_speed} MPH </div> <div> Humidity: ${
      day.humidity
    }%`;
  });
}

function handleFormSubmit(event) {
  document.querySelector("#searchHistory").innerHTML = "";
  event.preventDefault();
  const city = document.querySelector("#searchInput").value.trim();
  searchCityHistory.push(city);
  searchCityHistory.filter((city) => {});
  searchCityHistory.forEach((city) => {
    document.querySelector(
      "#searchHistory"
    ).innerHTML += `<button data-city="${city}"class="w-100 d-block my-2">${city}</button>`;
  });

  handleCoords(city);
}

function handleHistory(event) {
  const city = event.target.getAttribute("data-city");
  handleCoords(city);
}

// listeners
document
  .querySelector("#searchForm")
  .addEventListener("submit", handleFormSubmit);
document
  .querySelector("#searchHistory")
  .addEventListener("click", handleHistory);
