"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";

export default function WeatherCard() {
  // const notify = () => toast("Here is your toast.");
  const ref = useRef<any>(null);
  const [data, setData] = useState<any>([]);
  // console.log("🚀 ~ file: WeatherCard.tsx:10 ~ WeatherCard ~ data:", data)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        // console.log("pos: ", pos);

        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=3ccbbf01ea7148599c1154007220608&q=${pos.coords.latitude},${pos.coords.longitude}&aqi=no`
        );
        // console.log("response: ", response.data);

        setData([response.data, ...data]);
        // setCurrentWeather(response.data);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    return () => {
      // socket.close();
    };
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response: any = await axios.get(
        // `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=${long},${lat}&aqi=no`
        `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=${ref.current.value}&aqi=no`
      );
      // console.log("response: ", response.data);
      setIsLoading(false);
      setData([response.data, ...data]);
      toast.success("Weather Fetched Successfully!");
      event.target.reset();
    } catch (e) {
      toast.error("Enter Correct Location!");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full grid my-10">
      <Toaster position="bottom-center" />
      <form
        onSubmit={handleSubmit}
        className="m-auto flex justify-items-center grid-flow-col"
      >
        <input
          type="text"
          name=""
          id=""
          ref={ref}
          placeholder="Enter Your Location"
          required
          className="p-2 text-black rounded-full"
        />
        <button type="submit" className=" bg-black text-white p-2 rounded-full">
          Submit
        </button>
      </form>
      {isLoading && (
        <div className=" text-white grid place-content-center">Loading...</div>
      )}
      {/* {data === null && <div>Enter Your Location</div>}  */}
      {!data.length ? (
        <div className="text-center text-white mt-5">No Data</div>
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-5 gap-5 max-w-7xl m-auto mt-5 text-black w-full">
          {data.map((singleData: any, index: number) => (
            <div className={`bg-white p-5 rounded-2xl`} key={index}>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <h1 className="font-bold">Current Weather</h1>
                  <h1>
                    {singleData.location.name}, {singleData.location.country}
                  </h1>
                </div>
                <button className="bg-black w-1/2 text-white px-6 py-2 text-sm h-full rounded-md hover:bg-white hover:text-black hover:border-black border hover:border transition-all duration-300">
                  View Details
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={singleData.current.condition.icon}
                  alt=""
                  width={100}
                  height={100}
                />
                <h1 className="font-bold text-6xl">
                  {singleData.current.temp_c}
                  <span className="text-2xl align-top">°C</span>
                </h1>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1>
                    Feelslike:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.feelslike_c}°
                    </span>
                  </h1>
                  <h1>
                    Wind:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.wind_kph} km/h
                    </span>
                  </h1>
                  <h1>
                    Humidity:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.humidity} %
                    </span>
                  </h1>
                </div>
                <div>
                  <h1>
                    Visibility:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.vis_km} km
                    </span>
                  </h1>
                  <h1>
                    Pressure:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.pressure_mb} mb
                    </span>
                  </h1>
                  <h1>
                    Cloud:
                    <br />{" "}
                    <span className="font-bold">
                      {singleData.current.cloud} %
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
