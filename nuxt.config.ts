// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    APP_CALLBACK: process.env.APP_CALLBACK,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID: process.env.SPOTIFY_SECRET_ID,
    SPOTIFY_API_CODE: process.env.SPOTIFY_API_CODE,
    SPOTIFY_ACCESS_TOKEN: process.env.SPOTIFY_ACCESS_TOKEN,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_TEMP_DATA: process.env.SPOTIFY_TEMP_DATA,
  },
  hooks: {
    'nitro:build:before': (nitro) => {
      
    }
  }
})
