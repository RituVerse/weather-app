
const apiKey = "07e450a4278249d2200be51a40d64546";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = cityInput.value.trim();

  errorMsg.textContent = "";
  weatherInfo.innerHTML = "";

  if (city === "") {
    errorMsg.textContent = "Please enter a city name";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .catch((err) => {
      errorMsg.textContent = err.message;
    });
}

function showWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const cityName = data.name;

  weatherInfo.innerHTML = `
    <h2>${cityName}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
    <div class="temp">${temp}°C</div>
    <div class="desc">${desc}</div>
  `;
}
