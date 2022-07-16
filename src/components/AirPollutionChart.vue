<template>
  <div class="air-pollution">
    <h4 class="mb-4 font-weight-bold">Air Pollution</h4>
    {{ new Date(test[0].dt).toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'short'}) }}
    <VueApexCharts type="line" :options="options" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'AirPollutionChart',
  props: {
    airPollution: {
      type: Array,
    },
  },
  components: {
    VueApexCharts,
  },
  data() {
    return {
      test: [ 
        { "main": { "aqi": 2 }, "components": { "co": 170.23,
        "no": 0.02, "no2": 0.24, "o3": 86.55, "so2": 0.69, "pm2_5": 2.29, "pm10": 2.32, "nh3":
        0 }, "dt": 1657980000 
        }, 
        { "main": { "aqi": 2 }, "components": { "co": 168.56, "no":
        0.01, "no2": 0.25, "o3": 87.26, "so2": 0.7, "pm2_5": 2.25, "pm10": 2.29, "nh3": 0
        }, "dt": 1657983600 
        }, 
        { "main": { "aqi": 2 }, "components": { "co": 168.56, "no":
          0, "no2": 0.27, "o3": 84.4, "so2": 0.67, "pm2_5": 2.27, "pm10": 2.3, "nh3": 0.03
          }, "dt": 1657987200 
        }, 
      ],
      options: {
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: 'series-2',
        data: [94, 40, 95, 50, 49, 60, 70, 91]
      }
      ],
      testOptions: {
        xaxis: {
          categories: []
        }
      },
      testSeries:[]
    }
  },
  mounted () {
    this.getYearList();
  },
  methods: {
    getYearList() {
      const years = this.airPollution.map(year => {
        // console.log(year.components);
        return new Date(year.dt).toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'short'}) 
      })
      this.testOptions.xaxis.categories = years
      console.log(years);
    }
  },
}
</script>

<style lang="scss" scoped>
.air-pollution {
  margin-bottom: 20px;
}
</style>