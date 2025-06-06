import React from "react";

const ForeCast = ({ forecast }) => {
  //   const forecast = [
  //     { temperature: "25°C", day: "Friday", date: "1 sep", icon: "☀️" },
  //     { temperature: "26°C", day: "Saturday", date: "2 sep", icon: "🌤️" },
  //     { temperature: "27°C", day: "Sunday", date: "3 sep", icon: "🌥️" },
  //     { temperature: "28°C", day: "Monday", date: "4 sep", icon: "🌦️" },
  //     { temperature: "29°C", day: "Tuesday", date: "5 sep", icon: "🌧️" },
  //   ];

  //   const hourlyForecast = [
  //     {
  //       time: "12:00",
  //       degree: "25°C",
  //       icon: "☀️",
  //       windspeed: "10 km/h",
  //     },

  //     {
  //       time: "14:00",
  //       degree: "27°C",
  //       icon: "🌥️",
  //       windspeed: "15 km/h",
  //     },

  //     {
  //       time: "16:00",
  //       degree: "29°C",
  //       icon: "🌧️",
  //       windspeed: "20 km/h",
  //     },

  //     {
  //       time: "18:00",
  //       degree: "28°C",
  //       icon: "🌥️",
  //       windspeed: "19 km/h",
  //     },

  //     {
  //       time: "20:00",
  //       degree: "26°C",
  //       icon: "🌧️",
  //       windspeed: "14 km/h",
  //     },
  //   ];

  if (!forecast || !Array.isArray(forecast)) {
    return (
      <div className="flex items-center justify-center text-white text-xl mt-15">
        No forecast data available.
      </div>
    );
  }

  const dailyForeCast = forecast
    .reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc.find((f) => f.date === date)) {
        acc.push({
          temperature: `${item.main.temp}°C`,
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          date: date,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        });
      }
      return acc;
    }, [])
    .slice(0, 5);

  const hourlyForeCast = forecast.slice(0, 5).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    degree: `${item.main.temp}°C`,
    windspeed: `${item.wind.speed} km/h`,
  }));

  return (
    <div className="flex">
      <div className="xl:w-96 w-full h-1/2 px-4 py-4 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white">
        <h2 className="flex items-center justify-center font-bold text-2xl ">5 Days ForeCast:</h2>
        {dailyForeCast.map((cast, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-2"
          >
            {/* <p>{cast.icon}</p> */}
            <img src={cast.icon} alt="icon" className="w-16 h-16 select-none" />
            <p className="font-bold items-center ">{cast.temperature}</p>
            <p className="font-bold">
              {cast.day}, {cast.date}
            </p>
          </div>
        ))}
      </div>
      <div className="flex-grow h-auto px-4 py-4 bg-[#050e1fde] shadow-2xl m-4 mt-10 rounded-lg hidden lg:block text-white">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          Hourly ForeCast
        </h1>
        <div className="flex justify-around items-center gap-4 h-54 mt-14">
          {hourlyForeCast.map((hourCast, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-5 bg-[#1c2938] rounded-lg p-4 w-28 text-center shadow-md"
            >
              <p className="text-sm font-medium">{hourCast.time}</p>
              {/* <p>{hourCast.icon}</p> */}
              <img
                src={hourCast.icon}
                alt="hourcasticon"
                className="w-16 h-16 select-none"
              />
              <p>{hourCast.degree}</p>
              <p>{hourCast.windspeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeCast;
