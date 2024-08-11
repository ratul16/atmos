export const useGlobalStore = defineStore('global', {
  state: () => ({
    appName: 'Nuxt 3 Project template',
    theme: 'light',
    selectedLocation: {
      "id": 186,
      "coord": {
        "lon": -0.12574,
        "lat": 51.50853
      },
      "country": "United Kingdom",
      "name": "London"
    },
    weather: {},
    weeklyData: {},
    airPollution: {}
  }),
  getters: {
    getTheme() {
      return this.theme;
    },
    async getWeatherData() {
      let searchQuery = `weather?q=${this.selectedLocation.name}`;
      // console.log("store call", this.selectedLocation);

      try {
        // always use $fetch not useFetch which is a composable
        const response = await $fetch(`/api/weather?query=${searchQuery}`);
        if (response.status === 200) {
          this.weather = response.data;
        } else {
          console.error("No data returned from the API");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  },
  actions: {
    setTheme(value) {
      this.theme = value;
    },
    initialize() {
      const savedKey = localStorage.getItem('store');
      this.theme = JSON.parse(savedKey).theme;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}