import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    appName: 'Nuxt 3 Project template',
    theme: 'light'
  }),
  persist: true,
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
});