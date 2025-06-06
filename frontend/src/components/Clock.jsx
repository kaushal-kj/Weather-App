import React, { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl md:text-6xl font-bold">
        {new Date().toLocaleTimeString()}
      </h1>
      <p className="text-sm md:text-lg font-medium">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Clock;
