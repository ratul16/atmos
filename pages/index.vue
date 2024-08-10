<template>
  <div>
    <h1 class="mb-4">Weather Overview</h1>
    <InputGroup>
      <AutoComplete
        v-model="selectedCity"
        :suggestions="filteredCities"
        optionLabel="name"
        @complete="searchCity"
        @option-select="getWeather"
        emptySearchMessage="No matching city found"
        placeholder="Search for a city"
      >
        <template #option="slotProps">
          <div class="">
            <h4 class="my-1">{{ slotProps.option.name }}, {{ slotProps.option.country }}</h4>
            <div class="flex align-items-center gap-2">
              <small>Lat: {{ slotProps.option.coord.lat }}</small>
              <small>Lon :{{ slotProps.option.coord.lon }}</small>
            </div>
          </div>
        </template>
      </AutoComplete>
    </InputGroup>
    <div v-if="weather" class="mt-4">
      <TodayHighlight :currentData="weather" />
      <!-- <hr /> -->
      <WeeklyHighlight :coord="weather.coord" />
      <!-- <hr /> -->
      <!-- <AirPollutionChart :coord="weatherData.coord" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGlobalStore } from "~/store/global";

// city json data

const global = useGlobalStore();

const search = ref("london");
const weather = ref({});
const selectedCity = ref(null);
const filteredCities = ref([]);
const citiesData = ref([]);

const getWeather = async (event) => {
  let searchQuery = `weather?q=${event.value.name}`;
  console.log(searchQuery);
  const response = await fetch(`/api/weather?query=${searchQuery}`);
  weather.value = await response.json();
  global.selectedLocation = weather.value;
};

// const getWeather = (event) => {
//   console.log(event.value);
// };
const getCityList = async () => {
  const city = await useFetch("/api/city");
  citiesData.value = city.data.value;
};

const searchCity = (event) => {
  const query = event.query.toLowerCase();
  if (!Array.isArray(citiesData.value)) {
    console.error("citiesData is not an array:", citiesData.value);
    return;
  }
  filteredCities.value = citiesData.value.filter((city) => city.name.toLowerCase().includes(query));
  console.log(filteredCities.value);
};

onMounted(() => {
  weather.value = global.selectedLocation;
  getCityList();
});
</script>
