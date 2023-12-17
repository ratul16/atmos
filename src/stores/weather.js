import { defineStore } from 'pinia';

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    location: "Birmingham",
    units: 'metric',
    sampleWeather: {
      coord: {
        lon: 90.4074,
        lat: 23.7104,
      },
      weather: [
        {
          id: 721,
          main: "Haze",
          description: "haze",
          icon: "50n",
        },
      ],
      base: "stations",
      main: {
        temp: 29.99,
        feels_like: 35.01,
        temp_min: 29.99,
        temp_max: 29.99,
        pressure: 1000,
        humidity: 70,
      },
      visibility: 4000,
      wind: {
        speed: 4.12,
        deg: 150,
      },
      clouds: {
        all: 40,
      },
      dt: 1659973579,
      sys: {
        type: 1,
        id: 9145,
        country: "BD",
        sunrise: 1659915055,
        sunset: 1659962237,
      },
      timezone: 21600,
      id: 1185241,
      name: "Dhaka",
      cod: 200,
    },
    sampleAirPollution: [
      {
        dt: 1606147200,
        main: {
          aqi: 1.0,
        },
        components: {
          co: 203.609,
          no: 0.0,
          no2: 41.96,
          o3: 75.102,
          so2: 382.648,
          pm2_5: 23.253,
          pm10: 92.214,
          nh3: 402.117,
        },
      },
    ],
  }),
  getters: {

  },
  actions: {

  }
});
