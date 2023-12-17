<template>
  <div class="weekly-update">
    <h4 class="mb-4 font-weight-bold">Weekly Highlights</h4>
    <div
      class="loading d-flex justify-content-between align-items-center"
      v-if="isLoading"
    >
      <h4>Fetching Weather Data...</h4>
      <b-spinner variant="secondary" label="Loading..."></b-spinner>
    </div>
    <b-tabs fill justified v-else>
      <b-tab
        v-for="(day, index) in Object.keys(weeklyData)"
        :key="index"
        :title="
          new Date(day).toLocaleDateString('en-us', {
            weekday: 'long',
          })
        "
      >
        <div class="weekly-temps">
          <div
            class="temp-card"
            v-for="(data, index) in weeklyData[day]"
            :key="index"
          >
            <!-- <span class="day font-weight-bold">
              {{
                new Date(data.dt_txt).toLocaleDateString("en-us", {
                  weekday: "short",
                })
              }}
            </span> -->
            <div class="temp">
              <span>{{ data.main.temp }}&#176;</span>
            </div>

            <b-img-lazy
              class="icon"
              :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
            />
            <small class="text-muted text-capitalize">{{
              data.weather[0].description
            }}</small>
            <span class="time font-weight-bold">
              {{
                new Date(data.dt_txt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })
              }}
            </span>
          </div>
        </div>
      </b-tab>
    </b-tabs>
    <!-- {{ Object.keys(weeklyData) }} -->
    <!-- <div class="weekly-graph">
      <VueApexCharts
        class="chart"
        type="line"
        :options="options"
        :series="series"
      />
    </div> -->
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
      isLoading: true,
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
          data: [30, 33, 35, 40, 30, 33, 35, 32],
        },
        {
          name: "Wind Speed",
          data: [56, 54, 57, 54, 57, 59, 53, 51],
        },
        {
          name: "Humidity",
          data: [44, 40, 45, 40, 49, 40, 40, 51],
        },
      ],
      forecastData: weekly,
      formattedData: {
        temp: [],
        wind_speed: [],
        humidity: [],
        timestamp: [],
      },
      weeklyData: {},
    };
  },
  mounted() {
    // this.getForecastData(this.coord.lat, this.coord.lon);
    // this.formatData();
    this.groupWeatherByDay(this.forecastData);
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
            this.groupWeatherByDay(this.forecastData);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    groupWeatherByDay(data) {
      const groupedData = {};
      data.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; // Extracting date without time
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push(item);
      });
      this.weeklyData = groupedData;
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
      console.log(this.formattedData);
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
      min-width: 140px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px;
      margin: 15px 0;
      background-color: white;
      border: 1px solid white;
      transition: 0.3s all ease-out;
      cursor: pointer;

      .icon {
        margin: 0 auto;
        width: 50px;
      }
      small {
        font-size: 12px;
        font-style: italic;
      }
      .temp {
        font-size: 18px;
      }

      &:hover {
        border-color: $secondary;
      }
    }
  }
  .weekly-graph {
    background-color: $white;
    width: 100%;
    height: 100%;
    .chart {
      min-height: 200px !important;
    }
  }
}
</style>
