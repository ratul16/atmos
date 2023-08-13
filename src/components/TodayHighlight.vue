<template>
  <div class="current-update">
    <h4 class="mb-4 font-weight-bold">Today's Highlights</h4>
    <div class="detail-cards">
      <div class="weather-card city winter">
        <div class="foreground">
          <div class="content">
            <h6>Destination <i class="fas fa-city" /></h6>
            <span
              >{{ weatherData.name || "" }}, {{ weatherData.sys.country }}</span
            >
            <br />
          </div>
          <div>
            <h4>
              Feels Like {{ weatherData.main.feels_like.toFixed(1) }}&#176;
            </h4>
            <h6>
              Coordinates
              {{ weatherData.coord.lat }}&#176;,
              {{ weatherData.coord.lon }}&#176;
            </h6>
          </div>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">
          Temperature <i class="fas fa-thermometer-full" />
        </h6>
        <div class="content">
          <span>{{ weatherData.main.temp.toFixed(1) }}&#176;</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">
          Min/Max Temperature <i class="fas fa-thermometer-half" />
        </h6>
        <div class="content">
          <span>{{ weatherData.main.temp_min.toFixed(1) }}&#176; | </span>
          <span>{{ weatherData.main.temp_max.toFixed(1) }}&#176;</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Condition <i class="fas fa-feather" /></h6>
        <div class="d-flex align-items-center content">
          <b-img-lazy
            class="icon"
            :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`"
          />
          <span>{{ weatherData.weather[0].main || "" }}</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Wind Speed <i class="fas fa-wind" /></h6>
        <div class="content">
          <span>{{ weatherData.wind.speed || "N/A" }}</span>
          <span class="small-text"
            >km/h ({{ weatherData.wind.deg || "" }}&#176;)</span
          >
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Humidity <i class="fas fa-tint" /></h6>
        <div class="content">
          <span>{{ weatherData.main.humidity }}</span>
          <span class="small-text">%</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Pressure <i class="fas fa-weight" /></h6>
        <div class="content">
          <span>{{ weatherData.main.pressure }}</span>
          <span class="small-text">hPa</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Visibility <i class="fas fa-low-vision" /></h6>
        <div class="content">
          <span>5.2</span>
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

<script>
export default {
  name: "TodayHighlight",
  props: {
    weatherData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      airQuality: "",
      airQualityColor: "",
      airQualityInfo: {
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
      },
    };
  },
  methods: {
    checkAirQuality(aqi) {
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
    },
  },
};
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
      background-color: white;
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
          background-image: url("https://images.unsplash.com/photo-1459695452562-46cc57bef5f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
        }
        &.summer {
          background-image: url("https://images.unsplash.com/photo-1529923123842-3310dfdc0b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
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
