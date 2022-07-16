<template>
  <div class="weather-dashboard">
    <b-row justify="between" class="mr-0">
      <b-col md="4" sm="6">
        <b-card class="searchbar">
          <b-input-group>
            <b-form-input v-model="searchQuery" placeholder="Search for places ..." />
            <template #append>
              <div class="location" @click="getWeatherData">
                <i class="fas fa-crosshairs"></i>
              </div>
            </template>
          </b-input-group>
          <div class="weather-temp">
            <h2 class="temp celsius">
              <!-- {{ weatherData.main.temp || 'N/A' }} -->
              31
            </h2>
          </div>
          <div class="weather-logo">
            <img
              src="https://openweathermap.org/img/wn/02d@2x.png"
              loading="lazy"
            />
            <div class="condition">
              <!-- {{ weatherData.weather[0].description }} -->
              Mostly Cloudy
            </div>
          </div>
          <div class="weather-content">
            <h6>
              <i class="far fa-clock"/>
              {{ new Date().toDateString()}}
            </h6>
            <h6>
              <i class="fas fa-thermometer-three-quarters"></i>
              Feels Like:  
              <span>16</span>
            </h6>
            <h6>
              <i class="fas fa-sun"/>
              Sunrise: 
              <span>05:20:33 AM</span>
            </h6>
            <h6>
              <i class="far fa-sun" /> 
              Sunset:
              <span>18:47:49 PM</span>
            </h6>
            <div class="city winter">
              <div class="foreground">
                <!-- <span>{{ weatherData.name }}, {{ weatherData.sys.country }}</span> -->
                <span>Dhaka, BD</span>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="8" sm="6">
        <div class="weather-details">
          <div class="weather-bar">
            <div class="temp-btn active">
              &#176;C
            </div>
            <div class="temp-btn">
              &#176;F
            </div>
            <div class="avatar">
              <img src="https://images.unsplash.com/photo-1656969630442-9db4f3dcb134?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="">
            </div>
          </div>
          <div class="details-body">
            <TodayHighlight />
            <WeeklyHighlight />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/scripts/api'
import TodayHighlight from '@/components/TodayHighlight'
import WeeklyHighlight from '@/components/WeeklyHighlight'

export default {
  name: "WeatherDashboard",
  components: {
    TodayHighlight,
    WeeklyHighlight,
  },
  data() {
    return {
      searchQuery: 'dhaka',
      weatherData: ''
    }
  },
  mounted () {
    // this.getWeatherData();
  },
  methods: {
    getWeatherData() {
      api.get(`weather?q=${this.searchQuery}&APPID=${process.env.VUE_APP_KEY}&units=metric`).then(response => {
        if (response.data.cod === 200) {
          // console.log(response.data);
          this.weatherData = response.data
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
        alert(
          "City Name Invaild/ Not Found.\nUse Proper City Name. Ex: new york, london "
        );
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.weather-dashboard {
  background-color: #f6f5f9;
  .celsius, .fahrenheit {
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
  .searchbar {
    padding: 10px;
    border: none;
    input {
      border: none;
      border-radius: 0;
      margin-right: 5px;
      border-bottom: 1px solid rgb(180, 180, 180);
      &:focus {
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-color: red;
      }
    }
    .location {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: #f6f5f9;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #e4e4e4;
      }
    }
    .weather-temp {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      .temp {
        font-size: 60px;
        margin-bottom: 0;
      }
    }
    .weather-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #333;
      padding-bottom: 40px;
      margin-bottom: 40px;
      .condition {
        font-size: 26px;
        text-transform: capitalize;
      }
      img {
        width: 60px;
      }
    }
    .weather-content {
      h6 {
        margin-bottom: 30px;
      }
      .city {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        // width: 100%;
        height: 140px;
        border-radius: 5px;
        border: none;
        .foreground {
          height: 100%;
          border-radius: 5px;
          font-size: 26px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
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
  .weather-details {
    .weather-bar {
      background-color: white;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
      margin: 10px 0 20px 0;
      .temp-btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #f6f5f9;
        transition: all 0.3s ease-in-out;
        &:hover {
          background-color: #9ed6fc;
        }
        &.active {
          border: 1px solid #9ed6fc;
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
    .details-body {
      
      
    }
  }
}
</style>
