let API_KEY = "08cf8dc10c760eea39a1482238856a08";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayEl = document.querySelector(".default_day");
let dateEl = document.querySelector(".default_date");
let inputEl = document.querySelector(".input_field");
let btnEl = document.querySelector(".btn_search");
let iconsContainer = document.getElementById("icons");
let dayInfoEl = document.querySelector(".day_info");
let listContentEl = document.querySelector(".list_content ul");

let displayDate = () => {
  let today = new Date();
  let dayName = days[today.getDay()];
  let month = today.toLocaleString("default", { month: "long" });
  let date = today.getDate();
  let year = today.getFullYear();

  dayEl.textContent = dayName;
  dateEl.textContent = `${date} ${month} ${year}`;
};

let fetchWeatherData = async (name) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
    );
    let data = await response.json();
    console.log("data", data);
    if (data.cod !== "404") {
      displayWeather(data);
      displayForecast(data.coord.lat, data.coord.lon);
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.log(error);
    displayErrorMessage("An error occurred while fetching data.");
  }
};

let displayWeather = (data) => {
 

  iconsContainer.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@4x.png" />
  <h2 class="weather_temp">${Math.round(data.main.temp - 273.15)}°C</h2>
  <h3 class="cloudtxt">${data.weather[0].description}</h3>
  `;

  dayInfoEl.innerHTML = `
    <div class="content">
      <p class="title">NAME</p>
      <span class="value"> ${data.name}</span>
    </div>
    <div class="content">
      <p class="title">TEMP</p>
      <span class="value">${Math.round(data.main.temp - 273.15)}°C</span>
    </div>
    <div class="content">
      <p class="title">HUMIDITY</p>
      <span class="value">${data.main.humidity}%</span>
    </div>
    <div class="content">
      <p class="title">WIND SPEED</p>
      <span class="value">${data.wind.speed} m/s</span>
    </div>
  `;
};

let displayForecast = async (lat, lon) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    let data = await response.json();
    console.log('data', data);
    let uniqueForecastDays = [];
    let daysForecast = data.list.filter((forecast) => {
      let forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }
    });
    listContentEl.innerHTML = "";
    daysForecast.slice(0, 4).forEach((forecast) => {
      listContentEl.innerHTML += `
        <li>
          <img src="https://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"/>
          <span>${days[new Date(forecast.dt_txt).getDay()].slice(0, 3)}</span>
          <span class="day_temp">${Math.round(
            forecast.main.temp - 273.15
          )}°C</span>
        </li>
      `;
    });
  } catch (error) {
    console.log(error);
    displayErrorMessage("An error occurred while fetching forecast data.");
  }
};

let displayErrorMessage = (message) => {
  iconsContainer.innerHTML = `
    <h2 class="weather_temp">${message}</h2>
  `;
};

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputEl.value.trim() !== "") {
    fetchWeatherData(inputEl.value.trim());
    inputEl.value = "";
  } else {
    console.log("Please Enter City or Country Name");
  }
});

displayDate();
