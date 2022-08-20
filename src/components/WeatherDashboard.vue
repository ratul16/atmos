<template>
  <div class="weather-dashboard container">
    <div class="weather-bar">
      <div class="temp-btn active">&#176;C</div>
      <div class="temp-btn">&#176;F</div>
      <div class="avatar">
        <img
          src="https://images.unsplash.com/photo-1656969630442-9db4f3dcb134?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
      </div>
    </div>
    <div class="searchbar">
      <b-input-group>
        <b-form-input
          v-model="searchQuery"
          placeholder="Enter city names..."
          @focus="isVisible = !isVisible"
        />
        <template #append>
          <div class="location" @click="getWeatherData">
            <i class="fas fa-search" />
          </div>
        </template>
      </b-input-group>
      <div class="search-results" v-if="isVisible">
        <!-- <div class="search-card">
          <div class="font-weight-bold">
            Please enter valid address
          </div>
        </div>
        <div class="search-card">
          <div class="font-weight-bold">No information found</div>
        </div> -->
        <div class="search-card" v-for="x in cityList" :key="x.id">
          <div class="result" @click="getSelectedCity(x)">
            <div class="name">{{ x.name }}, {{ x.country }}</div>
            <small class="text-muted">{{ x.coord.lat || '' }}, {{ x.coord.lon || '' }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="weather-details">
      <!-- {{getFilterCityList}} -->
      <div class="loading" v-if="isDataLoading">
        <h4>Data loading</h4>
      </div>
      <div class="details-body" v-else>
        <TodayHighlight :weatherData="weatherData" />
        <WeeklyHighlight :coord="weatherData.coord" />
        <AirPollutionChart :airPollution="airPollution" />
      </div>
      
    </div>
  </div>
</template>

<script>
import cities from '@/data/city'
import api from '@/scripts/api';
import TodayHighlight from '@/components/TodayHighlight';
import WeeklyHighlight from '@/components/WeeklyHighlight';
import AirPollutionChart from '@/components/AirPollutionChart'

export default {
  name: 'WeatherDashboard',
  components: {
    TodayHighlight,
    WeeklyHighlight,
    AirPollutionChart,
  },
  data() {
    return {
      searchQuery: '',
      isVisible: false,
      isDataLoading: false,
      weatherData: {
        coord: {
          lon: 90.4074,
          lat: 23.7104,
        },
        weather: [
          {
            id: 721,
            main: 'Haze',
            description: 'haze',
            icon: '50n',
          },
        ],
        base: 'stations',
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
          country: 'BD',
          sunrise: 1659915055,
          sunset: 1659962237,
        },
        timezone: 21600,
        id: 1185241,
        name: 'Dhaka',
        cod: 200,
      },
      airPollution: [
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
      cityList: cities,
    };
  },
  methods: {
    getSelectedCity(city) {
      this.searchQuery = city ? city.name: ''
      this.getWeatherData()
      this.isVisible = false
    },
    getWeatherData() {
      this.isDataLoading = true
      api.get(`weather?q=${this.searchQuery}&APPID=${process.env.VUE_APP_KEY}&units=metric`)
        .then((response) => {
          if (response.status === 200) {
            this.weatherData = response.data;
            this.getAirPollutionData(response.data.coord.lat, response.data.coord.lon)
          }
        })
        .catch(function (error) {
          console.log(error);
        }).finally(() => {
          this.isVisible = false
          this.isDataLoading = false
        })
    },
    getAirPollutionData(lat, lon) {
      api.get(`air_pollution?lat=${lat}&lon=${lon}&APPID=${process.env.VUE_APP_KEY}`)
        .then((response) => {
          this.airPollution.air_quality = response.data.list[0];
        })
        .catch(function (error) {
          console.log(error);
        }).finally(() => {
          this.isDataLoading = false
        })
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/main.scss';

.weather-dashboard {
  background-color: $bg-variant;
  .celsius,
  .fahrenheit {
    position: relative;
    margin-right: 15px;
    &::after {
      position: absolute;
      top: 0px;
    }
  }
  .celsius::after {
    content: '\00B0 C';
  }
  .fahrenheit::after {
    content: '\00B0 F';
  }
  .weather-bar {
    background-color: $white;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    margin: 0 0 20px 0;
    .temp-btn {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: $bg-variant;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: $primary;
      }
      &.active {
        border: 1px solid $primary;
      }
    }
    .avatar {
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
        object-position: top;
      }
    }
  }
  .searchbar {
    max-width: 400px;
    margin: 10px 0 10px auto;
    background-color: $white;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    input {
      height: 35px;
      border: none;
      border-radius: 0;
      margin-right: 5px;
      border-bottom: 1px solid rgb(218, 218, 218);
      &:focus {
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-color: $primary;
      }
    }
    .location {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: $white;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: $primary;
      }
    }
    .search-results {
      // display: none;
      position: absolute;
      overflow-y: auto;
      width: 100%;
      height: 300px;
      left: 0;
      top: 60px;
      background-color: $white;
      border-radius: 5px;
      box-shadow: 0 0 40px rgba(105, 53, 253, 0.1);
      .search-card {
        padding: 10px;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        .result {
          display: block;
        }
        &:hover {
          background:$hover;
        }
      }
    }
  }
  .weather-details {
    padding-bottom: 10px;
  }
}
</style>
