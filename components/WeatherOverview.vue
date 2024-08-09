<template>
  <div class="weather-overview">
    <!-- <div
      class="search-results"
      :style="filteredResults.length ? 'max-height:250px' : 'height:auto'"
      v-if="isVisible"
    >
      <div v-if="filteredResults.length">
        <div class="search-card" v-for="x in filteredResults" :key="x.id">
          <div class="result" @click="getWeatherData(x.name)">
            <div class="name">{{ x.name }}, {{ x.country }}</div>
            <small class="text-muted">{{ x.coord.lat || "" }}, {{ x.coord.lon || "" }}</small>
          </div>
        </div>
      </div>
      <div class="search-card" v-else>
        <div class="font-weight-bold text-muted">Place not in list, search manually</div>
      </div>
    </div> -->
  </div>
  <div class="weather-details">
    <div class="loading d-flex justify-content-between align-items-center">
      <h4>Fetching Weather Data...</h4>
      <!-- <b-spinner variant="secondary" label="Loading..."></b-spinner> -->
    </div>
    <div class="details-body" v-if="Object.keys(props.weatherData).length">
      {{ props.weatherData }}
      <!-- <TodayHighlight :weatherData="weatherData" /> -->
      <hr />
      <!-- <WeeklyHighlight :coord="weatherData.coord" /> -->
      <hr />
      <!-- <AirPollutionChart :coord="weatherData.coord" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProp({
  weatherData: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.weather-overview {
  min-height: 100%;
  background-color: $bg-variant;
  padding-top: 80px;
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
    content: "\00B0 C";
  }
  .fahrenheit::after {
    content: "\00B0 F";
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
          background: $hover;
        }
      }
    }
  }
  .weather-details {
    padding-bottom: 10px;
  }
}
</style>
