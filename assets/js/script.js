// Global Variables

// Functions
//fetch function - retrieve data from API
const fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=4b9f7dc3f8536150bc0eb915e8e4a81b`;

//fetch back tattoo
fetch(fetchUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.results);
    displayResults(data.results);
  });

function displayResults() {}

// EVENT LISTENERS
// On page load, show any past cities searched (local storage, does not erase search when website is left)
// Search for city button click
document.querySelector("#searchForm").addEventListener("submit", handleResults);
// Click on city to show weather
