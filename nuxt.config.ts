// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  alias: {
    '@': resolve(__dirname, "./"),
    '@composables': resolve(__dirname, './composables'),
  },

  modules: ['@primevue/nuxt-module', '@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],

  css: [
    '~/assets/scss/main.scss',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],

  primevue: {
    importTheme: { from: '@/theme.js' },
    options: {
      ripple: true,
    },
  },

  pinia: {
    storesDirs: ['@stores/**'],
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
    private: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
      cityUrl: process.env.GIST_URL,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Atmos',
      script: [
        {
          src: 'https://kit.fontawesome.com/16d5298cef.js',
          crossorigin: 'anonymous',
        }
      ],
    }
  }
})
