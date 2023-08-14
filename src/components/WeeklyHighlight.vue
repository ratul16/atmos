<template>
  <div class="weekly-update">
    <h4 class="mb-4 font-weight-bold">Weekly Highlights</h4>
    <div class="weekly-temps">
      <div class="temp-card" v-for="(day, index) in forecastData" :key="index">
        <span class="day font-weight-bold">
          {{
            new Date(day.dt_txt).toLocaleDateString("en-us", {
              weekday: "short",
            })
          }}
        </span>
        <small class="Time text-muted">
          {{
            new Date(day.dt_txt).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })
          }}
        </small>
        <b-img-lazy
          class="icon"
          :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
        />
        <div class="temp">
          <span>{{ day.main.temp }}&#176;</span>
        </div>
      </div>
    </div>
    <!-- <div class="weekly-graph">
      <VueApexCharts type="line" :options="options" :series="series" />
    </div> -->
  </div>
</template>

<script>
import api from "../scripts/api";
// import VueApexCharts from 'vue-apexcharts'

export default {
  name: "WeeklyHighlight",
  // components: {
  //   VueApexCharts,
  // },
  props: {
    coord: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: {
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: "series-2",
          data: [94, 40, 95, 50, 49, 60, 70, 91],
        },
      ],
      forecastData: [
        {
          dt: 1659981600,
          main: {
            temp: 24.6,
            feels_like: 25.52,
            temp_min: 24.56,
            temp_max: 24.6,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 985,
            humidity: 92,
            temp_kf: 0.04,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "light rain",
              icon: "10n",
            },
          ],
          clouds: {
            all: 100,
          },
          wind: {
            speed: 3.41,
            deg: 246,
            gust: 10.23,
          },
          visibility: 10000,
          pop: 0.24,
          rain: {
            "3h": 0.13,
          },
          sys: {
            pod: "n",
          },
          dt_txt: "2022-08-08 18:00:00",
        },
        {
          dt: 1659992400,
          main: {
            temp: 24.85,
            feels_like: 25.77,
            temp_min: 24.85,
            temp_max: 24.96,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 985,
            humidity: 91,
            temp_kf: -0.11,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 83,
          },
          wind: {
            speed: 3.21,
            deg: 244,
            gust: 9.81,
          },
          visibility: 10000,
          pop: 0.24,
          sys: {
            pod: "d",
          },
          dt_txt: "2022-08-08 21:00:00",
        },
        {
          dt: 1660003200,
          main: {
            temp: 28.72,
            feels_like: 32.13,
            temp_min: 28.72,
            temp_max: 28.72,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 985,
            humidity: 70,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 72,
          },
          wind: {
            speed: 5.55,
            deg: 245,
            gust: 10.32,
          },
          visibility: 10000,
          pop: 0.2,
          sys: {
            pod: "d",
          },
          dt_txt: "2022-08-09 00:00:00",
        },
        {
          dt: 1660014000,
          main: {
            temp: 30.78,
            feels_like: 34.38,
            temp_min: 30.78,
            temp_max: 30.78,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 985,
            humidity: 60,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 89,
          },
          wind: {
            speed: 6.05,
            deg: 245,
            gust: 9.9,
          },
          visibility: 10000,
          pop: 0.08,
          sys: {
            pod: "d",
          },
          dt_txt: "2022-08-09 03:00:00",
        },
        {
          dt: 1660024800,
          main: {
            temp: 30.36,
            feels_like: 33.98,
            temp_min: 30.36,
            temp_max: 30.36,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 984,
            humidity: 62,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 92,
          },
          wind: {
            speed: 6.28,
            deg: 238,
            gust: 10.31,
          },
          visibility: 10000,
          pop: 0.12,
          sys: {
            pod: "d",
          },
          dt_txt: "2022-08-09 06:00:00",
        },
        {
          dt: 1660035600,
          main: {
            temp: 26.8,
            feels_like: 29.39,
            temp_min: 26.8,
            temp_max: 26.8,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 984,
            humidity: 81,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 100,
          },
          wind: {
            speed: 5.15,
            deg: 234,
            gust: 11.22,
          },
          visibility: 10000,
          pop: 0.2,
          sys: {
            pod: "d",
          },
          dt_txt: "2022-08-09 09:00:00",
        },
      ],
    };
  },
  mounted() {
    // this.getForecastData(this.coord.lat, this.coord.lon);
  },
  methods: {
    getForecastData(lat, lon) {
      api
        .get(
          `forecast?lat=${lat}&lon=${lon}&APPID=${
            import.meta.env.VITE_APP_KEY
          }&units=metric`
        )
        .then((response) => {
          if (response.status) {
            this.forecastData = response.data.list;
          } else {
            console.log("Something went wrong");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-update {
  margin-bottom: 20px;
  .weekly-temps {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    .temp-card {
      flex-basis: calc(100% / 7);
      min-width: 120px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px;
      background-color: white;
      .icon {
        margin: 0 auto;
        width: 50px;
      }
    }
  }
}
</style>
