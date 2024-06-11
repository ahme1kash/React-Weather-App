import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
const Weather = () => {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city, key) => {
    if (city === "") {
      alert("Enter City Name to Check Weather");
      return;
    }
    if (key === "") {
      alert("Eneter Open Weather API Key");
      return;
    }

    // import.meta.env.VITE_WetherAPI
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        alert(data.message);
        // return;
      }
      console.log("Line 47", data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setWeatherData(false);
      console.error(`Error in Data Fetching`);
    }
  };
  useEffect(() => {
    search("Fatehpur", "0811ed55c31d12e9ef63b677ed88f5a9");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          class="key"
          placeholder="openweathermap-APi-Key"
          ref={inputRef2}
          style={{
            borderRadius: "50px",
            border: "solid",
            outline: "none",
            width: "20em",
            height: "4em",
            textAlign: "center",
            display: "flex",
            color: "red",
            background: "#fefefe",
            fontSize: "15px",
            marginLeft: "1.4em",
          }}
        />
        <br></br>
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}
          style={{
            borderRadius: "50px",
            border: "solid",
            outline: "none",
            width: "15em",
            height: "3em",
            textAlign: "center",
            // display: "flex",
            color: "red",
            background: "#fefefe",
            fontSize: "20px",
            marginLeft: "1em",
          }}
        />
        <img
          className="search-pic"
          src={search_icon}
          onClick={() =>
            search(inputRef.current.value, inputRef2.current.value)
          }
          style={{
            width: "4vw",
            height: "8vh",
            backgroundColor: "#f5faf5",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            // gap: "2px",
            margin: "1em 8.5em",
          }}
          alt="search-icons"
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %rh</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>No Data Found!! Please Recheck your API KEY and city field.</h3>;
        </>
      )}
    </div>
  );
};

export default Weather;
