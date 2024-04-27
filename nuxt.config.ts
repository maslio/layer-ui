import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    vue: {
      script: {
        propsDestructure: true,
      },
    },
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    'nuxt-icon',
  ],
  colorMode: {
    classSuffix: '',
  },
  css: [
    '@unocss/reset/tailwind.css',
    join(currentDir, './assets/global.css'),
  ],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        {
          name: 'MobileOptimized',
          content: '320',
        },
      ],
    },
  },
})
