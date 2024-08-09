<template>
  <div class="current-update">
    <h4 class="mb-4 font-weight-bold">Today's Highlights</h4>
    <div class="detail-cards">
      <div class="weather-card city" :class="weatherData.feelsLike >= 10 ? 'summer' : 'winter'">
        <div class="foreground">
          <div class="content">
            <h6>Destination <i class="fas fa-city" /></h6>
            <span>{{ weatherData.name || "" }}, {{ weatherData.country }}</span>
            <br />
          </div>
          <div>
            <h4>Feels Like {{ weatherData.feelsLike }}&#176;</h4>
            <h6>
              Coordinates
              {{ weatherData.lat }}&#176;, {{ weatherData.lon }}&#176;
            </h6>
          </div>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Temperature <i class="fas fa-thermometer-full" /></h6>
        <div class="content">
          <span>{{ weatherData.current }}&#176;</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Min/Max Temperature <i class="fas fa-thermometer-half" /></h6>
        <div class="content">
          <span>{{ weatherData.min }}&#176; | </span>
          <span>{{ weatherData.max }}&#176;</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Condition <i class="fas fa-feather" /></h6>
        <div class="d-flex align-items-center content">
          <img :src="`https://openweathermap.org/img/wn/${weatherData.icon}.png`" alt="" />
          <span>{{ weatherData.description }}</span>
          <!-- <b-img-lazy
            class="icon"
            
          /> -->
          <!--  -->
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Wind Speed <i class="fas fa-wind" /></h6>
        <div class="content">
          <span>{{ weatherData.wind?.speed || "N/A" }}</span>
          <span class="small-text">km/h ({{ weatherData.wind?.direction || "" }}&#176;)</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Humidity <i class="fas fa-tint" /></h6>
        <div class="content">
          <span>{{ weatherData.humidity }}</span>
          <span class="small-text">%</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Pressure <i class="fas fa-weight" /></h6>
        <div class="content">
          <span>{{ weatherData.pressure }}</span>
          <span class="small-text">hPa</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Visibility <i class="fas fa-low-vision" /></h6>
        <div class="content">
          <span>{{ weatherData.visibility }}</span>
          <span class="small-text">km</span>
        </div>
      </div>
      <!-- <div class="weather-card">
        <h6 class="text-muted">Air Quality <i class="fas fa-fan" /></h6>
        <div class="content">
          <span>{{airQualityInfo[4].label}}</span>
          <i
            class="fas fa-info-circle r-tooltip"
            :data-text="airQualityInfo[4].des"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

// Define props
const props = defineProps({
  currentData: {
    type: Object,
    default: () => ({}),
  },
});

onMounted(() => {
  if (Object.keys(props.currentData).length) {
    weatherData.value = parseWeatherData(props.currentData);
  }
});

watch(props, (newValue) => {
  weatherData.value = parseWeatherData(newValue.currentData);
});

// Reactive state
const weatherData = ref({});
// Generalized method to parse weather data
const parseWeatherData = (data) => {
  return {
    name: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    main: data.weather[0]?.main || "N/A",
    description: data.weather[0]?.description || "N/A",
    icon: data.weather[0]?.icon || "N/A",
    current: data.main.temp.toFixed(1),
    feelsLike: data.main.feels_like.toFixed(1),
    min: data.main.temp_min.toFixed(1),
    max: data.main.temp_max.toFixed(1),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind: {
      speed: data.wind.speed,
      direction: data.wind.deg,
    },
    clouds: data.clouds.all,
    visibility: data.visibility,
    sunTimes: {
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    },
  };
};

// Computed property to get parsed weather data
const airQuality = ref("");
const airQualityColor = ref("");
const airQualityInfo = reactive({
  1: {
    label: "Good",
    des: "Air quality is satisfactory, and air pollution poses little or no risk.",
    color: "",
  },
  2: {
    label: "Moderate",
    des: `Air quality is acceptable. However, there may be a risk for some people,
      particularly those who are unusually sensitive to air pollution.`,
    color: "",
  },
  3: {
    label: "Unhealthy for sensitive groups",
    des: `Members of sensitive groups may experience health effects.
      The general public is less likely to be affected.`,
    color: "",
  },
  4: {
    label: "Unhealthy",
    des: `Some members of the general public may experience health effects.
      Members of sensitive groups may experience more serious health effects.`,
    color: "",
  },
  5: {
    label: "Very Unhealthy",
    des: "Health alert: The risk of health effects is increased for everyone.",
    color: "",
  },
  6: {
    label: "Hazardous",
    des: "Health warning of emergency conditions: everyone is more likely to be affected.",
    color: "",
  },
});

// Methods
function checkAirQuality(aqi) {
  let level;
  if (aqi < 50) {
    level = 1;
  } else if (aqi < 100) {
    level = 2;
  } else if (aqi < 150) {
    level = 3;
  } else if (aqi < 200) {
    level = 4;
  } else if (aqi < 300) {
    level = 5;
  } else {
    level = 6;
  }
  return level;
}

// Optionally, you can use a computed property for derived state if necessary
// Example:
// const airQualityLabel = computed(() => airQualityInfo[checkAirQuality(props.weatherData.aqi)]?.label)
</script>

<style lang="scss" scoped>
.current-update {
  margin-bottom: 20px;
  .detail-cards {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    .weather-card {
      // min-height: 150px;
      border-radius: 5px;
      padding: 20px;
      background-color: $white;
      border: 1px solid $white;
      transition: 0.3s all ease-out;

      &:hover {
        border-color: $secondary;
      }
      .content {
        span {
          font-size: 40px;
          font-weight: 600;
          margin-right: 5px;
        }
        .small-text {
          font-size: 20px;
        }
      }
      &:first-child {
        grid-row: 1 / 3;
        padding: 0;
      }
      &.city {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        .foreground {
          padding: 20px !important;
          height: 100%;
          border-radius: 5px;
          font-size: 26px;
          color: white;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          background-color: rgba(59, 59, 59, 0.4);
        }
        &.winter {
          background-image: url("https://source.unsplash.com/snowy-mountain-surrounded-with-trees-xAgvgQpYsf4/");
        }
        &.summer {
          background-image: url("https://source.unsplash.com/scenery-of-grass-and-trees-ocwmWiNAWGs");
        }
      }
    }
  }
}

@include media-queries("desktop") {
  .current-update {
    .detail-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include media-queries("tab-sm") {
  .current-update {
    .detail-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
