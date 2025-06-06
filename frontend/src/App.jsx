import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CityAndTime from "./components/CityAndTime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const handleCitySearch = (city) => {
    setCityName(city);
    setLat(null);
    setLon(null);
  };

  const handleLocationFetch = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
    setCityName("");
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="w-full h-full ">
        <Navbar
          onCitySearch={handleCitySearch}
          onLocationFetch={handleLocationFetch}
        />
      </div>
      <div>
        <CityAndTime
          cityName={cityName}
          lat={lat}
          lon={lon}
          setLat={setLat}
          setLon={setLon}
        />
      </div>
    </div>
  );
};

export default App;
