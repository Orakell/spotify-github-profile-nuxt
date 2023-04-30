export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      encodeBase64: (value: string): string => {
        if (process.client) {
          return window.btoa(unescape(encodeURIComponent(value)))
        } else {
          return Buffer.from(value).toString('base64')
        }
      },
      decodeBase64: (value: string): string => {
        if (process.client) {
          return decodeURIComponent(escape(window.atob(value)))
        } else {
          return Buffer.from(value, 'base64').toString()
        }
      }
    }
  }
})