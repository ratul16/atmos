// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura/';
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  alias: {
    '@': resolve(__dirname, "/"),
  },

  modules: ['@primevue/nuxt-module', '@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],

  css: [
    '~/assets/scss/main.scss',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/_variables.scss" as *;
          @use "~/assets/scss/_mixins.scss" as *;
          `
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Atmos',
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://kit.fontawesome.com/16d5298cef.js'
        }
      ]
    }
  }
})