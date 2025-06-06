import { useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search.jpg";
import location from "../assets/location.png";
import { toast } from "react-toastify";
const Navbar = ({ onCitySearch, onLocationFetch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      onCitySearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          onLocationFetch(latitude, longitude);
          setSearchQuery("");
        },
        (error) => {
          console.log("Error fetching location:", error);
          toast.error(
            "Unable to fetch your current location. Please allow location access in your browser settings."
          );
        }
      );
    }
  };

  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        {/* logo */}
        <div className="flex items-center gap-2 mb-4 lg:mb-0">
          <img src={logo} alt="logo" className="w-12 select-none " />
          <h1 className="text-white font-bold text-2xl">Weather App</h1>
        </div>
        {/* search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center mt-2 w-full max-w-md bg-white rounded-lg shadow-md"
        >
          <img
            src={search}
            alt="search"
            className="absolute left-3 w-6 h-6 text-gray-400 select-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQuery}
            placeholder="Search for your preferred city..."
            className="w-full py-2 pl-10 text-sm text-gray-700 placeholder:gray-400 border-none rounded-lg outline-none"
          />
          <button type="submit" className="bg-[#050e1fde] text-white px-5 py-2 cursor-pointer">
            Search
          </button>
        </form>
        <div onClick={handleLocationClick} className="flex items-center mt-5 gap-3 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded cursor-pointer">
          <img src={location} alt="location" className="w-4" />
          <p>Current Location</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
