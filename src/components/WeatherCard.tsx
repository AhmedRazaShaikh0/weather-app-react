"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function WeatherCard() {
  const ref = useRef<any>(null);
  const [testing, setTesting] = useState<any>([]);
  const [state, setState] = useState<any>(false);
  const [text, setText] = useState<any>("Enter Your Location");
  const LOCATION = ref?.current?.value;

  function handleSubmit(event: any) {
    event.preventDefault();
    setState(!state);
  }
  useEffect(() => {
    (async () => {
      try {
        if (LOCATION) {
          const data: any = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=${LOCATION}&aqi=no`
          );
          console.log("🚀 ~ file: WeatherCard.tsx:24 ~ data:", data.data);
          // setTesting((prevState: any) => [...prevState, data.data]);
          setTesting([data.data, ...testing]);
          if (ref.current) ref.current.value = "";
          // event.target.reset()
        }
      } catch (error) {
        console.log("error", error);
        setText("Enter Correct Location");
      }
    })();
  }, [state]);
  return (
    <div className="w-full grid my-10">
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
      {testing.length === 0 ? (
        <div className="text-center text-white mt-5">{text}</div>
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-5 gap-5 max-w-7xl m-auto mt-5 text-black w-full">
          {testing.map((test: any, index: number) => (
            <div className={`bg-white p-5 rounded-2xl`} key={index}>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <h1 className="font-bold">Current Weather</h1>
                  <h1>
                    {test.location.name}, {test.location.country}
                  </h1>
                </div>
                <button className="bg-black w-1/2 text-white px-6 py-2 text-sm h-full rounded-md hover:bg-white hover:text-black hover:border-black border hover:border transition-all duration-300">
                  View Details
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={test.current.condition.icon}
                  alt=""
                  width={100}
                  height={100}
                />
                <h1 className="font-bold text-6xl">
                  {test.current.temp_c}
                  <span className="text-2xl align-top">°C</span>
                </h1>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1>
                    Feelslike:
                    <br />{" "}
                    <span className="font-bold">
                      {test.current.feelslike_c}°
                    </span>
                  </h1>
                  <h1>
                    Wind:
                    <br />{" "}
                    <span className="font-bold">
                      {test.current.wind_kph} km/h
                    </span>
                  </h1>
                  <h1>
                    Humidity:
                    <br />{" "}
                    <span className="font-bold">{test.current.humidity} %</span>
                  </h1>
                </div>
                <div>
                  <h1>
                    Visibility:
                    <br />{" "}
                    <span className="font-bold">{test.current.vis_km} km</span>
                  </h1>
                  <h1>
                    Pressure:
                    <br />{" "}
                    <span className="font-bold">
                      {test.current.pressure_mb} mb
                    </span>
                  </h1>
                  <h1>
                    Cloud:
                    <br />{" "}
                    <span className="font-bold">{test.current.cloud} %</span>
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
