<template>
  <div class="weekly-update">
    <h4 class="mb-4 font-weight-bold">Weekly Highlights</h4>
    <div
      class="loading d-flex justify-content-between align-items-center"
      v-if="forecastData.length === 0"
    >
      <h4>Fetching Weather Data...</h4>
    </div>
    <Tabs :value="0" v-else>
      <TabList>
        <Tab v-for="(day, index) in Object.keys(weeklyData)" :key="index" :value="index">
          {{
            new Date(day).toLocaleDateString("en-us", {
              weekday: "long",
            })
          }}
        </Tab>
      </TabList>
      <TabPanels
        :pt="{
          root: {
            class: 'p-0 border-bottom-1',
          },
        }"
        style="border-color: var(--p-primary-100)"
      >
        <TabPanel v-for="(day, index) in Object.keys(weeklyData)" :key="index" :value="index">
          <div class="weekly-temps">
            <div class="temp-card" v-for="(data, index) in weeklyData[day]" :key="index">
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
              <img
                class="icon"
                :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
              />
              <div class="footer">
                <small class="text-muted text-capitalize">{{ data.weather[0].description }}</small>
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
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
// Import necessary data and modules
import { ref, watch, onBeforeMount } from "vue";
import weekly from "../data/weekly.json";
// import api from "../scripts/api";

const props = defineProps({
  coord: {
    type: Object,
    default: () => ({}),
  },
});

// Define reactive state
const isLoading = ref(true);
const options = ref({
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
});

const series = ref([
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
]);

const forecastData = ref(weekly);
const formattedData = ref({
  temp: [],
  wind_speed: [],
  humidity: [],
  timestamp: [],
});

const weeklyData = ref({});

// Define methods
const getForecastData = async (lat, lon) => {
  let searchQuery = `forecast?lat=${lat}&lon=${lon}`;
  try {
    const response = await $fetch(`/api/weather?query=${encodeURIComponent(searchQuery)}`);
    if (response.status === 200) {
      forecastData.value = response.data.list;
      groupWeatherByDay(forecastData.value);
    } else {
      console.error("No data returned from the API");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const groupWeatherByDay = (data) => {
  const groupedData = {};
  data.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extracting date without time
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });
  weeklyData.value = groupedData;
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Get short month name
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${month}, ${time}`;
};

const formatData = () => {
  forecastData.value.forEach((entry) => {
    const temp = entry.main.temp;
    const windSpeed = entry.wind.speed;
    const humidity = entry.main.humidity;
    const timestamp = entry.dt;

    formattedData.value.temp.push(temp);
    formattedData.value.wind_speed.push(windSpeed);
    formattedData.value.humidity.push(humidity);
    formattedData.value.timestamp.push(formatDate(timestamp));
  });
};

const generateChart = () => {
  options.value.xaxis.categories = formattedData.value.timestamp;
  series.value = [
    {
      name: "Temperature",
      data: formattedData.value.temp,
    },
    {
      name: "Wind Speed",
      data: formattedData.value.wind_speed,
    },
    {
      name: "Humidity",
      data: formattedData.value.humidity,
    },
  ];
};

// Lifecycle hooks and watchers
onBeforeMount(() => {
  // groupWeatherByDay(forecastData.value);
  if (Object.keys(props.coord).length !== 0) {
    getForecastData(props.coord.lat, props.coord.lon);
  }
});

watch(
  () => props.coord,
  (newValue) => {
    console.log("Prop value changed to", newValue);
    getForecastData(newValue.lat, newValue.lon);
  }
);
</script>

<style lang="scss" scoped>
.weekly-update {
  .weekly-tab {
    .nav-tabs {
      .nav-link {
        color: $black;
        border-bottom-color: $primary;
        &.active {
          color: $secondary;
          border-color: $primary;
        }
      }
    }
  }
  .weekly-temps {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 0 1rem;
    .temp-card {
      flex-basis: calc(100% / 7);
      min-width: 140px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 20px;
      margin: 2rem 0;
      background-color: $white;
      @include shadow($text-variant-4);
      transition: 0.3s all ease-out;
      gap: 10px;

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

      .footer {
        display: flex;
        flex-direction: column;
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

@include media-queries("tab-sm") {
  .weekly-update {
    .weekly-tab {
      .nav-tabs {
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .nav-item {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
