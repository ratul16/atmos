<template>
  <div class="current-update">
    <h4 class="mb-4 font-weight-bold">Today's Highlights</h4>
    <div class="detail-cards">
      <div class="weather-card">
        <h6 class="text-muted">Air Quality <i class="fas fa-fan" /></h6>
        <div class="content">
          <span>{{airQualityInfo[4].label}}</span>
          <i
            class="fas fa-info-circle r-tooltip"
            :data-text="airQualityInfo[4].des"
          />
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Wind Speed <i class="fas fa-wind" /></h6>
        <div class="content">
          <span>{{ weatherData.wind.speed || 'N/A' }}</span>
          <span class="small-text">km/h ({{ weatherData.wind.deg || ''}}&#176;)</span>
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
        <h6 class="text-muted">Pressure <i class="fas fa-compass" /></h6>
        <div class="content">
          <span>{{ weatherData.main.pressure }}</span>
          <span class="small-text">hPa</span>
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
        <h6 class="text-muted">Visibility <i class="fas fa-low-vision" /></h6>
        <div class="content">
          <span>5.2</span>
          <span class="small-text">km</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Latitude</h6>
        <div class="content">
          <span>{{ weatherData.coord.lat }}&#176;</span>
        </div>
      </div>
      <div class="weather-card">
        <h6 class="text-muted">Longitude</h6>
        <div class="content">
          <span>{{ weatherData.coord.lon }}&#176;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodayHighlight',
  props: {
    weatherData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      airQuality: '',
      airQualityColor: '',
      airQualityInfo: {
        1: {
          label: 'Good',
          des: 'Air quality is satisfactory, and air pollution poses little or no risk.',
          color: ''
        },
        2: {
          label: 'Moderate',
          des: `Air quality is acceptable. However, there may be a risk for some people,
            particularly those who are unusually sensitive to air pollution.`,
          color: ''
        },
        3: {
          label: 'Unhealthy for sensitive groups',
          des: `Members of sensitive groups may experience health effects.
            The general public is less likely to be affected.`,
          color: ''
        },
        4: {
          label: 'Unhealthy',
          des: `Some members of the general public may experience health effects.
            Members of sensitive groups may experience more serious health effects.`,
          color: ''
        },
        5: {
          label: 'Very Unhealthy',
          des: 'Health alert: The risk of health effects is increased for everyone.',
          color: ''
        },
        6: {
          label: 'Hazardous',
          des: 'Health warning of emergency conditions: everyone is more likely to be affected.',
          color: ''
        },
      },
    }
  },
  methods: {
    checkAirQuality(aqi) {
      let level;
      if (aqi < 50) {
        level = 1
      } else if (aqi < 100) {
        level = 2
      } else if (aqi < 150) {
        level = 3
      } else if (aqi < 200) {
        level = 4
      } else if (aqi < 300) {
        level = 5
      } else {
        level = 6
      }
      return level
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

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
    }
  }
}

@include media-queries('desktop') {
  .current-update {
    .detail-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include media-queries('tab-sm') {
  .current-update {
    .detail-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
