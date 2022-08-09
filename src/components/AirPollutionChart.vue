<template>
  <div class="air-pollution">
    <h4 class="mb-4 font-weight-bold">Air Pollution Highlights</h4>
    <div class="pollution-index">
      <div class="info-card quality-level" :style="`--bg-color:${airQualityIndex[test[0].main.aqi].color}`">
        <h6 class="text-muted">Air Quality Index</h6>
        <div class="content">
          <span>{{airQualityInfo[test[0].main.aqi].label}}</span>
          <p>
            {{airQualityInfo[test[0].main.aqi].des}}
          </p>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Carbon monoxide (CO)</h6>
        <div class="content">
          <span>{{test[0].components.co}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Ozone (O<sub>3</sub>)</h6>
        <div class="content">
          <span>{{test[0].components.o3}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Nitrogen monoxide (NO)</h6>
        <div class="content">
          <span>{{test[0].components.no}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Nitrogen dioxide (NO<sub>2</sub>)</h6>
        <div class="content">
          <span>{{test[0].components.no2}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Sulphur dioxide (SO<sub>2</sub>)</h6>
        <div class="content">
          <span>{{test[0].components.so2}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
      <div class="info-card">
        <h6 class="text-muted">Ammonia (NH<sub>3</sub>)</h6>
        <div class="content">
          <span>{{test[0].components.nh3}}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AirPollutionChart',
  props: {
    airPollution: {
      type: Array,
    },
  },
  data() {
    return {
      test: [
        {
          dt: 1606147200,
          main: {
            aqi: 2.0,
          },
          components: {
            co: 203.609,
            no: 0.0,
            no2: 0.396,
            o3: 75.102,
            so2: 0.648,
            pm2_5: 23.253,
            pm10: 92.214,
            nh3: 0.117,
          },
        },
      ],
      airQualityIndex: {
        1: {
          name: 'Good',
          color: '#00cc00'
        },
        2: {
          name: 'Satisfactory ',
          color: '#00ff00'
        },
        3: {
          name: 'Moderate',
          color: '#facf39'
        },
        4: {
          name: 'Poor',
          color: '#f99049'
        },
        5: {
          name: 'Severe',
          color: '#a070b6'
        },
        6: {
          name: 'Hazardous',
          color: '#a06a7b'
        },
      },
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.air-pollution {
  margin-bottom: 20px;
  .pollution-index {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    .info-card {
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
        // grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
    }
  }
}

@include media-queries('desktop') {
  .air-pollution {
    .pollution-index {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include media-queries('tab-sm') {
  .air-pollution {
    .pollution-index {
      grid-template-columns: 1fr;
      .info-card :first-child {
        grid-column: 1;
        grid-row: 1 / 3;
      }
    }
  }
}
</style>
