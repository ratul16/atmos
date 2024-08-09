<template>
  <div>
    <h1 class="mb-0">Weather Information</h1>
    <InputGroup>
      <InputText v-model="search" placeholder="Enter city name" />
      <Button label="Get Weather" icon="pi pi-search" @click="fetchWeather" />
    </InputGroup>
    <div v-if="weather" class="mt-4">
      <!-- {{ weather }} -->
    </div>
    <TodayHighlight :currentData="weather" />
    <hr />
    <WeeklyHighlight :coord="weather.coord" />
    <hr />
    <!-- <AirPollutionChart :coord="weatherData.coord" /> -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("london");
const weather = ref({});

const fetchWeather = async () => {
  let searchQuery = `weather?q=${search.value}`;
  console.log(searchQuery);
  const response = await fetch(`/api/weather?query=${searchQuery}`);
  weather.value = await response.json();
};
</script>
