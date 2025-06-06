import React, { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import Clock from "./Clock";
import sunny from "../assets/sunny.png";
import humidity from "../assets/humidity.png";
import windspeed from "../assets/windspeed.png";
import pressure from "../assets/pressure.png";
import uv from "../assets/uv1.PNG";
import { BsSunrise, BsSunset } from "react-icons/bs";
import ForeCast from "./ForeCast";
import { toast } from "react-toastify";
import axios from "axios";

const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  const fetchData = async () => {
    try {
      const encodedCity = encodeURIComponent(cityName);
      let url;
      if (encodedCity) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`;
      } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`;
      } else {
        toast.error("Missing city name or location coordinates");
      }

      const currentWeather = await axios.get(url);
      setWeatherData(currentWeather.data);

      const { coord } = currentWeather.data;
      setLat(coord.lat);
      setLon(coord.lon);

      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coord.lat
        }&lon=${coord.lon}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      setForecastData(forecast.data);

      const uv = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${
          coord.lon
        }&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setUvIndex(uv.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cityName && (!lat || !lon)) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLat(latitude);
          setLon(longitude);
          // Do NOT call fetchData here!
        },
        (error) => {
          console.error("Error getting location:", error);

          let message = "Unable to fetch your location.";
          if (error.code === 1) {
            message = "Permission denied. Please allow location access.";
          } else if (error.code === 2) {
            message =
              "Location unavailable. Please check your GPS or internet.";
          } else if (error.code === 3) {
            message = "Location request timed out. Please try again.";
          }

          toast.error(`${message} You can also enter a city name manually.`);
        }
      );
    } else {
      fetchData();
    }
  }, [cityName, lat, lon]);

  if (!weatherData || !forecastData) {
    return (
      <div className="flex items-center justify-center text-white text-3xl md:text-6xl">
        Loading...
      </div>
    );
  }

  const { main, weather, sys, wind } = weatherData;
  const { list } = forecastData;
  const iconCode =
    weather && weather[0] && weather[0].icon ? weather[0].icon : "01d";
  const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  // const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <>
      <div className="flex flex-col items-center xl:flex-row gap-4 ">
        {/* left section : city and time  */}
        <div className="w-[90%] xl:w-1/3 h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            {cityName || weatherData.name}
          </h1>
          <img
            src={weatherIconUrl}
            alt="weather image"
            className="w-24 select-none "
          />
          <Clock />
        </div>

        {/* right section : weather details */}
        <div className="flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl rounded-lg text-white p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4">
          {/* temeperature and sunrise and sunset */}
          <div className="flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4 ">
            <h1 className="text-5xl md:text-7xl font-bold">
              {main.temp}&#8451;
            </h1>
            <p className="text-center">
              Feels like:{" "}
              <span className="text-lg md:text-xl ml-2 font-bold">
                {main.feels_like}&#8451;
              </span>
            </p>
            <div className="flex xl:flex-col md:flex-row items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <BsSunrise className="w-10 md:h-10 select-none" />
                <div className="text-center ">
                  <h6>Sunrise</h6>
                  <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()} AM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BsSunset className="w-10 md:h-10 select-none" />
                <div className="text-center ">
                  <h6>Sunset</h6>
                  <p>{new Date(sys.sunset * 1000).toLocaleTimeString()} PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main weather icon */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={weatherIconUrl}
              alt="sun"
              className="w-36 h-36 md:w-52 md:h-52 select-none"
            />
            <p className="font-bold text-xl md:text-3xl ">
              {[weather[0].description]}
            </p>
          </div>

          {/* additional weather details */}
          <div className="md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4 ">
            <div className="flex flex-col items-center gap-2 ">
              <img
                src={humidity}
                alt="humidity"
                className="h-8 md:h-10 select-none"
              />
              <p>{main.humidity}%</p>
              <h6>Humidity</h6>
            </div>
            <div className="flex flex-col items-center gap-2 ">
              <img
                src={windspeed}
                alt="windspeed"
                className="h-8 md:h-10 select-none"
              />
              <p>{wind.speed} km/h</p>
              <h6>Wind Speed</h6>
            </div>
            <div className="flex flex-col items-center gap-2 ">
              <img
                src={pressure}
                alt="Pressure"
                className="h-8 md:h-10 select-none"
              />
              <p>{main.pressure} hPa</p>
              <h6>Pressure</h6>
            </div>
            <div className="flex flex-col items-center gap-2 ">
              <img src={uv} alt="uv" className="h-8 md:h-10 select-none" />
              <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
              <h6>UV</h6>
            </div>
          </div>
        </div>
      </div>
      <ForeCast forecast={list} />
    </>
  );
};

export default CityAndTime;
