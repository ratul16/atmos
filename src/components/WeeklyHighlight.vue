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
    <div class="weekly-graph">
      <VueApexCharts
        class="chart"
        type="line"
        :options="options"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
import api from "../scripts/api";
import weekly from "../data/weekly.json";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "WeeklyHighlight",
  components: {
    VueApexCharts,
  },
  props: {
    coord: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: "weekly",
        },
        xaxis: {
          categories: [
            "12 Aug 2023",
            "13 Aug 2023",
            "14 Aug 2023",
            "15 Aug 2023",
            "16 Aug 2023",
            "17 Aug 2023",
            "18 Aug 2023",
          ],
        },
      },
      series: [
        {
          name: "Temperature",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: "Wind Speed",
          data: [56, 74, 67, 24, 17, 39, 33, 71],
        },
        {
          name: "Humidity",
          data: [94, 40, 95, 50, 49, 60, 70, 91],
        },
      ],
      forecastData: weekly,
      formattedData: {
        temp: [],
        wind_speed: [],
        humidity: [],
        timestamp: [],
      },
    };
  },
  mounted() {
    this.formatData();
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
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" }); // Get short month name
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${day} ${month}, ${time}`;
    },
    formatData() {
      var data = this.forecastData;
      data.forEach((entry) => {
        const temp = entry.main.temp;
        const windSpeed = entry.wind.speed;
        const humidity = entry.main.humidity;
        const timestamp = entry.dt;

        this.formattedData.temp.push(temp);
        this.formattedData.wind_speed.push(windSpeed);
        this.formattedData.humidity.push(humidity);
        this.formattedData.timestamp.push(this.formatDate(timestamp));
      });
    },
    generateChart() {
      this.options.xaxis.categories = this.formattedData.timestamp;
      this.series = [
        {
          name: "Temperature",
          data: this.formattedData.temp,
        },
        {
          name: "Wind Speed",
          data: this.formattedData.wind_speed,
        },
        {
          name: "Humidity",
          data: this.formattedData.humidity,
        },
      ];
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
      margin-bottom: 10px;
      background-color: white;
      .icon {
        margin: 0 auto;
        width: 50px;
      }
    }
  }
  .weekly-graph {
    background-color: $white;
    // width: 100%;
    // height: 100px;
    .chart {
      max-height: 200px !important;
    }
  }
}
</style>
