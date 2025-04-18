const apikey = "ccaddac8357b4533b86630f4559f7362";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
      weathericon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weathericon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weathericon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weathericon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weathericon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Search on button click
searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});

// Search on Enter key press
searchbox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchbox.value);
  }
});

// Initial city load
checkWeather("Bangalore");
