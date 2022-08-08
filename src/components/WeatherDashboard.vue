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
          placeholder="Search for places ..."
        />
        <template #append>
          <div class="location" @click="getWeatherData">
            <i class="fas fa-crosshairs" />
          </div>
        </template>
      </b-input-group>
      <div class="search-results">
        <!-- <div class="search-card">
          <div class="font-weight-bold">
            Please enter valid address
          </div>
        </div>
        <div class="search-card">
          <div class="font-weight-bold">No information found</div>
        </div> -->
        <div class="search-card" v-for="x in testResults" :key="x.city_name">
          <div class="result">
            <div class="name">{{ x.city_name }}, {{ x.short_code }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather-details">
      <div class="details-body">
        <TodayHighlight :weatherData="weatherData" />
        <WeeklyHighlight />
        <!-- <AirPollutionChart /> -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/scripts/api';
import TodayHighlight from '@/components/TodayHighlight';
import WeeklyHighlight from '@/components/WeeklyHighlight';
// import AirPollutionChart from '@/components/AirPollutionChart'

export default {
  name: 'WeatherDashboard',
  components: {
    TodayHighlight,
    WeeklyHighlight,
    // AirPollutionChart,
  },
  data() {
    return {
      lat: 50,
      lon: 50,
      searchQuery: 'dhaka',
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
      airPollution: [],
      testResults: [
        {
          city_name: 'Calabasas',
          short_code: 'CA',
          rate: 1500,
          apartment_bed: 2,
          find_more: 3,
        },
        {
          city_name: 'Long Beach',
          short_code: 'LA',
          rate: 2000,
          apartment_bed: 1,
          find_more: 2,
        },
        {
          city_name: 'Paris',
          short_code: 'PA',
          rate: 5500,
          apartment_bed: 3,
          find_more: 3,
        },
      ],
    };
  },
  mounted() {
    // this.getWeatherData();
    // this.getAirPollutionData(50, 50);
  },
  methods: {
    getWeatherData() {
      api
        .get(
          `weather?q=${this.searchQuery}&APPID=${process.env.VUE_APP_KEY}&units=metric`
        )
        .then((response) => {
          if (response.data.cod === 200) {
            this.weatherData = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(
            'City Name Invaild/ Not Found.\nUse Proper City Name. Ex: new york, london '
          );
        });
    },
    getAirPollutionData(lat, lon) {
      api
        .get(
          `air_pollution?lat=${lat}&lon=${lon}&APPID=${process.env.VUE_APP_KEY}`
        )
        .then((response) => {
          this.weatherData.air_quality = response.data.list[0].main.aqi;
        })
        .catch(function (error) {
          console.log(error);
          alert('City Coord Invaild/ Not Found.');
        });
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
      position: absolute;
      width: 100%;
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
}
</style>
