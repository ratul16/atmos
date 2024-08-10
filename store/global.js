export const useGlobalStore = defineStore('global', {
  state: () => ({
    appName: 'Nuxt 3 Project template',
    theme: 'light',
    selectedLocation: {}
  }),
  getters: {
    getTheme() {
      return this.theme;
    },
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
  persist: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}