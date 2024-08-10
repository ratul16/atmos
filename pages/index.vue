<template>
  <div>
    <h1 class="mb-4">Weather Overview</h1>
    <InputGroup>
      <AutoComplete
        v-model="selectedCity"
        :suggestions="filteredCities"
        optionLabel="name"
        @complete="search"
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
    <div class="flex flex-column gap-4">
      <TodayHighlight :currentData="weather" :key="weather" />
      <WeeklyHighlight :coord="weather.coord" />
      <AirPollutionChart :coord="weather.coord" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useGlobalStore } from "~/store/global";

const global = useGlobalStore();
const weather = ref({});
const selectedCity = ref(null);
const filteredCities = ref([]);
const citiesData = ref([]);

const getWeather = async (event) => {
  let searchQuery = `weather?q=${event.value.name}`;
  global.selectedLocation = event.value;
  try {
    // always use $fetch not useFetch which is a composable
    const response = await $fetch(`/api/weather?query=${searchQuery}`);
    if (response.status === 200) {
      weather.value = response.data;
      global.weather = weather.value;
    } else {
      console.error("No data returned from the API");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const getCityList = async () => {
  try {
    const response = await $fetch("/api/city");
    if (response.status === 200) {
      citiesData.value = response.data;
    } else {
      console.error("No data returned from the API");
    }
  } catch (error) {
    console.error("Error fetching city list:", error);
  }
};

const search = (event) => {
  setTimeout(() => {
    const query = event.query.toLowerCase().trim();

    if (query.length === 0) {
      filteredCities.value = [...citiesData.value];
    } else {
      filteredCities.value = citiesData.value.filter((city) => {
        return city.name.toLowerCase().startsWith(query);
      });
    }
  }, 250);
};

onBeforeMount(() => {
  weather.value = global.weather;
  getCityList();
});
</script>
