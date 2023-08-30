"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function WeatherCard() {
  const ref = useRef<HTMLInputElement>(null);
  const [testing, setTesting] = useState<any>([]);
  const [state, setState] = useState<any>(false);
  console.log("testing", testing);
  // const LOCATION = "karachi";
  // console.log("data", data);
  // let LOCATION: any = "";
  const LOCATION = ref?.current?.value;
  function handleSubmit(e: any) {
    e.preventDefault();
    setState(!state);

    // console.log(LOCATION);
  }
  useEffect(() => {
    // fetch(
    //   `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=karachi&aqi=no`
    // )
    // if (LOCATION) {
    //   fetch(
    //     `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=${LOCATION}&aqi=no`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // setTesting(data.res); // Update the state with the new array
    //       !data.error &&
    //         setTesting((prevObjects: any) => [...prevObjects, data]);
    //       console.log("data", data);
    //     });
    //   // .then((error) => console.log("error", error));
    //   // const data = await res.json();
    // }

    (async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=${LOCATION}&aqi=no`
        );
        const data = await res.json();
        // console.log(data)
        // .then((res) => res.json())
        // .then((data) => {
        //   // setTesting(data.res); // Update the state with the new array
        !data.error && setTesting((prevState: any) => [...prevState, data]);
        //   console.log("data", data);
        // });
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [state]);
  // function handleClick() {
  //   setState(!state);
  // }

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://api.weatherapi.com/v1/current.json?key=168e245731fe44d0a5051548230707&q=karachi&aqi=no`
  //       )
  //       .then((response) => console.log(response));
  //     //   console.log("res", res);
  //   }, []);

  // function handleClick() {
  // console.log("first");
  // const variable = {
  //   value: "hello",
  //   value2: "world",
  // };
  // setTesting((prevObjects: any) => [...prevObjects, res]);
  // }

  // const testingg = [
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  //   {
  //     bg: "",
  //     icon: "/cloudy-day-1.svg",
  //     deg: 26,
  //     feelslike: 30,
  //     wind: 30,
  //     humidity: 30,
  //     visibility: 10,
  //     pressure: 25,
  //     cloud: 34,
  //   },
  // ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" ref={ref} required />
        <button type="submit">Click</button>
      </form>
      {/* {testing.map((test: any, index: number) => (
        <div key={index}>
          <h1>{test.current?.temp_c}</h1>
        </div>
      ))} */}
      {/* {testing */}
      {/* {testing === null ? (
        <div>No Data Exists</div>
      ) ?  */}
      {/* {testing === null ? (
        <div>No Data Exists</div>
      ) : */}
      {testing.length === 0 ? (
        <div>Enter Correct Location</div>
      ) : (
        <div className="grid grid-cols-3 gap-5 max-w-6xl m-auto text-black">
          {testing.reverse().map((test: any, index: number) => (
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
